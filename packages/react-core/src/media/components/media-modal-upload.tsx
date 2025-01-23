import { Button, Group, LoadingOverlay, Modal, Text } from "@mantine/core";
import {
	Dropzone,
	IMAGE_MIME_TYPE,
	MS_EXCEL_MIME_TYPE,
	MS_POWERPOINT_MIME_TYPE,
	MS_WORD_MIME_TYPE,
	PDF_MIME_TYPE,
} from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import type { AxiosInstance } from "axios";
import { useMediaModalUpload } from "../hooks/use-media-modal-upload";
import type { MediaInterface } from "../interfaces/media-interface";
import type { MediaDictionary } from "../types";
import { calculateFileSize } from "../utils/calculate-file-size";
import { staticDictionary } from "../utils/static-dictronary";

type MediaModalUploadProps = {
	axios: AxiosInstance;
	onSuccess: (data: MediaInterface[]) => void;
	prefix: string;
	dictionary?: MediaDictionary;
	maxSize?: number;
};

export function MediaModalUpload({
	axios,
	onSuccess,
	prefix,
	dictionary,
	maxSize,
}: MediaModalUploadProps) {
	const {
		opened,
		toggle,
		close,
		mutateUploadFile,
		rejectUpload,
		isPendingUploadFile,
	} = useMediaModalUpload(axios, onSuccess, prefix, dictionary);

	return (
		<>
			<Modal
				pos={"relative"}
				title={
					dictionary?.main.modal.upload.title ??
					staticDictionary.main.modal.upload.title
				}
				opened={opened}
				onClose={close}
			>
				<Dropzone
					onDrop={mutateUploadFile}
					onError={rejectUpload}
					maxSize={maxSize}
					accept={[
						...IMAGE_MIME_TYPE,
						...PDF_MIME_TYPE,
						...MS_WORD_MIME_TYPE,
						...MS_EXCEL_MIME_TYPE,
						...MS_POWERPOINT_MIME_TYPE,
						"video/mp4",
						"video/webm",
						"video/ogg",
						"video/quicktime",
						"application/zip",
						"application/x-zip-compressed",
						"application/x-rar-compressed",
						"application/x-7z-compressed",
						"application/x-tar",
						"application/x-gzip",
						"application/x-bzip2",
					]}
				>
					<LoadingOverlay visible={isPendingUploadFile} />
					<Group justify="center" gap="xl" style={{ pointerEvents: "none" }}>
						<Dropzone.Accept>
							<IconUpload
								size={52}
								color="var(--mantine-color-blue-6)"
								stroke={1.5}
							/>
						</Dropzone.Accept>
						<Dropzone.Reject>
							<IconX
								size={52}
								color="var(--mantine-color-red-6)"
								stroke={1.5}
							/>
						</Dropzone.Reject>
						<Dropzone.Idle>
							<IconPhoto
								size={52}
								color="var(--mantine-color-dimmed)"
								stroke={1.5}
							/>
						</Dropzone.Idle>

						<div>
							<Text size="md" ta={"center"} inline>
								{dictionary?.main.modal.upload.dropzoneTitle ??
									staticDictionary.main.modal.upload.dropzoneTitle}
							</Text>
							<Text size="xs" c="dimmed" ta={"center"} inline mt={7}>
								{(
									dictionary?.main.modal.upload.dropzoneDescription ??
									staticDictionary.main.modal.upload.dropzoneDescription
								)?.replace(
									"%s",
									calculateFileSize(maxSize ?? 0).toString() ?? "",
								)}
							</Text>
						</div>
					</Group>
				</Dropzone>
			</Modal>
			<Button
				type="button"
				leftSection={<IconUpload size={16} />}
				onClick={toggle}
			>
				{dictionary?.main.modal.upload.dropzoneUploadButton ??
					staticDictionary.main.modal.upload.dropzoneUploadButton}
			</Button>
		</>
	);
}
