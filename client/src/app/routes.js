import TrackerPageContainer from "../pages/tracker/tracker.container";
import ProtocolsPage from "../pages/protocols/protocols.page";
import StatisticsPage from "../pages/statistics/statistics.page";
import OptionsPage from "../pages/options/options.page";
import UserPage from "../pages/user/user.page";

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
		name: "User",
		path: "/user",
		component: OptionsPage,
	},
	{
		name: "Options",
		path: "/options",
		component: UserPage,
	},
];

export default routes;
