import React from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sky, useTexture, Environment } from "@react-three/drei";
import { DoubleSide } from "three";

function Circles() {
	//useRef is a hook that allows us to create a reference to a DOM element or a component instance
	const sphereRef1 = useRef();
	const sphereRef2 = useRef();
	const sphereRef3 = useRef();
	const sphereRef4 = useRef();
	const sphereRef5 = useRef();
	const sphereRef6 = useRef();
	const sphereRef7 = useRef();
	const sphereRef8 = useRef();
	const groupRef = useRef();

	const [basecolor, ambientOcclusion, metallic, normal, roughness] = useTexture([
		"/scene8/gold_texture/Poliigon_MetalGoldPaint_7253_BaseColor.jpg",
		"/scene8/gold_texture/Poliigon_MetalGoldPaint_7253_AmbientOcclusion.jpg",
		"/scene8/gold_texture/Poliigon_MetalGoldPaint_7253_Metallic.jpg",
		"/scene8/gold_texture/Poliigon_MetalGoldPaint_7253_Normal.png",
		"/scene8/gold_texture/Poliigon_MetalGoldPaint_7253_Roughness.jpg",
	]);

	//State and delta are passed to the function. State is the current state of the scene and delta is the time since the last frame.
	useFrame((state, delta) => {
		sphereRef1.current.rotation.x += delta * 0.5;
		sphereRef1.current.rotation.y += delta * 0.5;
		sphereRef1.current.rotation.z += delta * 0.5;

		sphereRef2.current.rotation.x -= delta * 0.5;
		sphereRef2.current.rotation.y -= delta * 0.5;
		sphereRef2.current.rotation.z -= delta * 0.5;

		sphereRef3.current.rotation.x += delta * 0.3;
		sphereRef3.current.rotation.y += delta * 0.3;
		sphereRef3.current.rotation.z += delta * 0.3;

		sphereRef4.current.rotation.x -= delta * 0.3;
		sphereRef4.current.rotation.y -= delta * 0.3;
		sphereRef4.current.rotation.z -= delta * 0.3;

		sphereRef5.current.rotation.x += delta * 0.7;
		sphereRef5.current.rotation.y += delta * 0.7;
		sphereRef5.current.rotation.z += delta * 0.7;

		sphereRef6.current.rotation.x -= delta * 0.7;
		sphereRef6.current.rotation.y -= delta * 0.7;
		sphereRef6.current.rotation.z -= delta * 0.7;

		sphereRef7.current.rotation.x += delta * 0.6;
		sphereRef7.current.rotation.y += delta * 0.6;
		sphereRef7.current.rotation.z += delta * 0.6;

		sphereRef8.current.rotation.x -= delta * 0.6;
		sphereRef8.current.rotation.y -= delta * 0.6;
		sphereRef8.current.rotation.z -= delta * 0.6;
	});

	const materialProps = {
		map: basecolor,
		aoMap: ambientOcclusion,
		metallicMap: metallic,
		normalMap: normal,
		roughnessMap: roughness,
		color: "white",
		side: DoubleSide,
	};

	return (
		<>
			<Sky distance={100} up={0} />
			{/* <ambientLight intensity={1} /> */}
			{/* <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={10} /> */}
			<Environment preset="sunset" background />
			<group ref={groupRef}>
				<mesh ref={sphereRef1} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
					<torusGeometry args={[0.25, 0.1, 12, 48, Math.PI * 2]} />
					<meshStandardMaterial {...materialProps} metalness={1} roughness={0.5} aoMapIntensity={1} normalScale={[1, 1]} />
				</mesh>
				<mesh ref={sphereRef2} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
					<torusGeometry args={[0.5, 0.1, 12, 48, Math.PI * 1.75]} />
					<meshStandardMaterial {...materialProps} metalness={1} roughness={0.5} aoMapIntensity={1} normalScale={[1, 1]} />
				</mesh>
				<mesh ref={sphereRef3} position={[0, 0, 0]} rotation={[0, 0, -1.5]} scale={1}>
					<torusGeometry args={[0.75, 0.1, 12, 48, Math.PI * 1]} />
					<meshStandardMaterial {...materialProps} metalness={1} roughness={0.5} aoMapIntensity={1} normalScale={[1, 1]} />
				</mesh>
				<mesh ref={sphereRef4} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
					<torusGeometry args={[1, 0.1, 12, 48, Math.PI * 1.5]} />
					<meshStandardMaterial {...materialProps} metalness={1} roughness={0.5} aoMapIntensity={1} normalScale={[1, 1]} />
				</mesh>
				<mesh ref={sphereRef5} position={[0, 0, 0]} rotation={[0, 0, -2]} scale={1}>
					<torusGeometry args={[1.25, 0.1, 12, 48, Math.PI * 0.5]} />
					<meshStandardMaterial {...materialProps} metalness={1} roughness={0.5} aoMapIntensity={1} normalScale={[1, 1]} />
				</mesh>
				<mesh ref={sphereRef6} position={[0, 0, 0]} rotation={[0, 0, 1.5]} scale={1}>
					<torusGeometry args={[1.5, 0.1, 12, 48, Math.PI * 0.75]} />
					<meshStandardMaterial {...materialProps} metalness={1} roughness={0.5} aoMapIntensity={1} normalScale={[1, 1]} />
				</mesh>
				<mesh ref={sphereRef7} position={[0, 0, 0]} rotation={[0, 0, -1.5]} scale={1}>
					<torusGeometry args={[1.75, 0.1, 12, 48, Math.PI * 1.5]} />
					<meshStandardMaterial {...materialProps} metalness={1} roughness={0.5} aoMapIntensity={1} normalScale={[1, 1]} />
				</mesh>
				<mesh ref={sphereRef8} position={[0, 0, 0]} rotation={[0, 0, 1]} scale={1}>
					<torusGeometry args={[2, 0.1, 12, 48, Math.PI * 1.75]} />
					<meshStandardMaterial {...materialProps} metalness={1} roughness={0.5} aoMapIntensity={1} normalScale={[1, 1]} />
				</mesh>
			</group>
		</>
	);
}

export default Circles;
