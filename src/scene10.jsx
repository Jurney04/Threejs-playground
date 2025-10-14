import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let camera, scene, renderer, controls, stats;

let mesh;
const amount = parseInt(window.location.search.slice(1)) || 10;
const count = Math.pow(amount, 3);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(1, 1);

const defaultColor = new THREE.Color(0xffffff); // White as default

let hoveredInfo = [];

function scene10() {
	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
	camera.position.set(amount / 3, amount, amount / 3);
	camera.lookAt(0, 0, 0);

	scene = new THREE.Scene();

	const light = new THREE.HemisphereLight(0xffffff, 0x888888, 3);
	light.position.set(0, 1, 0);
	scene.add(light);

	const geometry = new THREE.BoxGeometry(1, 1, 1);

	// Add per-instance color attribute
	const colorsArray = new Float32Array(count * 3); // For RGB per instance
	for (let j = 0; j < count; j++) {
		colorsArray[j * 3] = defaultColor.r; // R
		colorsArray[j * 3 + 1] = defaultColor.g; // G
		colorsArray[j * 3 + 2] = defaultColor.b; // B
	}
	geometry.setAttribute("color", new THREE.InstancedBufferAttribute(colorsArray, 3));

	const material = new THREE.MeshPhongMaterial({ vertexColors: true });

	mesh = new THREE.InstancedMesh(geometry, material, count);

	let i = 0;
	const offset = (amount - 1) / 2;
	const planeAmount = amount * 2;
	const planeOffset = (planeAmount - 1) / 2;

	const matrix = new THREE.Matrix4();

	for (let x = 0; x < planeAmount; x++) {
		for (let y = 0; y < amount; y++) {
			for (let z = 0; z < planeAmount; z++) {
				if (y === Math.floor(amount / 2)) {
					const px = planeOffset - x - 5;
					const py = offset - y - 10;
					const pz = planeOffset - z - 5;
					matrix.setPosition(px, py, pz);

					mesh.setMatrixAt(i, matrix);
					mesh.setColorAt(i, defaultColor);
					i++;
				}
			}
		}
	}
	mesh.count = i;
	scene.add(mesh);

	const gui = new GUI();
	gui.add(mesh, "count", 0, i);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setAnimationLoop(animate);
	document.body.appendChild(renderer.domElement);

	// Global contextmenu listener for debugging
	window.addEventListener("contextmenu", function (event) {
		console.log("Global right-click event detected");
	});

	// Canvas-specific contextmenu listener
	renderer.domElement.addEventListener("contextmenu", function (event) {
		console.log("Right-click event detected on canvas");
		event.preventDefault(); // This stops the browser's context menu
	});

	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.enableZoom = true;
	controls.enablePan = true; // Ensures panning is enabled
	controls.enableRotate = true;

	stats = new Stats();
	document.body.appendChild(stats.dom);

	window.addEventListener("resize", onWindowResize);
	document.addEventListener("mousemove", onMouseMove);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
	console.log("Mouse move detected"); // Added for debugging
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
	controls.update();
	raycaster.setFromCamera(mouse, camera);

	const intersection = raycaster.intersectObject(mesh);

	if (intersection.length > 0) {
		const hoveredInstanceId = intersection[0].instanceId;
		const instancesToAffect = new Map();
		instancesToAffect.set(hoveredInstanceId, 0.1);

		const planeAmount = amount * 2;
		const x = Math.floor(hoveredInstanceId / planeAmount);
		const z = hoveredInstanceId % planeAmount;

		const neighbors = [
			{ nx: x - 1, nz: z },
			{ nx: x + 1, nz: z },
			{ nx: x, nz: z - 1 },
			{ nx: x, nz: z + 1 },
		];

		for (const n of neighbors) {
			if (n.nx >= 0 && n.nx < planeAmount && n.nz >= 0 && n.nz < planeAmount) {
				const neighborId = n.nz + n.nx * planeAmount;
				instancesToAffect.set(neighborId, 0.05);
			}
		}

		for (const [id, moveUp] of instancesToAffect) {
			const matrix = new THREE.Matrix4();
			mesh.getMatrixAt(id, matrix);
			const position = new THREE.Vector3();
			position.setFromMatrixPosition(matrix);

			const originalY = hoveredInfo.find((info) => info.id === id)?.originalY || position.y;
			hoveredInfo.push({ id: id, originalY: originalY });

			position.y += moveUp;
			matrix.setPosition(position);
			mesh.setMatrixAt(id, matrix);

			const relativeY = position.y - originalY;
			let newColor;
			if (relativeY >= 4) {
				newColor = new THREE.Color("purple"); // Relative Y >= 4: Purple
			} else if (relativeY >= 3) {
				newColor = new THREE.Color("yellow"); // Relative Y >= 3: Yellow
			} else if (relativeY >= 2) {
				newColor = new THREE.Color("green"); // Relative Y >= 2: Green
			} else if (relativeY >= 1) {
				newColor = new THREE.Color("blue"); // Relative Y >= 1: Blue
			} else {
				newColor = new THREE.Color("red"); // Relative Y < 1: Red
			}
			mesh.setColorAt(id, newColor);

			console.log(`Instance ${id}: Original Y = ${originalY}, Current Y = ${position.y}, Relative Y = ${relativeY}, Setting Color = ${newColor.getHexString()}`);
		}

		mesh.instanceMatrix.needsUpdate = true;
		mesh.instanceColor.needsUpdate = true;
	}

	renderer.render(scene, camera);
	stats.update();
}

export default scene10;
