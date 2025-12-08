import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react"; // Added useEffect
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import gsap from "gsap"; // Added gsap import
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Added ScrollTrigger import

extend({ SpotLight: THREE.SpotLight });

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function SpotlightCamera() {
	const lightRef = useRef();
	const targetRef = useRef(new THREE.Object3D());
	const { camera, mouse, raycaster } = useThree();

	useEffect(() => {
		if (lightRef.current) {
			gsap.to(lightRef.current, {
				intensity: 0, // Fade to a lower intensity
				scrollTrigger: {
					trigger: document.body, // Trigger animation based on body scroll
					start: "top top", // Start when the top of the body hits the top of the viewport
					end: "20% top", // End when 20% of the body has been scrolled
					scrub: true, // Smoothly links the animation to the scroll position
				},
			});
		}
	}, []); // Empty dependency array means this effect runs once on mount

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
