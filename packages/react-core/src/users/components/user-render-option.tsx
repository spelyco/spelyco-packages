import type { SelectRenderOptionProps } from "../../select/types";

export function UserRenderOption({ option, checked }: SelectRenderOptionProps) {
	return <div>Hello World {option.data?.name}</div>;
}
