import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index
});

function Index() {
  return (
    <div className="flex h-[90vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Footballing Stats</h1>
        <p>with Tanstack and Football API</p>
      </div>
    </div>
  );
}
