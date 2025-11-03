import * as THREE from "three";

import { Environment } from "@react-three/drei";
import SpotlightCamera from "./ProjectComponents/SpotlightCamera";
import TypingText from "./ProjectComponents/TypingText";
import CloudComponent from "./Angel/cloudComponent";
import Shape from "./ProjectComponents/Shape";
import BackgroundPlane from "./ProjectComponents/BackgroundPlane";
import SpotlightBackground from "./ProjectComponents/SpotlightBackground";

function Project() {
	const texts = ["Welcome to my project", "We are going on an adventure", "And when we are done", "Your mind will be blown", "up..."];

	return (
		<>
			<SpotlightCamera />
			{/* <Environment files="/angel/HDR_night2.hdr" background /> */}
			<ambientLight intensity={0.1} /> {/* Reduced from 2.5 to 0.1 to make spotlight more visible */}
			{/* <TypingText texts={texts} position={[0, 0, -50]} size={5} typingSpeed={50} pauseBetween={5000} /> */}
			{/* <CloudComponent position={[0, 0, -75]} scale={[250, 200, 15]} threshold={0.5} opacity={0.01} range={0.9} steps={500} g={0.7} rayVisibility={5} enableRays={true} base={[0.05, 0.05, 0.05]} frustumCulled={true} renderOrder={1} rotation={false} /> */}
			<mesh position={[5, 0, -70]}>
				<planeGeometry args={[275, 200]} />
				<meshStandardMaterial color="grey" opacity={0.5} transparent />
			</mesh>
			<BackgroundPlane />
			<SpotlightBackground position={[0, 0, -95]} rotation={[0, 0, 0.5]} scale={2.5} />
			<Shape position={[-20, 0, -50]} scale={1} texts="Hello" size={5} rotation={[0, 0, 0]} />
			<Shape position={[10, 0, -50]} scale={1} texts="World" size={5} rotation={[0, 0, 0]} />
		</>
	);
}

export default Project;
