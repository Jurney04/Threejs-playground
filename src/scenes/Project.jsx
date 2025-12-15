import * as THREE from "three";
import React, { useRef, useEffect, useState } from "react";
import SpotlightCamera from "../components/ProjectComponents/SpotlightCamera";
import Shape from "../components/ProjectComponents/Shape";
import BackgroundPlane from "../components/ProjectComponents/BackgroundPlane";
import SpotlightBackground from "../components/ProjectComponents/SpotlightBackground";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Environment } from "@react-three/drei";
function Project() {
	const groupRef = useRef();
	const greyPlaneRef = useRef();
	const blackPlaneRef = useRef();
	const backgroundRef = useRef();
	const spotlightRef = useRef();
	const [backgroundOpacity, setBackgroundOpacity] = useState(1);
	const [hasFadedOut, setHasFadedOut] = useState(false);

	useEffect(() => {
		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: "body",
				start: "top top",
				end: "20% top",
				scrub: 1,
			},
		});

		timeline.to(groupRef.current.position, { y: 50, duration: 0.25, ease: "power1.inOut" }, "0");
		timeline.to(greyPlaneRef.current, { opacity: 0.2, duration: 0.15, ease: "power1.inOut" }, "0");
		timeline.to(blackPlaneRef.current, { opacity: 0.1, duration: 0.15, ease: "power1.inOut" }, "0.2");

		// Animate background opacity state - only fade out once
		timeline.to(
			{},
			{
				onUpdate: function () {
					if (!hasFadedOut) {
						const progress = this.progress();
						const newOpacity = 1 - progress;
						setBackgroundOpacity(newOpacity);

						// Mark as faded out when fully invisible
						if (progress >= 0.99) {
							setHasFadedOut(true);
						}
					}
				},
			},
			"0"
		);

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
			<ambientLight intensity={0.2} />
			<mesh position={[5, 0, -70]}>
				<planeGeometry args={[275, 200]} />
				<meshStandardMaterial ref={greyPlaneRef} color="grey" opacity={0.3} transparent />
			</mesh>
			<mesh position={[5, 0, -70]}>
				<planeGeometry args={[275, 200]} />
				<meshStandardMaterial ref={blackPlaneRef} color="black" opacity={0} transparent />
			</mesh>

			<color attach="background" args={["#000000"]} />
			<Environment files="./angel/HDR_sunset.hdr" background={true} environmentIntensity={0} />
			<BackgroundPlane ref={backgroundRef} opacity={backgroundOpacity} />
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
