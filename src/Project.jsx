import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import SpotlightCamera from "./ProjectComponents/SpotlightCamera";
import TextComponent from "./ProjectComponents/TextComponent";
import CloudComponent from "./Angel/cloudComponent";

function Project() {
	const texture = useLoader(THREE.TextureLoader, "/night.jpg");
	const texts = ["Welcome to my project", "We are going for an adventure", "And when we are done", "Your mind will be blown", "up..."];

	return (
		<>
			<SpotlightCamera />
			{/* <SpotlightTry /> */}
			<Environment files="/angel/HDR_night2.hdr" background />
			<ambientLight intensity={1} />
			<TextComponent texts={texts} position={[0, 0, -50]} size={5} />
			<CloudComponent position={[0, 0, -75]} scale={[250, 200, 15]} threshold={0.5} opacity={0.01} range={0.9} steps={500} g={0.7} rayVisibility={5} enableRays={true} base={[0.05, 0.05, 0.05]} frustumCulled={true} renderOrder={1} rotation={false} />
			<mesh receiveShadow position={[5, 0, -75]}>
				<planeGeometry args={[275, 200]} />
				<meshStandardMaterial map={texture} />
			</mesh>
		</>
	);
}

export default Project;
