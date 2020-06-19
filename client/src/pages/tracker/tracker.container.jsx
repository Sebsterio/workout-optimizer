import React from "react";
// import { connect } from "react-redux";

import TrackerPage from "./tracker.page";

// const mapStateToProps = (state) => ({
// 	areas: state.protocol.areas,
// });

const TrackerPageContainer = (props) => <TrackerPage {...props} />;

// export default connect(mapStateToProps)(TrackerPageContainer);

export default TrackerPageContainer;
