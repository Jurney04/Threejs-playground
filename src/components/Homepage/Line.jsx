import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Line({ start, end }) {
	const ref = useRef();
	useFrame(() => {
		if (ref.current) {
			ref.current.geometry.setFromPoints([start, end].map((p) => new THREE.Vector3(...p)));
			ref.current.geometry.verticesNeedUpdate = true;
		}
	});
	return (
		<line ref={ref}>
			<bufferGeometry />
			<lineBasicMaterial color="white" />
		</line>
	);
}

export default Line;