// App.jsx - Updated import path to match where Router.jsx is located
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import RouterSetup from "./ProjectComponents/Router"; // Updated path since Router.jsx is in ProjectComponents
import "./index.css";

function App() {
	return (
		<Router>
			<RouterSetup />
		</Router>
	);
}

createRoot(document.getElementById("root")).render(<App />);
