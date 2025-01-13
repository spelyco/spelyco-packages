import { Button } from "@mantine/core";
import { useSpelyCOReactStore } from "@spelyco/react-core";

function TestPage() {
	const ct = useSpelyCOReactStore((state) => state.count);
	const i = useSpelyCOReactStore((state) => state.incrementCount);
	const d = useSpelyCOReactStore((state) => state.decrementCount);

	return (
		<div>
			<Button onClick={() => d()}>Azalt</Button>
			<Button onClick={() => i()}>Arttır</Button>
			<div>Hello World {ct}</div>
		</div>
	);
}

export { TestPage };
