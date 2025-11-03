// Assuming TextBox is a simple component; create or update it like this
import React from "react";

function TextBox({ selectedText, onClick }) {
	return (
		<div className="textbox" onClick={onClick}>
			{selectedText || "Enter"}
		</div>
	);
}

export default TextBox;
