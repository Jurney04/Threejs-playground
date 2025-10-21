import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

// Extend Three.js SpotLight for JSX use
extend({ SpotLight: THREE.SpotLight });

function SpotlightCamera() {
	const lightRef = useRef();
	const targetRef = useRef(new THREE.Object3D()); // Dummy target object
	const { camera, mouse, raycaster } = useThree(); // Access camera, mouse, and raycaster

	useFrame(() => {
		// Position the light slightly in front of the static camera
		lightRef.current.position.set(0, 2, 0); // Closer to camera for clear beam

		// Use raycasting to target the mouse on the text's plane (z=-75)
		const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 25); // Plane at z=-75
		raycaster.setFromCamera(mouse, camera); // Ray from camera through mouse
		const intersection = new THREE.Vector3();
		raycaster.ray.intersectPlane(plane, intersection); // Find intersection
		if (intersection) {
			targetRef.current.position.copy(intersection); // Set target to intersection
		}
	});

	return (
		<>
			<primitive object={targetRef.current} />
			<spotLight
				ref={lightRef}
				target={targetRef.current} // Reference the dummy target
				color="white" // Fixed white color
				angle={0.25} // Wider angle for visibility
				penumbra={0.5} // Sharper edges
				intensity={200} // Increased brightness for reflection
				castShadow // Enable shadows
				shadow-mapSize-width={1024} // Shadow quality
				shadow-mapSize-height={1024}
				distance={200} // Longer range
				decay={0.5} // Reduced falloff for sustained brightness
			/>
		</>
	);
}

export default SpotlightCamera;
