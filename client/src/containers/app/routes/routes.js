import Tracker from "containers/tracker";
import Programs from "containers/programs";
import Statistics from "containers/statistics";
import Options from "containers/options";
import Account from "containers/account";

export const routes = [
	{
		name: "Tracker",
		path: "/",
		component: Tracker,
	},
	{
		name: "Programs",
		path: "/programs",
		component: Programs,
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
