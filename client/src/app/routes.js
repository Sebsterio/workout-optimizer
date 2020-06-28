import Tracker from "../pages/tracker/tracker.container";
import Protocols from "../pages/protocols/protocols.container";
import Statistics from "../pages/statistics/statistics.page";
import Options from "../pages/options/options.page";
import Account from "../pages/account/account.container";

const routes = [
	{
		name: "Tracker",
		path: "/",
		component: Tracker,
	},
	{
		name: "Protocols",
		path: "/protocols",
		component: Protocols,
	},
	{
		name: "Statistics",
		path: "/statistics",
		component: Statistics,
	},
	{
		name: "Account",
		path: "/account",
		component: Account,
	},
	{
		name: "Options",
		path: "/options",
		component: Options,
	},
];

export default routes;
