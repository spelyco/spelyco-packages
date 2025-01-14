import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { SpelyStoreProvider } from "@spelyco/react-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "mantine-datatable/styles.layer.css";
import { axiosInstance } from "./axios";
import { TestPage } from "./page/test";
import { theme } from "./theme";

const queryClient = new QueryClient();

export default function App() {
	const axios = axiosInstance;

	return (
		<MantineProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<SpelyStoreProvider
					config={{
						axios,
					}}
				>
					<TestPage />
				</SpelyStoreProvider>
			</QueryClientProvider>
		</MantineProvider>
	);
}
