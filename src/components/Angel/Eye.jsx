import * as THREE from "three";
import React, { useMemo } from "react";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const Eye = React.memo(function Eye({ position, rotation, scale, innerRef, pivot = [0, 0, 0], irisRef }) {
	const { paths: paths_eye } = useLoader(SVGLoader, "/Threejs-playground/angel/eye.svg");
	const shapes_eye = paths_eye.flatMap((path) => path.toShapes(true));

	const extrudeSettings = {
		steps: 2,
		depth: 10,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 1,
		bevelOffset: 0,
		bevelSegments: 1,
	};
	const [basecolor, ambientOcclusion, metallic, normal, roughness] = useTexture([
		"/Threejs-playground/angel/gold_texture/Poliigon_MetalGoldPaint_7253_BaseColor.jpg",
		"/Threejs-playground/angel/gold_texture/Poliigon_MetalGoldPaint_7253_AmbientOcclusion.jpg",
		"/Threejs-playground/angel/gold_texture/Poliigon_MetalGoldPaint_7253_Metallic.jpg",
		"/Threejs-playground/angel/gold_texture/Poliigon_MetalGoldPaint_7253_Normal.png",
		"/Threejs-playground/angel/gold_texture/Poliigon_MetalGoldPaint_7253_Roughness.jpg",
	]);

	const materialProps = {
		map: basecolor,
		aoMap: ambientOcclusion,
		metalness: 1,
		roughness: 0.5,
		normalMap: normal,
		roughnessMap: roughness,
	};
	const [basecolorM, ambientOcclusionM, metallicM, normalM, roughnessM] = useTexture([
		"/Threejs-playground/angel/marble/Marble_White_007_basecolor.jpg",
		"/Threejs-playground/angel/marble/Marble_White_007_ambientOcclusion.jpg",
		"/Threejs-playground/angel/marble/Marble_White_007_height.png",
		"/Threejs-playground/angel/marble/Marble_White_007_normal.jpg",
		"/Threejs-playground/angel/marble/Marble_White_007_roughness.jpg",
	]);

	const materialPropsMarble = {
		map: basecolorM,
		aoMap: ambientOcclusionM,
		metalness: 1,
		roughness: 2,
		normalMap: normalM,
		roughnessMap: roughnessM,
	};
	const [basecolorB, ambientOcclusionB, metallicB, normalB, roughnessB] = useTexture([
		"/Threejs-playground/angel/gem/Sapphire_001_COLOR.jpg",
		"/Threejs-playground/angel/gem/Sapphire_001_OCC.jpg",
		"/Threejs-playground/angel/gem/Sapphire_001_DISP.png",
		"/Threejs-playground/angel/gem/Sapphire_001_NORM.jpg",
		"/Threejs-playground/angel/gem/Sapphire_001_ROUGH.jpg",
	]);

	const materialPropsBlue = {
		map: basecolorB,
		aoMap: ambientOcclusionB,
		metalness: 1,
		roughness: 0.5,
		normalMap: normalB,
		roughnessMap: roughnessB,
	};

	return (
		<group position={pivot} ref={innerRef}>
			<group position={position} rotation={rotation} scale={scale}>
				<mesh scale={0.01} position={[0, 0, -0.075]}>
					<extrudeGeometry args={[shapes_eye, extrudeSettings]} />
					<meshStandardMaterial {...materialProps} />
				</mesh>
				<mesh scale={0.009} position={[0.04, 0.02, -0.085]}>
					<extrudeGeometry args={[shapes_eye, extrudeSettings]} />
					<meshStandardMaterial {...materialPropsMarble} />
				</mesh>
				<mesh scale={0.01} position={[0.35, 0.18, -0.075]} ref={irisRef}>
					<sphereGeometry args={[10, 32, 32]} />
					<meshStandardMaterial {...materialPropsBlue} />
				</mesh>
			</group>
		</group>
	);
});
export default Eye;
