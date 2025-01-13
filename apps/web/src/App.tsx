import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { SpelyCOReactStoreProvider } from "@spelyco/react-core";
import { axiosInstance } from "./axios";
import { TestPage } from "./page/test";
import { theme } from "./theme";

export default function App() {
	const axios = axiosInstance;
	return (
		<MantineProvider theme={theme}>
			<SpelyCOReactStoreProvider
				config={{
					axios,
				}}
			>
				<TestPage />
			</SpelyCOReactStoreProvider>
		</MantineProvider>
	);
}
