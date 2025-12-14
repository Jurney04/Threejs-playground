import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Text, Image, MeshTransmissionMaterial, Html } from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader, PlaneGeometry, MeshStandardMaterial } from "three";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function ProjectPreview() {
	const mainGroupRef = useRef();
	const group1Ref = useRef();
	const group2Ref = useRef();
	const group3Ref = useRef();
	const group4Ref = useRef();
	const group5Ref = useRef();
	const group6Ref = useRef();
	const group7Ref = useRef();
	const textRef = useRef();
	const imageRef = useRef();
	const pathRef = useRef(null);
	const shadowRef = useRef();
	const [svgContent, setSvgContent] = useState("");
	const buttonRef = useRef();
	const [buttonZ, setButtonZ] = useState(20);

	// Individual group rotation states
	const [groupRotations, setGroupRotations] = useState({
		group1: { y: 0, velocity: 0 },
		group2: { y: 0, velocity: 0 },
		group3: { y: 0, velocity: 0 },
		group4: { y: 0, velocity: 0 },
		group5: { y: 0, velocity: 0 },
		group6: { y: 0, velocity: 0 },
	});

	const [draggedGroup, setDraggedGroup] = useState(null);
	const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
	const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 });

	const handleGroupPointerDown = (groupName, e) => {
		e.stopPropagation();
		setDraggedGroup(groupName);
		setLastMousePos({ x: e.clientX, y: e.clientY });
		setMouseVelocity({ x: 0, y: 0 });
		e.target.setPointerCapture(e.pointerId);
	};

	const handleGroupPointerUp = (e) => {
		if (draggedGroup) {
			// Apply flick velocity
			setGroupRotations((prev) => ({
				...prev,
				[draggedGroup]: {
					...prev[draggedGroup],
					velocity: mouseVelocity.x * 0.003,
				},
			}));
		}
		setDraggedGroup(null);
		e.target.releasePointerCapture(e.pointerId);
	};

	const handleGroupPointerMove = (e) => {
		if (!draggedGroup) return;

		const deltaX = e.clientX - lastMousePos.x;
		const deltaY = e.clientY - lastMousePos.y;

		// Update mouse velocity for flick effect
		setMouseVelocity({ x: deltaX, y: deltaY });

		// Update group rotation
		setGroupRotations((prev) => ({
			...prev,
			[draggedGroup]: {
				...prev[draggedGroup],
				y: prev[draggedGroup].y + deltaX * 0.005,
				velocity: 0,
			},
		}));

		setLastMousePos({ x: e.clientX, y: e.clientY });
	};

	// Physics simulation for floating effect
	useFrame((state, delta) => {
		Object.keys(groupRotations).forEach((groupName) => {
			const group = groupRotations[groupName];
			if (group.velocity !== 0) {
				// Apply friction
				const friction = 0.92;
				const newVelocity = group.velocity * friction;

				// Update rotation
				const newRotation = group.y + newVelocity;

				// Update state
				setGroupRotations((prev) => ({
					...prev,
					[groupName]: {
						...prev[groupName],
						y: newRotation,
						velocity: Math.abs(newVelocity) < 0.0005 ? 0 : newVelocity,
					},
				}));
			}

			// Apply rotation to actual group
			const groupRef = eval(`${groupName}Ref`);
			if (groupRef.current) {
				groupRef.current.rotation.y = groupRotations[groupName].y;
			}
		});
	});

	useEffect(() => {
		fetch("/line.svg")
			.then((res) => res.text())
			.then(setSvgContent);

		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: "body",
				start: "top top",
				end: "bottom bottom",
				scrub: 1,
			},
		});

		// Add null checks for all refs
		if (textRef.current && textRef.current.material) {
			timeline.to(textRef.current.material, { opacity: 0, duration: 1, ease: "power1.inOut" }, "0");
		}
		if (imageRef.current && imageRef.current.material) {
			timeline.to(imageRef.current.material, { opacity: 0, duration: 1, ease: "power1.inOut" }, "0");
		}
		if (mainGroupRef.current && mainGroupRef.current.rotation) {
			timeline.to(mainGroupRef.current.rotation, { z: 0, duration: 1.5, ease: "power1.inOut" }, "2");
			timeline.to(mainGroupRef.current.rotation, { z: Math.PI / 3, duration: 1.5, ease: "power1.inOut" }, "4");
			timeline.to(mainGroupRef.current.rotation, { z: (Math.PI / 3) * 2, duration: 1.5, ease: "power1.inOut" }, "6");
			timeline.to(mainGroupRef.current.rotation, { z: Math.PI, duration: 1.5, ease: "power1.inOut" }, "10");
			timeline.to(mainGroupRef.current.rotation, { z: (Math.PI / 3) * 4, duration: 1.5, ease: "power1.inOut" }, "12");
			timeline.to(mainGroupRef.current.rotation, { z: (Math.PI / 3) * 5, duration: 1.5, ease: "power1.inOut" }, "14");
		}

		if (group6Ref.current) {
			timeline.set(group6Ref.current, { visible: true }, "14");
		}

		// Move button from behind camera to final position using state
		timeline.to({}, {
			duration: 0.001,
			onStart: () => {
				setButtonZ(0);
			}
		}, "14.5");

		if (group6Ref.current && group6Ref.current.traverse) {
			group6Ref.current.traverse((child) => {
				if (child.material) {
					child.material.transparent = true;
					child.material.opacity = 0;
					timeline.to(child.material, { opacity: 1, duration: 0.5, ease: "power1.inOut" }, "10");
				}
			});
		}

		return () => {
			timeline.kill();
		};
	}, []);

	return (
		<>
			{/* <mesh ref={shadowRef} position={[0, -19.8, -5]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[80, 80]} />
				<meshStandardMaterial 
					map={useLoader(TextureLoader, "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect x='10' y='10' width='180' height='180' rx='20' fill='black'/%3E%3C/svg%3E")}
					transparent 
					opacity={0.4} 
				/>
			</mesh> */}
			<group ref={group7Ref} position={[0, -3, 0]}>
				<Text ref={textRef} color="white" position={[0, -0.35, 0]} transparent fontSize={0.12}>
					Scroll to continue
				</Text>
				<Image ref={imageRef} url="./white-down-arrow.png" transparent position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} />
			</group>
			<Html
				position={[0, -1, -4]}
				style={{
					width: "100vw",
					height: "100vh",
				}}
			>
				<div
					ref={(el) => {
						if (el) {
							pathRef.current = el.querySelector("path");
						}
					}}
					dangerouslySetInnerHTML={{ __html: svgContent }}
				/>
			</Html>
			<group ref={mainGroupRef} position={[0, -15, 0]} scale={[0.75, 0.75, 0.75]} rotation={[0, 0, -(Math.PI / 3)]}>
				<group ref={group1Ref} position={[0, 20, 0]} scale={[0.75, 0.75, 0.75]} rotation={[0, 0, 0]} onPointerDown={(e) => handleGroupPointerDown("group1", e)} onPointerUp={handleGroupPointerUp} onPointerMove={handleGroupPointerMove}>
					<Text color="white" position={[0, 3.5, 0]} fontSize={0.5}>
						Circles
					</Text>
					<Text color="white" position={[0, 3, 0]} fontSize={0.25}>
						This was the beginning of my Three.js journey
					</Text>
					<Text color="white" position={[0, 2.5, 0]} fontSize={0.25}>
						I started animating some circles
					</Text>
					<mesh position={[0, 0, 0]}>
						<planeGeometry args={[5, 3]} />
						<meshStandardMaterial map={useLoader(TextureLoader, "/circles.png")} />
					</mesh>
					<Html position={[0, -3, 0.1]} transform>
						<button
							style={{
								background: "rgba(255, 255, 255, 0.9)",
								border: "2px solid white",
								color: "#000",
								padding: "8px 16px",
								borderRadius: "8px",
								cursor: "pointer",
								fontWeight: "bold",
								fontSize: "12px",
								transition: "all 0.3s ease",
							}}
							onMouseEnter={(e) => (e.target.style.background = "rgba(255, 255, 255, 1)")}
							onMouseLeave={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.9)")}
							onClick={() => window.open("/circles", "_blank")}
						>
							View Demo
						</button>
					</Html>
					<mesh position={[0, 0, 0.2]}>
						<boxGeometry args={[6, 10, 3]} />
						<MeshTransmissionMaterial transparent backsideThickness={0.5} thickness={0.3} color="#ffffff" roughness={0.1} metalness={0.1} chromaticAberration={0.2} anisotropy={0.5} map={useLoader(TextureLoader, "/rounded_rectangle.svg")} />
					</mesh>
				</group>
				<group ref={group2Ref} position={[17.3, 10, 0]} scale={[0.75, 0.75, 0.75]} rotation={[0, 0, -Math.PI / 3]} onPointerDown={(e) => handleGroupPointerDown("group2", e)} onPointerUp={handleGroupPointerUp} onPointerMove={handleGroupPointerMove}>
					<Text color="white" position={[0, 3.5, 0]} fontSize={0.5}>
						Angel
					</Text>
					<Text color="white" position={[0, 3, 0]} fontSize={0.25}>
						Then i tried to make a biblically accurat ngel
					</Text>
					<mesh position={[0, 0, 0]}>
						<planeGeometry args={[5, 3]} />
						<meshStandardMaterial map={useLoader(TextureLoader, "/angel.png")} />
					</mesh>
					<Html position={[0, -2.5, 0.1]} transform>
						<button
							style={{
								background: "rgba(255, 255, 255, 0.9)",
								border: "2px solid white",
								color: "#000",
								padding: "8px 16px",
								borderRadius: "8px",
								cursor: "pointer",
								fontWeight: "bold",
								fontSize: "12px",
								transition: "all 0.3s ease",
							}}
							onMouseEnter={(e) => (e.target.style.background = "rgba(255, 255, 255, 1)")}
							onMouseLeave={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.9)")}
							onClick={() => window.open("/angel-model", "_blank")}
						>
							View Demo
						</button>
					</Html>
					<mesh position={[0, 0, 0.2]}>
						<boxGeometry args={[6, 10, 3]} />
						<MeshTransmissionMaterial transparent backsideThickness={0.5} thickness={0.3} color="#ffffff" roughness={0.1} metalness={0.1} chromaticAberration={0.2} anisotropy={0.5} map={useLoader(TextureLoader, "/rounded_rectangle.svg")} />
					</mesh>
				</group>
				<group
					ref={group3Ref}
					position={[17.3, -10, 0]}
					scale={[0.75, 0.75, 0.75]}
					rotation={[0, 0, -(Math.PI / 3) * 2]}
					onPointerDown={(e) => handleGroupPointerDown("group3", e)}
					onPointerUp={handleGroupPointerUp}
					onPointerMove={handleGroupPointerMove}
				>
					<Text color="white" position={[0, 3.5, 0]} fontSize={0.5}>
						Full Angel Scene
					</Text>
					<Text color="white" position={[0, 3, 0]} fontSize={0.25}>
						The circles looked like a
					</Text>
					<Text color="white" position={[0, 2.5, 0]} fontSize={0.25}>
						biblically accurate angel
					</Text>
					<Text color="white" position={[0, 2, 0]} fontSize={0.25}>
						so that was my next project
					</Text>
					<mesh position={[0, 0, 0]}>
						<planeGeometry args={[5, 3]} />
						<meshStandardMaterial map={useLoader(TextureLoader, "/angel.png")} />
					</mesh>
					<Html position={[0, -2.5, 0.1]} transform>
						<button
							style={{
								background: "rgba(255, 255, 255, 0.9)",
								border: "2px solid white",
								color: "#000",
								padding: "8px 16px",
								borderRadius: "8px",
								cursor: "pointer",
								fontWeight: "bold",
								fontSize: "12px",
								transition: "all 0.3s ease",
							}}
							onMouseEnter={(e) => (e.target.style.background = "rgba(255, 255, 255, 1)")}
							onMouseLeave={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.9)")}
							onClick={() => window.open("/full-scene-angel", "_blank")}
						>
							View Demo
						</button>
					</Html>
					<mesh position={[0, 0, 0.2]}>
						<boxGeometry args={[6, 10, 3]} />
						<MeshTransmissionMaterial transparent backsideThickness={0.5} thickness={0.3} color="#ffffff" roughness={0.1} metalness={0.1} chromaticAberration={0.5} anisotropy={0.2} map={useLoader(TextureLoader, "/rounded_rectangle.svg")} />
					</mesh>
				</group>
				<group ref={group4Ref} position={[0, -20, 0]} scale={[0.75, 0.75, 0.75]} rotation={[0, 0, Math.PI]} onPointerDown={(e) => handleGroupPointerDown("group4", e)} onPointerUp={handleGroupPointerUp} onPointerMove={handleGroupPointerMove}>
					<Text color="white" position={[0, 3.5, 0]} fontSize={0.5}>
						Procedural Generating
					</Text>
					<Text color="white" position={[0, 3, 0]} fontSize={0.25}>
						The hallway is filled with gears and pipes
					</Text>
					<Text color="white" position={[0, 2.5, 0]} fontSize={0.25}>
						These are constantly generated,
					</Text>
					<Text color="white" position={[0, 2, 0]} fontSize={0.25}>
						it is basically infinite
					</Text>
					<mesh position={[0, 0, 0]}>
						<planeGeometry args={[5, 3]} />
						<meshStandardMaterial map={useLoader(TextureLoader, "/machine-room.png")} />
					</mesh>
					<Html position={[0, -2.5, 0.1]} transform>
						<button
							style={{
								background: "rgba(255, 255, 255, 0.9)",
								border: "2px solid white",
								color: "#000",
								padding: "8px 16px",
								borderRadius: "8px",
								cursor: "pointer",
								fontWeight: "bold",
								fontSize: "12px",
								transition: "all 0.3s ease",
							}}
							onMouseEnter={(e) => (e.target.style.background = "rgba(255, 255, 255, 1)")}
							onMouseLeave={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.9)")}
							onClick={() => window.open("/machine-corridor", "_blank")}
						>
							View Demo
						</button>
					</Html>
					<mesh position={[0, 0, 0.2]}>
						<boxGeometry args={[6, 10, 3]} />
						<MeshTransmissionMaterial transparent backsideThickness={0.5} thickness={0.3} color="#ffffff" roughness={0.1} metalness={0.1} chromaticAberration={0.2} anisotropy={0.5} map={useLoader(TextureLoader, "/rounded_rectangle.svg")} />
					</mesh>
				</group>
				{/* <group
					ref={group5Ref}
					position={[-17.6, -10.6, 0]}
					scale={[0.75, 0.75, 0.75]}
					rotation={[0, 0, (Math.PI / 3) * 2]}
					onPointerDown={(e) => handleGroupPointerDown("group5", e)}
					onPointerUp={handleGroupPointerUp}
					onPointerMove={handleGroupPointerMove}
				>
					<Text color="white" position={[0, 3.5, 0]} fontSize={0.5}>
						Procedural Generating
					</Text>
					<Text color="white" position={[0, 3, 0]} fontSize={0.25}>
						The hallway is filled with gears and pipes
					</Text>
					<Text color="white" position={[0, 2.5, 0]} fontSize={0.25}>
						These are constantly generated,
					</Text>
					<Text color="white" position={[0, 2, 0]} fontSize={0.25}>
						it is basically infinite
					</Text>
					<mesh position={[0, 0, 0]}>
						<planeGeometry args={[5, 3]} />
						<meshStandardMaterial map={useLoader(TextureLoader, "/basic-demo.png")} />
					</mesh>

					<mesh position={[0, 0, 0.2]}>
						<boxGeometry args={[6, 10, 3]} />
						<MeshTransmissionMaterial transparent backsideThickness={0.5} thickness={0.3} color="#ffffff" roughness={0.1} metalness={0.1} chromaticAberration={0.5} anisotropy={0.5} map={useLoader(TextureLoader, "/rounded_rectangle.svg")} />
					</mesh>
				</group> */}
				<group
					ref={group6Ref}
					position={[-17.3, 10, 0]}
					scale={[0.75, 0.75, 0.75]}
					rotation={[0, 0, Math.PI / 3]}
					visible={false}
					onPointerDown={(e) => handleGroupPointerDown("group6", e)}
					onPointerUp={handleGroupPointerUp}
					onPointerMove={handleGroupPointerMove}
				>
					<Text color="white" position={[0, 3.5, 0]} fontSize={0.5}>
						BIC
					</Text>
					<Text color="white" position={[0, 3, 0]} fontSize={0.25}>
						For the last demo i made
					</Text>
					<Text color="white" position={[0, 2.5, 0]} fontSize={0.25}>
						an exploded view of a BIC
					</Text>
					<Text color="white" position={[0, 2, 0]} fontSize={0.25}>
						This shows the innerworks of the BIC
					</Text>
					<mesh position={[0, 0, 0]}>
						<planeGeometry args={[5, 3]} />
						<meshStandardMaterial map={useLoader(TextureLoader, "/bic.png")} />
					</mesh>
					<Html position={[0, -2.5, buttonZ]} transform ref={buttonRef}>
						<button
							style={{
								background: "rgba(255, 255, 255, 0.9)",
								border: "2px solid white",
								color: "#000",
								padding: "8px 16px",
								borderRadius: "8px",
								cursor: "pointer",
								fontWeight: "bold",
								fontSize: "12px",
								transition: "all 0.3s ease",
							}}
							onMouseEnter={(e) => (e.target.style.background = "rgba(255, 255, 255, 1)")}
							onMouseLeave={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.9)")}
							onClick={() => window.open("/bic", "_blank")}
						>
							View Demo
						</button>
					</Html>
					<mesh position={[0, 0, 0.2]}>
						<boxGeometry args={[6, 10, 3]} />
						<MeshTransmissionMaterial transparent backsideThickness={0.5} thickness={0.3} color="#ffffff" roughness={0.1} metalness={0.1} chromaticAberration={0.5} anisotropy={0.5} map={useLoader(TextureLoader, "/rounded_rectangle.svg")} />
					</mesh>
				</group>
			</group>
		</>
	);
}

export default ProjectPreview;
