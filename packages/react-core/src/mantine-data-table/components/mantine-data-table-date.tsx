import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function MantineDataTableDate({ value }: { value: string | Date }) {
	return <div>{dayjs(value).fromNow()}</div>;
}
