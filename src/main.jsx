import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./index.css";
import Scene7 from "./Scene7.jsx";
import Angel from "./Scene8.jsx";
import InstancedAngel from "./Scene9.jsx";
import { SceneLightsAndFog } from "./SceneLightsAndFog";
import CloudComponent from "./cloudComponent.jsx";
import Spotlight from "./Spotlight.jsx";

// Static light props (tuned for full-distance rays)
const lightPosition = [0, 15, -5];
const targetPosition = [0, -15, 0]; // Long path
const lightColor = [1, 0.8, 0.6];
const lightAngle = 0.5; // Slightly wider for better cone coverage
const lightIntensity = 0.5; // Balanced high for strong rays

// Dynamic direction
const lightDirection = new THREE.Vector3(...targetPosition)
	.sub(new THREE.Vector3(...lightPosition))
	.normalize()
	.toArray();

createRoot(document.getElementById("root")).render(
	<>
		<Canvas dpr={window.devicePixelRatio} camera={{ position: [0, 0, 20], rotation: [Math.PI, 0, 0] }}>
			<OrbitControls />

			{/* <Scene6 /> */}
			{/* <Scene7 /> */}
			{/* <Scene8 position={[-10, 0, 0]} /> */}
			{/* <Angel position={[0, 0, 0]} /> */}

			<SceneLightsAndFog />

			{/* Spotlight for real surface illumination (uncommented for angel lighting) */}
			{/* <Spotlight position={lightPosition} targetPosition={targetPosition} color={lightColor} angle={lightAngle} intensity={lightIntensity} /> */}

			{/* Ray-reflecting mist (your exact values; enableRays=true – static, no rotation) */}
			<CloudComponent
				position={[-1, 20, 0]} // Your value
				scale={[15, 60, 15]} // Your value
				threshold={0.75} // Your value
				opacity={0.025} // Your value
				range={0.8} // Your value
				steps={500} // Your value
				g={0.7} // Your value
				rayVisibility={0.1} // Your value
				enableRays={true} // Enables rays (static mist)
				lightPosition={lightPosition}
				lightDirection={lightDirection}
				lightColor={lightColor}
				lightAngle={lightAngle}
				lightIntensity={lightIntensity}
				base={[0.8, 0.8, 0.8]} // Uniform gray (your value, no tint variation)
				frustumCulled={false} // Prevents culling glitches
				renderOrder={1}
			/>

			{/* Thick cloud 1 in beam path (upper; basic, no rays – light shines through) */}
			<CloudComponent
				position={[0, 8, 0]} // Intersects upper beam near mist
				scale={[12, 8, 12]} // Compact thick puff (no overlap with mist)
				threshold={0.8} // High: Dense/thick for light piercing
				opacity={0.8} // High: Opaque but volumetric
				range={0.6} // Tighter for defined edges
				steps={500}
				g={0}
				enableRays={false} // No rays – pure volume (rotates slowly)
				base={[0.35, 0.35, 0.35]} // Uniform gray
				frustumCulled={false} // No culling
				renderOrder={1}
			/>

			{/* Thick cloud 2 in beam path (near angel; basic, no rays – light shines through) */}
			<CloudComponent
				position={[0, -2, 0]} // Intersects lower beam at angel level
				scale={[10, 6, 10]} // Smaller thick puff (no overlap)
				threshold={0.8} // High: Dense
				opacity={0.8} // High: Thick attenuation
				range={0.6} // Tighter edges
				steps={500}
				g={0}
				enableRays={false} // No rays (rotates)
				base={[0.35, 0.35, 0.35]} // Uniform gray
				frustumCulled={false}
				renderOrder={1}
			/>

			{/* Basic cloud 1 (no rays; your values – larger/farther for surround) */}
			<CloudComponent
				position={[-45, 5, 0]} // Farther (no interference)
				scale={[50, 50, 50]} // Larger for distant presence
				threshold={0.8175} // Your value
				opacity={0.5} // Your value
				range={0.75} // Your value
				steps={500} // Your value
				g={0} // Your value
				enableRays={false} // No rays (rotates slowly)
				base={[0.35, 0.35, 0.35]} // Uniform gray
				frustumCulled={false}
				renderOrder={1}
			/>

			{/* Basic cloud 2 (no rays; your values – larger/farther for surround) */}
			<CloudComponent
				position={[-20, 15, -35]} // Farther (no interference)
				scale={[80, 50, 50]} // Larger for horizon scale
				threshold={0.8175} // Your value
				opacity={0.5} // Your value
				range={0.7} // Slight variation for puffier edges
				steps={500} // Your value
				g={0} // Your value
				enableRays={false} // No rays (rotates)
				base={[0.35, 0.35, 0.35]} // Uniform gray
				frustumCulled={false}
				renderOrder={1}
			/>

			{/* Basic cloud 3 (no rays; your values – larger/farther for surround) */}
			<CloudComponent
				position={[25, 40, -35]} // Farther (no interference)
				scale={[50, 40, 40]} // Larger for high distant puff
				threshold={0.8175} // Your value
				opacity={0.5} // Your value
				range={0.8} // Slight variation for softer blending
				steps={500} // Your value
				g={0} // Your value
				enableRays={false} // No rays (rotates)
				base={[0.35, 0.35, 0.35]} // Uniform gray
				frustumCulled={false}
				renderOrder={1}
			/>

			{/* Surrounding basic cloud 1 (larger/farther; no rays) */}
			<CloudComponent
				position={[25, 5, 25]} // Farther right-front (no mist overlap)
				scale={[25, 20, 25]} // Larger for distant surround
				threshold={0.8175} // Your value
				opacity={0.5} // Your value
				range={0.75} // Your value
				steps={500} // Your value
				g={0}
				enableRays={false} // No rays (rotates)
				base={[0.35, 0.35, 0.35]} // Uniform gray
				frustumCulled={false}
				renderOrder={1}
			/>

			{/* Surrounding basic cloud 2 (larger/farther; no rays) */}
			<CloudComponent
				position={[-25, 8, -25]} // Farther left-back (no overlap)
				scale={[30, 25, 30]} // Larger for enveloping feel
				threshold={0.8175} // Your value
				opacity={0.5} // Your value
				range={0.75} // Your value
				steps={500} // Your value
				g={0}
				enableRays={false} // No rays (rotates)
				base={[0.35, 0.35, 0.35]} // Uniform gray
				frustumCulled={false}
				renderOrder={1}
			/>

			{/* Surrounding basic cloud 3 (larger/farther; no rays) */}
			<CloudComponent
				position={[20, -5, 30]} // Farther right-low (no overlap)
				scale={[20, 15, 20]} // Larger for low horizon
				threshold={0.8175} // Your value
				opacity={0.5} // Your value
				range={0.75} // Your value
				steps={500} // Your value
				g={0}
				enableRays={false} // No rays (rotates)
				base={[0.35, 0.35, 0.35]} // Uniform gray
				frustumCulled={false}
				renderOrder={1}
			/>

			<InstancedAngel position={[0, 0, 0]} />
			{/* <Scene8 position={[10, 0, 0]} /> */}
		</Canvas>
	</>
);
