import TrackerPageContainer from "../pages/tracker/tracker.container";
import ProtocolsPage from "../pages/protocols/protocols.page";
import StatisticsPage from "../pages/statistics/statistics.page";
import OptionsPage from "../pages/options/options.page";
import AccountPageContainer from "../pages/account/account.container";

const routes = [
	{
		name: "Tracker",
		path: "/",
		component: TrackerPageContainer,
	},
	{
		name: "Protocols",
		path: "/protocols",
		component: ProtocolsPage,
	},
	{
		name: "Statistics",
		path: "/statistics",
		component: StatisticsPage,
	},
	{
		name: "Account",
		path: "/account",
		component: AccountPageContainer,
	},
	{
		name: "Options",
		path: "/options",
		component: OptionsPage,
	},
];

export default routes;
