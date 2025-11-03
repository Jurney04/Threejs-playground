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
import Project from "./Project.jsx";
import { AmbientLight } from "three";
import TextBox from "./ProjectComponents/TextBox";

function App() {
	const [selectedText, setSelectedText] = useState(""); // State for textbox text
	const [selectedShape, setSelectedShape] = useState(""); // State for selected shape

	// Handler for shape click
	const handleShapeClick = (shapeText) => {
		setSelectedText(shapeText);
		setSelectedShape(shapeText);
	};

	// Handler for textbox click
	const handleTextboxClick = () => {
		if (selectedShape === "Welcome") {
			window.location.href = "/welcome-link"; // Replace with your link
		} else if (selectedShape === "To") {
			window.location.href = "/to-link"; // Replace with your link
		} else if (selectedShape === "My") {
			window.location.href = "/my-link"; // Replace with your link
		} else if (selectedShape === "World") {
			window.location.href = "/world-link"; // Replace with your link
		} // Add more as needed
	};

	return (
		<>
			<Canvas shadows camera={{ position: [0, 0, 0] }}>
				<Perf position="top-left" />
				<ambientLight intensity={0.5} />
				<OrbitControls />
				<Project onShapeClick={handleShapeClick} /> {/* Pass handler to Project */}
			</Canvas>
			<TextBox selectedText={selectedText} onClick={handleTextboxClick} /> {/* Pass text and click handler */}
		</>
	);
}

createRoot(document.getElementById("root")).render(<App />);
