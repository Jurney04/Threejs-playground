import React, { useRef } from "react";
import { SpotLight } from "@react-three/drei";

function Spotlight({ position = [0, 15, -5], targetPosition = [0, 0, 0], color = [1, 0.5, 0], angle = 0.65, intensity = 5.0 }) {
	const lightRef = useRef();

	return (
		<SpotLight
			ref={lightRef}
			position={position}
			color={`rgb(${Math.floor(color[0] * 255)}, ${Math.floor(color[1] * 255)}, ${Math.floor(color[2] * 255)})`}
			angle={angle}
			intensity={intensity}
			penumbra={0.65}
			castShadow
			target-position={targetPosition}
			power={5500}
			decay={0}
			distance={50} // Extended for full path illumination
		/>
	);
}

export default Spotlight;
