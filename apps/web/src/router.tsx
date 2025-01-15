import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import HomePage from "./pages/home";
import MultiSelectPage from "./pages/multi-select";

const pages = {
	home: HomePage,
	"multi-select": MultiSelectPage,
};

const routes = Object.entries(pages).map(([name, Component]) => ({
	path: name === "home" ? "/" : `/${name}`,
	element: <Component key={name} />,
}));

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: routes,
	},
]);

export const data = [
	{
		label: "Ana Sayfa",
		link: "/",
	},
	{
		label: "Multi Select",
		link: "/multi-select",
	},
];
