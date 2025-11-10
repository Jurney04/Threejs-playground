import * as THREE from "three";
import { Environment } from "@react-three/drei";
import SpotlightCamera from "./ProjectComponents/SpotlightCamera";
import TypingText from "./ProjectComponents/TypingText";
import CloudComponent from "./Angel/cloudComponent";
import Shape from "./ProjectComponents/Shape";
import BackgroundPlane from "./ProjectComponents/BackgroundPlane";
import SpotlightBackground from "./ProjectComponents/SpotlightBackground";

function Project({ onShapeClick }) {
	// const texts = ["Welcome to my project", "We are going on an adventure", "And when we are done", "Your mind will be blown", "up..."];

	return (
		<>
			<SpotlightCamera />
			{/* <ambientLight intensity={0.1} /> */}
			<ambientLight intensity={0.5} />
			<mesh position={[5, 0, -70]}>
				<planeGeometry args={[275, 200]} />
				<meshStandardMaterial color="grey" opacity={0.5} transparent />
			</mesh>
			<BackgroundPlane />
			<SpotlightBackground position={[0, 0, -95]} rotation={[0, 0, 0.5]} scale={2.5} />
			<Shape position={[-15, 2.5, -50]} scale={1} texts="Welcome" size={5} rotation={[0, 0, 0]} onClick={() => onShapeClick("Welcome")} />
			<Shape position={[10, 2.5, -50]} scale={1} texts="To" size={5} rotation={[0, 0, 0]} onClick={() => onShapeClick("To")} />
			<Shape position={[-10, -5, -50]} scale={1} texts="My" size={5} rotation={[0, 0, 0]} onClick={() => onShapeClick("My")} />
			<Shape position={[0.5, -5, -50]} scale={1} texts="World" size={5} rotation={[0, 0, 0]} onClick={() => onShapeClick("World")} />
		</>
	);
}

export default Project;
