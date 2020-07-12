import Tracker from "containers/tracker";
import Programs from "containers/programs";
import Statistics from "containers/statistics";
import Options from "containers/options";
import Account from "containers/account";

export const routes = [
	{
		path: "/",
		name: "Tracker",
		component: Tracker,
	},
	{
		path: "/programs",
		name: "Programs",
		component: Programs,
	},
	{
		path: "/statistics",
		name: "Statistics",
		component: Statistics,
	},
	{
		path: "/account",
		name: "Account",
		component: Account,
	},
	{
		path: "/options",
		name: "Options",
		component: Options,
	},
];

export default routes;
