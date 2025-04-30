import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

interface FootballFixtureCardProps {
  id: number;
  homeTeamName: string;
  homeTeamLogo: string;
  homeTeamScore: number;
  awayTeamName: string;
  awayTeamLogo: string;
  awayTeamScore: number;
  date: string;
  params: number;
}

export const FootballFixtureCards = ({
  id,
  homeTeamName,
  homeTeamLogo,
  homeTeamScore,
  awayTeamName,
  awayTeamLogo,
  awayTeamScore,
  date,
  params
}: FootballFixtureCardProps) => {
  return (
    <Link to="/football/fixtures/$id" params={{ id: params.toString() }}>
      <Card key={id}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex w-1/3 flex-col items-center text-center">
              <img
                src={homeTeamLogo}
                alt={`${homeTeamName} logo`}
                className="mb-2 h-10 w-10 object-contain"
              />
              <span className="mt-2 text-sm">{homeTeamName}</span>
              <span className="mt-2 text-base text-red-700">
                {homeTeamScore}
              </span>
            </div>

            <span className="mx-4 text-lg font-bold">vs</span>

            <div className="flex w-1/3 flex-col items-center text-center">
              <img
                src={awayTeamLogo}
                alt={`${awayTeamName} logo`}
                className="mb-2 h-10 w-10 object-contain"
              />
              <span className="mt-2 text-sm">{awayTeamName}</span>
              <span className="mt-2 text-base text-red-700">
                {awayTeamScore}
              </span>
            </div>
          </CardTitle>
          <CardDescription className="mt-2 text-center text-xs">
            {new Date(date).toLocaleDateString("en-GB", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
