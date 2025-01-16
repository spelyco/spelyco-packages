import { Stack } from "@mantine/core";
import { MultiSelect, Select, UserRenderOption } from "@spelyco/react-core";
import { axiosInstance } from "../axios";

type Data = {
	id: number;
	documentId: string;
	name: string;
};

export default function MultiSelectPage() {
	return (
		<Stack>
			<MultiSelect<Data>
				axios={axiosInstance}
				serviceName="customers"
				queryKey={["customers"]}
				label="Customers"
				data={(data: Data) => ({
					label: data.documentId,
					value: data.id.toString(),
					data,
				})}
				renderOption={(item) => <UserRenderOption {...item} />}
			/>

			<Select
				axios={axiosInstance}
				serviceName="customers"
				queryKey={["customers"]}
				label="Select Customers"
				data={(data: Data) => ({
					label: data.documentId,
					value: data.id.toString(),
					data,
				})}
				renderOption={(item) => <UserRenderOption {...item} />}
			/>
		</Stack>
	);
}
