import "@mantine/core/styles.css";
import "mantine-datatable/styles.layer.css";

import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { theme } from "./theme";

export default function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={theme}>
				<RouterProvider router={router} />
			</MantineProvider>
		</QueryClientProvider>
	);
}
