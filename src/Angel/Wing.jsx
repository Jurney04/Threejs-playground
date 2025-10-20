import * as THREE from "three";
import React, { useMemo } from "react";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const Wing = React.memo(function Wing({
	position,
	rotation,
	scale,
	innerRef,
	pivot = [0, 0, 0],
	version = "default",
	side = "front", // "front" for left wings (negative Z for top), "back" for right wings (positive Z for top)
}) {
	// SVG and texture configuration as an object for each version
	// textureRotation: Rotation in radians for the main texture (map). Customize these values as needed.
	const svgConfigs = useMemo(
		() => ({
			default: {
				bottom: "/angel/wing_bottom.svg",
				middle: "/angel/wing_middle.svg",
				top: "/angel/wing_top.svg",
				textureRotation: Math.PI, // No rotation
			},
			v2: {
				bottom: "/angel/wing_top_bottom.svg",
				middle: "/angel/wing_top_middle.svg",
				top: "/angel/wing_top_top.svg",
				textureRotation: Math.PI, // 90 degrees (example: clockwise rotation for v2)
			},
			v3: {
				bottom: "/angel/wing_bottom_bottom.svg",
				middle: "/angel/wing_bottom_middle.svg",
				top: "/angel/wing_bottom_top.svg",
				textureRotation: -Math.PI, // -45 degrees (example: counter-clockwise for v3)
			},
		}),
		[]
	);

	const config = svgConfigs[version] || svgConfigs.default;
	const textureRotation = config.textureRotation;

	const svg_bottom = config.bottom;
	const svg_middle = config.middle;
	const svg_top = config.top;

	const { paths: paths_bottom } = useLoader(SVGLoader, svg_bottom) || {};
	const { paths: paths_middle } = useLoader(SVGLoader, svg_middle) || {};
	const { paths: paths_top } = useLoader(SVGLoader, svg_top) || {};

	if (!paths_bottom || !paths_middle || !paths_top) {
		return null;
	}

	const shapes_bottom = paths_bottom.flatMap((path) => path.toShapes(true));
	const shapes_middle = paths_middle.flatMap((path) => path.toShapes(true));
	const shapes_top = paths_top.flatMap((path) => path.toShapes(true));

	const extrudeSettings = {
		steps: 2,
		depth: 5,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 1,
		bevelOffset: 0,
		bevelSegments: 1,
	};

	// Mesh configurations as arrays of objects [top, middle, bottom] for each version
	const meshConfigs = useMemo(
		() => ({
			default: [
				// top
				{ scale: 0.01, position: [0, 0, 0], rotation: [0, 0, 0] },
				// middle
				{ scale: 0.01, position: [-0.2, 0.7, 0], rotation: [0, 0, 0] },
				// bottom
				{ scale: 0.01, position: [-0.35, 1, 0], rotation: [0, 0, 0] },
			],
			v2: [
				// top
				{ scale: 0.025, position: [0, 0, 0], rotation: [0, 0, 0.7] },
				// middle
				{ scale: 0.025, position: [-0.25, 0.125, 0], rotation: [0, 0, 0.7] },
				// bottom
				{ scale: 0.025, position: [-2.1, 0.2, 0], rotation: [0, 0, 0.4] },
			],
			v3: [
				// top
				{ scale: 0.01, position: [0, 0, 0], rotation: [0, 0, 0.8] },
				// middle
				{ scale: 0.01, position: [-0.22, 0.15, 0], rotation: [0, 0, 0.8] },
				// bottom
				{ scale: 0.01, position: [-0.45, 0.2, 0], rotation: [0, 0, 0.6] },
			],
		}),
		[]
	);

	const versionMeshes = meshConfigs[version] || meshConfigs.default;

	// Apply side flipping: for "back", negate Z positions (mirrors right wing behavior)
	const adjustedMeshes = versionMeshes.map((mesh) => ({
		...mesh,
		position: mesh.position.map((coord, i) => (i === 2 ? (side === "back" ? -coord : coord) : coord)), // Flip Z for back
	}));

	// Z offsets per part and side (applied after base position)
	const zOffsets = useMemo(
		() => [
			// top z offset
			side === "front" ? -0.05 : 0.05,
			// middle z offset
			0,
			// bottom z offset
			side === "front" ? 0.05 : -0.05,
		],
		[side]
	);

	// Final positions with Z offsets
	const finalMeshes = adjustedMeshes.map((mesh, index) => ({
		...mesh,
		position: [mesh.position[0], mesh.position[1], mesh.position[2] + zOffsets[index]],
	}));

	const [basecolor, ambientOcclusion, normal, roughness] = useTexture([
		"/angel/feathers/Stylized_Feathers_002_ambientOcclusion.png", // Note: This is used as basecolor; consider swapping if needed
		"/angel/feathers/Stylized_Feathers_002_ambientOcclusion.png",
		"/angel/feathers/Stylized_Feathers_002_normal.png",
		"/angel/feathers/Stylized_Feathers_002_roughness.png",
	]);

	// Unified material configuration (same for all wings, based on original Wing2)
	const materialProps = useMemo(() => {
		const textureRepeat = [0.01, 0.01]; // Always uniform

		// Clone and configure textures to avoid side effects on shared instances
		const clonedBasecolor = basecolor ? basecolor.clone() : null;
		const clonedAmbientOcclusion = ambientOcclusion ? ambientOcclusion.clone() : null;
		const clonedNormal = normal ? normal.clone() : null;
		const clonedRoughness = roughness ? roughness.clone() : null;

		// Apply repeat and wrapping to clones
		[clonedBasecolor, clonedAmbientOcclusion, clonedNormal, clonedRoughness].forEach((texture) => {
			if (texture) {
				texture.repeat.set(textureRepeat[0], textureRepeat[1]);
				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			}
		});

		// Apply version-specific rotation to the main map texture (basecolor)
		if (clonedBasecolor) {
			clonedBasecolor.rotation = textureRotation;
			// Optionally rotate other maps to match (uncomment if needed):
			if (clonedNormal) clonedNormal.rotation = textureRotation;
			if (clonedRoughness) clonedRoughness.rotation = textureRotation;
			if (clonedAmbientOcclusion) clonedAmbientOcclusion.rotation = textureRotation;
		}

		return {
			map: clonedBasecolor,
			aoMap: clonedAmbientOcclusion,
			metalness: 0.5,
			roughness: 2,
			normalMap: clonedNormal,
			roughnessMap: clonedRoughness,
			normalScale: [5, 5],
		};
	}, [basecolor, ambientOcclusion, normal, roughness, textureRotation]);

	// Shapes array in order: top, middle, bottom
	const shapesArray = [shapes_top, shapes_middle, shapes_bottom];

	return (
		<group position={pivot} ref={innerRef}>
			<group position={position} rotation={rotation} scale={scale}>
				{finalMeshes.map((meshConfig, index) => (
					<mesh key={index} scale={meshConfig.scale} position={meshConfig.position} rotation={meshConfig.rotation}>
						<extrudeGeometry args={[shapesArray[index], extrudeSettings]} />
						<meshStandardMaterial {...materialProps} />
					</mesh>
				))}
			</group>
		</group>
	);
});

export default Wing;
