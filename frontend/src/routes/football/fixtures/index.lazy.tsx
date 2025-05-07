import { FootballFixtureCards } from "@/components/FootballFixtureCards/FootballFixtureCards";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext
} from "@/components/ui/pagination";
import { useGetRequest } from "@/hooks/useGetRequest";
import { FootballFixtures } from "@/types/football/football";
import { createLazyFileRoute } from "@tanstack/react-router";
import { AxiosHeaders } from "axios";
import { useState } from "react";

export const Route = createLazyFileRoute("/football/fixtures/")({
  component: FootballComponent
});

const options = {
  url: "/api/football/fixtures?league=39&season=2023",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_FOOTBALL_API_KEY,
    "x-rapidapi-host": "v3.football.api-sports.io"
  }
};

function FootballComponent() {
  const axiosHeaders = new AxiosHeaders(options.headers);

  const itemsPerPage = 9;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);

  const { data, error, isPending } = useGetRequest({
    url: options.url,
    queryKey: "footballFixtures",
    header: axiosHeaders,
    gcTime: 1000 * 60 * 24
  });

  if (error) {
    return <div>Error loading fixtures: {error?.message}</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  const footballFixtures = data?.response
    ? data.response
    : "Something went wrong with the footballFixtures call";

  return (
    <>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {footballFixtures
          .slice(startIndex, endIndex)
          .map((fixture: FootballFixtures) => (
            <FootballFixtureCards
              key={`key-${fixture.fixture.id}`}
              id={fixture.fixture.id}
              homeTeamName={fixture.teams.home.name}
              homeTeamLogo={fixture.teams.home.logo}
              homeTeamScore={fixture.score.fulltime.home}
              awayTeamName={fixture.teams.away.name}
              awayTeamLogo={fixture.teams.away.logo}
              awayTeamScore={fixture.score.fulltime.away}
              date={fixture.fixture.date}
              params={fixture.fixture.id}
            />
          ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                startIndex === 0
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              onClick={() => {
                setStartIndex(startIndex - itemsPerPage);
                setEndIndex(endIndex - itemsPerPage);
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={
                endIndex === 100
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              onClick={() => {
                setStartIndex(startIndex + itemsPerPage);
                setEndIndex(endIndex + itemsPerPage);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
