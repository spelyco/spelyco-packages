import { ActionIcon, Flex } from "@mantine/core";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { useRef, useState } from "react";

type MediaModalCardTypeSoundProps = {
	url: string;
};

export function MediaModalCardTypeSound({ url }: MediaModalCardTypeSoundProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	const handlePlayPause = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	return (
		<Flex
			bg={"gray.1"}
			w={"100%"}
			h={"100%"}
			display={"flex"}
			justify={"center"}
			align={"center"}
		>
			<audio
				ref={audioRef}
				src={url}
				onEnded={() => setIsPlaying(false)}
				style={{ display: "none" }}
			>
				<track kind="captions" />
			</audio>
			<ActionIcon size="xl" variant="transparent" onClick={handlePlayPause}>
				{isPlaying ? (
					<IconPlayerPause color="var(--mantine-color-gray-5)" size={48} />
				) : (
					<IconPlayerPlay color="var(--mantine-color-gray-5)" size={48} />
				)}
			</ActionIcon>
		</Flex>
	);
}
