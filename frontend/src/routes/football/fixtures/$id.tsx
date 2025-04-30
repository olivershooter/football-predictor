import { getScoreColor } from "@/components/Common/GetScoreColor";
import { SectionHeader } from "@/components/Common/SectionHeader";
import { ShirtSVG } from "@/components/FootballFixture/ShirtSVG";
import { useGetRequest } from "@/hooks/useGetRequest";
import { createFileRoute } from "@tanstack/react-router";
import { AxiosHeaders } from "axios";

const API_OPTIONS = {
  url: "/api/football/fixtures?id=",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_FOOTBALL_API_KEY,
    "x-rapidapi-host": "v3.football.api-sports.io"
  }
};

export const Route = createFileRoute("/football/fixtures/$id")({
  component: FootballFixture
});

function FootballFixture() {
  const { id } = Route.useParams();
  const axiosHeaders = new AxiosHeaders(API_OPTIONS.headers);

  const { data, error, isPending } = useGetRequest({
    url: `${API_OPTIONS.url}${id}`,
    queryKey: "footballFixture",
    header: axiosHeaders,
    gcTime: 1000 * 60 * 60 * 24 * 7 // 1 week caching
  });

  if (error)
    return <div className="alert">Error loading fixture: {error.message}</div>;
  if (isPending) return <div className="loading">Loading...</div>;

  const fixtureData = data.response[0];
  const { teams, league, score, fixture, events, lineups, statistics } =
    fixtureData;
  const newDate = new Date(fixture.date).toLocaleString();

  const positionMap: Record<string, string> = {
    D: "Defender",
    G: "Goalkeeper",
    M: "Midfielder",
    F: "Forward"
  };

  const renderScoreline = (homeScore: number, awayScore: number) => {
    const isTie = homeScore === awayScore;
    const isHomeWinner = homeScore > awayScore;

    return (
      <div className="flex w-full flex-row items-center justify-center gap-2 text-sm font-bold sm:text-base md:text-2xl">
        <div className="flex w-full items-center justify-end">
          <div className="text-right">{teams.home.name}</div>
          <div className={`ml-2 ${getScoreColor(true, isHomeWinner, isTie)}`}>
            {homeScore}
          </div>
        </div>
        <div className="mx-2">-</div>
        <div className="flex w-full items-center">
          <div className={`mr-2 ${getScoreColor(false, isHomeWinner, isTie)}`}>
            {awayScore}
          </div>
          <div>{teams.away.name}</div>
        </div>
      </div>
    );
  };

  const renderLineup = (teamIndex: number, alignment: "left" | "right") => {
    const team = lineups[teamIndex];
    return (
      <div className="space-y-4">
        <h3
          className={`text-sm font-semibold sm:text-base md:text-xl text-${alignment}`}
        >
          {team.team.name} Starting XI
        </h3>
        {team.startXI.map(({ player }: { player: any }) => (
          <div
            key={player.id}
            className="flex items-center justify-between rounded bg-gray-300 p-2"
          >
            <div className="flex items-center gap-2">
              <ShirtSVG
                width={40}
                height={40}
                playersNumber={player.number.toString()}
                colour={`#${team.team.colors.player.primary}`}
                alt={player.name}
              />
              {player.name}
            </div>
            <span>{positionMap[player.pos] || "Unknown position"}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderStatistics = (teamIndex: number, teamName: string) => {
    const stats = statistics[teamIndex].statistics;
    const getStat = (type: string) =>
      stats.find((s: any) => s.type === type)?.value;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{teamName} Statistics</h3>
        <div className="space-y-2">
          {[
            "Ball Possession",
            "Shots on Goal",
            "Corner Kicks",
            "Yellow Cards"
          ].map((stat) => (
            <div key={stat} className="flex justify-between">
              <span>{stat}:</span>
              <span>{getStat(stat)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Scoreline */}
      <div className="mb-8">
        <SectionHeader title="Scoreline" />
        <div className="flex flex-col items-center gap-2">
          {renderScoreline(score.fulltime.home, score.fulltime.away)}
          <div className="text-xs text-gray-600 sm:text-sm">
            HT: {score.halftime.home} - {score.halftime.away}
          </div>
        </div>
      </div>

      {/* Match Details */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-bold sm:text-base md:text-2xl">
            Match Details
          </h2>
          <div className="text-sm sm:text-base md:text-lg">
            <p>
              <b>Status:</b>{" "}
              <span className="text-gray-600">{fixture.status.long}</span>
            </p>
            <p>
              <b>League:</b>{" "}
              <span className="text-gray-600">{league.name}</span>
            </p>
            <p>
              <b>Season:</b>{" "}
              <span className="text-gray-600">{league.season}</span>
            </p>
            <p>
              <b>Round:</b>{" "}
              <span className="text-gray-600">{league.round}</span>
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold sm:text-base md:text-2xl">
            Match Header
          </h2>
          <div className="text-sm sm:text-base md:text-lg">
            <p>
              <b>Date:</b> <span className="text-gray-600">{newDate}</span>
            </p>
            <p>
              <b>Venue:</b>{" "}
              <span className="text-gray-600">{fixture.venue.name}</span>
            </p>
            <p>
              <b>Referee:</b>{" "}
              <span className="text-gray-600">{fixture.referee}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Lineups */}
      <div className="mb-12">
        <SectionHeader title="Lineups" />
        <div className="grid grid-cols-2 gap-6">
          {renderLineup(0, "left")}
          {renderLineup(1, "right")}
        </div>
      </div>

      {/* Events Timeline */}
      <div className="mb-8 mt-12">
        <SectionHeader title="Event Timeline" />
        <div className="overflow-x-auto">
          <div className="flex space-x-4">
            {events.map((event: any) => (
              <div
                key={event.time.elapsed + event.player.id}
                className="flex flex-col items-center rounded bg-gray-100 p-2"
              >
                <span className="text-xs text-gray-500">
                  {event.time.elapsed}'
                </span>
                <span className="font-medium">{event.player.name}</span>
                <span className="text-sm text-gray-600">
                  {event.type}: {event.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-16">
        <SectionHeader title="Statistics" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {renderStatistics(0, teams.home.name)}
          {renderStatistics(1, teams.away.name)}
        </div>
      </div>
    </>
  );
}
