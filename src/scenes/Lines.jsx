import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";

function Lines() {
	// Function to generate tree branch vertices recursively
	function generateTree(start, end, depth, maxDepth, angle, branchLength, vertices) {
		if (depth > maxDepth) return;

		// Add the current segment
		vertices.push(start.x, start.y, start.z);
		vertices.push(end.x, end.y, end.z);

		// Calculate direction vector
		const direction = new THREE.Vector3().subVectors(end, start).normalize();

		// Split into two branches, rotating around z-axis for spreading in x-y plane
		const leftAngle = angle + Math.PI / 4; // 90 degrees for more outward spread
		const rightAngle = angle - Math.PI / 4;

		// Rotation around z-axis
		const leftDirection = new THREE.Vector3(direction.x * Math.cos(leftAngle) - direction.y * Math.sin(leftAngle), direction.x * Math.sin(leftAngle) + direction.y * Math.cos(leftAngle), direction.z).normalize();

		const rightDirection = new THREE.Vector3(direction.x * Math.cos(rightAngle) - direction.y * Math.sin(rightAngle), direction.x * Math.sin(rightAngle) + direction.y * Math.cos(rightAngle), direction.z).normalize();

		const newLength = branchLength * 1; // Reduce length for shorter branches

		const leftEnd = new THREE.Vector3().addVectors(end, leftDirection.multiplyScalar(newLength));
		const rightEnd = new THREE.Vector3().addVectors(end, rightDirection.multiplyScalar(newLength));

		// Recurse for left and right branches
		generateTree(end, leftEnd, depth + 1, maxDepth, leftAngle, newLength, vertices);
		generateTree(end, rightEnd, depth + 1, maxDepth, rightAngle, newLength, vertices);
	}

	// Generate vertices once using useMemo
	const { geometry, totalVertices } = useMemo(() => {
		const vertices = [];
		const start = new THREE.Vector3(0, -2, 0);
		const end = new THREE.Vector3(0, 0, 0);
		const maxDepth = 20; // Keep at 5 for manageable vertices
		const initialAngle = 0; // Straight up
		const initialLength = start.distanceTo(end); // 2

		generateTree(start, end, 0, maxDepth, initialAngle, initialLength, vertices);

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3));
		return { geometry, totalVertices: vertices.length };
	}, []);

	const lineRef = useRef();
	const drawCountRef = useRef(0);
	const frameCounterRef = useRef(0); // To slow down the animation

	useFrame(() => {
		frameCounterRef.current += 1;
		drawCountRef.current += 1;
		// 	geometry.setDrawRange(0, drawCountRef.current);
		// if (frameCounterRef.current % 10 === 0 && drawCountRef.current < totalVertices) {
		// 	// Slower: every 10 frames
		//
		// }
	});

	// Use LineSegments for individual segments
	const material = new THREE.LineBasicMaterial({ color: 0x8b4513 }); // Brown color for tree
	const line = new THREE.LineSegments(geometry, material);

	return (
		<>
			<primitive ref={lineRef} object={line} />
		</>
	);
}

export default Lines;
