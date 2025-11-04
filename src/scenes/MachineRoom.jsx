import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

function CameraMotion() {
	// Subtle idle camera motion to make it feel alive
	useFrame(({ camera, clock }) => {
		camera.position.x = Math.sin(clock.elapsedTime * 0.3) * 0.3;
		camera.lookAt(0, 0, -20);
	});
	return null;
}

// Generates a long corridor with gears along the walls
function MachineCorridor() {
	const textureMaps = useTexture({
		map: "/concrete/concrete_color.jpg",
		normalMap: "/concrete/concrete_normal_directx.png",
		roughnessMap: "/concrete/concrete_roughness.jpg",
		heightMap: "/concrete/concrete_height.png",
		aoMap: "/concrete/concrete_ao.jpg",
	});

	// Optional: repeat + wrapping so they tile across long walls
	Object.values(textureMaps).forEach((t) => {
		if (t) {
			t.wrapS = t.wrapT = THREE.RepeatWrapping;
			t.repeat.set(10, 2);
		}
	});
	const gears = useMemo(() => {
		const items = [];
		const corridorLength = 40;
		const spacing = 3;
		for (let z = -corridorLength / 2; z < corridorLength / 2; z += spacing) {
			// left wall gear (x negative)
			items.push({
				side: "left",
				position: [-3.75, (Math.random() - 0.5) * 1.8, z + (Math.random() - 0.5) * 0.6],
				radius: 0.6 + Math.random() * 0.4,
				speed: 0.02 + Math.random() * 0.02,
				direction: 1,
			});
			// right wall gear (x positive) staggered half spacing
			items.push({
				side: "right",
				position: [3.75, (Math.random() - 0.5) * 1.8, z + spacing / 2 + (Math.random() - 0.5) * 0.6],
				radius: 0.6 + Math.random() * 0.4,
				speed: 0.02 + Math.random() * 0.02,
				direction: -1,
			});
		}
		return items;
	}, []);

	// rotation: rotate around the cylinder axis that points toward the corridor (X axis)
	useFrame(() => {
		gears.forEach((gear) => {
			if (gear.mesh) {
				// rotate around local X (we orient mesh so cylinder axis aligns to +X)
				gear.mesh.rotation.x += gear.speed * gear.direction;
			}
		});
	});

	return (
		<group>
			{/* Floor */}
			<mesh receiveShadow rotation={[-Math.PI / 2, 0, Math.PI * 0.5]} position={[0, -2.8, 0]}>
				<planeGeometry args={[60, 12]} />
				<meshStandardMaterial
					{...textureMaps}
					metalness={1}
					roughness={1}
					color="#ffffff" // base tint
				/>
			</mesh>

			{/* Left wall */}
			<mesh position={[-4, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
				<planeGeometry args={[60, 6]} />
				<meshStandardMaterial
					{...textureMaps}
					metalness={1}
					roughness={1}
					color="#ffffff" // base tint
					side={THREE.DoubleSide}
				/>
			</mesh>

			{/* Right wall */}
			<mesh position={[4, 0.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
				<planeGeometry args={[60, 6]} />
				<meshStandardMaterial
					{...textureMaps}
					metalness={1}
					roughness={1}
					color="#ffffff" // base tint
					side={THREE.DoubleSide}
				/>
			</mesh>

			{/* back wall at far end */}
			{/* <mesh position={[0, 0.2, -20]}>
				<planeGeometry args={[12, 6]} />
				<meshStandardMaterial color="green" metalness={0.05} roughness={0.95} side={THREE.DoubleSide} />
			</mesh> */}

			{/* Ceiling (optional thin strip) */}
			<mesh position={[0, 2.4, 0]} rotation={[Math.PI * 0.5, 0, Math.PI * 0.5]}>
				<planeGeometry args={[60, 12]} />
				<meshStandardMaterial
					{...textureMaps}
					metalness={1}
					roughness={1}
					color="#ffffff" // base tint
				/>
			</mesh>

			{/* row of subtle lights on ceiling to illuminate gears */}
			{Array.from({ length: 12 }).map((_, i) => {
				const z = -26 + (i * 52) / 11;
				return (
					<mesh key={`lamp-${i}`} position={[0, 2.2, z]}>
						<sphereGeometry args={[0.06, 8, 8]} />
						<meshStandardMaterial emissive={"#ff7b33"} color={"#000"} emissiveIntensity={0.6} />
					</mesh>
				);
			})}

			{/* Gears placed on walls */}
			{gears.map((g, i) => {
				// Geometry per gear (procedural "teeth" modulation)
				const geometry = useMemo(() => {
					const geo = new THREE.CylinderGeometry(g.radius, g.radius, 0.35, 64, 1, false);
					const pos = geo.attributes.position;
					const v = new THREE.Vector3();
					const toothCount = 16;
					for (let idx = 0; idx < pos.count; idx++) {
						v.fromBufferAttribute(pos, idx);
						// cylinder's radial coords: x,z. angle uses atan2(z,x)
						const angle = Math.atan2(v.z, v.x);
						const radiusMod = 1 + Math.sin(angle * toothCount) * 0.07;
						v.x *= radiusMod;
						v.z *= radiusMod;
						pos.setXYZ(idx, v.x, v.y, v.z);
					}
					pos.needsUpdate = true;
					geo.computeVertexNormals();
					return geo;
				}, [g.radius]);

				// orient cylinder so its axis points to corridor center (X axis).
				// Default cylinder axis is Y, so rotate -90° around Z to make Y->X.
				const rotation = [0, 0, -Math.PI / 2];

				// material color slightly varied but dark to fit mood
				const matColor = new THREE.Color().setHSL(0.08, 0.02, 0.25 + Math.random() * 0.12);

				return (
					<mesh key={i} ref={(r) => (gears[i].mesh = r)} geometry={geometry} position={g.position} rotation={rotation} castShadow receiveShadow>
						<meshStandardMaterial
							metalness={1}
							roughness={0.35}
							color={matColor}
							// subtle emissive edge to catch light a bit
							emissive={"#0b0500"}
							emissiveIntensity={0.02}
						/>
					</mesh>
				);
			})}
		</group>
	);
}
export default function Scene() {
	return (
		<>
			<color attach="background" args={["#050505"]} />
			<fog attach="fog" args={["#050505", 6, 50]} />

			{/* Ambient and warm lights */}
			<ambientLight intensity={0.08} />
			<pointLight position={[0, 3, 5]} intensity={1} color="#ff7b33" distance={20} />
			<pointLight position={[0, 2, -10]} intensity={0.6} color="#ff6b22" distance={30} />
			<pointLight position={[0, 2, 20]} intensity={0.4} color="#ffaa66" distance={30} />

			<MachineCorridor />

			<CameraMotion />
			<Environment preset="warehouse" />
			<OrbitControls enableZoom={false} enablePan={false} />
			<EffectComposer>
				<Bloom intensity={0.35} />
				<Vignette eskil={false} offset={0.25} darkness={0.9} />
			</EffectComposer>
		</>
	);
}
