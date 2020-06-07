import React from "react";
import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

// import { selectCurrentUser } from "./redux/user/user.selectors";
// import { checkUserSession } from "./redux/user/user.actions";
// import { hideModals } from "./redux/......";

import App from "./app.component";

//------------------------------------------------------------------------------

// const mapStateToProps = createStructuredSelector({
// 	currentUser: selectCurrentUser
// });

// const mapDispatchToProps = (dispatch) => ({
// 	checkUserSession: () => dispatch(checkUserSession()),
// 	hideModals: () => dispatch(hideModals()),
// });

const AppContainer = (props) => {
	return <App {...props} />;
};

export default AppContainer;
// export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
