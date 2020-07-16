import Tracker from "containers/tracker";
import Programs from "containers/programs";
import Statistics from "containers/statistics";
import Options from "containers/options";
import Account from "containers/account";

import { ProgramMenu } from "containers/program-menu";

export const routes = [
	// In nav
	{
		path: "/",
		name: "Tracker",
		component: Tracker,
		inNavBar: true,
	},
	{
		path: "/programs",
		name: "Programs",
		component: Programs,
		inNavBar: true,
	},
	{
		path: "/statistics",
		name: "Statistics",
		component: Statistics,
		inNavBar: true,
	},
	{
		path: "/account",
		name: "Account",
		component: Account,
		inNavBar: true,
	},
	{
		path: "/options",
		name: "Options",
		component: Options,
		inNavBar: true,
	},

	// Not in nav
	{
		path: "/programs/:list",
		component: Programs,
	},
	{
		path: "/edit-program",
		component: ProgramMenu,
	},
];

export default routes;
