import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { useLoader, extend } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

extend({ TextGeometry });

function TextComponent({ texts, position = [0, 0, 0], size = 5, typingSpeed = 100, pauseBetween = 2000 }) {
	// Accept texts (string or array), position, size, typingSpeed (ms per char), pauseBetween (ms between sentences)
	// Load the font using FontLoader (via useLoader from react-three-fiber)
	const font = useLoader(FontLoader, "/fonts/Black_Mustang.json");

	const lightRef = useRef();
	const colorRef = useRef(new THREE.Color()); // Use a ref for the color object
	// Ref for the mesh
	const meshRef = useRef();

	// Normalize texts to array, handle undefined/null
	const textArray = texts ? (Array.isArray(texts) ? texts : [texts]) : [];

	// State for the displayed text (typewriter effect)
	const [displayedText, setDisplayedText] = useState("");
	// State for current sentence index
	const [currentIndex, setCurrentIndex] = useState(0);
	// State for typing phase
	const [isTyping, setIsTyping] = useState(true);

	useEffect(() => {
		if (meshRef.current && font) {
			// Compute the bounding box and center the geometry
			const geometry = meshRef.current.geometry;
			geometry.computeBoundingBox();
			const center = new THREE.Vector3();
			geometry.boundingBox.getCenter(center);
			geometry.translate(-center.x, -center.y, -center.z); // Center the geometry
		}
	}, [font, displayedText, size]);

	// Typewriter and sequence effect
	useEffect(() => {
		if (!textArray || textArray.length === 0 || currentIndex >= textArray.length) return;

		const currentText = textArray[currentIndex];

		if (isTyping) {
			let i = 0;
			const interval = setInterval(() => {
				setDisplayedText(currentText.slice(0, i + 1));
				i++;
				if (i >= currentText.length) {
					clearInterval(interval);
					setIsTyping(false); // Switch to pause phase
				}
			}, typingSpeed);
			return () => clearInterval(interval);
		} else {
			// Pause phase
			const timeout = setTimeout(() => {
				setCurrentIndex((prev) => prev + 1);
				setDisplayedText(""); // Clear text for next sentence
				setIsTyping(true); // Start typing next
			}, pauseBetween);
			return () => clearTimeout(timeout);
		}
	}, [currentIndex, isTyping, textArray, typingSpeed, pauseBetween]);

	useFrame((state, delta) => {
		// Cycle hue from 0 to 1 over time for a rainbow effect
		const hue = (state.clock.elapsedTime * 0.1) % 1; // Adjust 0.1 for speed
		colorRef.current.setHSL(hue, 1, 0.5); // Full saturation, medium lightness
		if (lightRef.current) {
			lightRef.current.color = colorRef.current; // Update the light's color
		}
	});
	return (
		<>
			<mesh ref={meshRef} position={position} castShadow receiveShadow>
				<textGeometry
					args={[
						displayedText,
						{
							font: font,
							size: size,
							depth: 25,
							curveSegments: 12,
							bevelEnabled: false,
							bevelThickness: 10,
							bevelSize: 8,
							bevelOffset: 0,
							bevelSegments: 5,
						},
					]}
				/>
				<meshStandardMaterial attach="material-0" color="black" />
				<meshStandardMaterial ref={lightRef} attach="material-1" color={colorRef} />
			</mesh>
		</>
	);
}

export default TextComponent;
