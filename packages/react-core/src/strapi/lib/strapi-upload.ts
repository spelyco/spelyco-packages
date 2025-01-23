import type { AxiosInstance } from "axios";
import type { MediaInterface } from "../../media";

export async function strapiUpload(
	axios: AxiosInstance,
	files: File[],
	prefix: string,
) {
	const formData = new FormData();

	files.forEach((file, _index) => {
		formData.append("files", file);
		const uuid = crypto.randomUUID();
		const fileName = file.name;
		const fileNameWithoutExt = fileName.substring(0, fileName.lastIndexOf("."));
		const fileExt = fileName.substring(fileName.lastIndexOf("."));
		const newFileName = `${prefix}-${fileNameWithoutExt}-${uuid}${fileExt}`;

		formData.append(
			"fileInfo",
			JSON.stringify({
				name: newFileName,
			}),
		);
	});

	const req = await axios.post("api/upload", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return req.data as MediaInterface[];
}
