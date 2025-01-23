import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import { strapiUpload } from "../../strapi/lib/strapi-upload";
import type { MediaInterface } from "../interfaces/media-interface";
import type { MediaDictionary } from "../types";

export function useMediaModalUpload(
	axios: AxiosInstance,
	onSuccess: (data: MediaInterface[]) => void,
	prefix: string,
	dictionary?: MediaDictionary,
) {
	const [opened, { toggle, close }] = useDisclosure(false);

	const {
		mutate: mutateUploadFile,
		data: dataUploadFile,
		isPending: isPendingUploadFile,
		isSuccess: isSuccessUploadFile,
	} = useMutation({
		mutationFn: (files: File[]) => strapiUpload(axios, files, prefix),
		onSuccess: (data) => {
			notifications.show({
				message: "Dosya başarıyla yüklendi",
			});
			close();
			onSuccess(data);
		},
		onError: () => {
			notifications.show({
				message: "Dosya yüklenirken bir hata oluştu",
				color: "red",
			});
		},
	});

	const rejectUpload = () => {
		notifications.show({
			message: "Bir hata oluştu, lütfen daha sonra tekrar deneyiniz.",
		});
	};

	return {
		rejectUpload,
		dataUploadFile,
		mutateUploadFile,
		isSuccessUploadFile,
		isPendingUploadFile,
		opened,
		toggle,
		close,
	};
}
