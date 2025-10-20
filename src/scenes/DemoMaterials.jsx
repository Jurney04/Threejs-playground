import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei"; // For environment map (reflections)
import { LineMaterial } from "three/examples/jsm/Addons.js";

function DemoMaterials() {
	const knot1Ref = useRef();
	const knot2Ref = useRef();
	const knot3Ref = useRef();
	const knot4Ref = useRef();
	useFrame((state, delta) => {
		knot1Ref.current.rotation.x += delta * 0.5;
		knot2Ref.current.rotation.x += delta * 0.5;
		knot3Ref.current.rotation.x += delta * 0.5;
		knot4Ref.current.rotation.x += delta * 0.5;
	});

	return (
		<>
			<color attach="background" args={["#aca8a8"]} />
			<directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
			<ambientLight intensity={0.4} />

			<mesh ref={knot1Ref} position={[-4.5, 0, 0]} scale={0.05}>
				<torusKnotGeometry args={[10, 3, 100, 16]} />

				<meshStandardMaterial color="aqua" />
			</mesh>
			<mesh ref={knot2Ref} position={[-1.5, 0, 0]} scale={0.05}>
				<torusKnotGeometry args={[10, 3, 100, 16]} />

				<meshPhysicalMaterial color="aqua" emissive="#ff0000" emissiveIntensity={0.15} roughness={0} metalness={0} ior={2.5} reflectivity={0.9} iridescence={1} iridescenceIOR={1.3} clearcoat={0} specularIntensity={1} specularColor="white" />
			</mesh>
			<mesh ref={knot3Ref} position={[1.5, 0, 0]} scale={0.05}>
				<torusKnotGeometry args={[10, 3, 100, 16]} />
				{/* Standard for comparison */}
				<meshToonMaterial color="aqua" />
			</mesh>
			<mesh ref={knot4Ref} position={[4.5, 0, 0]} scale={0.05}>
				<torusKnotGeometry args={[10, 3, 100, 16]} />
				{/* Standard for comparison */}
				<meshNormalMaterial />
			</mesh>
		</>
	);
}

export default DemoMaterials;
