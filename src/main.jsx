import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import "./index.css";
import Statue from "./Scene11_r3f.jsx";
import Overlay from "./Overlay.jsx";
import { Perf } from "r3f-perf";

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
			{/* Move Suspense outside Canvas to avoid HTML in 3D scene */}
			<Suspense fallback={<div>Loading...</div>}>
				<Canvas camera={{ position: [0, 2, 10] }}>
					<Perf position="top-left" />
					<ambientLight />
					<OrbitControls />
					<Environment files="/theater.hdr" background />
					<Statue onModelLoaded={setModelLoaded} /> {/* Pass callback to set modelLoaded */}
					<Overlay />
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
