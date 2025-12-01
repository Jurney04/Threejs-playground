import React, { useRef, useEffect, useMemo } from "react";
import { useFBX } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

function Model({ url }) {
	const group = useRef();
	const fbx = useFBX(url);

	const clonedFbx = useMemo(() => fbx.clone(), [fbx]);
	//child0 --> top cover
	//child1 --> plastic lining 1
	//child2 --> plastic lining 2
	//child3 --> tube
	//child4 --> metal cap
	//child5 --> ball holder
	//child6 --> rolling ball
	//child7 --> cap
	useEffect(() => {
		const parts = [];
		clonedFbx.traverse((child) => {
			if (child.isMesh) {
				parts.push(child);
				child.originalPosition = child.position.clone();
			}
		});

		const timeline = gsap.timeline({
			defaults: { duration: 1, ease: "power2.inOut" },
			repeat: -1,
			yoyo: true,
			repeatDelay: 1,
		});

		parts.forEach((part) => {
			const explosionFactor = 1.5;
			const targetPosition = part.originalPosition.clone().multiplyScalar(explosionFactor);
			timeline.to(
				part.position,
				{
					x: targetPosition.x,
					y: targetPosition.y,
					z: targetPosition.z,
				},
				0
			);
		});

		return () => {
			timeline.kill();
			parts.forEach((part) => {
				part.position.copy(part.originalPosition);
			});
		};
	}, [clonedFbx]);

	useEffect(() => {
		if (group.current) {
			gsap.to(group.current.rotation, {
				x: -0.25,
				z: 0.5,
				duration: 2,
				ease: "power1.inOut",
				repeat: 0,
				// yoyo: true,
			});
			gsap.to(group.current.position, {
				x: 1.75,
				duration: 2,
				ease: "power1.inOut",
				repeat: 0,
				// yoyo: true,
			});
		}
	}, []);

	return <primitive object={clonedFbx} ref={group} position={[0, -3, -5]} dispose={null} />;
}

export default function ExplodedView() {
	return (
		<>
			<ambientLight intensity={1.5} />
			<directionalLight position={[10, 10, 5]} intensity={2.5} />
			<Model url="/BIC-static.fbx" />
		</>
	);
}

useFBX.preload("/BIC-static.fbx");
