import type { StrapiResponseInterface } from "./strapi-response-interface";

export interface StrapiCollectionResponseInterface<T = Record<string, any>>
	extends StrapiResponseInterface<T[]> {}
