import { useFBX } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Model from "../Model/Model";
import DynamicText from "../Model/DynamicText";
import BackgroundPlane from "../ProjectComponents/BackgroundPlane";

gsap.registerPlugin(ScrollTrigger);

export default function ExplodedView() {
	return (
		<>
			<ambientLight intensity={1.5} />
			<directionalLight position={[10, 10, 5]} intensity={2.5} />
			<BackgroundPlane />
			<mesh position={[5, 0, -70]}>
				<planeGeometry args={[275, 200]} />
				<meshStandardMaterial color="grey" opacity={0.2} transparent />
			</mesh>
			<Model url="/BIC-static.fbx" />
			<DynamicText
				text="Hello World"
				position={[0, 0, -2]}
				animation={{
					to: {
						position: { y: 2, z: 0 },
						rotation: { y: Math.PI / 4 },
					},
					scrollTrigger: {
						start: "top center",
						end: "center center",
					},
				}}
			/>
			<DynamicText
				text="Scroll to see more"
				position={[-2, -2, -4]}
				scale={0.5}
				animation={{
					to: {
						position: { x: 0, y: -1, z: -1 },
						scale: { x: 1, y: 1, z: 1 },
					},
					scrollTrigger: {
						start: "center bottom",
						end: "bottom bottom",
					},
				}}
			/>
		</>
	);
}

useFBX.preload("/BIC-static.fbx");
