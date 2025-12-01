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
			new THREE.MeshStandardMaterial({ color: "darkblue", roughness: 1, metalness: 0.5, transparent: false, opacity: 1.0, side: THREE.DoubleSide }),
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
					scrub: 2,
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
					"0"
				)
				.to(
					group.current.position,
					{
						x: 1.75,
						duration: 2,
						ease: "power1.inOut",
					},
					"0"
				)
				.to(group.current.position, {
					x: 2.25,
					duration: 2,
					ease: "power1.inOut",
				})
				.to(
					group.current.scale,
					{
						x: 1.25,
						y: 1.25,
						z: 1.25,
						duration: 2,
						ease: "power1.inOut",
					},
					"1"
				)
				.to(
					group.current.children[0].position,
					{
						y: 0.5,
						duration: 2,
						ease: "power1.inOut",
					},
					"2"
				)
				.to(
					group.current.children[7].position,
					{
						y: -1,
						duration: 2,
						ease: "power1.inOut",
					},
					"2"
				)
				.to(
					group.current.children[1].position,
					{
						x: -0.5,
						duration: 2,
						ease: "power1.inOut",
					},
					"3"
				)
				.to(
					group.current.children[2].position,
					{
						x: 0.5,
						duration: 2,
						ease: "power1.inOut",
					},
					"3"
				)
				.to(
					group.current.children[3].position,
					{
						y: 0.5,
						duration: 2,
						ease: "power1.inOut",
					},
					"4"
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
						y: -0.25,
						duration: 2,
						ease: "power1.inOut",
					},
					"4"
				)
				.to(
					group.current.position,
					{
						x: 1,
						y: -1.5,
						z: 0,
						duration: 2,
						ease: "power1.inOut",
					},
					"6"
				)
				.to(
					group.current.rotation,
					{
						x: -0.5,
						y: -0.75,
						duration: 2,
						ease: "power1.inOut",
					},
					"6"
				)
				.to(
					group.current.position,
					{
						x: 3,
						y: -5.5,
						z: 5,
						duration: 4,
						ease: "power1.inOut",
					},
					"8"
				);
		}
	}, []);

	return <primitive object={clonedFbx} ref={group} position={[0, -3, -5]} dispose={null} />;
}
export default Model;
