import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// import { selectCurrentUser } from "./redux/user/user.selectors";
// import { checkUserSession } from "./redux/user/user.actions";
// import { hideModals } from "./redux/......";

import App from "./app";

//------------------------------------------------------------------------------

const mapStateToProps = createStructuredSelector({
	// currentUser: selectCurrentUser
	currentUser: () => null,
});

const mapDispatchToProps = (dispatch) => ({
	// 	checkUserSession: () => dispatch(checkUserSession()),
	// 	hideModals: () => dispatch(hideModals()),
});

const AppContainer = (props) => {
	return <App {...props} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
