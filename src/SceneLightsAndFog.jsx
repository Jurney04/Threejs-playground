import React from "react";
import * as THREE from "three";

export const SceneLightsAndFog = React.forwardRef((props, ref) => {
	const cones = [];
	for (let i = 0; i < 5; i++) {
		cones.push(
			<mesh key={i} scale={2.5} position={[-1.25, 10, -0.5 * i]}>
				<coneGeometry args={[4 - 0.25 * i, 20, 30, 1, true]} />
				<meshStandardMaterial color="#fdf144" opacity={0.1} transparent={true} depthWrite={false} />
			</mesh>
		);
	}

	return (
		<>
			<ambientLight intensity={0.5} />
			<spotLight position={[0, 10, 0]} angle={0.65} penumbra={1} intensity={10000} color="gold"/>
			<directionalLight position={[0, 10, 0]} intensity={1} />
			<pointLight position={[-10, -10, -10]} />
			{/* <fogExp2 attach="fog" args={[0xf0f0f0, 0.075]} /> */}
			{cones}
		</>
	);
});
