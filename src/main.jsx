// main.jsx
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import Project from "./scenes/Project.jsx";
import MachineCorridor from "./scenes/MachineRoom";
import Circles from "./scenes/Circles.jsx";
import Angel from "./scenes/Angel.jsx";
import FullAngelScene from "./scenes/FullAngelScene.jsx";
import "./index.css";

function Root() {
	return (
		<div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", zIndex: 1 }}>
			<Canvas shadows camera={{ position: [0, 0, 0] }} style={{ width: "100%", height: "100%", display: "block" }}>
				<Suspense fallback={null}>
					<Outlet />
				</Suspense>
			</Canvas>
		</div>
	);
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				index: true,
				element: <Project />,
			},
			{
				path: "machine-corridor",
				element: <MachineCorridor />,
			},
			{
				path: "circles",
				element: <Circles />,
			},
			{
				path: "angel-model",
				element: <Angel />,
			},
			{
				path: "full-scene-angel",
				element: <FullAngelScene />,
			},
		],
	},
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
