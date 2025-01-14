import type { StrapiResponseInterface } from "./strapi-response-interface";

export interface StrapiCollectionResponseInterface<T>
	extends StrapiResponseInterface<T[]> {}
