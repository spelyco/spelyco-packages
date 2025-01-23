import {
	Box,
	Button,
	Flex,
	Group,
	LoadingOverlay,
	Modal,
	Pagination,
	SimpleGrid,
	Text,
	TextInput,
} from "@mantine/core";
import { useField } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { IconFiles, IconSearch } from "@tabler/icons-react";
import { useMediaModal } from "../hooks/use-media-modal";
import type { MediaModalProps } from "../types";
import { staticDictionary } from "../utils/static-dictronary";
import { MediaModalHtmlInput } from "./media-modal-html-input";
import { MediaModalUpload } from "./media-modal-upload";
import { MediaModalWrapperCheckbox } from "./media-modal-wrapper-checkbox";
import { MediaModalWrapperRadio } from "./media-modal-wrapper-radio";

export function MediaModal({
	accept,
	prefix,
	axios,
	type,
	onClose,
	opened,
	onChange,
	value,
	dictionary,
	maxSize,
}: MediaModalProps) {
	const { mediaFind, searchValue, setSearchValue, onDestroy } = useMediaModal({
		axios,
		prefix,
		accept,
	});
	const isMobile = useMediaQuery("(max-width: 50em)");

	const field = useField<number | number[] | null>({
		initialValue: value,
	});

	return (
		<Modal.Root
			fullScreen={isMobile}
			centered
			size={"90%"}
			opened={opened}
			onClose={onClose}
			transitionProps={{ transition: "fade", duration: 200 }}
		>
			<Modal.Overlay />
			<Modal.Content>
				<Modal.Header>
					<Group flex={1} justify="space-between">
						<Pagination
							flex={1}
							size={"xs"}
							total={mediaFind.data?.meta.pagination.pageCount ?? 1}
							onChange={mediaFind.helper.setPage}
							value={mediaFind.helper.page}
						/>
						<Box>
							<TextInput
								placeholder={
									dictionary?.main.modal.searchPlaceholder ??
									staticDictionary.main.modal.searchPlaceholder
								}
								size="xs"
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								leftSection={<IconSearch size={16} />}
							/>
						</Box>
						<Group flex={1} gap={"xs"} justify="flex-end">
							<Button type="button" onClick={onClose}>
								{dictionary?.main.modal.cancelButton ??
									staticDictionary.main.modal.cancelButton}
							</Button>
							<MediaModalUpload
								axios={axios}
								prefix={prefix}
								dictionary={dictionary}
								maxSize={maxSize}
								onSuccess={() => {
									mediaFind.refetch();
								}}
							/>
							<Button
								onClick={() => {
									onChange(field.getValue());
								}}
							>
								{dictionary?.main.modal.selectButton ??
									staticDictionary.main.modal.selectButton}
							</Button>
						</Group>
					</Group>
				</Modal.Header>
				<Modal.Body mih={500} py={"sm"} style={{ position: "relative" }}>
					<LoadingOverlay visible={mediaFind.isPending} />
					{!mediaFind.data?.data.length && (
						<Flex
							h={500}
							justify={"center"}
							align={"center"}
							direction={"column"}
						>
							<IconFiles
								size={48}
								stroke={1.2}
								color="var(--mantine-color-gray-5)"
							/>
							<Text c={"dimmed"}>
								{dictionary?.main.modal.notFound ??
									staticDictionary.main.modal.notFound}
							</Text>
						</Flex>
					)}
					<MediaModalHtmlInput type={type} {...field.getInputProps()}>
						<SimpleGrid
							cols={{
								xs: 2,
								sm: 2,
								md: 3,
								lg: 4,
							}}
						>
							{mediaFind.data?.data.map((media) => {
								const defaultPropsForWrapper = {
									axios,
									media,
								};

								return type === "checkbox" ? (
									<MediaModalWrapperCheckbox
										dictionary={dictionary}
										key={media.documentId}
										onDestroy={onDestroy}
										{...defaultPropsForWrapper}
									/>
								) : (
									<MediaModalWrapperRadio
										dictionary={dictionary}
										key={media.documentId}
										onDestroy={onDestroy}
										{...defaultPropsForWrapper}
									/>
								);
							})}
						</SimpleGrid>
					</MediaModalHtmlInput>
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	);
}
