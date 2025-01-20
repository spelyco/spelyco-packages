export default {
	type: "content-api",
	routes: [
		{
			method: "GET",
			path: "/medias",
			handler: "media.find",
			config: {
				auth: false,
				policies: [],
			},
		},
	],
};
