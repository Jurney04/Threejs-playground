import Statue from "../BlendingModes/Statue.jsx";
import Overlay from "../BlendingModes/Overlay.jsx";
import { Environment } from "@react-three/drei";
function BlendingModes() {
	return (
		<>
			<Environment files="/theater.hdr" background />
			<Statue />
			<Overlay />
		</>
	);
}
export default BlendingModes;
