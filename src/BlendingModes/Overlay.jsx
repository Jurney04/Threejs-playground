import React from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three"; // Import THREE for blending modes

function Overlay() {
	const boxRef = useRef();
	const groupRef = useRef();
	const groupRef2 = useRef();
	const groupRef3 = useRef();

	const speed = 1;
	useFrame((state, delta) => {
		// boxRef.current.rotation.x += delta * 1.5;
		// groupRef.current.rotation.x += delta * speed;
		groupRef.current.rotation.y += delta * speed;
		groupRef.current.rotation.z += delta * -speed;
		groupRef2.current.rotation.y += delta * -speed;
		groupRef2.current.rotation.z += delta * speed;
		groupRef3.current.rotation.y += delta * -speed;
		groupRef3.current.rotation.z += delta * -speed;
	});

	return (
		<>
			<group ref={groupRef} position={[0, 1, 0]}>
				<mesh ref={boxRef} scale={0.5} position={[0, 0, -1]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="red"
						blending={THREE.SubtractiveBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
				<mesh ref={boxRef} scale={0.5} position={[0, -1, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="blue"
						blending={THREE.SubtractiveBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
				<mesh ref={boxRef} scale={0.5} position={[-1, 0, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="yellow"
						blending={THREE.SubtractiveBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
				<mesh ref={boxRef} scale={0.5} position={[1, 0, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="green"
						blending={THREE.SubtractiveBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
				<mesh ref={boxRef} scale={0.5} position={[0, 1, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="purple"
						blending={THREE.SubtractiveBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
				<mesh ref={boxRef} scale={0.5} position={[0, 0, 1]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="pink"
						blending={THREE.SubtractiveBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
			</group>

			<group ref={groupRef2} position={[0, 1, 0]} scale={1.5}>
				<mesh ref={boxRef} scale={0.25} position={[0, 0, -1]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="red"
						blending={THREE.AdditiveBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
				<mesh ref={boxRef} scale={0.25} position={[0, -1, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="blue"
						blending={THREE.AdditiveBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
				<mesh ref={boxRef} scale={0.25} position={[-1, 0, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="yellow"
						blending={THREE.AdditiveBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
				<mesh ref={boxRef} scale={0.25} position={[1, 0, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="green"
						blending={THREE.AdditiveBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
				<mesh ref={boxRef} scale={0.25} position={[0, 1, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="purple"
						blending={THREE.AdditiveBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
				<mesh ref={boxRef} scale={0.25} position={[0, 0, 1]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="pink"
						blending={THREE.AdditiveBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
			</group>

			<group ref={groupRef3} position={[0, 1, 0]} scale={2}>
				<mesh ref={boxRef} scale={0.15} position={[0, 0, -1]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="red"
						blending={THREE.MultiplyBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
				<mesh ref={boxRef} scale={0.15} position={[0, -1, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="blue"
						blending={THREE.MultiplyBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
				<mesh ref={boxRef} scale={0.15} position={[-1, 0, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="yellow"
						blending={THREE.MultiplyBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
				<mesh ref={boxRef} scale={0.15} position={[1, 0, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="green"
						blending={THREE.MultiplyBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
				<mesh ref={boxRef} scale={0.15} position={[0, 1, 0]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="purple"
						blending={THREE.MultiplyBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
				<mesh ref={boxRef} scale={0.15} position={[0, 0, 1]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial
						color="pink"
						blending={THREE.MultiplyBlending} // Add subtractive blending
						transparent={true} // Enable transparency for blending
						opacity={0.5} // Adjust opacity for effect strength (0 = fully subtractive, 1 = no effect)
						premultipliedAlpha={true} // Ensure correct alpha handling
					/>
				</mesh>
			</group>
		</>
	);
}

export default Overlay;
