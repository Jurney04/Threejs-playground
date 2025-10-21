import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { useLoader, extend } from "@react-three/fiber";
import { useRef } from "react";

extend({ TextGeometry });

function TextComponent() {
	// Load the font using FontLoader (via useLoader from react-three-fiber)
	const font = useLoader(FontLoader, "/fonts/Black_Mustang.json");

	// Ref for the mesh
	const meshRef = useRef();

	return (
		<>
			<mesh ref={meshRef} position={[-30, -10, -50]} castShadow receiveShadow>
				<textGeometry
					args={[
						"HuuuuuuuH   Wha s gong on.",
						{
							font: font, // Use the loaded font
							size: 5,
							depth: 25,
							curveSegments: 12,
							bevelEnabled: false, // Keep disabled if you don't want sides
							bevelThickness: 10,
							bevelSize: 8,
							bevelOffset: 0,
							bevelSegments: 5,
						},
					]}
				/>
				{/* Materials for groups: 0=front, 1=sides/bevel (sides won't apply since bevelEnabled=false) */}
				<meshStandardMaterial attach="material-0" color="black" /> {/* Front face */}
				<meshStandardMaterial attach="material-1" color="white" /> {/* Sides/bevel (inactive) */}
			</mesh>
		</>
	);
}

export default TextComponent;
