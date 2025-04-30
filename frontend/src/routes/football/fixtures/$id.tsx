import { ShirtSVG } from "@/components/FootballFixture/ShirtSVG";
import { useGetRequest } from "@/hooks/useGetRequest";
import { createFileRoute } from "@tanstack/react-router";
import { AxiosHeaders } from "axios";

const options = {
  url: "/api/football/fixtures?id=",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_FOOTBALL_API_KEY,
    "x-rapidapi-host": "v3.football.api-sports.io"
  }
};

export const Route = createFileRoute("/football/fixtures/$id")({
  component: footballFixture
});

function footballFixture() {
  const { id } = Route.useParams();
  const axiosHeaders = new AxiosHeaders(options.headers);

  const { data, error, isPending } = useGetRequest({
    url: options.url + id,
    queryKey: "footballFixture",
    header: axiosHeaders,
    gcTime: 1000 * 60 * 24
  });

  if (error)
    return <div className="alert">Error loading fixture: {error.message}</div>;

  if (isPending) return <div className="loading">Loading...</div>;

  const fixtureData = data.response[0];
  const { teams, league, score, fixture, events, lineups, statistics } =
    fixtureData;

  console.log("fixture data: ", fixtureData);

  const newDate = new Date(fixture.date).toLocaleString();

  const positionOfPlayer = (position: string) => {
    const positions: Record<string, string> = {
      D: "Defender",
      G: "Goalkeeper",
      M: "Midfielder",
      F: "Forward"
    };
    return positions[position] || "Unknown position";
  };

  const whoWon = (homeTeamScore: string, awayTeamScore: string) => {
    const homeIsWinner = homeTeamScore > awayTeamScore;
    const tie = homeTeamScore === awayTeamScore;

    return (
      <>
        <div className="flex w-full flex-row items-center gap-2 text-sm font-bold sm:text-base md:text-2xl">
          <div className="flex w-full items-center justify-end">
            <div className="text-right">{teams.home.name}</div>
            <div
              className={`ml-2 ${
                homeIsWinner
                  ? "text-lime-700"
                  : tie
                    ? "text-slate-700"
                    : "text-red-700"
              }`}
            >
              {score.fulltime.home}
            </div>
          </div>
          <div className="mx-2 flex items-center">-</div>
          <div className="flex w-full items-center">
            <div
              className={`mr-2 ${
                homeIsWinner
                  ? "text-red-700"
                  : tie
                    ? "text-slate-700"
                    : "text-lime-700"
              }`}
            >
              {score.fulltime.away}
            </div>
            <div>{teams.away.name}</div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* Main Event Details */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Team Info */}
        <div className="col-span-1">
          <div className="mb-8 flex flex-col gap-4">
            <h2 className="text-lg font-bold sm:text-base md:text-2xl">
              Match Details
            </h2>
            <div className="text-sm sm:text-base md:text-lg">
              <p>
                <b>Status: </b>
                <span className="text-gray-600">{fixture.status.long}</span>
              </p>
              <p>
                <b>League: </b>
                <span className="text-gray-600">{league.name}</span>
              </p>
              <p>
                <b>Season: </b>
                <span className="text-gray-600">{league.season}</span>
              </p>
              <p>
                <b>Round: </b>
                <span className="text-gray-600">{league.round}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Scoreline */}
        <div className="col-span-1">
          <div className="mb-8 flex flex-col gap-4">
            <h2 className="text-center text-lg font-bold sm:text-base md:text-2xl">
              Scoreline
            </h2>
            <div className="flex flex-col items-center gap-2">
              {whoWon(score.fulltime.home, score.fulltime.away)}
              <div className="items-center gap-2 text-xs text-gray-600 sm:text-sm">
                HT: {score.halftime.home} - {score.halftime.away}
              </div>
            </div>
          </div>
        </div>

        {/* Match Header */}
        <div className="col-span-1">
          <div className="mb-8 flex flex-col gap-4">
            <div className="text-right text-sm sm:text-base md:text-lg">
              <p>
                <b>Date: </b> <span className="text-gray-600">{newDate}</span>
              </p>
              <p>
                <b>Venue: </b>
                <span className="text-gray-600">{fixture.venue.name}</span>
              </p>
              <p>
                <b>Referee: </b>
                <span className="text-gray-600">{fixture.referee}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lineups */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">Lineups</h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Home Team Lineup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {teams.home.name} Starting XI
            </h3>
            {lineups[0].startXI.map((playerObj: { player: any }) => {
              const player = playerObj.player;
              return (
                <div
                  key={player.id}
                  className="flex items-center justify-between rounded bg-gray-300 p-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      <ShirtSVG
                        width={40}
                        height={40}
                        playersNumber={player.number.toString()}
                        colour={`#${lineups[0].team.colors.player.primary}`}
                        alt={player.name}
                      />
                    </span>
                    {player.name}
                  </div>
                  <span>{positionOfPlayer(player.pos)}</span>
                </div>
              );
            })}
          </div>

          {/* Away Team Lineup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {teams.away.name} Starting XI
            </h3>
            {lineups[1].startXI.map((playerObj: { player: any }) => {
              const player = playerObj.player;
              return (
                <div
                  key={player.id}
                  className="flex items-center justify-between rounded bg-gray-300 p-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      <ShirtSVG
                        width={40}
                        height={40}
                        playersNumber={player.number.toString()}
                        colour={`#${lineups[1].team.colors.player.primary}`}
                        alt={player.name}
                      />
                    </span>
                    {player.name}
                  </div>
                  <span>{positionOfPlayer(player.pos)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events Timeline */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">Event Timeline</h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-4">
            {events.map((event: any) => (
              <div className="flex flex-col items-center rounded bg-gray-100 p-2">
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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {teams.home.name} Statistics
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Possession:</span>
              <span>
                {
                  statistics[0].statistics.find(
                    (stats: any) => stats.type === "Ball Possession"
                  )?.value
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shots On Goal:</span>
              <span>
                {
                  statistics[0].statistics.find(
                    (stats: any) => stats.type === "Shots on Goal"
                  )?.value
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>Corners:</span>
              <span>
                {
                  statistics[0].statistics.find(
                    (stats: any) => stats.type === "Corner Kicks"
                  )?.value
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>Yellow Cards:</span>
              <span>
                {
                  statistics[0].statistics.find(
                    (stats: any) => stats.type === "Yellow Cards"
                  )?.value
                }
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {teams.away.name} Statistics
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Possession:</span>
              <span>
                {
                  statistics[1].statistics.find(
                    (stats: any) => stats.type === "Ball Possession"
                  )?.value
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shots On Goal:</span>
              <span>
                {
                  statistics[1].statistics.find(
                    (stats: any) => stats.type === "Shots on Goal"
                  )?.value
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>Corners:</span>
              <span>
                {
                  statistics[1].statistics.find(
                    (stats: any) => stats.type === "Corner Kicks"
                  )?.value
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>Yellow Cards:</span>
              <span>
                {
                  statistics[1].statistics.find(
                    (stats: any) => stats.type === "Yellow Cards"
                  )?.value
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
