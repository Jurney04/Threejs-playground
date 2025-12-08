// main.jsx
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import HomePage from "./HomePage.jsx";
import MachineCorridor from "./scenes/MachineRoom";
import Circles from "./scenes/Circles.jsx";
import Angel from "./scenes/Angel.jsx";
import FullAngelScene from "./scenes/FullAngelScene.jsx";
import "./index.css";

function SceneWrapper({ children }) {
	return (
		<div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", zIndex: 1 }}>
			<Canvas shadows camera={{ position: [0, 0, 0] }} style={{ width: "100%", height: "100%", display: "block" }}>
				<Suspense fallback={null}>
					{children}
				</Suspense>
			</Canvas>
		</div>
	);
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "machine-corridor",
		element: <SceneWrapper><MachineCorridor /></SceneWrapper>,
	},
	{
		path: "circles",
		element: <SceneWrapper><Circles /></SceneWrapper>,
	},
	{
		path: "angel-model",
		element: <SceneWrapper><Angel /></SceneWrapper>,
	},
	{
		path: "full-scene-angel",
		element: <SceneWrapper><FullAngelScene /></SceneWrapper>,
	},
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
