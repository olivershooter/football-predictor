import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<NavigationMenu className="h-fit p-4">
				<NavigationMenuList className="flex items-center gap-4">
					<NavigationMenuItem>
						<h1 className="text-md font-bold">Football Stats</h1>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link
							to="/"
							className="border-red-500 pb-1 [&.active]:border-b-2 [&.active]:text-red-500"
						>
							Home
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link
							to="/football/fixtures"
							className="border-red-500 pb-1 [&.active]:border-b-2 [&.active]:text-red-500"
						>
							Football
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			<hr />
			<div className="container pt-12">
				<Outlet />
			</div>
			{/* <TanStackRouterDevtools /> */}
		</>
	),
});
