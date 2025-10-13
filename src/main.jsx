import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react"; // Add these imports
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

function App() {
	const audioRef = useRef(null);
	const [modelLoaded, setModelLoaded] = useState(false);

	useEffect(() => {
		if (modelLoaded && audioRef.current) {
			const audio = audioRef.current;
			audio.volume = 0.5; // Optional: Adjust volume (0-1)

			const playAudio = () => {
				audio.play().catch((error) => {
					console.log("Autoplay blocked. Waiting for user interaction:", error);
					// Fallback: Listen for first click to enable (one-time)
					const enableOnClick = () => {
						audio.play();
						document.removeEventListener("click", enableOnClick);
					};
					document.addEventListener("click", enableOnClick, { once: true });
				});
			};

			playAudio();
		}
	}, [modelLoaded]);

	return (
		<>
			<Canvas dpr={window.devicePixelRatio} camera={{ position: [0, 0, 20], rotation: [-Math.PI / 4, 0, 0] }}>
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
					position={[-1.5, 20, 0]} // Your value
					scale={[15, 80, 15]} // Your value
					threshold={0.75} // Your value
					opacity={0.04} // Your value
					range={0.8} // Your value
					steps={500} // Your value
					g={0.7} // Your value
					rayVisibility={0.5} // Your value
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

				{/* Basic cloud 1 (no rays; your values – larger/farther for surround) */}
				<CloudComponent
					position={[-55, 5, 40]} // Farther (no interference)
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
					position={[-50, 15, -65]} // Farther (no interference)
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
					position={[25, 5, 25]} // Farther right-front (no overlap)
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
					position={[-35, 8, 35]} // Farther left-back (no overlap)
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

				<InstancedAngel position={[0, 0, 0]} onModelLoad={() => setModelLoaded(true)} />
				{/* <Scene8 position={[10, 0, 0]} /> */}
			</Canvas>
			<audio
				ref={audioRef}
				loop
				controls
				style={{ display: "none" }}
				preload="auto" // Ensures it loads early
			>
				<source src="/Choir.mp3" type="audio/mpeg" />
				Your browser does not support the audio element.
			</audio>
		</>
	);
}

createRoot(document.getElementById("root")).render(<App />);
