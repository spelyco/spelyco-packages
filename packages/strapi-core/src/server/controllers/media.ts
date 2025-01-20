import { sanitize, validate } from "@strapi/utils";
import type { Context } from "koa";

interface PaginationQuery {
	pagination?: {
		page?: string;
		pageSize?: string;
	};
}

export default {
	async find(ctx: Context) {
		const contentType = strapi.contentType("plugin::upload.file");
		await validate
			.createAPIValidators({ getModel: () => contentType })
			.query(ctx.query, contentType, { auth: ctx.state.auth });

		const sanitizedQueryParams = await sanitize
			.createAPISanitizers({ getModel: () => contentType })
			.query(ctx.query, contentType, { auth: ctx.state.auth });

		const page = Number((ctx.query as PaginationQuery).pagination?.page) || 1;
		const pageSize =
			Number((ctx.query as PaginationQuery).pagination?.pageSize) || 25;

		const results = await strapi.query(contentType.uid).findMany({
			...sanitizedQueryParams,
			offset: (page - 1) * pageSize,
			limit: pageSize,
		});

		const total = await strapi.query(contentType.uid).count();

		const pagination = {
			page,
			pageSize,
			pageCount: Math.ceil(total / pageSize),
			total,
		};

		// Sanitize output
		const sanitizedResults = await sanitize
			.createAPISanitizers({ getModel: () => contentType })
			.output(results, contentType, { auth: ctx.state.auth });

		return { data: sanitizedResults, meta: { pagination } };
	},
};
