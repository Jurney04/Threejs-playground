import React, { forwardRef } from "react";
import { Text } from "@react-three/drei";

const DynamicText = forwardRef(({ text, position, rotation = [0, 0, 0], scale = 1, opacity = 1 }, ref) => {
	return (
		<Text ref={ref} position={position} rotation={rotation} opacity={opacity} scale={scale} color="white" anchorX="center" anchorY="middle" material-transparent={true} material-alphaTest={0.2} material-opacity={opacity}>
			{text}
		</Text>
	);
});

export default DynamicText;
