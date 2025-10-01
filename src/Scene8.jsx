import React, { useRef, useState } from "react";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Center, useTexture, Sky, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

function Wing({ position, rotation, scale, innerRef, pivot = [0, 0, 0], version = "default" }) {
	let svg_bottom, svg_middle, svg_top;
	let textureRepeat = [0.01, 0.01];

	if (version === "default") {
		svg_bottom = "/wing_bottom.svg";
		svg_middle = "/wing_middle.svg";
		svg_top = "/wing_top.svg";
	} else if (version === "v2") {
		svg_bottom = "/wing_top_bottom.svg";
		svg_middle = "/wing_top_middle.svg";
		svg_top = "/wing_top_top.svg";
		textureRepeat = [2.5, 2.5];
	} else if (version === "v3") {
		svg_bottom = "/wing_bottom_bottom.svg";
		svg_middle = "/wing_bottom_middle.svg";
		svg_top = "/wing_bottom_top.svg";
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
		"/feathers/Stylized_Feathers_002_ambientOcclusion.png",
		"/feathers/Stylized_Feathers_002_ambientOcclusion.png",
		"/feathers/Stylized_Feathers_002_height.png",
		"/feathers/Stylized_Feathers_002_normal.png",
		"/feathers/Stylized_Feathers_002_roughness.png",
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
}

function Wing2({ position, rotation, scale, innerRef, pivot = [0, 0, 0], version = "default" }) {
	let svg_bottom, svg_middle, svg_top;

	if (version === "default") {
		svg_bottom = "/wing_bottom.svg";
		svg_middle = "/wing_middle.svg";
		svg_top = "/wing_top.svg";
	} else if (version === "v2") {
		svg_bottom = "/wing_top_bottom.svg";
		svg_middle = "/wing_top_middle.svg";
		svg_top = "/wing_top_top.svg";
	} else if (version === "v3") {
		svg_bottom = "/wing_bottom_bottom.svg";
		svg_middle = "/wing_bottom_middle.svg";
		svg_top = "/wing_bottom_top.svg";
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
		"/feathers/Stylized_Feathers_002_ambientOcclusion.png",
		"/feathers/Stylized_Feathers_002_ambientOcclusion.png",
		"/feathers/Stylized_Feathers_002_height.png",
		"/feathers/Stylized_Feathers_002_normal.png",
		"/feathers/Stylized_Feathers_002_roughness.png",
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
}
function Eye({ position, rotation, scale, innerRef, pivot = [0, 0, 0], irisRef }) {
	const { paths: paths_eye } = useLoader(SVGLoader, "/eye.svg");
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
		"/gold_texture/Poliigon_MetalGoldPaint_7253_BaseColor.jpg",
		"/gold_texture/Poliigon_MetalGoldPaint_7253_AmbientOcclusion.jpg",
		"/gold_texture/Poliigon_MetalGoldPaint_7253_Metallic.jpg",
		"/gold_texture/Poliigon_MetalGoldPaint_7253_Normal.png",
		"/gold_texture/Poliigon_MetalGoldPaint_7253_Roughness.jpg",
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
		"/marble/Marble_White_007_basecolor.jpg",
		"/marble/Marble_White_007_ambientOcclusion.jpg",
		"marble/Marble_White_007_height.png",
		"/marble/Marble_White_007_normal.jpg",
		"/marble/Marble_White_007_roughness.jpg",
	]);

	const materialPropsMarble = {
		map: basecolorM,
		aoMap: ambientOcclusionM,
		metalness: 1,
		roughness: 2,
		normalMap: normalM,
		roughnessMap: roughnessM,
	};
	const [basecolorB, ambientOcclusionB, metallicB, normalB, roughnessB] = useTexture(["/gem/Sapphire_001_COLOR.jpg", "/gem/Sapphire_001_OCC.jpg", "/gem/Sapphire_001_DISP.png", "/gem/Sapphire_001_NORM.jpg", "/gem/Sapphire_001_ROUGH.jpg"]);

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
}

function Ring({ innerRef, innerScale, groupPosition, groupRotation, groupScale }) {
	const [basecolor, ambientOcclusion, metallic, normal, roughness] = useTexture([
		"/gold_texture/Poliigon_MetalGoldPaint_7253_BaseColor.jpg",
		"/gold_texture/Poliigon_MetalGoldPaint_7253_AmbientOcclusion.jpg",
		"/gold_texture/Poliigon_MetalGoldPaint_7253_Metallic.jpg",
		"/gold_texture/Poliigon_MetalGoldPaint_7253_Normal.png",
		"/gold_texture/Poliigon_MetalGoldPaint_7253_Roughness.jpg",
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
}

function Scene8() {
	const outer_circle = useRef();
	const middle_circle = useRef();
	const inner_circle = useRef();
	const second_circle = useRef();
	const third_circle = useRef();
	const lt_wing = useRef();
	const lm_wing = useRef();
	const lb_wing = useRef();
	const rt_wing = useRef();
	const rm_wing = useRef();
	const rb_wing = useRef();
	const eye = useRef();
	const iris = useRef();

	const [lmWingDirection, setLmWingDirection] = useState(1);
	const [ltWingDirection, setLtWingDirection] = useState(1);
	const [lbWingDirection, setLbWingDirection] = useState(1);
	const [rmWingDirection, setRmWingDirection] = useState(1);
	const [rtWingDirection, setRtWingDirection] = useState(1);
	const [rbWingDirection, setRbWingDirection] = useState(1);
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
		if (lt_wing.current) {
			lt_wing.current.rotation.y -= delta * 0.1 * ltWingDirection;
			if (lt_wing.current.rotation.y > 0.25 || lt_wing.current.rotation.y < -0.25) {
				setLtWingDirection((prev) => -prev);
			}
		}
		//Flapping animation for lm_wing
		if (lm_wing.current) {
			lm_wing.current.rotation.y += delta * 0.05 * lmWingDirection;
			if (lm_wing.current.rotation.y > 0.25 || lm_wing.current.rotation.y < -0.25) {
				setLmWingDirection((prev) => -prev);
			}
		}

		// Flapping animation for lb_wing
		if (lb_wing.current) {
			lb_wing.current.rotation.y -= delta * 0.075 * lbWingDirection;
			if (lb_wing.current.rotation.y > 0.25 || lb_wing.current.rotation.y < -0.25) {
				setLbWingDirection((prev) => -prev);
			}
		}
		// Flapping animation for rt_wing
		if (rt_wing.current) {
			rt_wing.current.rotation.y += delta * 0.05 * rtWingDirection;
			if (rt_wing.current.rotation.y > 0.25 || rt_wing.current.rotation.y < -0.25) {
				setRtWingDirection((prev) => -prev);
			}
		}
		//Flapping animation for rm_wing
		if (rm_wing.current) {
			rm_wing.current.rotation.y -= delta * 0.075 * rmWingDirection;
			if (rm_wing.current.rotation.y > 0.25 || rm_wing.current.rotation.y < -0.25) {
				setRmWingDirection((prev) => -prev);
			}
		}

		// Flapping animation for rb_wing
		if (rb_wing.current) {
			rb_wing.current.rotation.y -= delta * 0.1 * rbWingDirection;
			if (rb_wing.current.rotation.y > 0.25 || rb_wing.current.rotation.y < -0.25) {
				setRbWingDirection((prev) => -prev);
			}
		}
	});

	return (
		<>
			<OrbitControls />
			{/* <Environment files="/HDR_sunset.hdr" background /> */}
			<Environment files="/HDR.hdr" background />
			<Center rotation={[Math.PI, 0, 0]}>
				<group position={[0, 0, 0]} rotation={[0, 0, 0]}>
					<Wing innerRef={lm_wing} position={[-4, 0, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing innerRef={lb_wing} position={[-1.5, 2.25, 0.06]} scale={2} rotation={[0, 0, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing innerRef={lt_wing} position={[-1.25, -2.5, 0.3]} scale={0.9} rotation={[0, 0, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group>
				<group position={[0, 0, 0]} rotation={[0, 0.85, 0]}>
					<Wing innerRef={lm_wing} position={[-4, 0, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing innerRef={lb_wing} position={[-1.5, 2.25, 0.06]} scale={2} rotation={[0, 0, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing innerRef={lt_wing} position={[-1.25, -2.5, 0.3]} scale={0.9} rotation={[0, 0, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group>
				<group position={[0, 0, 0]} rotation={[0, -0.85, 0]}>
					<Wing innerRef={lm_wing} position={[-4, 0, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing innerRef={lb_wing} position={[-1.5, 2.25, 0.06]} scale={2} rotation={[0, 0, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing innerRef={lt_wing} position={[-1.25, -2.5, 0.3]} scale={0.9} rotation={[0, 0, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group>
				<group position={[0, 0, 0]} rotation={[0, 0, 0]}>
					<Wing2 innerRef={rm_wing} position={[4, 0, 0.16]} scale={1} rotation={[0, Math.PI, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing2 innerRef={rb_wing} position={[1.5, 2.25, 0.36]} scale={2} rotation={[0, Math.PI, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing2 innerRef={rt_wing} position={[1.25, -2.5, 0.36]} scale={0.9} rotation={[0, Math.PI, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group>
				<group position={[0, 0, 0]} rotation={[0, 0.85, 0]}>
					<Wing2 innerRef={rm_wing} position={[4, 0, 0.16]} scale={1} rotation={[0, Math.PI, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing2 innerRef={rb_wing} position={[1.5, 2.25, 0.36]} scale={2} rotation={[0, Math.PI, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing2 innerRef={rt_wing} position={[1.25, -2.5, 0.36]} scale={0.9} rotation={[0, Math.PI, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group>
				<group position={[0, 0, 0]} rotation={[0, -0.85, 0]}>
					<Wing2 innerRef={rm_wing} position={[4, 0, 0.16]} scale={1} rotation={[0, Math.PI, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing2 innerRef={rb_wing} position={[1.5, 2.25, 0.36]} scale={2} rotation={[0, Math.PI, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing2 innerRef={rt_wing} position={[1.25, -2.5, 0.36]} scale={0.9} rotation={[0, Math.PI, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
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

export default Scene8;
