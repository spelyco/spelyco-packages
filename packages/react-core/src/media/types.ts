import type { GetInputPropsReturnType } from "@mantine/form/lib/types";
import type { AxiosInstance } from "axios";

// Base (for Select, MultiSelect) component props
export type MediaBaseProps = {
	axios: AxiosInstance;
	prefix: string; // prefix for the media group
	accept: MediaExtensionAcceptType[];
};

// Extension Type
export type MediaExtensionAcceptType = "image" | "file" | "audio" | "video";

// Select Component Props
export type MediaSelectProps = MediaBaseProps &
	GetInputPropsReturnType & {
		type: "checkbox" | "radio";
		value: number | number[] | null;
		onChange: (value: number | number[] | null) => void;
		dictionary?: MediaDictionary;
		maxSize?: number;
	};

// Modal Component Props
export type MediaModalProps = MediaBaseProps & {
	type: "checkbox" | "radio";
	opened: boolean;
	onClose: () => void;
	value: number | number[] | null;
	onChange: (value: number | number[] | null) => void;
	dictionary?: MediaDictionary;
	maxSize?: number;
};

export type MediaModalHooksProps = MediaBaseProps;

// Dictionary
export type MediaDictionary = {
	main: {
		extension?: string;
		selectAndUpload?: string;
		modal: {
			searchPlaceholder?: string;
			cancelButton?: string;
			selectButton?: string;
			notFound?: string;
			upload: {
				title: string;
				dropzoneTitle?: string;
				dropzoneDescription?: string;
				dropzoneUploadButton?: string;
			};
			wrapper: {
				card: {
					deleteTooltip?: string;
					copyTooltip?: string;
				};
			};
		};
	};
};
