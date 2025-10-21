import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { useLoader } from "@react-three/fiber";
import { extend } from "@react-three/fiber";
import { useRef } from "react";
import { Environment } from "@react-three/drei";
import SpotlightCamera from "./ProjectComponents/SpotlightCamera";
import TextComponent from "./ProjectComponents/TextComponent";
import CloudComponent from "./Angel/cloudComponent";

function Project() {
	// Load the texture using useLoader for proper async handling
	const texture = useLoader(THREE.TextureLoader, "/sponge.jpg");

	return (
		<>
			<SpotlightCamera />
			{/* <SpotlightTry /> */}
			<Environment files="/angel/HDR_night2.hdr" background />
			<ambientLight intensity={0.5} /> {/* Base ambient light */}
			<directionalLight position={[10, 10, 5]} intensity={5} /> {/* Additional directional light */}
			<TextComponent />
			{/* <CloudComponent position={[0, 0, -75]} scale={[250, 200, 15]} threshold={0.5} opacity={0.1} range={0.9} steps={500} g={0.7} rayVisibility={5} enableRays={true} base={[0.05, 0.05, 0.05]} frustumCulled={false} renderOrder={1} rotation={false} /> */}
			<mesh receiveShadow position={[5, 0, -75]}>
				{" "}
				{/* Added shadows for light reactivity */}
				<planeGeometry args={[275, 200]} />
				<meshStandardMaterial map={texture} /> {/* Use MeshStandardMaterial for light reactivity */}
			</mesh>
		</>
	);
}

export default Project;
