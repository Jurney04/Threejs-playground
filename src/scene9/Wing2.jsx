import * as THREE from "three";
import React, { useMemo } from "react";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { useLoader } from "@react-three/fiber";
import {  useTexture } from "@react-three/drei";

const Wing2 = React.memo(function Wing2({ position, rotation, scale, innerRef, pivot = [0, 0, 0], version = "default" }) {
	let svg_bottom, svg_middle, svg_top;

	if (version === "default") {
		svg_bottom = "/scene8/wing_bottom.svg";
		svg_middle = "/scene8/wing_middle.svg";
		svg_top = "/scene8/wing_top.svg";
	} else if (version === "v2") {
		svg_bottom = "/scene8/wing_top_bottom.svg";
		svg_middle = "/scene8/wing_top_middle.svg";
		svg_top = "/scene8/wing_top_top.svg";
	} else if (version === "v3") {
		svg_bottom = "/scene8/wing_bottom_bottom.svg";
		svg_middle = "/scene8/wing_bottom_middle.svg";
		svg_top = "/scene8/wing_bottom_top.svg";
	}

	const { paths: paths_bottom } = useLoader(SVGLoader, svg_bottom) || {};
	const { paths: paths_middle } = useLoader(SVGLoader, svg_middle) || {};
	const { paths: paths_top } = useLoader(SVGLoader, svg_top) || {};

	if (!paths_bottom || !paths_middle || !paths_top) {
		return null;
	}

	const shapes_bottom = paths_bottom.flatMap((path) => path.toShapes(true));
	const shapes_middle = paths_middle.flatMap((path) => path.toShapes(true));
	const shapes_top = paths_top.flatMap((path) => path.toShapes(true));

	const extrudeSettings = {
		steps: 2,
		depth: 16,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 1,
		bevelOffset: 0,
		bevelSegments: 1,
	};

	const [basecolor, ambientOcclusion, metallic, normal, roughness] = useTexture([
		"/scene8/feathers/Stylized_Feathers_002_ambientOcclusion.png",
		"/scene8/feathers/Stylized_Feathers_002_ambientOcclusion.png",
		"/scene8/feathers/Stylized_Feathers_002_height.png",
		"/scene8/feathers/Stylized_Feathers_002_normal.png",
		"/scene8/feathers/Stylized_Feathers_002_roughness.png",
	]);
	[basecolor, ambientOcclusion, metallic, normal, roughness].forEach((texture) => {
		texture.repeat.set(0.01, 0.01);
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	});
	const materialProps = {
		map: basecolor,
		aoMap: ambientOcclusion,
		metalness: 1,
		roughness: 20,
		normalMap: normal,
		roughnessMap: roughness,
		normalScale: [2, 2],
	};
	if (version === "default") {
		return (
			<group position={pivot} ref={innerRef}>
				<group position={position} rotation={rotation} scale={scale}>
					<mesh scale={0.01} position={[0, 0, 0.05]} rotation={[0, 0, 0]}>
						<extrudeGeometry args={[shapes_top, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
					<mesh scale={0.01} position={[-0.2, 0.7, 0]} rotation={[0, 0, 0]}>
						<extrudeGeometry args={[shapes_middle, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
					<mesh scale={0.01} position={[-0.35, 1, -0.05]} rotation={[0, 0, 0]}>
						<extrudeGeometry args={[shapes_bottom, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
				</group>
			</group>
		);
	} else if (version === "v2") {
		return (
			<group position={pivot} ref={innerRef}>
				<group position={position} rotation={rotation} scale={scale}>
					<mesh scale={0.025} position={[0, 0, 0.05]} rotation={[0, 0, 0.7]}>
						<extrudeGeometry args={[shapes_top, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
					<mesh scale={0.025} position={[-0.25, 0.125, 0]} rotation={[0, 0, 0.7]}>
						<extrudeGeometry args={[shapes_middle, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
					<mesh scale={0.025} position={[-2.1, 0.2, -0.05]} rotation={[0, 0, 0.4]}>
						<extrudeGeometry args={[shapes_bottom, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
				</group>
			</group>
		);
	} else if (version === "v3") {
		return (
			<group position={pivot} ref={innerRef}>
				<group position={position} rotation={rotation} scale={scale}>
					<mesh scale={0.01} position={[0, 0, 0.05]} rotation={[0, 0, 0.8]}>
						<extrudeGeometry args={[shapes_top, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
					<mesh scale={0.01} position={[-0.22, 0.15, 0]} rotation={[0, 0, 0.8]}>
						<extrudeGeometry args={[shapes_middle, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
					<mesh scale={0.01} position={[-0.45, 0.2, -0.05]} rotation={[0, 0, 0.6]}>
						<extrudeGeometry args={[shapes_bottom, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
				</group>
			</group>
		);
	}
});
export default Wing2;
