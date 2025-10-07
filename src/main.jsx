import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./index.css";
import Scene7 from "./Scene7.jsx";
import Angel from "./Scene8.jsx";
import InstancedAngel from "./Scene9.jsx";
import { SceneLightsAndFog } from "./SceneLightsAndFog";

createRoot(document.getElementById("root")).render(
	<>
		<Canvas dpr={window.devicePixelRatio}>
			{/* <Scene6 /> */}
			{/* <Scene7 /> */}
			{/* <Scene8 position={[-10, 0, 0]} /> */}
			{/* <Angel position={[0, 0, 0]} /> */}
			<SceneLightsAndFog />
			<InstancedAngel position={[0, 0, 0]} />
			{/* <Scene8 position={[10, 0, 0]} /> */}
		</Canvas>
		{/* <Scene5 /> */}
	</>
);
