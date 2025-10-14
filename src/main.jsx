import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import "./index.css";
import Scene7 from "./Scene7.jsx";
import Angel from "./Scene8.jsx";
import { Scene9 } from "./Scene9.jsx";

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
			<Canvas camera={{ position: [0, 0, 20], rotation: [-Math.PI / 4, 0, 0] }}>
				<OrbitControls />
				{/* <Scene7 /> */}
				{/* <Angel position={[0, 0, 0]} /> */}
				{/* <Scene9 onModelLoad={() => setModelLoaded(true)} /> */}
			</Canvas>

			{modelLoaded && (
				<audio ref={audioRef} loop controls style={{ display: "none" }} preload="auto">
					<source src="/Choir.mp3" type="audio/mpeg" />
				</audio>
			)}
		</>
	);
}

createRoot(document.getElementById("root")).render(<App />);
