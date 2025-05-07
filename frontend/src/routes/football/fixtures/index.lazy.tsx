import { FootballFixtureCards } from "@/components/FootballFixtureCards/FootballFixtureCards";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { useGetRequest } from "@/hooks/useGetRequest";
import { FootballFixtures } from "@/types/football/football";
import { createLazyFileRoute } from "@tanstack/react-router";
import { AxiosHeaders } from "axios";
import { ChevronsUpDown, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createLazyFileRoute("/football/fixtures/")({
  component: FootballComponent
});

const leagues = [
  { value: "39", label: "Premier League" },
  { value: "140", label: "La Liga" },
  { value: "135", label: "Serie A" },
  { value: "78", label: "Bundesliga" },
  { value: "61", label: "Ligue 1" }
];

function FootballComponent() {
  const [selectedLeagueId, setSelectedLeagueId] = useState("39");
  const [open, setOpen] = useState(false);

  const itemsPerPage = 9;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);

  const options = {
    url: `/api/football/fixtures?league=${selectedLeagueId}&season=2023`,
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_FOOTBALL_API_KEY,
      "x-rapidapi-host": "v3.football.api-sports.io"
    }
  };

  const axiosHeaders = new AxiosHeaders(options.headers);

  const { data, error, isPending } = useGetRequest({
    url: options.url,
    queryKey: ["footballFixtures", selectedLeagueId],
    header: axiosHeaders,
    gcTime: 1000 * 60 * 24
  });

  useEffect(() => {
    setStartIndex(0);
    setEndIndex(itemsPerPage);
  }, [selectedLeagueId]);

  useEffect(() => {
    console.log("Fetching data for league:", selectedLeagueId);
  }, [selectedLeagueId]);

  if (error) {
    return <div>Error loading fixtures: {error?.message}</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  const footballData = data?.response || [];

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedLeagueId
              ? leagues.find((league) => league.value === selectedLeagueId)
                  ?.label
              : "Select league..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search league..." />
            <CommandList>
              <CommandEmpty>No league found.</CommandEmpty>
              <CommandGroup>
                {leagues.map((league) => (
                  <CommandItem
                    key={league.value}
                    value={league.value}
                    onSelect={(currentValue) => {
                      setSelectedLeagueId(
                        currentValue === selectedLeagueId ? "" : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedLeagueId === league.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {league.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {footballData
          .slice(startIndex, endIndex)
          .map((fixture: FootballFixtures) => (
            <FootballFixtureCards
              key={fixture.fixture.id}
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
                endIndex >= footballData.length
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
    </div>
  );
}
