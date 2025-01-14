import type { StrapiMetaInterface } from "./strapi-meta-interface";

export interface StrapiResponseInterface<T> {
	data: T;
	meta: StrapiMetaInterface;
}
