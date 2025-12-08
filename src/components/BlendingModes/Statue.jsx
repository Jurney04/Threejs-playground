import * as THREE from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { useEffect, useState } from "react";

function Statue({ onModelLoaded }) {
	const { gl } = useThree();
	const gltf = useLoader(GLTFLoader, "/elven_guard_statue.glb");
	const texture = useLoader(THREE.TextureLoader, "/angel/gold_texture/Poliigon_MetalGoldPaint_7253_BaseColor.jpg");

	const { scene } = useThree();

	const [material, setMaterial] = useState(null);

	useEffect(() => {
		if (!gltf || !texture) return;

		let newMaterial;
		gltf.scene.traverse((child) => {
			if (child.isMesh) {
				newMaterial = new THREE.MeshPhysicalMaterial({
					map: texture,
				});
				child.material = newMaterial;
			}
		});
		setMaterial(newMaterial);
		console.log("Material applied to GLTF");

		if (onModelLoaded) onModelLoaded(true);
	}, [gltf, texture, onModelLoaded]);

	useEffect(() => {
		if (!material) return;

		const gui = new GUI();

		const params = {
			color: material.color.getHex(),
			metalness: material.metalness,
			roughness: material.roughness,
			ior: material.ior,
			transmission: material.transmission,
			thickness: material.thickness,
		};

		gui.addColor(params, "color").onChange((value) => {
			material.color.set(value);
		});
		gui.add(params, "metalness", 0, 1).onChange((value) => {
			material.metalness = value;
		});
		gui.add(params, "roughness", 0, 1).onChange((value) => {
			material.roughness = value;
		});
		gui.add(params, "ior", 1, 2).onChange((value) => {
			material.ior = value;
		});
		gui.add(params, "transmission", 0, 1).onChange((value) => {
			material.transmission = value;
		});
		gui.add(params, "thickness", 0, 5).onChange((value) => {
			material.thickness = value;
		});

		return () => {
			gui.destroy();
		};
	}, [material]);

	return <primitive object={gltf.scene} />;
}

export default Statue;
