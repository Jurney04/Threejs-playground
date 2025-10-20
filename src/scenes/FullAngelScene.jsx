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
				position={[-1.5, 20, 0]}
				scale={[15, 80, 15]}
				threshold={0.75}
				opacity={0.04}
				range={0.8}
				steps={500}
				g={0.7}
				rayVisibility={0.5}
				enableRays={true}
				lightPosition={lightPosition}
				lightDirection={lightDirection}
				lightColor={lightColor}
				lightAngle={lightAngle}
				lightIntensity={lightIntensity}
				base={[0.8, 0.8, 0.8]}
				frustumCulled={false}
				renderOrder={1}
			/>

			<CloudComponent position={[-50, 15, -65]} scale={[80, 50, 50]} threshold={0.8175} opacity={0.5} range={0.7} steps={500} g={0} enableRays={false} base={[0.35, 0.35, 0.35]} frustumCulled={false} renderOrder={1} />

			<CloudComponent position={[25, 40, -35]} scale={[50, 40, 40]} threshold={0.8175} opacity={0.5} range={0.8} steps={500} g={0} enableRays={false} base={[0.35, 0.35, 0.35]} frustumCulled={false} renderOrder={1} />

			<InstancedAngel position={[0, 0, 0]} onModelLoad={onModelLoad} />
		</>
	);
}	
export default FullAngelScene;
