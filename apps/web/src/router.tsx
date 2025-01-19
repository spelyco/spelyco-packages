import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { AssetPicker } from "./pages/asset-picker";
import { DataTablePage } from "./pages/data-table";
import HomePage from "./pages/home";
import MultiSelectPage from "./pages/multi-select";

const pages = {
	home: HomePage,
	"multi-select": MultiSelectPage,
	"data-table": DataTablePage,
	"asset-picker": AssetPicker,
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
	{
		label: "Data Table",
		link: "/data-table",
	},
	{
		label: "Asset Picker",
		link: "/asset-picker",
	},
];
