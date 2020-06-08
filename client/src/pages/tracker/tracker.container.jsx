import React from "react";
// import { connect } from "react-redux";
// import { compose } from "redux";
// import { createStructuredSelector } from "reselect";

// import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
// import WithSpinner from "../../components/with-spinner/with-spinner.component";
import TrackerPage from "./tracker.page";

// const mapStateToProps = createStructuredSelector({
// 	isLoading: state => !selectIsCollectionsLoaded(state)
// });

/* Renders Spinner when data is fetching */
// const TrackerPageContainer = compose(
// 	connect(mapStateToProps),
// 	WithSpinner
// )(TrackerPage);

const TrackerPageContainer = (props) => <TrackerPage {...props} />;

export default TrackerPageContainer;
