import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { useLoader, extend } from "@react-three/fiber";
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { useFrame } from "@react-three/fiber";

extend({ TextGeometry });

function Shape({ texts, position = [0, 0, 0], size = 5, scale, rotation, onClick }) {
	// Add onClick prop
	const font = useLoader(FontLoader, "/fonts/Black_Mustang.json");
	const meshRef = useRef();
	const meshColorRef = useRef();
	const meshColorRef2 = useRef();
	const colorRef = useRef(new THREE.Color(0.05, 0.05, 0.05));
	const colorRef2 = useRef(new THREE.Color(0.5, 0.5, 0.5));

	const [hovered, hover] = useState(false);

	useFrame((state, delta) => {
		if (hovered) {
			colorRef.current.lerp(new THREE.Color(1, 1, 1), delta * 5);
			colorRef2.current.lerp(new THREE.Color(1, 1, 1), delta * 5);
			if (meshColorRef.current && meshColorRef.current.material && meshColorRef.current.material[1]) {
				meshColorRef.current.material[1].color = colorRef.current;
			}
			if (meshRef.current) {
				meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), delta * 5);
			}
		} else {
			colorRef.current.lerp(new THREE.Color(0.05, 0.05, 0.05), delta * 5);
			colorRef2.current.lerp(new THREE.Color(0.5, 0.5, 0.5), delta * 5);
			if (meshColorRef.current && meshColorRef.current.material && meshColorRef.current.material[1]) {
				meshColorRef.current.material[1].color = colorRef.current;
			}
			if (meshRef.current) {
				meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 5);
				const floatOffset = Math.sin(state.clock.elapsedTime * 2) * 0.25;
				meshRef.current.position.x = position[0] + floatOffset;
				meshRef.current.position.y = position[1] + floatOffset;
			}
		}
	});

	if (!font) return null;
	const depth = 25;
	return (
		<>
			<group ref={meshRef} position={position} scale={scale} rotation={rotation}>
				<mesh
					ref={meshColorRef}
					position={[0, 0, 0]}
					scale={1}
					castShadow
					receiveShadow
					onPointerOver={(e) => (e.stopPropagation(), hover(true))}
					onPointerOut={() => hover(false)}
					onPointerDown={(e) => (e.stopPropagation(), onClick && onClick())} // Add click handler
				>
					<textGeometry
						args={[
							texts,
							{
								font: font,
								size: size,
								depth: depth,
								curveSegments: 12,
								bevelEnabled: true,
								bevelThickness: 0,
								bevelSize: 0,
								bevelOffset: 0,
								bevelSegments: 1,
							},
						]}
					/>
					<meshStandardMaterial attach="material-0" color="#1b1b1b" />
					<meshStandardMaterial attach="material-1" color={colorRef.current} />
				</mesh>
				<mesh ref={meshColorRef2} position={[0.02, 0, depth - 0.045]} scale={0.99} rotation={rotation}>
					<textGeometry
						args={[
							texts,
							{
								font: font,
								size: size,
								depth: 0.05,
								curveSegments: 12,
								bevelEnabled: true,
								bevelThickness: 0,
								bevelSize: 0.1,
								bevelOffset: 0,
								bevelSegments: 1,
							},
						]}
					/>
					<meshStandardMaterial attach="material-1" color={colorRef2.current} />
				</mesh>
			</group>
		</>
	);
}

export default Shape;
