import { FootballFixtureCards } from "@/components/FootballFixtureCards/FootballFixtureCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  { value: "40", label: "EFL Championship" },
  { value: "41", label: "EFL League 1" },
  { value: "42", label: "EFL League 2" },
  { value: "140", label: "La Liga" },
  { value: "135", label: "Serie A" },
  { value: "78", label: "Bundesliga" },
  { value: "61", label: "Ligue 1" }
];

const seasons = [
  { value: "2024", label: "2024/2025" },
  { value: "2023", label: "2023/2024" },
  { value: "2022", label: "2022/2023" },
  { value: "2021", label: "2021/2022" },
  { value: "2020", label: "2020/2021" },
  { value: "2019", label: "2019/2020" }
];

function FootballComponent() {
  const [selectedLeagueId, setSelectedLeagueId] = useState("39");
  const [selectedSeason, setSelectedSeason] = useState("2023");
  const [leagueOpen, setLeagueOpen] = useState(false);
  const [seasonOpen, setSeasonOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 9;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);

  const options = {
    url: `/api/football/fixtures?league=${selectedLeagueId}&season=${selectedSeason}`,
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_FOOTBALL_API_KEY,
      "x-rapidapi-host": "v3.football.api-sports.io"
    }
  };

  const axiosHeaders = new AxiosHeaders(options.headers);

  const { data, error, isPending } = useGetRequest({
    url: options.url,
    queryKey: ["footballFixtures", selectedLeagueId, selectedSeason],
    header: axiosHeaders,
    gcTime: 1000 * 60 * 24
  });

  useEffect(() => {
    setStartIndex(0);
    setEndIndex(itemsPerPage);
  }, [selectedLeagueId, selectedSeason, searchQuery]);

  if (error) {
    return <div>Error loading fixtures: {error?.message}</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  const footballData = data?.response || [];

  const filteredFixtures = footballData.filter((fixture: FootballFixtures) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      fixture.teams.home.name.toLowerCase().includes(searchLower) ||
      fixture.teams.away.name.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-[300px]"
        />
        <div className="flex gap-2">
          <Popover open={leagueOpen} onOpenChange={setLeagueOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={leagueOpen}
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
                            currentValue === selectedLeagueId
                              ? ""
                              : currentValue
                          );
                          setLeagueOpen(false);
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

          <Popover open={seasonOpen} onOpenChange={setSeasonOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={seasonOpen}
                className="w-[200px] justify-between"
              >
                {selectedSeason
                  ? seasons.find((season) => season.value === selectedSeason)
                      ?.label
                  : "Select season..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search season..." />
                <CommandList>
                  <CommandEmpty>No season found.</CommandEmpty>
                  <CommandGroup>
                    {seasons.map((season) => (
                      <CommandItem
                        key={season.value}
                        value={season.value}
                        onSelect={(currentValue) => {
                          setSelectedSeason(
                            currentValue === selectedSeason ? "" : currentValue
                          );
                          setSeasonOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedSeason === season.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {season.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {filteredFixtures
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
                endIndex >= filteredFixtures.length
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
