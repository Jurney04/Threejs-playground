import * as THREE from "three";
import { useLoader, extend } from "@react-three/fiber";
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";

function BackgroundPlane() {
	const [planeHovered, setPlaneHovered] = useState(false);
	const planeRef = useRef();
	const texture = useLoader(THREE.TextureLoader, "/night.jpg");

	useFrame((state, delta) => {
		if (planeHovered) {
			if (planeRef.current && planeRef.current.material) {
				planeRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(planeRef.current.material.emissiveIntensity, 0.5, delta * 3);
			}
		} else {
			if (planeRef.current && planeRef.current.material) {
				planeRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
					planeRef.current.material.emissiveIntensity,
					0, // Target 0
					delta * 3
				);
			}
		}
	});

	return (
		<>
			<mesh ref={planeRef} scale={27.5} position={[0, 0, -100]}>
				<planeGeometry args={[15, 10]} />
				<meshStandardMaterial map={texture} emissiveMap={texture} emissive={new THREE.Color(1, 1, 1)} emissiveIntensity={0} />
			</mesh>
		</>
	);
}

export default BackgroundPlane;
