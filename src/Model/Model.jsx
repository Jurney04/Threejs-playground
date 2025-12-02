import { useFrame } from "@react-three/fiber";
import React, { useRef, useEffect, useMemo } from "react";
import { useFBX } from "@react-three/drei";
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
		const materials = [
			new THREE.MeshStandardMaterial({ color: "darkblue", roughness: 1, metalness: 0.5, transparent: false, opacity: 1.0, side: THREE.DoubleSide }),
			new THREE.MeshPhysicalMaterial({
				color: "white",
				roughness: 0.1,
				metalness: 0,
				transmission: 0.9, // Half transparent
				ior: 5, // Index of refraction for distortion
				thickness: 0.5, // Amount of distortion
				side: THREE.DoubleSide,
			}),
			new THREE.MeshPhysicalMaterial({
				color: "white",
				roughness: 0.1,
				metalness: 0,
				transmission: 0.9, // Half transparent
				ior: 5, // Index of refraction for distortion
				thickness: 0.5, // Amount of distortion
				side: THREE.DoubleSide,
			}),
			new THREE.MeshStandardMaterial({ color: "black", roughness: 0.3, metalness: 0.9, transparent: false, opacity: 1.0, side: THREE.DoubleSide }),
			new THREE.MeshStandardMaterial({ color: "white", roughness: 0.3, metalness: 0.9, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
			new THREE.MeshStandardMaterial({ color: "gold", roughness: 0.3, metalness: 0.9, transparent: false, opacity: 1.0, side: THREE.DoubleSide }),
			new THREE.MeshStandardMaterial({ color: "gold", roughness: 0.3, metalness: 0.9, transparent: false, opacity: 1.0, side: THREE.DoubleSide }),
			new THREE.MeshStandardMaterial({ color: "grey", roughness: 0, metalness: 0.5, transparent: false, opacity: 1.0, side: THREE.DoubleSide }),
		];

		clonedFbx.traverse((child) => {
			if (child.isMesh) {
				child.material = materials[parts.length % materials.length];
				parts.push(child);
				child.originalPosition = child.position.clone();
				child.originalRotation = child.rotation.clone();
			}
		});
		const timeline = gsap.timeline({
			// repeat: -1,
			// yoyo: true,
			// repeatDelay: 1,
		});

		return () => {
			timeline.kill();
			parts.forEach((part) => {
				if (part.originalPosition) {
					part.position.copy(part.originalPosition);
				}
				if (part.originalRotation) {
					part.rotation.copy(part.originalRotation);
				}
			});
		};
	}, [clonedFbx]);

	useEffect(() => {
		if (group.current) {
			const timeline = gsap.timeline({
				scrollTrigger: {
					trigger: "body",
					start: "top top",
					end: "bottom bottom",
					scrub: 5,
				},
				// repeat: -1,
				// yoyo: true,
				// repeatDelay: 1,
			});

			timeline
				.to(
					group.current.rotation,
					{
						x: -0.25,
						z: 0.5,
						duration: 2,
						ease: "power1.inOut",
					},
					"0.5"
				)
				.to(
					group.current.position,
					{
						x: 2.25,
						duration: 2,
						ease: "power1.inOut",
					},
					"0.5"
				)
				.to(
					group.current.scale,
					{
						x: 1.25,
						y: 1.25,
						z: 1.25,
						duration: 2,
						ease: "power1.inOut",
					},
					"3"
				)
				.to(
					group.current.children[0].position,
					{
						y: 0.5,
						duration: 2,
						ease: "power1.inOut",
					},
					"4"
				)
				.to(
					group.current.children[7].position,
					{
						y: -1,
						duration: 2,
						ease: "power1.inOut",
					},
					"4"
				)
				.to(
					group.current.children[1].position,
					{
						x: -0.5,
						duration: 2,
						ease: "power1.inOut",
					},
					"5"
				)
				.to(
					group.current.children[1].rotation,
					{
						y: -0.5,
						duration: 2,
						ease: "power1.inOut",
					},
					"5"
				)
				.to(
					group.current.children[2].position,
					{
						x: 0.5,
						duration: 2,
						ease: "power1.inOut",
					},
					"5"
				)
				.to(
					group.current.children[2].rotation,
					{
						y: -0.5,
						duration: 2,
						ease: "power1.inOut",
					},
					"5"
				)
				.to(
					group.current.children[3].position,
					{
						y: 0.5,
						duration: 2,
						ease: "power1.inOut",
					},
					"5"
				)
				.to(
					group.current.children[4].position,
					{
						y: 0.35,
						duration: 2,
						ease: "power1.inOut",
					},
					"4"
				)
				.to(
					group.current.children[5].position,
					{
						y: 0.15,
						duration: 2,
						ease: "power1.inOut",
					},
					"4"
				)
				.to(
					group.current.children[6].position,
					{
						y: 0.15,
						duration: 2,
						ease: "power1.inOut",
					},
					"4"
				)
				.to(
					group.current.rotation,
					{
						z: 1.575,
						x: 0,
						y: 0,
						duration: 2,
						ease: "power1.inOut",
					},
					"5.5"
				)
				.to(
					group.current.position,
					{
						x: 3,
						y: -0.5,
						z: -1,
						duration: 2,
						ease: "power1.inOut",
					},
					"5.5"
				)
				.to(
					group.current.position,
					{
						x: 6.5,
						y: -0.5,
						z: -1,
						duration: 2,
						ease: "power1.inOut",
					},
					"7"
				)
				.to(
					group.current.rotation,
					{
						z: 0,

						duration: 2,
						ease: "power1.inOut",
					},
					"9"
				)
				.to(
					group.current.position,
					{
						x: 0,
						y: -6,
						duration: 2,
						ease: "power1.inOut",
					},
					"9"
				)
				.to(
					group.current.position,
					{
						x: 0,
						y: -3.5,
						duration: 2,
						ease: "power1.inOut",
					},
					"11"
				)
				.to(
					group.current.children[7].position,
					{
						x: 0,
						y: -3,
						duration: 2,
						ease: "power1.inOut",
					},
					"11"
				)
				.to(
					group.current.position,
					{
						x: -1.4,
						y: -0.15,
						z: 2.3,
						duration: 2,
						ease: "power1.inOut",
					},
					"13"
				)
				.to(
					group.current.rotation,
					{
						x: -1.5,
						z: -0.5,
						duration: 2,
						ease: "power1.inOut",
					},
					"13"
				)
				.to(
					group.current.position,
					{
						x: -2.2,
						y: -0.15,
						z: 1.8,
						duration: 2,
						ease: "power1.inOut",
					},
					"15"
				)
				.to(
					group.current.rotation,
					{
						x: -1.5,
						z: -0.75,
						duration: 2,
						ease: "power1.inOut",
					},
					"15"
				)
				.to(
					group.current.children[5].position,
					{
						y: 0.35,
						duration: 2,
						ease: "power1.inOut",
					},
					"15"
				)
				.to(
					group.current.children[6].position,
					{
						y: 0.35,
						duration: 2,
						ease: "power1.inOut",
					},
					"15"
				)
				.to(
					group.current.position,
					{
						x: 0,
						y: 3.2,
						z: -1,
						duration: 2,
						ease: "power1.inOut",
					},
					"17"
				)
				.to(
					group.current.rotation,
					{
						x: -3.14,
						z: 0,
						y: 0,
						duration: 2,
						ease: "power1.inOut",
					},
					"17"
				)
				.to(
					group.current.position,
					{
						x: 0,
						y: 3.2,
						z: -2,
						duration: 2,
						ease: "power1.inOut",
					},
					"19"
				)
				.to(
					group.current.children[0].position,
					{
						y: 0,
						duration: 2,
						ease: "power1.inOut",
					},
					"20"
				)
				.to(
					group.current.children[3].position,
					{
						y: 0,
						duration: 2,
						ease: "power1.inOut",
					},
					"20"
				)
				.to(
					group.current.children[4].position,
					{
						y: 0,
						duration: 2,
						ease: "power1.inOut",
					},
					"20"
				)
				.to(
					group.current.children[5].position,
					{
						y: 0,
						duration: 2,
						ease: "power1.inOut",
					},
					"20"
				)
				.to(
					group.current.children[6].position,
					{
						y: 0,
						duration: 2,
						ease: "power1.inOut",
					},
					"20"
				)
				.to(
					group.current.children[1].position,
					{
						x: 0,
						duration: 3,
						ease: "power1.inOut",
					},
					"21"
				)
				.to(
					group.current.children[2].position,
					{
						x: 0,
						duration: 3,
						ease: "power1.inOut",
					},
					"21"
				)
				.to(
					group.current.rotation,
					{
						y: 6.2,
						duration: 3,
						ease: "power1.inOut",
					},
					"21"
				)
				.to(
					group.current.children[7].position,
					{
						y: 0,
						duration: 2,
						ease: "power1.inOut",
					},
					"24"
				)
				.to(
					group.current.position,
					{
						y: 5,
						z: -5,
						duration: 2,
						ease: "power1.inOut",
					},
					"24"
				);
		}
	}, []);

	return <primitive object={clonedFbx} ref={group} position={[0, -3, -5]} dispose={null} />;
}
export default Model;
