import * as THREE from "three";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Center, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { gsap } from "gsap";

// Your imports for Wing, Eye, Ring
import Wing from "./scene9/Wing.jsx";
import Eye from "./scene9/Eye.jsx";
import Ring from "./scene9/Ring.jsx";

// startWiggle unchanged
function startWiggle(mesh, baseMinAmp = 0.2, baseMaxAmp = 0.35, baseMinDur = 4, baseMaxDur = 6.0) {
	if (mesh?.current) {
		const target = mesh.current;
		if (target) {
			const amp = gsap.utils.random(baseMinAmp, baseMaxAmp);
			const duration = gsap.utils.random(baseMinDur, baseMaxDur);

			gsap.fromTo(
				target.rotation,
				{ y: 0 },
				{
					y: amp,
					duration: duration,
					ease: "sine.inOut",
					yoyo: true,
					repeat: -1,
				}
			);
		}
	}
}

function InstancedAngel({ position = [0, 0, 0] }) {
	const outer_circle = useRef();
	const middle_circle = useRef();
	const inner_circle = useRef();
	const second_circle = useRef();
	const third_circle = useRef();

	const leftWing1Ref = useRef();
	const leftWing2Ref = useRef();
	const leftWing3Ref = useRef();
	const leftWing4Ref = useRef();
	const leftWing5Ref = useRef();
	const leftWing6Ref = useRef();
	const leftWing7Ref = useRef();
	const leftWing8Ref = useRef();
	const leftWing9Ref = useRef();

	const rightWing1Ref = useRef();
	const rightWing2Ref = useRef();
	const rightWing3Ref = useRef();
	const rightWing4Ref = useRef();
	const rightWing5Ref = useRef();
	const rightWing6Ref = useRef();
	const rightWing7Ref = useRef();
	const rightWing8Ref = useRef();
	const rightWing9Ref = useRef();

	const eye = useRef();
	const iris = useRef();

	const [irisDirection, setIrisDirection] = useState(1);

	useFrame((state, delta) => {
		// animateVolumetricLights(volumetricSystem);
	});

	useLayoutEffect(() => {
		startWiggle(leftWing1Ref, 0.25, 0.3, 1.8, 2.5);
		startWiggle(leftWing2Ref, 0.2, 0.25, 2.0, 3.0);
		startWiggle(leftWing3Ref, 0.3, 0.35, 1.5, 2.2);
		startWiggle(leftWing4Ref, 0.25, 0.28, 1.7, 2.8);
		startWiggle(leftWing5Ref, 0.18, 0.22, 2.2, 3.2);
		startWiggle(leftWing6Ref, 0.28, 0.32, 1.4, 2.0);
		startWiggle(leftWing7Ref, 0.24, 0.27, 1.9, 2.6);
		startWiggle(leftWing8Ref, 0.3, 0.33, 1.6, 2.3);
		startWiggle(leftWing9Ref, 0.26, 0.29, 1.8, 2.7);

		startWiggle(rightWing1Ref, 0.25, 0.3, 1.8, 2.5);
		startWiggle(rightWing2Ref, 0.2, 0.25, 2.0, 3.0);
		startWiggle(rightWing3Ref, 0.3, 0.35, 1.5, 2.2);
		startWiggle(rightWing4Ref, 0.25, 0.28, 1.7, 2.8);
		startWiggle(rightWing5Ref, 0.18, 0.22, 2.2, 3.2);
		startWiggle(rightWing6Ref, 0.28, 0.32, 1.4, 2.0);
		startWiggle(rightWing7Ref, 0.24, 0.27, 1.9, 2.6);
		startWiggle(rightWing8Ref, 0.3, 0.33, 1.6, 2.3);
		startWiggle(rightWing9Ref, 0.26, 0.29, 1.8, 2.7);
	}, []);

	// useFrame
	useFrame((state, delta) => {
		if (outer_circle.current) {
			outer_circle.current.rotation.x += delta * 0.75;
			outer_circle.current.rotation.y += delta * 0.75;
			outer_circle.current.rotation.z -= delta * 0.75;
		}
		if (third_circle.current) {
			third_circle.current.rotation.x += delta * 1;
			third_circle.current.rotation.y -= delta * 1;
			third_circle.current.rotation.z -= delta * 1;
		}
		if (middle_circle.current) {
			middle_circle.current.rotation.x += delta * 1;
			middle_circle.current.rotation.y -= delta * 0.75;
			middle_circle.current.rotation.z += delta * 0.5;
		}
		if (second_circle.current) {
			second_circle.current.rotation.x -= delta * 0.5;
			second_circle.current.rotation.y += delta * 0.75;
			second_circle.current.rotation.z += delta * 0.5;
		}
		if (inner_circle.current) {
			inner_circle.current.rotation.x -= delta * 1;
			inner_circle.current.rotation.y += delta * 1.25;
			inner_circle.current.rotation.z -= delta * 0.75;
		}

		if (iris?.current) {
			iris.current.position.x += delta * 0.05 * irisDirection;
			if (iris.current.position.x > 0.45 || iris.current.position.x < 0.25) {
				setIrisDirection((prev) => -prev);
			}
		}
	});

	return (
		<>
			<OrbitControls />
			<Perf position="top-left" />
			{/* <Environment files="/scene8/HDR_sunset.hdr" background /> */}
			<Environment files="/scene8/HDR.hdr" background />

			{/* <Environment files="/scene8/HDR_night2.hdr" background /> */}
			<Center position={position} rotation={[Math.PI, 0, 0]}>
				<group position={[0, 0, 0]} rotation={[0, 0, 0]}>
					<Wing innerRef={leftWing1Ref} position={[-4, 0, 0]} pivot={[0, 0, 0]} version="default" side="front" style="wing" />
					<Wing innerRef={leftWing2Ref} position={[-1.5, 2.25, 0.06]} scale={2} rotation={[0, 0, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" side="front" style="wing" />
					<Wing innerRef={leftWing3Ref} position={[-1.25, -2.5, 0.3]} scale={0.9} rotation={[0, 0, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" side="front" style="wing" />
				</group>

				{/* <group position={[0, 0, 0]} rotation={[0, 0.85, 0]}>
					<Wing innerRef={leftWing4Ref} position={[-4, 0, 0]} pivot={[0, 0, 0]} version="default" side="front" style="wing" />
					<Wing innerRef={leftWing5Ref} position={[-1.5, 2.25, 0.06]} scale={2} rotation={[0, 0, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" side="front" style="wing" />
					<Wing innerRef={leftWing6Ref} position={[-1.25, -2.5, 0.3]} scale={0.9} rotation={[0, 0, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" side="front" style="wing" />
				</group>

				<group position={[0, 0, 0]} rotation={[0, -0.85, 0]}>
					<Wing innerRef={leftWing7Ref} position={[-4, 0, 0]} pivot={[0, 0, 0]} version="default" side="front" style="wing" />
					<Wing innerRef={leftWing8Ref} position={[-1.5, 2.25, 0.06]} scale={2} rotation={[0, 0, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" side="front" style="wing" />
					<Wing innerRef={leftWing9Ref} position={[-1.25, -2.5, 0.3]} scale={0.9} rotation={[0, 0, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" side="front" style="wing" />
				</group> */}

				<group position={[0, 0, 0]} rotation={[0, 0, 0]}>
					<Wing innerRef={rightWing1Ref} position={[4, 0, 0.16]} scale={1} rotation={[0, Math.PI, 0]} pivot={[0, 0, 0]} version="default" side="back" style="wing2" />
					<Wing innerRef={rightWing2Ref} position={[1.5, 2.25, 0.36]} scale={2} rotation={[0, Math.PI, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" side="back" style="wing2" />
					<Wing innerRef={rightWing3Ref} position={[1.25, -2.5, 0.36]} scale={0.9} rotation={[0, Math.PI, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" side="back" style="wing2" />
				</group>

				{/* <group position={[0, 0, 0]} rotation={[0, 0.85, 0]}>
					<Wing innerRef={rightWing4Ref} position={[4, 0, 0.16]} scale={1} rotation={[0, Math.PI, 0]} pivot={[0, 0, 0]} version="default" side="back" style="wing2" />
					<Wing innerRef={rightWing5Ref} position={[1.5, 2.25, 0.36]} scale={2} rotation={[0, Math.PI, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" side="back" style="wing2" />
					<Wing innerRef={rightWing6Ref} position={[1.25, -2.5, 0.36]} scale={0.9} rotation={[0, Math.PI, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" side="back" style="wing2" />
				</group>

				<group position={[0, 0, 0]} rotation={[0, -0.85, 0]}>
					<Wing innerRef={rightWing7Ref} position={[4, 0, 0.16]} scale={1} rotation={[0, Math.PI, 0]} pivot={[0, 0, 0]} version="default" side="back" style="wing2" />
					<Wing innerRef={rightWing8Ref} position={[1.5, 2.25, 0.36]} scale={2} rotation={[0, Math.PI, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" side="back" style="wing2" />
					<Wing innerRef={rightWing9Ref} position={[1.25, -2.5, 0.36]} scale={0.9} rotation={[0, Math.PI, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" side="back" style="wing2" />
				</group> */}

				<Ring innerRef={inner_circle} innerScale={[1.9]} groupPosition={[0, 1.25, -0.05]} groupRotation={[0, 0, -1.5]} groupScale={0.8} />
				<Ring innerRef={second_circle} innerScale={[1.9]} groupPosition={[0, 1.25, -0.05]} groupRotation={[0, 0, -1.5]} groupScale={0.6} />
				<Ring innerRef={third_circle} innerScale={[1.9]} groupPosition={[0, 1.25, -0.05]} groupRotation={[0, 0, -1.5]} groupScale={0.7} />
				<Ring innerRef={middle_circle} innerScale={[1.9]} groupPosition={[0, 1.25, -0.05]} groupRotation={[0, 0, -1]} groupScale={1} />
				<Ring innerRef={outer_circle} innerScale={[1.9]} groupPosition={[0, 1.25, -0.05]} groupRotation={[0, 0, 0.25]} groupScale={0.9} />

				<Eye innerRef={eye} pivot={[-0.65, 0.85, 0]} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={2} irisRef={iris} />
			</Center>
		</>
	);
}
export default InstancedAngel;
