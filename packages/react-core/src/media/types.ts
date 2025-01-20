import type { ModalProps, SelectProps } from "@mantine/core";
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
export type MediaSelectProps = Omit<SelectProps, "accept"> & MediaBaseProps;

// Modal Component Props
export type MediaModalProps = MediaBaseProps & ModalProps & {};
export type MediaModalHooksProps = MediaBaseProps;
