import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import "./index.css";
import { Perf } from "r3f-perf";

//imports scenes
import BasicDemo from "./scenes/BasicDemo.jsx";
import Circles from "./scenes/Circles.jsx";
import Angel from "./scenes/Angel.jsx";
import FullAngelScene from "./scenes/FullAngelScene.jsx";
import Coloring from "./scenes/Coloring.jsx";
import BlendingModes from "./scenes/BlendingModes.jsx";
import DemoMaterials from "./scenes/DemoMaterials.jsx";
import Lines from "./scenes/Lines.jsx";
//
//
function App() {
	const audioRef = useRef(null);
	const [modelLoaded, setModelLoaded] = useState(false);

	useEffect(() => {
		if (modelLoaded && audioRef.current) {
			const audio = audioRef.current;
			audio.volume = 0.5;
			const playAudio = () => {
				audio.play().catch((error) => {
					console.log("Autoplay blocked. Waiting for user interaction:", error);
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
			<Suspense fallback={<div>Loading...</div>}>
				<Canvas camera={{ position: [0, 2, 10] }}>
					<Perf position="top-left" />
					<OrbitControls />

					{/* <BasicDemo /> */}
					<Circles />
					{/* <Angel position={[0, 0, 0]} /> */}
					{/* <FullAngelScene onModelLoad={() => setModelLoaded(true)} /> */}
					{/* <Coloring /> */}
					{/* <BlendingModes /> */}
					{/* <DemoMaterials /> */}
					{/* <Lines /> */}
				</Canvas>
			</Suspense>

			{modelLoaded && (
				<audio ref={audioRef} loop controls style={{ display: "none" }} preload="auto">
					<source src="/Choir.mp3" type="audio/mpeg" />
				</audio>
			)}
		</>
	);
}

createRoot(document.getElementById("root")).render(<App />);
