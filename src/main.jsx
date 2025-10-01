import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./index.css";
import Scene7 from "./Scene7.jsx";
import Scene8 from "./Scene8.jsx";

createRoot(document.getElementById("root")).render(
	<>
		<Canvas>
			{/* <Scene6 /> */}
			{/* <Scene7 /> */}
			<Scene8 />
			<OrbitControls />
		</Canvas>
		{/* <Scene5 /> */}
	</>
);
