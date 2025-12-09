import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Text, Image, MeshTransmissionMaterial, Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

gsap.registerPlugin(ScrollTrigger);

function ProjectBackground() {
	const group1Ref = useRef();
	const planeRef = useRef();

	useEffect(() => {
		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: "body",
				start: "top top",
				end: "20% top",
				scrub: 1,
			},
		});

		timeline.to(group1Ref.current.material, { opacity: 1, duration: 1, ease: "power1.inOut" }, "0");

		return () => {
			timeline.kill();
		};
	}, []);

	return (
		<>
			<mesh ref={group1Ref} position={[0, -5, -5]} rotation={[-1.7, 0, 0]}>
				<planeGeometry args={[20, 20]} />
				<meshStandardMaterial ref={planeRef} color="red" opacity={0} transparent />
			</mesh>
		</>
	);
}

export default ProjectBackground;
