import { useFBX } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Model from "../components/Model/Model";
import TextContainer from "../components/Model/TextContainer";

export default function ExplodedView() {
	return (
		<>
			<ambientLight intensity={1.5} />
			<directionalLight position={[10, 10, 5]} intensity={2.5} />
			<mesh position={[5, 0, -70]}>
				<planeGeometry args={[275, 200]} />
				<meshStandardMaterial color="#051f2e" opacity={1} />
			</mesh>
			<Model url="./BIC-static.fbx" />
			<TextContainer />
		</>
	);
}

useFBX.preload("./BIC-static.fbx");
