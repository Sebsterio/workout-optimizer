import React from "react";

// import Header from "./components/header/header.component";

const App = ({ currentUser, hideCart, checkUserSession }) => {
	// useEffect(() => {
	// 	checkUserSession();
	// }, [checkUserSession]);

	// useEffect(() => {
	// 	// selectCartHidden buggy with event listener (?)
	// 	document.addEventListener("click", (e) => {
	// 		if (!e.target.closest(".ignore-click-listener")) hideCart();
	// 	});
	// }, [hideCart]);

	return (
		<div className="app">
			<h1>Workout Optimizer</h1>{" "}
		</div>
	);
};

export default App;
