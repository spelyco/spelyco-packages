import { Anchor, Box, Container, Group } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { data } from "../router";

export function Layout() {
	return (
		<div>
			<Box p={15} bg={"gray.3"}>
				<Container>
					<Group>
						{data.map((item, index) => (
							<Link key={index.toString()} to={item.link}>
								<Anchor>{item.label}</Anchor>
							</Link>
						))}
					</Group>
				</Container>
			</Box>

			<Container py={"xl"}>
				<Outlet />
			</Container>
		</div>
	);
}
