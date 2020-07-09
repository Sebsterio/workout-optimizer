import Tracker from "containers/tracker";
import Protocols from "containers/protocols";
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
