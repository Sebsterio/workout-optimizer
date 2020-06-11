import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
// import { compose } from "redux";

// import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
// import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectAreas } from "../../redux/protocol/protocol.selectors";

import TrackerPage from "./tracker.page";

const mapStateToProps = createStructuredSelector({
	// isLoading: state => !selectIsCollectionsLoaded(state)
	areas: (state) => selectAreas(state),
});

const TrackerPageContainer = (props) => <TrackerPage {...props} />;

export default connect(mapStateToProps)(TrackerPageContainer);

/* Renders Spinner when data is fetching */
// const TrackerPageContainer = compose(
// 	connect(mapStateToProps),
// 	WithSpinner
// )(TrackerPage);
