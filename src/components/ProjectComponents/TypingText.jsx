import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { useLoader, extend } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

extend({ TextGeometry });

function TypingText({ texts, position = [0, 0, 0], size = 5, typingSpeed = 100, pauseBetween = 2000 }) {
	
	const font = useLoader(FontLoader, "/fonts/Black_Mustang.json");

	const lightRef = useRef();
	const colorRef = useRef(new THREE.Color()); 
	
	const meshRef = useRef();

	const textArray = texts ? (Array.isArray(texts) ? texts : [texts]) : [];

	
	const [displayedText, setDisplayedText] = useState("");
	
	const [currentIndex, setCurrentIndex] = useState(0);
	
	const [isTyping, setIsTyping] = useState(true);

	useEffect(() => {
		if (meshRef.current && font) {
			const geometry = meshRef.current.geometry;
			geometry.computeBoundingBox();
			const center = new THREE.Vector3();
			geometry.boundingBox.getCenter(center);
			geometry.translate(-center.x, -center.y, -center.z);
		}
	}, [font, displayedText, size]);

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
					setIsTyping(false); 
				}
			}, typingSpeed);
			return () => clearInterval(interval);
		} else {
			const timeout = setTimeout(() => {
				setCurrentIndex((prev) => prev + 1);
				setDisplayedText(""); 
				setIsTyping(true); 
			}, pauseBetween);
			return () => clearTimeout(timeout);
		}
	}, [currentIndex, isTyping, textArray, typingSpeed, pauseBetween]);

	useFrame((state, delta) => {
		const hue = (state.clock.elapsedTime * 0.1) % 1; 
		colorRef.current.setHSL(hue, 1, 0.5); 
		if (lightRef.current) {
			lightRef.current.color = colorRef.current;
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

export default TypingText;
