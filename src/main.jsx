import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./index.css";
import Scene7 from "./Scene7.jsx";
import Scene8 from "./Scene8.jsx";

createRoot(document.getElementById("root")).render(
	<>
		<Canvas dpr={window.devicePixelRatio}>
			{/* <Scene6 /> */}
			{/* <Scene7 /> */}
			{/* <Scene8 position={[-10, 0, 0]} /> */}
			<Scene8 position={[0, 0, 0]} />
			{/* <Scene8 position={[10, 0, 0]} /> */}
			<OrbitControls />
		</Canvas>
		{/* <Scene5 /> */}
	</>
);
