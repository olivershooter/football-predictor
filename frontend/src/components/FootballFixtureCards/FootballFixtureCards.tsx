import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { getScoreColor } from "../Common/GetScoreColor";

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
  const isTie = homeTeamScore === awayTeamScore;
  const isHomeWinner = homeTeamScore > awayTeamScore;

  return (
    <Link to="/football/fixtures/$id" params={{ id: params.toString() }}>
      <Card key={id}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex w-full flex-col items-center text-center">
              <img
                src={homeTeamLogo}
                alt={`${homeTeamName} logo`}
                className="mx-auto mb-2 h-10 w-10 object-contain"
              />
              <span className="mt-2 text-sm font-bold">{homeTeamName}</span>
              <span
                className={`${getScoreColor(true, isHomeWinner, isTie)} mt-2 text-base font-bold`}
              >
                {homeTeamScore}
              </span>
            </div>

            <span className="mx-4 text-lg font-bold">vs</span>

            <div className="flex w-full flex-col items-center text-center">
              <img
                src={awayTeamLogo}
                alt={`${awayTeamName} logo`}
                className="mx-auto mb-2 h-10 w-10 object-contain"
              />
              <span className="mt-2 text-sm font-bold">{awayTeamName}</span>
              <span
                className={`${getScoreColor(false, isHomeWinner, isTie)} mt-2 text-base font-bold`}
              >
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
