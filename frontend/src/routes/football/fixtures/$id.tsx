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

  return (
    <>
      {/* Match Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold">{id}</h1>
        <div className="text-sm text-gray-600">
          <p>Date: {fixture.date}</p>
          <p>Venue: {fixture.venue.name}</p>
          <p>Referee: {fixture.referee}</p>
        </div>
      </div>

      {/* Main Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Team Info */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Match Details</h2>
          <div className="space-y-2">
            <p className="font-medium">Status: {fixture.status.long}</p>
            <p>League: {league.name}</p>
            <p>Season: {league.season}</p>
            <p>Round: {league.round}</p>
          </div>
        </div>

        {/* Scoreline */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Scoreline</h2>
          <div className="text-center">
            <div className="flex flex-col">
              <div className="text-2xl font-bold">
                {teams.home.name} {score.fulltime.home} - {score.fulltime.away}{" "}
                {teams.away.name}
              </div>
              <div className="text-sm text-gray-600">
                HT: {score.halftime.home} - {score.halftime.away}
              </div>
            </div>
          </div>
        </div>

        {/* Standings */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Standings</h2>
          <div className="space-y-2">
            <p>
              {teams.home.name} - {league.position}th
            </p>
            <p>
              {teams.away.name} - {league.position}th
            </p>
          </div>
        </div>
      </div>

      {/* Lineups */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Lineups</h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Home Team Lineup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {teams.home.name} Starting XI
            </h3>
            {lineups[0].startXI.map((player) => (
              <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
                <div>
                  <span className="font-medium">{player.number} </span>
                  <span>{player.pos}</span> - {player.name}
                </div>
              </div>
            ))}
          </div>

          {/* Away Team Lineup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {teams.away.name} Starting XI
            </h3>
            {lineups[1].startXI.map((player) => (
              <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
                <div>
                  <span className="font-medium">{player.number} </span>
                  <span>{player.pos}</span> - {player.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Events Timeline */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Event Timeline</h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-4">
            {events.map((event) => (
              <div className="flex flex-col items-center p-2 bg-gray-100 rounded">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    (s) => s.type === "Ball Possession"
                  )?.value
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shots On Goal:</span>
              <span>
                {
                  statistics[0].statistics.find(
                    (s) => s.type === "Shots on Goal"
                  )?.value
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>Corners:</span>
              <span>
                {
                  statistics[0].statistics.find(
                    (s) => s.type === "Corner Kicks"
                  )?.value
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>Yellow Cards:</span>
              <span>
                {
                  statistics[0].statistics.find(
                    (s) => s.type === "Yellow Cards"
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
                    (s) => s.type === "Ball Possession"
                  )?.value
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shots On Goal:</span>
              <span>
                {
                  statistics[1].statistics.find(
                    (s) => s.type === "Shots on Goal"
                  )?.value
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>Corners:</span>
              <span>
                {
                  statistics[1].statistics.find(
                    (s) => s.type === "Corner Kicks"
                  )?.value
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>Yellow Cards:</span>
              <span>
                {
                  statistics[1].statistics.find(
                    (s) => s.type === "Yellow Cards"
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
