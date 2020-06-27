import React from "react";
// import { connect } from "react-redux";

import RowForm from "./row-form";

// const mapDispatchToProps = (dispatch) => ({
// 	updateLog: (data) => dispatch(updateLog(data)),
// 	updateMaxCustomRest: (data) => dispatch(updateMaxCustomRest(data)),
// });

const RowFormContainer = (props) => <RowForm {...props} />;

// export default connect(null, mapDispatchToProps)(RowFormContainer);
export default RowFormContainer;
