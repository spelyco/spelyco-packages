import { Radio } from "@mantine/core";
import type { AxiosInstance } from "axios";
import type { MediaInterface } from "../interfaces/media-interface";
import type { MediaDictionary } from "../types";
import { MediaModalCard } from "./media-modal-card";

type MediaModalWrapperRadioProps = {
	axios: AxiosInstance;
	media: MediaInterface;
	onDestroy: (id: string) => void;
	dictionary?: MediaDictionary;
};

export function MediaModalWrapperRadio({
	axios,
	media,
	onDestroy,
	dictionary,
}: MediaModalWrapperRadioProps) {
	return (
		<Radio.Card
			key={media.documentId}
			value={media.id.toString()}
			pos={"relative"}
		>
			<Radio.Indicator pos={"absolute"} top={10} left={10} />
			<MediaModalCard
				dictionary={dictionary}
				axios={axios}
				media={media}
				onDestroy={onDestroy}
			/>
		</Radio.Card>
	);
}
