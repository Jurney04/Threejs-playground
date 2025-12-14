import React from "react";
import { Canvas } from "@react-three/fiber";
import Project from "./scenes/Project";
import ProjectPreview from "./components/Homepage/ProjectPreview";
import MachineRoom from "./scenes/ExplodedView";
import ProjectBackground from "./components/Homepage/ProjectsBackground";

function HomePage() {
	return (
		<div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh" }}>
			<Canvas shadows camera={{ position: [0, 0, 5] }} style={{ width: "100%", height: "100%" }}>
				<ambientLight intensity={0.2} />
				<directionalLight position={[10, 10, 5]} intensity={0.8} />
				<Project />
				<ProjectPreview />
				{/* <ProjectBackground /> */}
				{/* <MachineRoom /> */}
			</Canvas>
		</div>
	);
}

export default HomePage;
