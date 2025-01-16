import type { SelectRenderOptionProps } from "../../select/types";
import type { UserInterface } from "../interfaces/user-interface";

export function UserRenderOption({
	option,
}: SelectRenderOptionProps<UserInterface>) {
	return <div>Hello World {option.data?.username}</div>;
}
