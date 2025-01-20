import { useQuery } from "@tanstack/react-query";
import type { MediaModalHooksProps } from "../types";

const SERVICE_NAME = "upload";

export function useMediaModal({ accept, axios, prefix }: MediaModalHooksProps) {
	const mediaFind = useQuery({
		queryKey: [SERVICE_NAME, prefix, accept.join(",")],
		queryFn: async () => {
			const req = await axios.get("/api/upload/files", {});

			return req;
		},
	});

	return {
		mediaFind,
	};
}
