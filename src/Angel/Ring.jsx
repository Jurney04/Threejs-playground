import * as THREE from "three";
import React, { useMemo, useRef, useLayoutEffect } from "react";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const Ring = React.memo(function Ring({ innerRef, innerScale, groupPosition, groupRotation, groupScale }) {
	const [basecolor, ambientOcclusion, metallic, normal, roughness] = useTexture([
		"/scene8/gold_texture/Poliigon_MetalGoldPaint_7253_BaseColor.jpg",
		"/scene8/gold_texture/Poliigon_MetalGoldPaint_7253_AmbientOcclusion.jpg",
		"/scene8/gold_texture/Poliigon_MetalGoldPaint_7253_Metallic.jpg",
		"/scene8/gold_texture/Poliigon_MetalGoldPaint_7253_Normal.png",
		"/scene8/gold_texture/Poliigon_MetalGoldPaint_7253_Roughness.jpg",
	]);

	const materialProps = {
		map: basecolor,
		aoMap: ambientOcclusion,
		metalness: 1.5,
		roughness: 0,
		normalMap: normal,
		roughnessMap: roughness,
	};

	const geometry = useMemo(() => {
		const ringShape = new THREE.Shape();

		// Outer circle path
		ringShape.absarc(0, 0, 2, 0, Math.PI * 2, false);

		// Inner circular hole
		const holePath = new THREE.Path();
		holePath.absarc(0, 0, innerScale, 0, Math.PI * 2, true);
		ringShape.holes.push(holePath);

		const extrudeSettings = {
			steps: 100,
			depth: 0.5,
			bevelEnabled: false,
			bevelThickness: 0.1,
			bevelSize: 0.15,
			bevelOffset: 0,
			bevelSegments: 2,
		};

		return new THREE.ExtrudeGeometry(ringShape, extrudeSettings);
	}, [innerScale]);

	const { paths: paths_eye } = useLoader(SVGLoader, "/scene8/eye.svg");
	const shapes_eye = paths_eye.flatMap((path) => path.toShapes(true));

	const eyeExtrudeSettings = {
		steps: 2,
		depth: 10,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 1,
		bevelOffset: 0,
		bevelSegments: 1,
	};

	const [basecolorEye, ambientOcclusionEye, metallicEye, normalEye, roughnessEye] = useTexture([
		"/scene8/gold_texture/Poliigon_MetalGoldPaint_7253_BaseColor.jpg",
		"/scene8/gold_texture/Poliigon_MetalGoldPaint_7253_AmbientOcclusion.jpg",
		"/scene8/gold_texture/Poliigon_MetalGoldPaint_7253_Metallic.jpg",
		"/scene8/gold_texture/Poliigon_MetalGoldPaint_7253_Normal.png",
		"/scene8/gold_texture/Poliigon_MetalGoldPaint_7253_Roughness.jpg",
	]);

	const eyeMaterialProps = {
		map: basecolorEye,
		aoMap: ambientOcclusionEye,
		metalness: 1,
		roughness: 0.5,
		normalMap: normalEye,
		roughnessMap: roughnessEye,
	};

	const instancedEyeRef = useRef();
	const dummy = new THREE.Object3D();

	const eyeInstances = useMemo(
		() => [
			{ position: [-0.3, -1.5, 0.1], rotation: [Math.PI * -0.5, 0, 0], scale: 0.8 },
			{ position: [0.35, -1.45, 0.1], rotation: [Math.PI * -0.5, Math.PI * -0.125, 0], scale: 0.8 },
			{ position: [1.275, -0.8, -0.225], rotation: [Math.PI * 0.5, Math.PI * -0.725, 0], scale: 0.8 },
			{ position: [1.475, -0.2, -0.225], rotation: [Math.PI * 0.5, Math.PI * -0.6, 0], scale: 0.8 },
			{ position: [1.425, 0.4, -0.225], rotation: [Math.PI * 0.5, Math.PI * -0.475, 0], scale: 0.8 },
			{ position: [1.125, 1, -0.225], rotation: [Math.PI * 0.5, Math.PI * -0.35, 0], scale: 0.8 },
			{ position: [0.65, 1.35, -0.225], rotation: [Math.PI * 0.5, Math.PI * -0.2, 0], scale: 0.8 },
			{ position: [-0, 1.5, -0.225], rotation: [Math.PI * 0.5, Math.PI * -0.06, 0], scale: 0.8 },
			{ position: [-0.6, 1.375, -0.225], rotation: [Math.PI * 0.5, Math.PI * 0.06, 0], scale: 0.8 },
			{ position: [-1.05, 1.05, -0.225], rotation: [Math.PI * 0.5, Math.PI * 0.2, 0], scale: 0.8 },
			{ position: [-1.4, 0.5, -0.225], rotation: [Math.PI * 0.5, Math.PI * 0.3, 0], scale: 0.8 },
			{ position: [-1.5, -0.1, -0.225], rotation: [Math.PI * 0.5, Math.PI * 0.45, 0], scale: 0.8 },
			{ position: [-1.35, -0.7, -0.225], rotation: [Math.PI * 0.5, Math.PI * 0.575, 0], scale: 0.8 },
			{ position: [-0.95, -1.15, -0.225], rotation: [Math.PI * 0.5, Math.PI * 0.725, 0], scale: 0.8 },
			{ position: [-0.4, -1.475, -0.225], rotation: [Math.PI * 0.5, Math.PI * 0.85, 0], scale: 0.8 },
		],
		[]
	);

	useLayoutEffect(() => {
		if (instancedEyeRef.current) {
			eyeInstances.forEach((instance, i) => {
				dummy.position.set(...instance.position);
				dummy.rotation.set(...instance.rotation);
				dummy.scale.set(instance.scale, instance.scale, instance.scale);
				dummy.updateMatrix();
				instancedEyeRef.current.setMatrixAt(i, dummy.matrix);
			});
			instancedEyeRef.current.instanceMatrix.needsUpdate = true;
		}
	}, [eyeInstances]);

	const eyeGeometry = useMemo(() => {
		if (shapes_eye.length === 0) return null;
		const geometry = new THREE.ExtrudeGeometry(shapes_eye[0], eyeExtrudeSettings);
		return geometry;
	}, [shapes_eye, eyeExtrudeSettings]);

	return (
		<group ref={innerRef} position={groupPosition} rotation={groupRotation} scale={groupScale}>
			<mesh geometry={geometry} position={[0, 0, -0.25]} scale={[0.75, 0.75, 0.75]}>
				<meshStandardMaterial {...materialProps} />
			</mesh>
			{eyeGeometry && <instancedMesh ref={instancedEyeRef} args={[eyeGeometry, eyeMaterialProps, eyeInstances.length]} />}
		</group>
	);
});
export default Ring;
