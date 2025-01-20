import type { Core } from "@strapi/strapi";
import controllers from "./server/controllers";
import routes from "./server/routes";

export default {
	register({ strapi }: { strapi: Core.Strapi }) {
		strapi.log.info("Spelyco Core plugin is registering...");
	},

	bootstrap({ strapi }: { strapi: Core.Strapi }) {
		strapi.log.info("Spelyco Core plugin is bootstrapping...");
	},

	destroy({ strapi }: { strapi: Core.Strapi }) {
		strapi.log.info("Spelyco Core plugin is destroying...");
	},

	controllers,
	routes,

	// services: {},
	// contentTypes: {},
	// policies: {},
	// config: {
	// 	default: {},
	// 	validator() {},
	// },
};
