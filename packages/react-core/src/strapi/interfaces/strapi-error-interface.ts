export interface StrapiErrorInterface {
	status: number;
	name: string;
	message: string;
	details: Record<string, unknown>;
}
