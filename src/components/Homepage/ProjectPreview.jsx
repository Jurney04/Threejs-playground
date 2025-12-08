import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Text, Image } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

function ProjectPreview() {
	const group1Ref = useRef();
	const group2Ref = useRef();
	const group3Ref = useRef();
	const group4Ref = useRef();
	const group5Ref = useRef();
	const group6Ref = useRef();
	const group7Ref = useRef();
	const [group7Opacity, setGroup7Opacity] = useState(1);

	useEffect(() => {
		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: "body",
				start: "top top",
				end: "bottom bottom",
				scrub: 1,
			},
		});

		timeline.to(
			{ value: 1 },
			{
				value: 0,
				onUpdate: function () {
					setGroup7Opacity(this.targets()[0].value);
				},
				duration: 1,
			},
			"0"
		);
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

		return () => {
			timeline.kill();
		};
	}, []);

	return (
		<>
			<group ref={group7Ref} position={[0, -3, 0]}>
				<Text color="white" position={[0, -0.35, 0]} transparent fontSize={0.15} opacity={group7Opacity}>
					Scroll to continue
				</Text>
				<Image url="/white-down-arrow.png" transparent position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} opacity={group7Opacity} />
			</group>
			<group ref={group1Ref} position={[0, -6, 0]}>
				<Text color="white" position={[-2, 0, 0]} fontSize={0.5}>
					First Demo
				</Text>
				<Text color="white" position={[-2, -0.5, 0]} fontSize={0.25}>
					This was the beginning of my Three.js journey
				</Text>
				<Image url="/basic-demo.png" position={[3, -0.75, 0]} scale={[3, 2, 2]} />
			</group>
			<group ref={group2Ref} position={[0, -6, 0]}>
				<Text color="white" position={[-2, 0, 0]} fontSize={0.5}>
					Circles
				</Text>
				<Text color="white" position={[-2, -0.5, 0]} fontSize={0.25}>
					Then i started animating some circles
				</Text>
				<Image url="/circles.png" position={[3, -0.75, 0]} scale={[3, 2, 2]} />
			</group>
			<group ref={group3Ref} position={[0, -6, 0]}>
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
				<Image url="/angel.png" position={[3, -0.75, 0]} scale={[3, 2, 2]} />
			</group>
			<group ref={group4Ref} position={[0, -6, 0]}>
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
				<Image url="/angel.png" position={[3, -0.75, 0]} scale={[3, 2, 2]} />
			</group>
			<group ref={group5Ref} position={[0, -6, 0]}>
				<Text color="white" position={[-2, 0, 0]} fontSize={0.5}>
					Procedural Generating
				</Text>
				<Text color="white" position={[-2, -0.5, 0]} fontSize={0.25}>
					The hallway is filled with gears nd pipes
				</Text>
				<Text color="white" position={[-2, -0.8, 0]} fontSize={0.25}>
					These are constanly generated,
				</Text>
				<Text color="white" position={[-2, -1.1, 0]} fontSize={0.25}>
					it is basically infinite
				</Text>
				<Image url="/machine-room.png" position={[3, -0.75, 0]} scale={[3, 2, 2]} />
			</group>
			<group ref={group6Ref} position={[0, -6, 0]}>
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
				<Image url="/bic.png" position={[3, -0.75, 0]} scale={[3, 2, 2]} />
			</group>
		</>
	);
}

export default ProjectPreview;
