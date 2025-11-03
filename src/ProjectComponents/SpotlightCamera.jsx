import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

extend({ SpotLight: THREE.SpotLight });

function SpotlightCamera() {
	const lightRef = useRef();
	const targetRef = useRef(new THREE.Object3D());
	const { camera, mouse, raycaster } = useThree();

	useFrame(() => {
		lightRef.current.position.set(0, 2, 0);

		const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 25);
		raycaster.setFromCamera(mouse, camera);
		const intersection = new THREE.Vector3();
		raycaster.ray.intersectPlane(plane, intersection);
		if (intersection) {
			targetRef.current.position.copy(intersection);
		}
	});

	return (
		<>
			<primitive object={targetRef.current} />
			<spotLight ref={lightRef} target={targetRef.current} color="white" angle={0.25} penumbra={0.5} intensity={200} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} distance={200} decay={0.5} />
		</>
	);
}

export default SpotlightCamera;
