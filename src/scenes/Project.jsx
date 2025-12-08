import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import SpotlightCamera from "../components/ProjectComponents/SpotlightCamera";
import Shape from "../components/ProjectComponents/Shape";
import BackgroundPlane from "../components/ProjectComponents/BackgroundPlane";
import SpotlightBackground from "../components/ProjectComponents/SpotlightBackground";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
function Project() {
	const groupRef = useRef();
	const greyPlaneRef = useRef();
	const spotlightRef = useRef();

	useEffect(() => {
		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: "body",
				start: "top top",
				end: "bottom bottom",
				scrub: 1,
			},
		});

		timeline.to(groupRef.current.position, { y: 300, duration: 1, ease: "power1.inOut" }, "0");
		timeline.to(greyPlaneRef.current, { opacity: 0.2, duration: 0.5, ease: "power1.inOut" }, "0");

		return () => {
			timeline.kill();
		};
	}, []);
	return (
		<>
			<mesh onPointerMove={() => {}} visible={false} position-z={-26}>
				<planeGeometry args={[1000, 1000]} />
			</mesh>
			<SpotlightCamera ref={spotlightRef} />
			{/* <ambientLight intensity={0.1} /> */}
			<ambientLight intensity={0.5} />
			<mesh position={[5, 0, -70]}>
				<planeGeometry args={[275, 200]} />
				<meshStandardMaterial ref={greyPlaneRef} color="grey" opacity={0.5} transparent />
			</mesh>
			<BackgroundPlane />
			<SpotlightBackground position={[0, 0, -95]} rotation={[0, 0, 0.5]} scale={2.5} />
			<group ref={groupRef} position={[-4, -2.5, 0]}>
				<Shape position={[-15, 2.5, -50]} scale={1} texts="Welcome" size={5} rotation={[0, 0, 0]} />
				<Shape position={[10, 2.5, -50]} scale={1} texts="To" size={5} rotation={[0, 0, 0]} />
				<Shape position={[-10, -5, -50]} scale={1} texts="My" size={5} rotation={[0, 0, 0]} />
				<Shape position={[0.5, -5, -50]} scale={1} texts="Dimension" size={5} rotation={[0, 0, 0]} />
			</group>
		</>
	);
}

export default Project;
