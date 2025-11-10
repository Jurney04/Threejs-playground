import { useMemo, useRef, useState, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { normalMap } from "three/tsl";

extend({ SpotLight: THREE.SpotLight });

// CONFIG
const SEGMENT_LENGTH = 40;
const VIEW_DISTANCE = 3;
const DAMPING = 0.95;

// --- Load and center SVG geometries
function useGearGeometries(urls, thickness = 0.35, scale = 0.05) {
	const [geometries, setGeometries] = useState([]);

	useEffect(() => {
		const loader = new SVGLoader();
		const loaded = [];

		urls.forEach((url, i) => {
			loader.load(url, (data) => {
				const shapes = data.paths.flatMap((path) => path.toShapes(true));
				const geo = new THREE.ExtrudeGeometry(shapes, { depth: thickness, bevelEnabled: false });

				// Center pivot
				geo.computeBoundingBox();
				const bbox = geo.boundingBox;
				const centerX = (bbox.max.x + bbox.min.x) / 2;
				const centerY = (bbox.max.y + bbox.min.y) / 2;
				const centerZ = (bbox.max.z + bbox.min.z) / 2;
				geo.translate(-centerX, -centerY, -centerZ);

				// Rotate upright and scale
				geo.rotateX(Math.PI / 2);
				geo.scale(scale, scale, scale);
				geo.computeVertexNormals();

				loaded[i] = geo;
				if (loaded.filter(Boolean).length === urls.length) setGeometries([...loaded]);
			});
		});
	}, [urls, thickness, scale]);

	return geometries;
}

// Generate corridor segment
function generateCorridorSegment(zOffset = 0) {
	const gears = [];
	const pipes = [];
	const spacing = 3;

	for (let z = 0; z < SEGMENT_LENGTH; z += spacing) {
		const leftGearType = Math.floor(Math.random() * 3);
		const rightGearType = Math.floor(Math.random() * 3);

		gears.push({
			position: [-3.9, (Math.random() - 0.5) * 1.8, z + zOffset],
			geometryIndex: leftGearType,
			speed: 0.02 + Math.random() * 0.02,
			direction: 1,
		});
		gears.push({
			position: [3.9, (Math.random() - 0.5) * 1.8, z + spacing / 2 + zOffset],
			geometryIndex: rightGearType,
			speed: 0.02 + Math.random() * 0.02,
			direction: -1,
		});
	}

	// Pipes
	const pipeSpacing = 8;
	for (let z = 0; z < SEGMENT_LENGTH; z += pipeSpacing) {
		const side = Math.random() > 0.5 ? 1 : -1;
		const wallX = side * 4.5;
		const offset = side * 1.2;
		const y = (Math.random() - 0.1) * 2;
		const zBase = z + (Math.random() - 0.5) * 2 + zOffset;

		const curvePoints = [
			new THREE.Vector3(wallX, y, zBase),
			new THREE.Vector3(wallX - offset * 1.5, y, zBase + 0.5),
			new THREE.Vector3(wallX - offset * 1.5, y, zBase + 0.6),
			new THREE.Vector3(wallX - offset * 1.5, y, zBase + 5),
			new THREE.Vector3(wallX - offset * 1.5, y, zBase + 5.1),
			new THREE.Vector3(wallX, y, zBase + 5.1),
		];

		pipes.push({
			points: curvePoints,
			diameter: 0.22 + Math.random() * 0.05,
		});
	}

	return { gears, pipes, z: zOffset };
}

// Corridor Segment Component
function CorridorSegment({ segmentData, gearGeometries, normalMapMultiplier = 10 }) {
	const lampRefs = useRef([]);
	const gearRefs = useRef([]);

	// Rotate lamps & gears
	useFrame((state) => {
		const t = state.clock.elapsedTime;

		lampRefs.current.forEach((lamp, i) => {
			if (!lamp) return;
			const flicker = 0.5 + Math.sin(t * 3 + i) * 0.1 + (Math.random() - 0.5) * 0.05;
			lamp.material.emissiveIntensity = flicker;
		});

		gearRefs.current.forEach((gear, i) => {
			if (!gear) return;
			const g = segmentData.gears[i];
			gear.rotation.x += g.speed * g.direction;
		});
	});

	// Textures
	const textureMapsFloor = useTexture({
		map: "/mossy_brick/mossy_brick_diff.jpg",
		heightMap: "/mossy_brick/mossy_brick_disp.png",
		// normalMap: "/mossy_brick/mossy_brick_disp.png",
		aoMap: "/mossy_brick/mossy_brick_ao.jpg",
	});
	Object.values(textureMapsFloor).forEach((t) => {
		if (t) {
			t.wrapS = t.wrapT = THREE.RepeatWrapping;
			t.repeat.set(10, 2);
		}
	});

	const textureMapsSide = useTexture({
		map: "/rebar_reinforced_concrete/rebar_reinforced_concrete_diff.png",
		heightMap: "/rebar_reinforced_concrete/rebar_reinforced_concrete_disp.png",
		aoMap: "/rebar_reinforced_concrete/rebar_reinforced_concrete_ao.jpg",
	});
	Object.values(textureMapsSide).forEach((t) => {
		if (t) {
			t.wrapS = t.wrapT = THREE.RepeatWrapping;
			t.repeat.set(10, 2);
		}
	});

	const textureMapsRoof = useTexture({
		map: "/rough_plaster_brick/rough_plaster_brick_diff.jpg",
		heightMap: "/rough_plaster_brick/rough_plaster_brick_disp.png",
		aoMap: "/rough_plaster_brick/rough_plaster_brick_ao.jpg",
	});
	Object.values(textureMapsRoof).forEach((t) => {
		if (t) {
			t.wrapS = t.wrapT = THREE.RepeatWrapping;
			t.repeat.set(10, 2);
		}
	});

	return (
		<group>
			{/* Floor */}
			<mesh receiveShadow rotation={[-Math.PI / 2, 0, Math.PI * 0.5]} position={[0, -2.8, segmentData.z]}>
				<planeGeometry args={[SEGMENT_LENGTH, 12]} />
				<meshStandardMaterial {...textureMapsFloor} metalness={1} roughness={1} side={THREE.DoubleSide} normalScale={new THREE.Vector2(normalMapMultiplier, normalMapMultiplier)} />
			</mesh>

			{/* Side walls */}
			<mesh position={[-4, 0.2, segmentData.z]} rotation={[0, Math.PI / 2, 0]}>
				<planeGeometry args={[SEGMENT_LENGTH, 6]} />
				<meshStandardMaterial {...textureMapsSide} metalness={1} roughness={1} side={THREE.DoubleSide} normalScale={new THREE.Vector2(normalMapMultiplier, normalMapMultiplier)} />
			</mesh>

			<mesh position={[4, 0.2, segmentData.z]} rotation={[0, -Math.PI / 2, 0]}>
				<planeGeometry args={[SEGMENT_LENGTH, 6]} />
				<meshStandardMaterial {...textureMapsSide} metalness={1} roughness={1} side={THREE.DoubleSide} normalScale={new THREE.Vector2(normalMapMultiplier, normalMapMultiplier)} />
			</mesh>

			{/* Roof */}
			<mesh position={[0, 2.4, segmentData.z]} rotation={[Math.PI * 0.5, 0, Math.PI * 0.5]}>
				<planeGeometry args={[SEGMENT_LENGTH, 12]} />
				<meshStandardMaterial {...textureMapsRoof} metalness={1} roughness={1} side={THREE.DoubleSide} normalScale={new THREE.Vector2(normalMapMultiplier, normalMapMultiplier)} />
			</mesh>

			{/* Ceiling lamps */}
			{Array.from({ length: 6 }).map((_, i) => {
				const zPos = segmentData.z + (i / 6) * SEGMENT_LENGTH - SEGMENT_LENGTH / 2;
				return (
					<mesh key={`lamp-${i}-${segmentData.z}`} position={[0, 2.2, zPos]} ref={(r) => (lampRefs.current[i] = r)}>
						<sphereGeometry args={[0.08, 10, 10]} />
						<meshStandardMaterial emissive="#ff7b33" emissiveIntensity={0.5} color="#000" />
					</mesh>
				);
			})}

			{/* Gears */}
			{segmentData.gears.map((g, i) => {
				const geo = gearGeometries[g.geometryIndex];
				if (!geo) return null;
				return (
					<mesh key={`gear-${i}`} ref={(r) => (gearRefs.current[i] = r)} geometry={geo} position={g.position} rotation={[0, 0, -Math.PI / 2]} castShadow={false} receiveShadow={false}>
						<meshStandardMaterial color="#ffffff" metalness={1} roughness={0.35} />
					</mesh>
				);
			})}

			{/* Pipes */}
			{segmentData.pipes.map((pipe, i) => {
				const curve = new THREE.CatmullRomCurve3(pipe.points);
				const geometry = new THREE.TubeGeometry(curve, 32, pipe.diameter, 16, false);
				return (
					<mesh key={`pipe-${i}`} geometry={geometry} castShadow={false} receiveShadow={false}>
						<meshStandardMaterial color="#b87333" metalness={1} roughness={0.25} envMapIntensity={1.2} />
					</mesh>
				);
			})}
		</group>
	);
}

// Main Corridor Component
export default function MachineCorridorScroll() {
	const [segments, setSegments] = useState(() => Array.from({ length: VIEW_DISTANCE }, (_, i) => generateCorridorSegment(-SEGMENT_LENGTH + i * SEGMENT_LENGTH)));
	const [scrollSpeed, setScrollSpeed] = useState(0);
	const scroll = useRef(0);
	const spotRef = useRef();
	const targetRef = useRef();

	const normalMapMultiplier = 1.5; // adjust globally

	const gearGeometries = useGearGeometries(["/Gear1.svg", "/Gear2.svg", "/Gear3.svg"], 15, 0.02);

	// Scroll input
	useEffect(() => {
		const handleScroll = (e) => setScrollSpeed((prev) => prev + e.deltaY * 0.0003);
		window.addEventListener("wheel", handleScroll);
		return () => window.removeEventListener("wheel", handleScroll);
	}, []);

	// Frame loop
	useFrame(({ camera }) => {
		scroll.current += scrollSpeed * 2;
		setScrollSpeed((s) => s * DAMPING);

		camera.position.z = scroll.current;
		camera.position.y = 0;
		camera.lookAt(0, 0, scroll.current + 20);

		if (spotRef.current && targetRef.current) {
			spotRef.current.position.copy(camera.position).add(new THREE.Vector3(0, 0, 2));
			targetRef.current.position.set(0, 0, scroll.current + 20);
			spotRef.current.target = targetRef.current;
		}

		// Generate new segments ahead
		const lastSegment = segments[segments.length - 1];
		if (camera.position.z > lastSegment.z - SEGMENT_LENGTH / 2) {
			const newZ = lastSegment.z + SEGMENT_LENGTH;
			setSegments((prev) => [...prev.slice(1), generateCorridorSegment(newZ)]);
		}
	});

	return (
		<>
			<color attach="background" args={["#050505"]} />
			<fog attach="fog" args={["#050505", 6, 80]} />

			{/* Lights */}
			<ambientLight intensity={0.4} color="#b85a28" />
			<pointLight position={[0, 3, 5]} intensity={0.5} color="#ff7b33" distance={20} />
			<pointLight position={[0, 2, -10]} intensity={0.3} color="#ff6b22" distance={30} />
			<spotLight ref={spotRef} intensity={200} angle={1} penumbra={1} color="#fcdb96" distance={50} decay={1.5} castShadow={false} />
			<primitive ref={targetRef} object={new THREE.Object3D()} />

			{/* Corridor */}
			{segments.map((seg, i) => (
				<CorridorSegment key={i} segmentData={seg} gearGeometries={gearGeometries} normalMapMultiplier={normalMapMultiplier} />
			))}

			<EffectComposer>
				<Bloom intensity={0.4} />
				<Vignette eskil={false} offset={0.25} darkness={0.9} />
			</EffectComposer>
		</>
	);
}
