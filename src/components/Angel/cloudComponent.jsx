import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js";

export default function CloudComponent({
	threshold = 0.8,
	opacity = 0.05,
	range = 0.8,
	steps = 500,
	position = [0, 0, 0],
	scale = 1,
	base = [0.9, 0.95, 1.0],
	rotation = true,
	enableRays = false,
	lightPosition = [0, 10, -10],
	lightDirection = [0, -1, 0],
	lightColor = [1.0, 0.95, 0.85],
	lightIntensity = 1.0,
	lightAngle = 0.5,
	g = 0.7,
	rayVisibility = 0.8,
}) {
	const meshRef = useRef();
	const { camera } = useThree();

	// === Generate 3D Noise Texture ===
	const size = 128;
	const data = new Uint8Array(size * size * size);
	const perlin = new ImprovedNoise();
	const vector = new THREE.Vector3();
	const noiseScale = 0.05;

	let i = 0;
	for (let z = 0; z < size; z++) {
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				const d =
					1.0 -
					vector
						.set(x, y, z)
						.subScalar(size / 2)
						.divideScalar(size)
						.length();
				data[i++] = (128 + 128 * perlin.noise((x * noiseScale) / 1.5, y * noiseScale, (z * noiseScale) / 1.5)) * d * d;
			}
		}
	}

	const texture = new THREE.Data3DTexture(data, size, size, size);
	texture.format = THREE.RedFormat;
	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.LinearFilter;
	texture.unpackAlignment = 1;
	texture.needsUpdate = true;

	// === Vertex Shader ===
	const vertexShader = /* glsl */ `
    in vec3 position;
    uniform mat4 modelMatrix;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform vec3 cameraPos;

    out vec3 vOrigin;
    out vec3 vDirection;

    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vOrigin = (inverse(modelMatrix) * vec4(cameraPos, 1.0)).xyz;
      vDirection = position - vOrigin;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

	// === Fragment Shader ===
	const fragmentShader = /* glsl */ `
    precision highp float;
    precision highp sampler3D;

    uniform vec3 base;
    uniform sampler3D map;
    uniform float threshold;
    uniform float range;
    uniform float opacity;
    uniform float steps;
    uniform float frame;
    uniform vec3 lightPosition;
    uniform vec3 lightDirection;
    uniform vec3 lightColor;
    uniform float lightIntensity;
    uniform float g;
    uniform float rayVisibility;
    uniform bool enableRays;

    in vec3 vOrigin;
    in vec3 vDirection;
    out vec4 color;

    // === Utility ===
    vec2 hitBox(vec3 orig, vec3 dir) {
      const vec3 boxMin = vec3(-0.5);
      const vec3 boxMax = vec3(0.5);
      vec3 invDir = 1.0 / dir;
      vec3 tMinTemp = (boxMin - orig) * invDir;
      vec3 tMaxTemp = (boxMax - orig) * invDir;
      vec3 tMin = min(tMinTemp, tMaxTemp);
      vec3 tMax = max(tMinTemp, tMaxTemp);
      float t0 = max(tMin.x, max(tMin.y, tMin.z));
      float t1 = min(tMax.x, min(tMax.y, tMax.z));
      return vec2(t0, t1);
    }

    float sample1(vec3 p) {
      return texture(map, p).r;
    }

    float phase(float cosTheta) {
      return (1.0 - g*g) / (4.0 * 3.14159 * pow(1.0 + g*g - 2.0*g*cosTheta, 1.5));
    }

    // === Main ===
    void main() {
      vec3 rayDir = normalize(vDirection);
      vec2 bounds = hitBox(vOrigin, rayDir);
      if (bounds.x > bounds.y) discard;
      bounds.x = max(bounds.x, 0.0);

      vec3 p = vOrigin + bounds.x * rayDir;
      vec3 inc = 1.0 / abs(rayDir);
      float delta = min(inc.x, min(inc.y, inc.z)) / steps;

      vec4 ac = vec4(0.0);
      vec3 c = vec3(0.0);

      for (float t = bounds.x; t < bounds.y; t += delta) {
        float d = sample1(p + 0.5);
        d = smoothstep(threshold - range, threshold + range, d) * opacity;

        if (d > 0.001) {
          // Base color with soft brightness
          vec3 baseCol = base * (0.8 + 0.2 * d);

          // Enhanced godray scattering
          if (enableRays) {
            vec3 L = normalize(lightDirection);
            float cosTheta = dot(L, -rayDir);
            float scatter = phase(cosTheta) * rayVisibility * (0.8 + 1.5 * pow(max(cosTheta, 0.0), 4.0));
            vec3 light = lightColor * lightIntensity * scatter;
            baseCol += light * (0.6 + 0.4 * d);
          }

          c += (1.0 - ac.a) * d * baseCol;
          ac.a += (1.0 - ac.a) * d;

          if (ac.a >= 0.95) break;
        }

        p += rayDir * delta;
      }

      // Tonemap and gamma
      c = c / (c + vec3(1.0));
      c = pow(c, vec3(1.0 / 1.2));

      color = vec4(c, ac.a);
      if (color.a <= 0.0) discard;
    }
  `;

	// === Material ===
	const material = new THREE.RawShaderMaterial({
		glslVersion: THREE.GLSL3,
		uniforms: {
			base: { value: new THREE.Color(...base) },
			map: { value: texture },
			cameraPos: { value: new THREE.Vector3() },
			threshold: { value: threshold },
			opacity: { value: opacity },
			range: { value: range },
			steps: { value: steps },
			frame: { value: 0 },
			lightPosition: { value: new THREE.Vector3(...lightPosition) },
			lightDirection: { value: new THREE.Vector3(...lightDirection).normalize() },
			lightColor: { value: new THREE.Color(...lightColor) },
			lightIntensity: { value: lightIntensity },
			g: { value: g },
			rayVisibility: { value: rayVisibility },
			enableRays: { value: enableRays },
		},
		vertexShader,
		fragmentShader,
		transparent: true,
		depthWrite: false,
	});

	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const mesh = new THREE.Mesh(geometry, material);
	meshRef.current = mesh;

	useEffect(() => {
		if (meshRef.current) {
			if (Array.isArray(position)) meshRef.current.position.set(...position);
			if (typeof scale === "number") meshRef.current.scale.setScalar(scale);
			else if (Array.isArray(scale)) meshRef.current.scale.set(...scale);
			else meshRef.current.scale.setScalar(scale || 1);
		}
	}, [position, scale]);

	useFrame(() => {
		if (meshRef.current) {
			meshRef.current.material.uniforms.cameraPos.value.copy(camera.position);
			meshRef.current.material.uniforms.frame.value++;
			if (rotation === true) meshRef.current.rotation.y = performance.now() / 15000;
		}
	});

	return <primitive object={meshRef.current} renderOrder={1} />;
}
