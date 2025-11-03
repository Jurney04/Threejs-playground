import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function SpotlightBackground({ position, rotation, scale }) {
	const rectLightRef = useRef();
	const heightMax = 20 * scale;
	const widthMax = 110 * scale;
	const speed = 25; 
	const resetY = position[1] + 100; 
	const resetX = position[0] - 100; 
	const bottomY = position[1] - 100;

	useFrame((state, delta) => {
		
		rectLightRef.current.position.x += delta * speed;
		rectLightRef.current.position.y -= delta * speed;
		if (rectLightRef.current.position.y < bottomY) {
			rectLightRef.current.position.y = resetY;
			rectLightRef.current.position.x = resetX;
		}
	});

	return (
		<>
			<rectAreaLight
				ref={rectLightRef}
				color="white"
				intensity={2} 
				width={widthMax} 
				height={heightMax} 
				position={position}
				rotation={rotation}
				scale={scale}
			/>
		</>
	);
}

export default SpotlightBackground;
