import Tracker from "containers/tracker";
import Programs from "containers/programs";
import Statistics from "containers/statistics";
import Options from "containers/options";
import Account from "containers/account";

import { ProgramMenu } from "containers/program-menu";

import trackerIcon from "assets/icons/tracker.svg";
import programsIcon from "assets/icons/programs.svg";
import statisticsIcon from "assets/icons/statistics.svg";
import accountIcon from "assets/icons/account.svg";
import optionsIcon from "assets/icons/options.svg";

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
