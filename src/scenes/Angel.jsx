import React, { useRef, useState } from "react";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Center, useTexture, Sky, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";
import { Perf } from "r3f-perf";
import { AmbientLight } from "three";

const Wing = React.memo(function Wing({ position, rotation, scale, innerRef, pivot = [0, 0, 0], version = "default" }) {
	let svg_bottom, svg_middle, svg_top;
	let textureRepeat = [0.01, 0.01];

	if (version === "default") {
		svg_bottom = "/angel/wing_bottom.svg";
		svg_middle = "/angel/wing_middle.svg";
		svg_top = "/angel/wing_top.svg";
	} else if (version === "v2") {
		svg_bottom = "/angel/wing_top_bottom.svg";
		svg_middle = "/angel/wing_top_middle.svg";
		svg_top = "/angel/wing_top_top.svg";
		textureRepeat = [2.5, 2.5];
	} else if (version === "v3") {
		svg_bottom = "/angel/wing_bottom_bottom.svg";
		svg_middle = "/angel/wing_bottom_middle.svg";
		svg_top = "/angel/wing_bottom_top.svg";
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
		"/angel/feathers/Stylized_Feathers_002_ambientOcclusion.png",
		"/angel/feathers/Stylized_Feathers_002_ambientOcclusion.png",
		"/angel/feathers/Stylized_Feathers_002_height.png",
		"/angel/feathers/Stylized_Feathers_002_normal.png",
		"/angel/feathers/Stylized_Feathers_002_roughness.png",
	]);

	const memoizedMaterialProps = useMemo(() => {
		[basecolor, ambientOcclusion, metallic, normal, roughness].forEach((texture) => {
			if (texture) {
				texture.repeat.set(textureRepeat[0], textureRepeat[1]);
				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			}
		});

		return {
			map: basecolor,
			aoMap: ambientOcclusion,
			metalness: 1,
			roughness: 0.5,
			normalMap: normal,
			roughnessMap: roughness,
		};
	}, [basecolor, ambientOcclusion, metallic, normal, roughness, textureRepeat]);
	const materialProps = {
		map: basecolor,
		aoMap: ambientOcclusion,
		metalness: 1,
		roughness: 0.5,
		normalMap: normal,
		roughnessMap: roughness,
	};
	if (version === "default") {
		return (
			<group position={pivot} ref={innerRef}>
				<group position={position} rotation={rotation} scale={scale}>
					<mesh scale={0.01} position={[0, 0, -0.05]} rotation={[0, 0, 0]}>
						<extrudeGeometry args={[shapes_top, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
					<mesh scale={0.01} position={[-0.2, 0.7, 0]} rotation={[0, 0, 0]}>
						<extrudeGeometry args={[shapes_middle, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
					<mesh scale={0.01} position={[-0.35, 1, 0.05]} rotation={[0, 0, 0]}>
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
					<mesh scale={0.025} position={[0, 0, -0.05]} rotation={[0, 0, 0.7]}>
						<extrudeGeometry args={[shapes_top, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
					<mesh scale={0.025} position={[-0.25, 0.125, 0]} rotation={[0, 0, 0.7]}>
						<extrudeGeometry args={[shapes_middle, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
					<mesh scale={0.025} position={[-2.1, 0.2, 0.05]} rotation={[0, 0, 0.4]}>
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
					<mesh scale={0.01} position={[0, 0, -0.05]} rotation={[0, 0, 0.8]}>
						<extrudeGeometry args={[shapes_top, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
					<mesh scale={0.01} position={[-0.22, 0.15, 0]} rotation={[0, 0, 0.8]}>
						<extrudeGeometry args={[shapes_middle, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
					<mesh scale={0.01} position={[-0.45, 0.2, 0.05]} rotation={[0, 0, 0.6]}>
						<extrudeGeometry args={[shapes_bottom, extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
				</group>
			</group>
		);
	}
});

const Wing2 = React.memo(function Wing2({ position, rotation, scale, innerRef, pivot = [0, 0, 0], version = "default" }) {
	let svg_bottom, svg_middle, svg_top;

	if (version === "default") {
		svg_bottom = "/angel/wing_bottom.svg";
		svg_middle = "/angel/wing_middle.svg";
		svg_top = "/angel/wing_top.svg";
	} else if (version === "v2") {
		svg_bottom = "/angel/wing_top_bottom.svg";
		svg_middle = "/angel/wing_top_middle.svg";
		svg_top = "/angel/wing_top_top.svg";
	} else if (version === "v3") {
		svg_bottom = "/angel/wing_bottom_bottom.svg";
		svg_middle = "/angel/wing_bottom_middle.svg";
		svg_top = "/angel/wing_bottom_top.svg";
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
		"/angel/feathers/Stylized_Feathers_002_ambientOcclusion.png",
		"/angel/feathers/Stylized_Feathers_002_ambientOcclusion.png",
		"/angel/feathers/Stylized_Feathers_002_height.png",
		"/angel/feathers/Stylized_Feathers_002_normal.png",
		"/angel/feathers/Stylized_Feathers_002_roughness.png",
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

const Eye = React.memo(function Eye({ position, rotation, scale, innerRef, pivot = [0, 0, 0], irisRef }) {
	const { paths: paths_eye } = useLoader(SVGLoader, "/angel/eye.svg");
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
		"/angel/gold_texture/Poliigon_MetalGoldPaint_7253_BaseColor.jpg",
		"/angel/gold_texture/Poliigon_MetalGoldPaint_7253_AmbientOcclusion.jpg",
		"/angel/gold_texture/Poliigon_MetalGoldPaint_7253_Metallic.jpg",
		"/angel/gold_texture/Poliigon_MetalGoldPaint_7253_Normal.png",
		"/angel/gold_texture/Poliigon_MetalGoldPaint_7253_Roughness.jpg",
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
		"/angel/marble/Marble_White_007_basecolor.jpg",
		"/angel/marble/Marble_White_007_ambientOcclusion.jpg",
		"/angel/marble/Marble_White_007_height.png",
		"/angel/marble/Marble_White_007_normal.jpg",
		"/angel/marble/Marble_White_007_roughness.jpg",
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
		"/angel/gem/Sapphire_001_COLOR.jpg",
		"/angel/gem/Sapphire_001_OCC.jpg",
		"/angel/gem/Sapphire_001_DISP.png",
		"/angel/gem/Sapphire_001_NORM.jpg",
		"/angel/gem/Sapphire_001_ROUGH.jpg",
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
const Ring = React.memo(function Ring({ innerRef, innerScale, groupPosition, groupRotation, groupScale }) {
	const [basecolor, ambientOcclusion, metallic, normal, roughness] = useTexture([
		"/angel/gold_texture/Poliigon_MetalGoldPaint_7253_BaseColor.jpg",
		"/angel/gold_texture/Poliigon_MetalGoldPaint_7253_AmbientOcclusion.jpg",
		"/angel/gold_texture/Poliigon_MetalGoldPaint_7253_Metallic.jpg",
		"/angel/gold_texture/Poliigon_MetalGoldPaint_7253_Normal.png",
		"/angel/gold_texture/Poliigon_MetalGoldPaint_7253_Roughness.jpg",
	]);

	const materialProps = {
		map: basecolor,
		aoMap: ambientOcclusion,
		metalness: 1,
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

	return (
		<group ref={innerRef} position={groupPosition} rotation={groupRotation} scale={groupScale}>
			<mesh geometry={geometry} position={[0, 0, -0.25]} scale={[0.75, 0.75, 0.75]}>
				<meshStandardMaterial {...materialProps} />
			</mesh>
			<Eye position={[-0.3, -1.5, 0.1]} rotation={[Math.PI * -0.5, 0, 0]} scale={0.8} />
			<Eye position={[0.35, -1.45, 0.1]} rotation={[Math.PI * -0.5, Math.PI * -0.125, 0]} scale={0.8} />
			<Eye position={[1.275, -0.8, -0.225]} rotation={[Math.PI * 0.5, Math.PI * -0.725, 0]} scale={0.8} />
			<Eye position={[1.475, -0.2, -0.225]} rotation={[Math.PI * 0.5, Math.PI * -0.6, 0]} scale={0.8} />
			<Eye position={[1.425, 0.4, -0.225]} rotation={[Math.PI * 0.5, Math.PI * -0.475, 0]} scale={0.8} />
			<Eye position={[1.125, 1, -0.225]} rotation={[Math.PI * 0.5, Math.PI * -0.35, 0]} scale={0.8} />
			<Eye position={[0.65, 1.35, -0.225]} rotation={[Math.PI * 0.5, Math.PI * -0.2, 0]} scale={0.8} />
			<Eye position={[-0, 1.5, -0.225]} rotation={[Math.PI * 0.5, Math.PI * -0.06, 0]} scale={0.8} />
			<Eye position={[-0.6, 1.375, -0.225]} rotation={[Math.PI * 0.5, Math.PI * 0.06, 0]} scale={0.8} />
			<Eye position={[-1.05, 1.05, -0.225]} rotation={[Math.PI * 0.5, Math.PI * 0.2, 0]} scale={0.8} />
			<Eye position={[-1.4, 0.5, -0.225]} rotation={[Math.PI * 0.5, Math.PI * 0.3, 0]} scale={0.8} />
			<Eye position={[-1.5, -0.1, -0.225]} rotation={[Math.PI * 0.5, Math.PI * 0.45, 0]} scale={0.8} />
			<Eye position={[-1.35, -0.7, -0.225]} rotation={[Math.PI * 0.5, Math.PI * 0.575, 0]} scale={0.8} />
			<Eye position={[-0.95, -1.15, -0.225]} rotation={[Math.PI * 0.5, Math.PI * 0.725, 0]} scale={0.8} />
			<Eye position={[-0.4, -1.475, -0.225]} rotation={[Math.PI * 0.5, Math.PI * 0.85, 0]} scale={0.8} />
		</group>
	);
});

function Angel({ position = [0, 0, 0] }) {
	const outer_circle = useRef();
	const middle_circle = useRef();
	const inner_circle = useRef();
	const second_circle = useRef();
	const third_circle = useRef();

	const leftWing1Ref = useRef();
	const leftWing2Ref = useRef();
	const leftWing3Ref = useRef();
	const leftWing4Ref = useRef();
	const leftWing5Ref = useRef();
	const leftWing6Ref = useRef();
	const leftWing7Ref = useRef();
	const leftWing8Ref = useRef();
	const leftWing9Ref = useRef();

	const rightWing1Ref = useRef();
	const rightWing2Ref = useRef();
	const rightWing3Ref = useRef();
	const rightWing4Ref = useRef();
	const rightWing5Ref = useRef();
	const rightWing6Ref = useRef();
	const rightWing7Ref = useRef();
	const rightWing8Ref = useRef();
	const rightWing9Ref = useRef();

	const eye = useRef();
	const iris = useRef();

	const [leftWing1Direction, setLeftWing1Direction] = useState(1);
	const [leftWing2Direction, setLeftWing2Direction] = useState(1);
	const [leftWing3Direction, setLeftWing3Direction] = useState(1);
	const [leftWing4Direction, setLeftWing4Direction] = useState(1);
	const [leftWing5Direction, setLeftWing5Direction] = useState(1);
	const [leftWing6Direction, setLeftWing6Direction] = useState(1);
	const [leftWing7Direction, setLeftWing7Direction] = useState(1);
	const [leftWing8Direction, setLeftWing8Direction] = useState(1);
	const [leftWing9Direction, setLeftWing9Direction] = useState(1);

	const [rightWing1Direction, setRightWing1Direction] = useState(1);
	const [rightWing2Direction, setRightWing2Direction] = useState(1);
	const [rightWing3Direction, setRightWing3Direction] = useState(1);
	const [rightWing4Direction, setRightWing4Direction] = useState(1);
	const [rightWing5Direction, setRightWing5Direction] = useState(1);
	const [rightWing6Direction, setRightWing6Direction] = useState(1);
	const [rightWing7Direction, setRightWing7Direction] = useState(1);
	const [rightWing8Direction, setRightWing8Direction] = useState(1);
	const [rightWing9Direction, setRightWing9Direction] = useState(1);

	const [eyeDirection, setEyeDirection] = useState(1);
	const [irisDirection, setIrisDirection] = useState(1);

	useFrame((state, delta) => {
		if (outer_circle.current) {
			outer_circle.current.rotation.x += delta * 0.75;
			outer_circle.current.rotation.y += delta * 0.75;
			outer_circle.current.rotation.z -= delta * 0.75;
		}
		if (third_circle.current) {
			third_circle.current.rotation.x += delta * 1;
			third_circle.current.rotation.y -= delta * 1;
			third_circle.current.rotation.z -= delta * 1;
		}
		if (middle_circle.current) {
			middle_circle.current.rotation.x += delta * 1;
			middle_circle.current.rotation.y -= delta * 0.75;
			middle_circle.current.rotation.z += delta * 0.5;
		}
		if (second_circle.current) {
			second_circle.current.rotation.x -= delta * 0.5;
			second_circle.current.rotation.y += delta * 0.75;
			second_circle.current.rotation.z += delta * 0.5;
		}
		if (inner_circle.current) {
			inner_circle.current.rotation.x -= delta * 1;
			inner_circle.current.rotation.y += delta * 1.25;
			inner_circle.current.rotation.z -= delta * 0.75;
		}

		if (iris.current) {
			iris.current.position.x += delta * 0.05 * irisDirection;
			if (iris.current.position.x > 0.45 || iris.current.position.x < 0.25) {
				setIrisDirection((prev) => -prev);
			}
		}

		// Left Wing Group 1
		if (leftWing1Ref.current) {
			leftWing1Ref.current.rotation.y += delta * 0.08 * leftWing1Direction;
			if (leftWing1Ref.current.rotation.y > 0.3 || leftWing1Ref.current.rotation.y < -0.3) {
				setLeftWing1Direction((prev) => -prev);
			}
		}
		if (leftWing2Ref.current) {
			leftWing2Ref.current.rotation.y -= delta * 0.06 * leftWing2Direction;
			if (leftWing2Ref.current.rotation.y > 0.25 || leftWing2Ref.current.rotation.y < -0.25) {
				setLeftWing2Direction((prev) => -prev);
			}
		}
		if (leftWing3Ref.current) {
			leftWing3Ref.current.rotation.y += delta * 0.09 * leftWing3Direction;
			if (leftWing3Ref.current.rotation.y > 0.35 || leftWing3Ref.current.rotation.y < -0.35) {
				setLeftWing3Direction((prev) => -prev);
			}
		}

		// Left Wing Group 2
		if (leftWing4Ref.current) {
			leftWing4Ref.current.rotation.y -= delta * 0.07 * leftWing4Direction;
			if (leftWing4Ref.current.rotation.y > 0.28 || leftWing4Ref.current.rotation.y < -0.28) {
				setLeftWing4Direction((prev) => -prev);
			}
		}
		if (leftWing5Ref.current) {
			leftWing5Ref.current.rotation.y += delta * 0.05 * leftWing5Direction;
			if (leftWing5Ref.current.rotation.y > 0.2 || leftWing5Ref.current.rotation.y < -0.2) {
				setLeftWing5Direction((prev) => -prev);
			}
		}
		if (leftWing6Ref.current) {
			leftWing6Ref.current.rotation.y -= delta * 0.1 * leftWing6Direction;
			if (leftWing6Ref.current.rotation.y > 0.32 || leftWing6Ref.current.rotation.y < -0.32) {
				setLeftWing6Direction((prev) => -prev);
			}
		}

		// Left Wing Group 3
		if (leftWing7Ref.current) {
			leftWing7Ref.current.rotation.y += delta * 0.06 * leftWing7Direction;
			if (leftWing7Ref.current.rotation.y > 0.27 || leftWing7Ref.current.rotation.y < -0.27) {
				setLeftWing7Direction((prev) => -prev);
			}
		}
		if (leftWing8Ref.current) {
			leftWing8Ref.current.rotation.y -= delta * 0.09 * leftWing8Direction;
			if (leftWing8Ref.current.rotation.y > 0.33 || leftWing8Ref.current.rotation.y < -0.33) {
				setLeftWing8Direction((prev) => -prev);
			}
		}
		if (leftWing9Ref.current) {
			leftWing9Ref.current.rotation.y += delta * 0.07 * leftWing9Direction;
			if (leftWing9Ref.current.rotation.y > 0.29 || leftWing9Ref.current.rotation.y < -0.29) {
				setLeftWing9Direction((prev) => -prev);
			}
		}

		// Right Wing Group 1
		if (rightWing1Ref.current) {
			rightWing1Ref.current.rotation.y -= delta * 0.08 * rightWing1Direction;
			if (rightWing1Ref.current.rotation.y > 0.3 || rightWing1Ref.current.rotation.y < -0.3) {
				setRightWing1Direction((prev) => -prev);
			}
		}
		if (rightWing2Ref.current) {
			rightWing2Ref.current.rotation.y += delta * 0.06 * rightWing2Direction;
			if (rightWing2Ref.current.rotation.y > 0.25 || rightWing2Ref.current.rotation.y < -0.25) {
				setRightWing2Direction((prev) => -prev);
			}
		}
		if (rightWing3Ref.current) {
			rightWing3Ref.current.rotation.y -= delta * 0.09 * rightWing3Direction;
			if (rightWing3Ref.current.rotation.y > 0.35 || rightWing3Ref.current.rotation.y < -0.35) {
				setRightWing3Direction((prev) => -prev);
			}
		}

		// Right Wing Group 2
		if (rightWing4Ref.current) {
			rightWing4Ref.current.rotation.y += delta * 0.07 * rightWing4Direction;
			if (rightWing4Ref.current.rotation.y > 0.28 || rightWing4Ref.current.rotation.y < -0.28) {
				setRightWing4Direction((prev) => -prev);
			}
		}
		if (rightWing5Ref.current) {
			rightWing5Ref.current.rotation.y -= delta * 0.05 * rightWing5Direction;
			if (rightWing5Ref.current.rotation.y > 0.2 || rightWing5Ref.current.rotation.y < -0.2) {
				setRightWing5Direction((prev) => -prev);
			}
		}
		if (rightWing6Ref.current) {
			rightWing6Ref.current.rotation.y += delta * 0.1 * rightWing6Direction;
			if (rightWing6Ref.current.rotation.y > 0.32 || rightWing6Ref.current.rotation.y < -0.32) {
				setRightWing6Direction((prev) => -prev);
			}
		}

		// Right Wing Group 3
		if (rightWing7Ref.current) {
			rightWing7Ref.current.rotation.y -= delta * 0.06 * rightWing7Direction;
			if (rightWing7Ref.current.rotation.y > 0.27 || rightWing7Ref.current.rotation.y < -0.27) {
				setRightWing7Direction((prev) => -prev);
			}
		}
		if (rightWing8Ref.current) {
			rightWing8Ref.current.rotation.y += delta * 0.09 * rightWing8Direction;
			if (rightWing8Ref.current.rotation.y > 0.33 || rightWing8Ref.current.rotation.y < -0.33) {
				setRightWing8Direction((prev) => -prev);
			}
		}
		if (rightWing9Ref.current) {
			rightWing9Ref.current.rotation.y -= delta * 0.07 * rightWing9Direction;
			if (rightWing9Ref.current.rotation.y > 0.29 || rightWing9Ref.current.rotation.y < -0.29) {
				setRightWing9Direction((prev) => -prev);
			}
		}
	});

	return (
		<>
			<Perf position="top-left" />
			<OrbitControls />
			<Environment files="/angel/HDR.hdr" background />
			{/* <Environment files="/angel/HDR.hdr" background /> */}
			{/* <Sky distance={100} up={0} /> */}
			{/* <ambientLight intensity={1} /> */}
			{/* <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={10} /> */}
			{/* <Environment preset="sunset" background /> */}
			<Center position={position} rotation={[Math.PI, 0, 0]}>
				<group position={[0, 0, 0]} rotation={[0, 0, 0]}>
					<Wing innerRef={leftWing1Ref} position={[-4, 0, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing innerRef={leftWing2Ref} position={[-1.5, 2.25, 0.06]} scale={2} rotation={[0, 0, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing innerRef={leftWing3Ref} position={[-1.25, -2.5, 0.3]} scale={0.9} rotation={[0, 0, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group>
				<group position={[0, 0, 0]} rotation={[0, 0.85, 0]}>
					<Wing innerRef={leftWing4Ref} position={[-4, 0, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing innerRef={leftWing5Ref} position={[-1.5, 2.25, 0.06]} scale={2} rotation={[0, 0, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing innerRef={leftWing6Ref} position={[-1.25, -2.5, 0.3]} scale={0.9} rotation={[0, 0, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group>
				<group position={[0, 0, 0]} rotation={[0, -0.85, 0]}>
					<Wing innerRef={leftWing7Ref} position={[-4, 0, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing innerRef={leftWing8Ref} position={[-1.5, 2.25, 0.06]} scale={2} rotation={[0, 0, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing innerRef={leftWing9Ref} position={[-1.25, -2.5, 0.3]} scale={0.9} rotation={[0, 0, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group>
				<group position={[0, 0, 0]} rotation={[0, 0, 0]}>
					<Wing2 innerRef={rightWing1Ref} position={[4, 0, 0.16]} scale={1} rotation={[0, Math.PI, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing2 innerRef={rightWing2Ref} position={[1.5, 2.25, 0.36]} scale={2} rotation={[0, Math.PI, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing2 innerRef={rightWing3Ref} position={[1.25, -2.5, 0.36]} scale={0.9} rotation={[0, Math.PI, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group>
				<group position={[0, 0, 0]} rotation={[0, 0.85, 0]}>
					<Wing2 innerRef={rightWing4Ref} position={[4, 0, 0.16]} scale={1} rotation={[0, Math.PI, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing2 innerRef={rightWing5Ref} position={[1.5, 2.25, 0.36]} scale={2} rotation={[0, Math.PI, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing2 innerRef={rightWing6Ref} position={[1.25, -2.5, 0.36]} scale={0.9} rotation={[0, Math.PI, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group>
				<group position={[0, 0, 0]} rotation={[0, -0.85, 0]}>
					<Wing2 innerRef={rightWing7Ref} position={[4, 0, 0.16]} scale={1} rotation={[0, Math.PI, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing2 innerRef={rightWing8Ref} position={[1.5, 2.25, 0.36]} scale={2} rotation={[0, Math.PI, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing2 innerRef={rightWing9Ref} position={[1.25, -2.5, 0.36]} scale={0.9} rotation={[0, Math.PI, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group>
				<Ring innerRef={inner_circle} innerScale={[1.9]} groupPosition={[0, 1.25, -0.05]} groupRotation={[0, 0, -1.5]} groupScale={0.8} />
				<Ring innerRef={second_circle} innerScale={[1.9]} groupPosition={[0, 1.25, -0.05]} groupRotation={[0, 0, -1.5]} groupScale={0.6} />
				<Ring innerRef={third_circle} innerScale={[1.9]} groupPosition={[0, 1.25, -0.05]} groupRotation={[0, 0, -1.5]} groupScale={0.7} />
				<Ring innerRef={middle_circle} innerScale={[1.9]} groupPosition={[0, 1.25, -0.05]} groupRotation={[0, 0, -1]} groupScale={1} />
				<Ring innerRef={outer_circle} innerScale={[1.9]} groupPosition={[0, 1.25, -0.05]} groupRotation={[0, 0, 0.25]} groupScale={0.9} />
				<Eye innerRef={eye} pivot={[-0.65, 0.85, 0]} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={2} irisRef={iris} />
			</Center>
		</>
	);
}

export default Angel;
