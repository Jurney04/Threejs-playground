import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const params = {
	color: 0xffffff,
	transmission: 0,
	opacity: 1,
	metalness: 0,
	roughness: 0,
	ior: 1.5,
	thickness: 0.01,
	attenuationColor: 0xffffff,
	attenuationDistance: 1,
	specularIntensity: 1,
	specularColor: 0xffffff,
	envMapIntensity: 1,
	lightIntensity: 1,
	exposure: 0.5, // Lowered to avoid overexposure
};

let camera, scene, renderer;
let mesh, material;
const textureLoader = new THREE.TextureLoader();

// Initialize scene early (before loaders)
scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc); // Temporary gray background to test

// Load HDR first
const hdrEquirect = new HDRLoader().load(
	"./royal_esplanade_1k.hdr",
	function () {
		console.log("HDR loaded successfully");
		hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;

		// Load GLTF after HDR
		new GLTFLoader().load(
			"./elven_guard_statue.glb",
			function (gltf) {
				console.log("GLTF loaded successfully");
				gltf.scene.traverse(function (child) {
					if (child.isMesh) {
						mesh = child;
						const originalMaterial = mesh.material;

						mesh.material = new THREE.MeshPhysicalMaterial();
						material = mesh.material;

						if (originalMaterial) {
							material.roughness = originalMaterial.roughness || 0;
							material.metalness = originalMaterial.metalness || 0;
							material.ior = originalMaterial.ior || 1.5;
							material.specularIntensity = originalMaterial.specularIntensity || 1;
							material.transmission = originalMaterial.transmission || 0;
							material.thickness = originalMaterial.thickness || 0.01;
							material.attenuationDistance = originalMaterial.attenuationDistance || 1;
							material.opacity = originalMaterial.opacity || 1;
							material.transparent = originalMaterial.transparent || false;
						}

						params.color = material.color.getHex();
						params.roughness = material.roughness;
						params.metalness = material.metalness;
						params.ior = material.ior;
						params.specularIntensity = material.specularIntensity;
						params.transmission = material.transmission;
						params.thickness = material.thickness;
						params.attenuationDistance = material.attenuationDistance;
					}
				});

				scene.add(gltf.scene);
				scene.environment = hdrEquirect;

				// Load texture after GLTF
				textureLoader.load(
					"./scene8/gem/Sapphire_001_COLOR.jpg",
					function (texture) {
						console.log("Texture loaded successfully");
						if (material) {
							material.map = texture;
							material.needsUpdate = true;
							render();
						} else {
							console.error("Material not found.");
						}
					},
					undefined,
					function (error) {
						console.error("Error loading texture:", error);
					}
				);

				init();
				render();
			},
			undefined,
			function (error) {
				console.error("Error loading GLTF:", error);
			}
		);
	},
	undefined,
	function (error) {
		console.error("Error loading HDR:", error);
	}
);

function init() {
	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false }); // Set alpha to false for solid background
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	document.body.appendChild(renderer.domElement);

	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = params.exposure;

	renderer.domElement.style.position = "absolute";
	renderer.domElement.style.top = 0;

	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.set(-5, 0.5, 0);

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.addEventListener("change", render);
	controls.minDistance = 5;
	controls.maxDistance = 20;
	controls.target.y = 0.5;
	controls.update();

	window.addEventListener("resize", onWindowResize);

	const gui = new GUI();

	gui.addColor(params, "color").onChange(function () {
		material.color.set(params.color);
		render();
	});

	gui.add(params, "transmission", 0, 1, 0.01).onChange(function () {
		material.transmission = params.transmission;
		render();
	});

	gui.add(params, "opacity", 0, 1, 0.01).onChange(function () {
		material.opacity = params.opacity;
		const transparent = params.opacity < 1;
		if (transparent !== material.transparent) {
			material.transparent = transparent;
			material.needsUpdate = true;
		}
		render();
	});

	gui.add(params, "metalness", 0, 1, 0.01).onChange(function () {
		material.metalness = params.metalness;
		render();
	});

	gui.add(params, "roughness", 0, 1, 0.01).onChange(function () {
		material.roughness = params.roughness;
		render();
	});

	gui.add(params, "ior", 1, 2, 0.01).onChange(function () {
		material.ior = params.ior;
		render();
	});

	gui.add(params, "thickness", 0, 5, 0.01).onChange(function () {
		material.thickness = params.thickness;
		render();
	});

	gui
		.addColor(params, "attenuationColor")
		.name("attenuation color")
		.onChange(function () {
			material.attenuationColor.set(params.attenuationColor);
			render();
		});

	gui.add(params, "attenuationDistance", 0, 1, 0.01).onChange(function () {
		material.attenuationDistance = params.attenuationDistance;
		render();
	});

	gui.add(params, "specularIntensity", 0, 1, 0.01).onChange(function () {
		material.specularIntensity = params.specularIntensity;
		render();
	});

	gui.addColor(params, "specularColor").onChange(function () {
		material.specularColor.set(params.specularColor);
		render();
	});

	gui
		.add(params, "envMapIntensity", 0, 1, 0.01)
		.name("envMap intensity")
		.onChange(function () {
			material.envMapIntensity = params.envMapIntensity;
			render();
		});

	gui.add(params, "exposure", 0, 1, 0.01).onChange(function () {
		renderer.toneMappingExposure = params.exposure;
		render();
	});

	gui.open();
}

function onWindowResize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
	render();
}

function render() {
	renderer.render(scene, camera);
}

export default init;
