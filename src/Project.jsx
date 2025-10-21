import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { useLoader } from "@react-three/fiber";
import { extend } from "@react-three/fiber";
import { useRef } from "react";
import { Environment } from "@react-three/drei";
import SpotlightCamera from "./ProjectComponents/SpotlightCamera";
import TextComponent from "./ProjectComponents/TextComponent";

function Project() {
	return (
		<>
			<SpotlightCamera />
			{/* <SpotlightTry /> */}
			<Environment files="/angel/HDR_night2.hdr" background />
			<ambientLight intensity={0.5} /> {/* Base ambient light */}
			<directionalLight position={[10, 10, 5]} intensity={5} /> {/* Additional directional light */}
			<TextComponent />
		</>
	);
}

export default Project;
