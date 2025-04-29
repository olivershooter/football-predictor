import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index
});

function Index() {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Footballing Stats</h1>
        <p>with Tanstack Router and API</p>
      </div>
    </div>
  );
}
