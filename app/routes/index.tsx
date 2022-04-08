import { useLoaderData, LoaderFunction, Link, LinksFunction } from "remix";
import { FaFlagCheckered, FaTrophy } from "react-icons/fa";

import { fetchCompetitions } from "~/api/competitions.server";
import { FrontPageData } from "~/models/competition.server";
import { formatDate } from "~/utils/date";
import stylesUrl from "~/styles/index.css";
import React from "react";
import { Medal } from "../components/Medal";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader: LoaderFunction = async () => {
  const data = await fetchCompetitions();

  return data;
};

export default function Index() {
  const { competitions, scores } = useLoaderData<FrontPageData>();

  return (
    <main>
      <div className="container">
        <div className="card">
          <h2 className="title">
            <FaTrophy /> Toppliste
          </h2>
          <div className="scores">
            {scores.map((user, index) => (
              <React.Fragment key={user.UserId}>
                <span className="medal">
                  <Medal number={index + 1} />
                  {user.UserName}{" "}
                </span>
                <span>{user.Rating}</span>
                <span>
                  {`${user.NumberOfRounds} runde${
                    user.NumberOfRounds > 1 ? "r" : ""
                  }`}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="title">
            <FaFlagCheckered /> Runder
          </h2>
          <ul className="competitions">
            {competitions.map((competition, index) => (
              <li key={competition.ID}>
                <Link to={`/competition/${competition.ID}`}>
                  Runde {index + 1}: {formatDate(competition.Date)} -{" "}
                  {competition.CourseName} - Spillere:
                  {competition.Results.length}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
