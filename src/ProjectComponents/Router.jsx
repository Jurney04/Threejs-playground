// Router.jsx - Fixed: Removed unused imports and ensured syntax is correct
import { useNavigate } from "react-router-dom"; // Removed Routes, Route as they're not used
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, Suspense } from "react";
import { Perf } from "r3f-perf";

// Imports scenes
import BasicDemo from "../scenes/BasicDemo.jsx";
import Circles from "../scenes/Circles.jsx";
import Angel from "../scenes/Angel.jsx";
import FullAngelScene from "../scenes/FullAngelScene.jsx";
import Project from "../Project.jsx";
import TextBox from "../ProjectComponents/TextBox";
import MachineCorridor from "../scenes/MachineRoom";

function RouterSetup() {
	const [selectedText, setSelectedText] = useState(""); // State for textbox text
	const [selectedShape, setSelectedShape] = useState(""); // State for selected shape
	const [currentScene, setCurrentScene] = useState("project"); // State to track current scene
	// Removed navigate since we're not using URL-based navigation

	// Handler for shape click
	const handleShapeClick = (shapeText) => {
		setSelectedText(shapeText);
		setSelectedShape(shapeText);
	};

	// Handler for textbox click: Switch scene based on selected shape
	const handleTextboxClick = () => {
		if (selectedShape === "Welcome") {
			setCurrentScene("welcome");
		} else if (selectedShape === "To") {
			setCurrentScene("to");
		} else if (selectedShape === "My") {
			setCurrentScene("my");
		} else if (selectedShape === "World") {
			setCurrentScene("world");
		} // Add more as needed
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
		<>
			<div style={{ width: "100%", height: "100%", position: "absolute" }}>
				<Canvas shadows camera={{ position: [0, 0, 0] }} style={{ width: "100%", height: "100%", display: "block" }}>
					<Perf position="top-left" />
					
					<OrbitControls />
					<Suspense fallback={null}>{renderScene()}</Suspense>
				</Canvas>
			</div>
			{currentScene === "project" && <TextBox selectedText={selectedText} onClick={handleTextboxClick} />}
		</>
	);
}

export default RouterSetup;
