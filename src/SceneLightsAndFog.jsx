import React from "react";
import * as THREE from "three";

export function SceneLightsAndFog() {
	return (
		<>
			<ambientLight intensity={0.5} />
			<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={100} />
			<directionalLight position={[0, 10, 0]} intensity={1} />
			<pointLight position={[-10, -10, -10]} />
			<fogExp2 attach="fog" args={["#f0f0f0", 1]} />
		</>
	);
}
