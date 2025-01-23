import { Checkbox, type CheckboxCardProps } from "@mantine/core";
import type { AxiosInstance } from "axios";
import type { MediaInterface } from "../interfaces/media-interface";
import type { MediaDictionary } from "../types";
import { MediaModalCard } from "./media-modal-card";

type MediaModalWrapperCheckboxProps = CheckboxCardProps & {
	axios: AxiosInstance;
	media: MediaInterface;
	onDestroy: (id: string) => void;
	dictionary?: MediaDictionary;
};

export function MediaModalWrapperCheckbox({
	axios,
	media,
	onDestroy,
	dictionary,
	...props
}: MediaModalWrapperCheckboxProps) {
	return (
		<Checkbox.Card
			key={media.documentId}
			value={media.id.toString()}
			pos={"relative"}
			{...props}
		>
			<Checkbox.Indicator pos={"absolute"} top={10} left={10} />
			<MediaModalCard
				dictionary={dictionary}
				axios={axios}
				media={media}
				onDestroy={onDestroy}
			/>
		</Checkbox.Card>
	);
}
