import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sky } from "three/addons/objects/Sky.js";
import { MathUtils, Vector3 } from "three";

let scene;
function BasicDemo() {
	scene = new THREE.Scene();
	//useRef is a hook that allows us to create a reference to a DOM element or a component instance
	const boxRef = useRef();
	const sphereRef = useRef();
	const groupRef = useRef();
	const sky = new Sky();
	sky.scale.setScalar(450000);

	const phi = MathUtils.degToRad(90);
	const theta = MathUtils.degToRad(180);
	const sunPosition = new Vector3().setFromSphericalCoords(1, phi, theta);

	sky.material.uniforms.sunPosition.value = sunPosition;

	scene.add(sky);

	//useFrame is a hook that allows us to run code on every frame. It is similar to the requestAnimationFrame function in vanilla JavaScript.
	// useFrame(() => {
	//   boxRef.current.rotation.y += 0.01
	//   boxRef.current.rotation.x += 0.01
	// });

	//State and delta are passed to the function. State is the current state of the scene and delta is the time since the last frame.
	useFrame((state, delta) => {
		sphereRef.current.rotation.y += delta * 0.5;
		boxRef.current.rotation.x += delta * 5;
		groupRef.current.rotation.y += delta * 0.1;
	});

	return (
		<>
			<group ref={groupRef}>
				<mesh ref={sphereRef} position={[3, 0, -1]} rotation={[0, 0, 0]} scale={1.1}>
					<sphereGeometry args={[1.5, 32, 32]} />
					<meshBasicMaterial color="green" wireframe={true} />
				</mesh>

				{/* We need a reference to the cube to adjust it in the frame: useRef */}
				<mesh ref={boxRef} scale={1} position={[-1, 0, -1]} rotation-x={-Math.PI * 0.5}>
					<boxGeometry args={[2, 2, 2]} />
					<meshBasicMaterial color="red" wireframe={true} />
				</mesh>
			</group>
			<mesh position={[0, -2.5, 0]} rotation={[-Math.PI * 0.4, 0, 0]} scale={20}>
				<planeGeometry />
				<meshBasicMaterial color="lightblue" />
			</mesh>
		</>
	);
}
export default BasicDemo;
