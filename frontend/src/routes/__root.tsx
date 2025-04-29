import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <NavigationMenu className="p-4 h-fit">
        <NavigationMenuList className="flex items-center gap-4">
          <NavigationMenuItem>
            <h1 className="font-bold text-md">Football API</h1>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="/"
              className="[&.active]:border-b-2 [&.active]:text-red-500 pb-1 border-red-500"
            >
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="/football/fixtures"
              className="[&.active]:border-b-2 [&.active]:text-red-500 pb-1 border-red-500"
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
      <TanStackRouterDevtools />
    </>
  )
});
