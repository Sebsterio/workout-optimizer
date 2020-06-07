import React from "react";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

import Header from "./header.component";

// -----------------------------------------------------------

// const mapStateToProps = createStructuredSelector({
// 	currentUser: selectCurrentUser
// });

// const mapDispatchToProps = (dispatch) => ({
// 	signOutStart: () => dispatch(signOutStart()),
// });

const HeaderContainer = (props) => <Header {...props} />;

export default HeaderContainer;
// export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
