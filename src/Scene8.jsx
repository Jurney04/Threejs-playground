import React, { useRef, useState } from "react";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Center, useTexture, Sky, Environment } from "@react-three/drei";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import * as THREE from "three";

function Wing({ position, rotation, scale, innerRef, pivot = [0, 0, 0] }) {
	const { paths: paths_bottom } = useLoader(SVGLoader, "/wing_bottom.svg");
	const { paths: paths_middle } = useLoader(SVGLoader, "/wing_middle.svg");
	const { paths: paths_top } = useLoader(SVGLoader, "/wing_top.svg");

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
		roughness: 0.5,
		normalMap: normal,
		roughnessMap: roughness,
	};

	return (
		<group position={pivot} ref={innerRef}>
			<group position={position} rotation={rotation} scale={scale}>
				<mesh scale={0.01} position={[0, 0, -0.05]}>
					<extrudeGeometry args={[shapes_top, extrudeSettings]} />
					<meshStandardMaterial {...materialProps} />
				</mesh>
				<mesh scale={0.01} position={[-0.2, 0.7, 0]}>
					<extrudeGeometry args={[shapes_middle, extrudeSettings]} />
					<meshStandardMaterial {...materialProps} />
				</mesh>
				<mesh scale={0.01} position={[-0.35, 1, 0.05]}>
					<extrudeGeometry args={[shapes_bottom, extrudeSettings]} />
					<meshStandardMaterial {...materialProps} />
				</mesh>
			</group>
		</group>
	);
}

function Wing2({ position, rotation, scale, innerRef, pivot = [0, 0, 0] }) {
	const { paths: paths_bottom } = useLoader(SVGLoader, "/wing_bottom.svg");
	const { paths: paths_middle } = useLoader(SVGLoader, "/wing_middle.svg");
	const { paths: paths_top } = useLoader(SVGLoader, "/wing_top.svg");

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

	return (
		<group position={pivot} ref={innerRef}>
			<group position={position} rotation={rotation} scale={scale}>
				<mesh scale={0.01} position={[0, 0, 0.05]}>
					<extrudeGeometry args={[shapes_top, extrudeSettings]} />
					<meshStandardMaterial {...materialProps} />
				</mesh>
				<mesh scale={0.01} position={[-0.2, 0.7, 0]}>
					<extrudeGeometry args={[shapes_middle, extrudeSettings]} />
					<meshStandardMaterial {...materialProps} />
				</mesh>
				<mesh scale={0.01} position={[-0.35, 1, -0.05]}>
					<extrudeGeometry args={[shapes_bottom, extrudeSettings]} />
					<meshStandardMaterial {...materialProps} />
				</mesh>
			</group>
		</group>
	);
}
function Eye({ position, rotation, scale, innerRef, pivot = [0, 0, 0] }) {
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
		<group position={position} rotation={rotation} scale={scale}>
			<mesh scale={0.01} position={[0, 0, -0.075]}>
				<extrudeGeometry args={[shapes_eye, extrudeSettings]} />
				<meshStandardMaterial {...materialProps} />
			</mesh>
			<mesh scale={0.009} position={[0.04, 0.02, -0.085]}>
				<extrudeGeometry args={[shapes_eye, extrudeSettings]} />
				<meshStandardMaterial {...materialPropsMarble} />
			</mesh>
			<mesh scale={0.01} position={[0.35, 0.18, -0.075]}>
				<sphereGeometry args={[10, 32, 32]} />
				<meshStandardMaterial {...materialPropsBlue} />
			</mesh>
		</group>
	);
}

function Circle({ position, rotation, scale, innerRef, materialProps, args }) {
	return (
		<mesh ref={innerRef} position={position} rotation={rotation} scale={scale}>
			<torusGeometry args={args} />
			<meshStandardMaterial {...materialProps} />
		</mesh>
	);
}

function Scene8() {
	const outer_circle = useRef();
	const inner_circle = useRef();
	const lt_wing = useRef();
	const lm_wing = useRef();
	const lb_wing = useRef();
	const rt_wing = useRef();
	const rm_wing = useRef();
	const rb_wing = useRef();
	const groupRef = useRef();

	const [lmWingDirection, setLmWingDirection] = useState(1);
	const [ltWingDirection, setLtWingDirection] = useState(1);
	const [lbWingDirection, setLbWingDirection] = useState(1);
	const [rmWingDirection, setRmWingDirection] = useState(1);
	const [rtWingDirection, setRtWingDirection] = useState(1);
	const [rbWingDirection, setRbWingDirection] = useState(1);

	useFrame((state, delta) => {
		if (outer_circle.current) {
			outer_circle.current.rotation.x += delta * 0.75;
			outer_circle.current.rotation.y += delta * 0.75;
			outer_circle.current.rotation.z += delta * 0.75;
		}
		if (inner_circle.current) {
			inner_circle.current.rotation.x -= delta * 0.5;
			inner_circle.current.rotation.y -= delta * 0.5;
			inner_circle.current.rotation.z -= delta * 0.5;
		}
		if (lt_wing.current) {
			lt_wing.current.rotation.y -= delta * 0.1 * ltWingDirection;
			if (lt_wing.current.rotation.y > 0.25 || lt_wing.current.rotation.y < -0.25) {
				setLtWingDirection((prev) => -prev);
			}
		}
		// Flapping animation for lm_wing
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
		// Flapping animation for rm_wing
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
	return (
		<>
			<OrbitControls />
			{/* <Environment files="/HDR_sunset.hdr" background /> */}
			<Environment files="/HDR.hdr" background />
			<Center rotation={[Math.PI, 0, 0]}>
				<Wing innerRef={lm_wing} position={[-4, 0, 0]} pivot={[0, 0, 0]} />
				<Wing innerRef={lb_wing} position={[-4, 3, 0.3]} rotation={[0, 0, Math.PI * -0.2]} pivot={[0, 0, 0]} />
				<Wing innerRef={lt_wing} position={[-2, -2.5, 0.3]} rotation={[0, 0, Math.PI * 0.2]} pivot={[0, 0, 0]} />
				<Wing2 innerRef={rm_wing} position={[4, 0, 0.16]} rotation={[0, Math.PI, 0]} pivot={[0, 0, 0]} />
				<Wing2 innerRef={rb_wing} position={[4, 3, 0.36]} rotation={[0, Math.PI, Math.PI * -0.2]} pivot={[0, 0, 0]} />
				<Wing2 innerRef={rt_wing} position={[2, -2.5, 0.36]} rotation={[0, Math.PI, Math.PI * 0.2]} pivot={[0, 0, 0]} />

				<Circle innerRef={outer_circle} position={[0, 1.5, 0.1]} rotation={[0, 0, -1.5]} scale={1} materialProps={materialProps} args={[1.5, 0.15, 12, 48, Math.PI * 2]} />
				<Circle innerRef={inner_circle} position={[0, 1.5, 0.1]} rotation={[0, 0, -1.5]} scale={1} materialProps={materialProps} args={[1.25, 0.15, 12, 48, Math.PI * 2]} />
				<Eye position={[-1, 0.75, 0]} rotation={[0, 0, 0]} scale={3} />
			</Center>
		</>
	);
}

export default Scene8;
