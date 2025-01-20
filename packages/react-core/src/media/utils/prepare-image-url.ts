import type { AxiosInstance } from "axios";

export function prepareImageUrl(axios: AxiosInstance, url: string) {
	if (url.includes("http")) {
		return url;
	}

	return `${axios.getUri()}${url}`;
}
