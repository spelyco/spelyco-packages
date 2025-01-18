import {
	ActionIcon,
	type ActionIconProps,
	Menu,
	type MenuDropdownProps,
	type MenuItemProps,
	type MenuProps,
	type MenuTargetProps,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";

type ExtendMenuItemProps = MenuItemProps & {
	onClick: () => void;
};

type MantineDataTableColumnRowMenuProps = {
	menu?: MenuProps;
	target?: MenuTargetProps;
	actionIcon?: ActionIconProps;
	dropdown?: MenuDropdownProps;
	items?: ExtendMenuItemProps[];
};

export function MantineDataTableColumnRowMenu({
	menu,
	target,
	actionIcon,
	dropdown,
	items,
}: MantineDataTableColumnRowMenuProps) {
	return (
		<Menu {...menu}>
			<Menu.Target {...target}>
				<ActionIcon size={"md"} variant="default" {...actionIcon}>
					<IconDots size={16} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown {...dropdown}>
				{items?.map((item, index) => (
					<Menu.Item key={index.toString()} {...item} />
				))}
			</Menu.Dropdown>
		</Menu>
	);
}
