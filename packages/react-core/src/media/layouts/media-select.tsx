import { Button, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPaperclip } from "@tabler/icons-react";
import { MediaModal } from "../components/media-modal";
import { MediaModalPreview } from "../components/media-modal-preview";
import type { MediaSelectProps } from "../types";
import { staticDictionary } from "../utils/static-dictronary";

export function MediaSelect({
	axios,
	prefix,
	type,
	value,
	checked,
	onChange,
	dictionary,
	maxSize = 5 * 1024 * 1024,
}: MediaSelectProps) {
	const [opened, { open, close }] = useDisclosure(false);
	const prepareValue: number | number[] = value || checked;

	return (
		<>
			{opened && (
				<MediaModal
					axios={axios}
					opened={true}
					onClose={close}
					prefix={prefix}
					type={type}
					value={prepareValue}
					dictionary={dictionary}
					maxSize={maxSize}
					onChange={(value) => {
						onChange(value);
						close();
					}}
				/>
			)}
			<Stack>
				<Group flex={1} justify="space-between">
					<Group align="center" gap={"xs"}>
						<IconPaperclip size={16} />
						<Text size="sm">
							{dictionary?.main.extension ?? staticDictionary.main.extension}
						</Text>
					</Group>

					<Button type="button" onClick={open}>
						{dictionary?.main.selectAndUpload ??
							staticDictionary.main.selectAndUpload}
					</Button>
				</Group>

				{((Array.isArray(prepareValue) && prepareValue.length > 0) ||
					(typeof prepareValue === "number" && prepareValue > 0)) && (
					<MediaModalPreview
						axios={axios}
						items={Array.isArray(prepareValue) ? prepareValue : [prepareValue]}
					/>
				)}
			</Stack>
		</>
	);
}
