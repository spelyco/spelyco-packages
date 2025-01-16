import { Button, createTheme } from "@mantine/core";

export const theme = createTheme({
	primaryColor: "dark",
	/* Put your mantine theme override here */
	components: {
		Button: Button.extend({
			defaultProps: {
				variant: "default",
				size: "compact-sm",
			},
		}),
	},
});
