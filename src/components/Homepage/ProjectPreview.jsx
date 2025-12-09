import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Text, Image, MeshTransmissionMaterial, Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

gsap.registerPlugin(ScrollTrigger);

function ProjectPreview() {
	const group1Ref = useRef();
	const group2Ref = useRef();
	const group3Ref = useRef();
	const group4Ref = useRef();
	const group5Ref = useRef();
	const group6Ref = useRef();
	const group7Ref = useRef();
	const textRef = useRef();
	const imageRef = useRef();
	const pathRef = useRef(null);
	const [svgContent, setSvgContent] = useState("");

	useEffect(() => {
		fetch("/line.svg")
			.then((res) => res.text())
			.then(setSvgContent);

		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: "body",
				start: "top top",
				end: "bottom bottom",
				scrub: 1,
			},
		});

		timeline.to(textRef.current.material, { opacity: 0, duration: 1, ease: "power1.inOut" }, "0");
		timeline.to(imageRef.current.material, { opacity: 0, duration: 1, ease: "power1.inOut" }, "0");
		timeline.to(group1Ref.current.position, { y: 0.5, duration: 2, ease: "power1.inOut" }, "2");
		timeline.to(group2Ref.current.position, { y: 0.5, duration: 2, ease: "power1.inOut" }, "4");
		timeline.to(group1Ref.current.position, { x: -15, duration: 1, ease: "power1.inOut" }, "4.5");
		timeline.to(group3Ref.current.position, { y: 0.5, duration: 2, ease: "power1.inOut" }, "6");
		timeline.to(group2Ref.current.position, { x: 15, duration: 1, ease: "power1.inOut" }, "6.5");
		timeline.to(group4Ref.current.position, { y: 0.5, duration: 2, ease: "power1.inOut" }, "8");
		timeline.to(group3Ref.current.position, { x: -15, duration: 1, ease: "power1.inOut" }, "8.5");
		timeline.to(group5Ref.current.position, { y: 0.5, duration: 2, ease: "power1.inOut" }, "10");
		timeline.to(group4Ref.current.position, { x: 15, duration: 1, ease: "power1.inOut" }, "10.5");
		timeline.to(group6Ref.current.position, { y: 0.5, duration: 2, ease: "power1.inOut" }, "12");
		timeline.to(group5Ref.current.position, { x: -15, duration: 1, ease: "power1.inOut" }, "12.5");
		timeline.to(group6Ref.current.position, { x: 15, duration: 1, ease: "power1.inOut" }, "14.5");
		// if (pathRef.current) {
		// 	const length = pathRef.current.getTotalLength();
		// 	timeline.fromTo(
		// 		pathRef.current,
		// 		{ strokeDashoffset: length },
		// 		{ strokeDashoffset: 0, duration: 14, ease: "power1.inOut" },
		// 		"0"
		// 	);
		// }

		return () => {
			timeline.kill();
		};
	}, []);

	return (
		<>
			<group ref={group7Ref} position={[0, -3, 0]}>
				<Text ref={textRef} color="white" position={[0, -0.35, 0]} transparent fontSize={0.12}>
					Scroll to continue
				</Text>
				<Image ref={imageRef} url="/white-down-arrow.png" transparent position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} />
			</group>
			<Html
				position={[0, -1, -4]}
				style={{
					width: "100vw",
					height: "100vh",
				}}
			>
				<div
					ref={(el) => {
						if (el) {
							pathRef.current = el.querySelector("path");
						}
					}}
					dangerouslySetInnerHTML={{ __html: svgContent }}
				/>
			</Html>
			<group ref={group1Ref} position={[0, -11, -5]} scale={[1.2, 1.2, 1.2]}>
				<Text color="white" position={[-2, 0, 0]} fontSize={0.5}>
					First Demo
				</Text>
				<Text color="white" position={[-2, -0.5, 0]} fontSize={0.25}>
					This was the beginning of my Three.js journey
				</Text>
				<mesh position={[3, -0.75, 0]}>
					<planeGeometry args={[3, 2]} />
					<meshStandardMaterial map={useLoader(TextureLoader, "/basic-demo.png")} />
				</mesh>
				<mesh position={[0.5, -0.75, 0.2]}>
					<boxGeometry args={[12, 6, 0.1]} />
					<MeshTransmissionMaterial backsideThickness={0.5} thickness={0.3} chromaticAberration={0.05} anisotropy={0.1} />
				</mesh>
			</group>
			<group ref={group2Ref} position={[0, -11, -5]} scale={[1.2, 1.2, 1.2]}>
				<Text color="white" position={[-2, 0, 0]} fontSize={0.5}>
					Circles
				</Text>
				<Text color="white" position={[-2, -0.5, 0]} fontSize={0.25}>
					Then i started animating some circles
				</Text>
				<mesh position={[3, -0.75, 0]}>
					<planeGeometry args={[3, 2]} />
					<meshStandardMaterial map={useLoader(TextureLoader, "/circles.png")} />
				</mesh>
				<mesh position={[0.5, -0.75, 0.2]}>
					<boxGeometry args={[12, 6, 0.1]} />
					<MeshTransmissionMaterial backsideThickness={0.5} thickness={0.3} chromaticAberration={0.05} anisotropy={0.1} />
				</mesh>
			</group>
			<group ref={group3Ref} position={[0, -11, -5]} scale={[1.2, 1.2, 1.2]}>
				<Text color="white" position={[-2, 0, 0]} fontSize={0.5}>
					Angel
				</Text>
				<Text color="white" position={[-2, -0.5, 0]} fontSize={0.25}>
					The circles looked like a
				</Text>
				<Text color="white" position={[-2, -0.8, 0]} fontSize={0.25}>
					biblically accurate angel
				</Text>
				<Text color="white" position={[-2, -1.1, 0]} fontSize={0.25}>
					so that was my next project
				</Text>
				<mesh position={[3, -0.75, 0]}>
					<planeGeometry args={[3, 2]} />
					<meshStandardMaterial map={useLoader(TextureLoader, "/angel.png")} />
				</mesh>
				<mesh position={[0.5, -0.75, 0.2]}>
					<boxGeometry args={[12, 6, 0.1]} />
					<MeshTransmissionMaterial backsideThickness={0.5} thickness={0.3} chromaticAberration={0.05} anisotropy={0.1} />
				</mesh>
			</group>
			<group ref={group4Ref} position={[0, -11, -5]} scale={[1.2, 1.2, 1.2]}>
				<Text color="white" position={[-2, 0, 0]} fontSize={0.5}>
					Scenic Angel
				</Text>
				<Text color="white" position={[-2, -0.5, 0]} fontSize={0.25}>
					The last angel was a good start
				</Text>
				<Text color="white" position={[-2, -0.8, 0]} fontSize={0.25}>
					but it had a lot of performance issues
				</Text>
				<Text color="white" position={[-2, -1.1, 0]} fontSize={0.25}>
					and it still looked bland
				</Text>
				<Text color="white" position={[-2, -1.4, 0]} fontSize={0.25}>
					so i worked on another iteration
				</Text>
				<mesh position={[3, -0.75, 0]}>
					<planeGeometry args={[3, 2]} />
					<meshStandardMaterial map={useLoader(TextureLoader, "/angel.png")} />
				</mesh>
				<mesh position={[0.5, -0.75, 0.2]}>
					<boxGeometry args={[12, 6, 0.1]} />
					<MeshTransmissionMaterial backsideThickness={0.5} thickness={0.3} chromaticAberration={0.05} anisotropy={0.1} />
				</mesh>
			</group>
			<group ref={group5Ref} position={[0, -11, -5]} scale={[1.2, 1.2, 1.2]}>
				<Text color="white" position={[-2, 0, 0]} fontSize={0.5}>
					Procedural Generating
				</Text>
				<Text color="white" position={[-2, -0.5, 0]} fontSize={0.25}>
					The hallway is filled with gears and pipes
				</Text>
				<Text color="white" position={[-2, -0.8, 0]} fontSize={0.25}>
					These are constanly generated,
				</Text>
				<Text color="white" position={[-2, -1.1, 0]} fontSize={0.25}>
					it is basically infinite
				</Text>
				<mesh position={[3, -0.75, 0]}>
					<planeGeometry args={[3, 2]} />
					<meshStandardMaterial map={useLoader(TextureLoader, "/machine-room.png")} />
				</mesh>
				<mesh position={[0.5, -0.75, 0.2]}>
					<boxGeometry args={[12, 6, 0.1]} />
					<MeshTransmissionMaterial backsideThickness={0.5} thickness={0.3} chromaticAberration={0.05} anisotropy={0.1} />
				</mesh>
			</group>
			<group ref={group6Ref} position={[0, -11, -5]} scale={[1.2, 1.2, 1.2]}>
				<Text color="white" position={[-2, 0, 0]} fontSize={0.5}>
					BIC
				</Text>
				<Text color="white" position={[-2, -0.5, 0]} fontSize={0.25}>
					For the last demo i made
				</Text>
				<Text color="white" position={[-2, -0.8, 0]} fontSize={0.25}>
					an exploded view of a BIC
				</Text>
				<Text color="white" position={[-2, -1.1, 0]} fontSize={0.25}>
					This shows the innerworks
				</Text>
				<Text color="white" position={[-2, -1.4, 0]} fontSize={0.25}>
					with a small text as explanation
				</Text>
				<mesh position={[3, -0.75, 0]}>
					<planeGeometry args={[3, 2]} />
					<meshStandardMaterial map={useLoader(TextureLoader, "/bic.png")} />
				</mesh>
				<mesh position={[0.5, -0.75, -0.1]}>
					<boxGeometry args={[12, 6, 0.1]} />
					<MeshTransmissionMaterial backsideThickness={0.5} thickness={0.3} chromaticAberration={0.05} anisotropy={0.1} />
				</mesh>
			</group>
		</>
	);
}

export default ProjectPreview;
