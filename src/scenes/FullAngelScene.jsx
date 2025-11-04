import React from "react";
import { InstancedAngel } from "../Angel/InstancedAngel.jsx";
import { SceneLightsAndFog } from "../Angel/SceneLightsAndFog.jsx";
import CloudComponent from "../Angel/cloudComponent.jsx";
import * as THREE from "three";

// Static light props (kept as is)
const lightPosition = [0, 15, -5];
const targetPosition = [0, -15, 0];
const lightColor = [1, 0.8, 0.6];
const lightAngle = 0.5;
const lightIntensity = 0.5;
const lightDirection = new THREE.Vector3(...targetPosition)
	.sub(new THREE.Vector3(...lightPosition))
	.normalize()
	.toArray();

export function FullAngelScene({ onModelLoad }) {
	return (
		<>
			<SceneLightsAndFog />

			<CloudComponent
				position={[0, 20, -25]}
				scale={[15, 80, 15]}
				threshold={0.7}
				opacity={0.07}
				range={0.8}
				steps={600}
				g={0.85}
				rayVisibility={1.2}
				enableRays={true}
				lightPosition={[0, 15, -5]}
				lightDirection={[0, -0.5, -0.3]}
				lightColor={[1.0, 0.95, 0.85]}
				lightIntensity={2.5}
				base={[1.0, 0.95, 0.9]}
			/>

			<CloudComponent position={[-60, -5, -65]} scale={[80, 50, 50]} threshold={0.8175} opacity={0.5} range={0.7} steps={500} g={0} enableRays={false} base={[0.35, 0.35, 0.35]} frustumCulled={false} renderOrder={1} rotation="false" />

			<CloudComponent position={[25, 30, -35]} scale={[50, 40, 40]} threshold={0.8175} opacity={0.5} range={0.8} steps={500} g={0} enableRays={false} base={[0.35, 0.35, 0.35]} frustumCulled={false} renderOrder={1} rotation="false" />

			<InstancedAngel position={[1.5, 5, -20]} onModelLoad={onModelLoad} />
		</>
	);
}
export default FullAngelScene;
