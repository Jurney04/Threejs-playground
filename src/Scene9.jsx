import * as THREE from "three";
import React, { useRef, useLayoutEffect, useState, useMemo } from "react";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Center, useTexture, Sky, Environment } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { AmbientLight } from "three";

import Wing from "./scene9/Wing.jsx";
import Wing2 from "./scene9/Wing2.jsx";
import Eye from "./scene9/Eye.jsx";
import Ring from "./scene9/Ring.jsx";

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

	const wingInstances = useMemo(() => {
		const instances = [];

		// Group 1 (rotation: [0, 0, 0])
		instances.push({ position: [-4, 0, 0], rotation: [0, 0, 0], scale: 1, version: "default" });
		instances.push({ position: [-1.5, 2.25, 0.06], rotation: [0, 0, Math.PI * -0.125], scale: 2, version: "v3" });
		instances.push({ position: [-1.25, -2.5, 0.3], rotation: [0, 0, Math.PI * 0.2], scale: 0.9, version: "v2" });

		// Group 2 (rotation: [0, 0.85, 0])
		const group2Rotation = new THREE.Euler(0, 0.85, 0);
		instances.push({ position: [-4, 0, 0], rotation: [0, 0, 0], scale: 1, version: "default", groupRotation: group2Rotation });
		instances.push({ position: [-1.5, 2.25, 0.06], rotation: [0, 0, Math.PI * -0.125], scale: 2, version: "v3", groupRotation: group2Rotation });
		instances.push({ position: [-1.25, -2.5, 0.3], rotation: [0, 0, Math.PI * 0.2], scale: 0.9, version: "v2", groupRotation: group2Rotation });

		// Group 3 (rotation: [0, -0.85, 0])
		const group3Rotation = new THREE.Euler(0, -0.85, 0);
		instances.push({ position: [-4, 0, 0], rotation: [0, 0, 0], scale: 1, version: "default", groupRotation: group3Rotation });
		instances.push({ position: [-1.5, 2.25, 0.06], rotation: [0, 0, Math.PI * -0.125], scale: 2, version: "v3", groupRotation: group3Rotation });
		instances.push({ position: [-1.25, -2.5, 0.3], rotation: [0, 0, Math.PI * 0.2], scale: 0.9, version: "v2", groupRotation: group3Rotation });

		return instances;
	}, []);

	const wing2Instances = useMemo(() => {
		const instances = [];

		// Group 1 (rotation: [0, 0, 0])
		instances.push({ position: [4, 0, 0.16], rotation: [0, Math.PI, 0], scale: 1, version: "default" });
		instances.push({ position: [1.5, 2.25, 0.36], rotation: [0, Math.PI, Math.PI * -0.125], scale: 2, version: "v3" });
		instances.push({ position: [1.25, -2.5, 0.36], rotation: [0, Math.PI, Math.PI * 0.2], scale: 0.9, version: "v2" });

		// Group 2 (rotation: [0, 0.85, 0])
		const group2Rotation = new THREE.Euler(0, 0.85, 0);
		instances.push({ position: [4, 0, 0.16], rotation: [0, Math.PI, 0], scale: 1, version: "default", groupRotation: group2Rotation });
		instances.push({ position: [1.5, 2.25, 0.36], rotation: [0, Math.PI, Math.PI * -0.125], scale: 2, version: "v3", groupRotation: group2Rotation });
		instances.push({ position: [1.25, -2.5, 0.36], rotation: [0, Math.PI, Math.PI * 0.2], scale: 0.9, version: "v2", groupRotation: group2Rotation });

		// Group 3 (rotation: [0, -0.85, 0])
		const group3Rotation = new THREE.Euler(0, -0.85, 0);
		instances.push({ position: [4, 0, 0.16], rotation: [0, Math.PI, 0], scale: 1, version: "default", groupRotation: group3Rotation });
		instances.push({ position: [1.5, 2.25, 0.36], rotation: [0, Math.PI, Math.PI * -0.125], scale: 2, version: "v3", groupRotation: group3Rotation });
		instances.push({ position: [1.25, -2.5, 0.36], rotation: [0, Math.PI, Math.PI * 0.2], scale: 0.9, version: "v2", groupRotation: group3Rotation });

		return instances;
	}, []);

	const [leftWing1Direction, setLeftWing1Direction] = useState(1);
	const [leftWing2Direction, setLeftWing2Direction] = useState(1);
	const [leftWing3Direction, setLeftWing3Direction] = useState(1);
	const [leftWing4Direction, setLeftWing4Direction] = useState(1);
	const [leftWing5Direction, setLeftWing5Direction] = useState(1);
	const [leftWing6Direction, setLeftWing6Direction] = useState(1);
	const [leftWing7Direction, setLeftWing7Direction] = useState(1);
	const [leftWing8Direction, setLeftWing8Direction] = useState(1);
	const [leftWing9Direction, setLeftWing9Direction] = useState(1);

	const [rightWing1Direction, setRightWing1Direction] = useState(1);
	const [rightWing2Direction, setRightWing2Direction] = useState(1);
	const [rightWing3Direction, setRightWing3Direction] = useState(1);
	const [rightWing4Direction, setRightWing4Direction] = useState(1);
	const [rightWing5Direction, setRightWing5Direction] = useState(1);
	const [rightWing6Direction, setRightWing6Direction] = useState(1);
	const [rightWing7Direction, setRightWing7Direction] = useState(1);
	const [rightWing8Direction, setRightWing8Direction] = useState(1);
	const [rightWing9Direction, setRightWing9Direction] = useState(1);

	const [eyeDirection, setEyeDirection] = useState(1);
	const [irisDirection, setIrisDirection] = useState(1);

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

		if (iris.current) {
			iris.current.position.x += delta * 0.05 * irisDirection;
			if (iris.current.position.x > 0.45 || iris.current.position.x < 0.25) {
				setIrisDirection((prev) => -prev);
			}
		}

		// Left Wing Group 1
		if (leftWing1Ref.current) {
			leftWing1Ref.current.rotation.y += delta * 0.08 * leftWing1Direction;
			if (leftWing1Ref.current.rotation.y > 0.3 || leftWing1Ref.current.rotation.y < -0.3) {
				setLeftWing1Direction((prev) => -prev);
			}
		}
		if (leftWing2Ref.current) {
			leftWing2Ref.current.rotation.y -= delta * 0.06 * leftWing2Direction;
			if (leftWing2Ref.current.rotation.y > 0.25 || leftWing2Ref.current.rotation.y < -0.25) {
				setLeftWing2Direction((prev) => -prev);
			}
		}
		if (leftWing3Ref.current) {
			leftWing3Ref.current.rotation.y += delta * 0.09 * leftWing3Direction;
			if (leftWing3Ref.current.rotation.y > 0.35 || leftWing3Ref.current.rotation.y < -0.35) {
				setLeftWing3Direction((prev) => -prev);
			}
		}

		// Left Wing Group 2
		if (leftWing4Ref.current) {
			leftWing4Ref.current.rotation.y -= delta * 0.07 * leftWing4Direction;
			if (leftWing4Ref.current.rotation.y > 0.28 || leftWing4Ref.current.rotation.y < -0.28) {
				setLeftWing4Direction((prev) => -prev);
			}
		}
		if (leftWing5Ref.current) {
			leftWing5Ref.current.rotation.y += delta * 0.05 * leftWing5Direction;
			if (leftWing5Ref.current.rotation.y > 0.2 || leftWing5Ref.current.rotation.y < -0.2) {
				setLeftWing5Direction((prev) => -prev);
			}
		}
		if (leftWing6Ref.current) {
			leftWing6Ref.current.rotation.y -= delta * 0.1 * leftWing6Direction;
			if (leftWing6Ref.current.rotation.y > 0.32 || leftWing6Ref.current.rotation.y < -0.32) {
				setLeftWing6Direction((prev) => -prev);
			}
		}

		// Left Wing Group 3
		if (leftWing7Ref.current) {
			leftWing7Ref.current.rotation.y += delta * 0.06 * leftWing7Direction;
			if (leftWing7Ref.current.rotation.y > 0.27 || leftWing7Ref.current.rotation.y < -0.27) {
				setLeftWing7Direction((prev) => -prev);
			}
		}
		if (leftWing8Ref.current) {
			leftWing8Ref.current.rotation.y -= delta * 0.09 * leftWing8Direction;
			if (leftWing8Ref.current.rotation.y > 0.33 || leftWing8Ref.current.rotation.y < -0.33) {
				setLeftWing8Direction((prev) => -prev);
			}
		}
		if (leftWing9Ref.current) {
			leftWing9Ref.current.rotation.y += delta * 0.07 * leftWing9Direction;
			if (leftWing9Ref.current.rotation.y > 0.29 || leftWing9Ref.current.rotation.y < -0.29) {
				setLeftWing9Direction((prev) => -prev);
			}
		}

		// Right Wing Group 1
		if (rightWing1Ref.current) {
			rightWing1Ref.current.rotation.y -= delta * 0.08 * rightWing1Direction;
			if (rightWing1Ref.current.rotation.y > 0.3 || rightWing1Ref.current.rotation.y < -0.3) {
				setRightWing1Direction((prev) => -prev);
			}
		}
		if (rightWing2Ref.current) {
			rightWing2Ref.current.rotation.y += delta * 0.06 * rightWing2Direction;
			if (rightWing2Ref.current.rotation.y > 0.25 || rightWing2Ref.current.rotation.y < -0.25) {
				setRightWing2Direction((prev) => -prev);
			}
		}
		if (rightWing3Ref.current) {
			rightWing3Ref.current.rotation.y -= delta * 0.09 * rightWing3Direction;
			if (rightWing3Ref.current.rotation.y > 0.35 || rightWing3Ref.current.rotation.y < -0.35) {
				setRightWing3Direction((prev) => -prev);
			}
		}

		// Right Wing Group 2
		if (rightWing4Ref.current) {
			rightWing4Ref.current.rotation.y += delta * 0.07 * rightWing4Direction;
			if (rightWing4Ref.current.rotation.y > 0.28 || rightWing4Ref.current.rotation.y < -0.28) {
				setRightWing4Direction((prev) => -prev);
			}
		}
		if (rightWing5Ref.current) {
			rightWing5Ref.current.rotation.y -= delta * 0.05 * rightWing5Direction;
			if (rightWing5Ref.current.rotation.y > 0.2 || rightWing5Ref.current.rotation.y < -0.2) {
				setRightWing5Direction((prev) => -prev);
			}
		}
		if (rightWing6Ref.current) {
			rightWing6Ref.current.rotation.y += delta * 0.1 * rightWing6Direction;
			if (rightWing6Ref.current.rotation.y > 0.32 || rightWing6Ref.current.rotation.y < -0.32) {
				setRightWing6Direction((prev) => -prev);
			}
		}

		// Right Wing Group 3
		if (rightWing7Ref.current) {
			rightWing7Ref.current.rotation.y -= delta * 0.06 * rightWing7Direction;
			if (rightWing7Ref.current.rotation.y > 0.27 || rightWing7Ref.current.rotation.y < -0.27) {
				setRightWing7Direction((prev) => -prev);
			}
		}
		if (rightWing8Ref.current) {
			rightWing8Ref.current.rotation.y += delta * 0.09 * rightWing8Direction;
			if (rightWing8Ref.current.rotation.y > 0.33 || rightWing8Ref.current.rotation.y < -0.33) {
				setRightWing8Direction((prev) => -prev);
			}
		}
		if (rightWing9Ref.current) {
			rightWing9Ref.current.rotation.y -= delta * 0.07 * rightWing9Direction;
			if (rightWing9Ref.current.rotation.y > 0.29 || rightWing9Ref.current.rotation.y < -0.29) {
				setRightWing9Direction((prev) => -prev);
			}
		}
	});

	return (
		<>
			<Perf position="top-left" />
			<OrbitControls />
			<Environment files="/scene8/HDR_sunset.hdr" background />
			{/* <Environment files="/scene8/HDR.hdr" background /> */}
			{/* <Sky distance={100} up={0} /> */}
			{/* <ambientLight intensity={1} /> */}
			{/* <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={10} /> */}
			{/* <Environment preset="sunset" background /> */}
			<Center position={position} rotation={[Math.PI, 0, 0]}>
				<group position={[0, 0, 0]} rotation={[0, 0, 0]}>
					<Wing innerRef={leftWing1Ref} position={[-4, 0, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing innerRef={leftWing2Ref} position={[-1.5, 2.25, 0.06]} scale={2} rotation={[0, 0, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing innerRef={leftWing3Ref} position={[-1.25, -2.5, 0.3]} scale={0.9} rotation={[0, 0, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group>
				{/* <group position={[0, 0, 0]} rotation={[0, 0.85, 0]}>
					<Wing innerRef={leftWing4Ref} position={[-4, 0, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing innerRef={leftWing5Ref} position={[-1.5, 2.25, 0.06]} scale={2} rotation={[0, 0, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing innerRef={leftWing6Ref} position={[-1.25, -2.5, 0.3]} scale={0.9} rotation={[0, 0, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group> */}
				{/* <group position={[0, 0, 0]} rotation={[0, -0.85, 0]}>
					<Wing innerRef={leftWing7Ref} position={[-4, 0, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing innerRef={leftWing8Ref} position={[-1.5, 2.25, 0.06]} scale={2} rotation={[0, 0, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing innerRef={leftWing9Ref} position={[-1.25, -2.5, 0.3]} scale={0.9} rotation={[0, 0, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group> */}
				<group position={[0, 0, 0]} rotation={[0, 0, 0]}>
					<Wing2 innerRef={rightWing1Ref} position={[4, 0, 0.16]} scale={1} rotation={[0, Math.PI, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing2 innerRef={rightWing2Ref} position={[1.5, 2.25, 0.36]} scale={2} rotation={[0, Math.PI, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing2 innerRef={rightWing3Ref} position={[1.25, -2.5, 0.36]} scale={0.9} rotation={[0, Math.PI, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group>
				{/* <group position={[0, 0, 0]} rotation={[0, 0.85, 0]}>
					<Wing2 innerRef={rightWing4Ref} position={[4, 0, 0.16]} scale={1} rotation={[0, Math.PI, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing2 innerRef={rightWing5Ref} position={[1.5, 2.25, 0.36]} scale={2} rotation={[0, Math.PI, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing2 innerRef={rightWing6Ref} position={[1.25, -2.5, 0.36]} scale={0.9} rotation={[0, Math.PI, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
				</group> */}
				{/* <group position={[0, 0, 0]} rotation={[0, -0.85, 0]}>
					<Wing2 innerRef={rightWing7Ref} position={[4, 0, 0.16]} scale={1} rotation={[0, Math.PI, 0]} pivot={[0, 0, 0]} version="default" />
					<Wing2 innerRef={rightWing8Ref} position={[1.5, 2.25, 0.36]} scale={2} rotation={[0, Math.PI, Math.PI * -0.125]} pivot={[0, 0, 0]} version="v3" />
					<Wing2 innerRef={rightWing9Ref} position={[1.25, -2.5, 0.36]} scale={0.9} rotation={[0, Math.PI, Math.PI * 0.2]} pivot={[0, 0, 0]} version="v2" />
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
