import React from "react";
import { connect } from "react-redux";

import ProtocolsPage from "./protocols.page";

const mapStateToProps = (state) => ({
	protocol: state.protocol,
});

const ProtocolsPageContainer = (props) => <ProtocolsPage {...props} />;

export default connect(mapStateToProps)(ProtocolsPageContainer);
