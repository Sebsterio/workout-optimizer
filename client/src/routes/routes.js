import Account from "containers/account";
import Options from "containers/options";
import { ProgramMenu } from "containers/program-menu";
import Programs from "containers/programs";
import Statistics from "containers/statistics";
import Tracker from "containers/tracker";

import trackerIcon from "assets/icons/nav/tracker.svg";
import accountIcon from "assets/icons/nav/account.svg";
import optionsIcon from "assets/icons/nav/options.svg";
import programsIcon from "assets/icons/nav/programs.svg";
import statisticsIcon from "assets/icons/nav/statistics.svg";

export const routes = [
	// In nav
	{
		path: "/",
		name: "Tracker",
		component: Tracker,
		inNavBar: true,
		icon: trackerIcon,
	},
	{
		path: "/programs",
		name: "Programs",
		component: Programs,
		inNavBar: true,
		icon: programsIcon,
	},
	{
		path: "/statistics",
		name: "Statistics",
		component: Statistics,
		inNavBar: true,
		icon: statisticsIcon,
	},
	{
		path: "/account",
		name: "Account",
		component: Account,
		inNavBar: true,
		icon: accountIcon,
	},
	{
		path: "/options",
		name: "Options",
		component: Options,
		inNavBar: true,
		icon: optionsIcon,
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
