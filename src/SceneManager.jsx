// SceneManager.jsx
import { Canvas } from "@react-three/fiber";
import { useState, Suspense } from "react";

// Imports scenes
import Circles from "./scenes/Circles.jsx";
import Angel from "./scenes/Angel.jsx";
import FullAngelScene from "./scenes/FullAngelScene.jsx";
import Project from "./scenes/Project.jsx";
import MachineCorridor from "./scenes/MachineRoom";

function SceneManager() {
	const [currentScene, setCurrentScene] = useState("project"); // State to track current scene

	// Handler for shape click
	const handleShapeClick = (shapeText) => {
		switch (shapeText) {
			case "Welcome":
				setCurrentScene("welcome");
				break;
			case "To":
				setCurrentScene("to");
				break;
			case "My":
				setCurrentScene("my");
				break;
			case "World":
				setCurrentScene("world");
				break;
			default:
				break;
		}
	};

	// Function to render the current scene inside the Canvas
	const renderScene = () => {
		switch (currentScene) {
			case "welcome":
				return <MachineCorridor />;
			case "to":
				return <Circles />;
			case "my":
				return <Angel position={[0, 0, 0]} />;
			case "world":
				return <FullAngelScene position={[0, 0, 0]} />;
			default:
				return <Project onShapeClick={handleShapeClick} />;
		}
	};

	return (
		<div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", zIndex: 1 }}>
			<Canvas shadows camera={{ position: [0, 0, 0] }} style={{ width: "100%", height: "100%", display: "block" }}>
				<Suspense fallback={null}>
					{renderScene()}
				</Suspense>
			</Canvas>
		</div>
	);
}

export default SceneManager;
