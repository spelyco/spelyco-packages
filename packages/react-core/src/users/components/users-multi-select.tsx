import { Loader, MultiSelect, type MultiSelectProps } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import { strapiFind } from "../../strapi";
import type { UserInterface } from "../interfaces/user-interface";

type UsersMultiSelectProps = MultiSelectProps & {
	axios: AxiosInstance;
	params?: Record<string, string>;
};

export function UsersMultiSelect({
	axios,
	params,
	...props
}: UsersMultiSelectProps) {
	const { data, isLoading } = useQuery<UserInterface[]>({
		queryKey: ["users-multi-select"],
		queryFn: () =>
			strapiFind(axios, "users", {
				params: {
					fields: ["id", "username", "email"],
					populate: "role",
					...params,
				},
			}),
	});

	const userGroupByRole = () => {
		if (!data) return [];

		return Object.entries(
			data.reduce(
				(acc, user) => {
					const roleName = user.role?.name ?? "unassigned";
					return Object.assign({}, acc, {
						[roleName]: [...(acc[roleName] ?? []), user],
					});
				},
				{} as Record<string | number, UserInterface[]>,
			),
		).map(([roleName, users]) => ({
			group: roleName,
			items: users.map((user) => ({
				label: user.username,
				value: user.documentId,
			})),
		}));
	};

	return (
		<MultiSelect
			flex={1}
			data={userGroupByRole()}
			searchable
			rightSection={isLoading ? <Loader size="xs" /> : undefined}
			{...props}
		/>
	);
}
