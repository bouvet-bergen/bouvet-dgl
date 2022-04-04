import { useLoaderData, LoaderFunction, useCatch, LinksFunction } from "remix";
import { fetchCompetition } from "~/api/competitions.server";
import { Competition } from "~/models/competition.server";
import { formatDate } from "~/utils/date";
import stylesUrl from "~/styles/competition.css";
import { FiClock, FiExternalLink } from "react-icons/fi";
import { getTrackColor } from "../../utils/colors";
import { Course } from "@prisma/client";
import { getCourse } from "~/api/courses.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

type LoaderData = {
  competition: Competition;
  course?: Course;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (params?.id) {
    const competition = await fetchCompetition(params.id);
    console.log(competition);
    if (competition.CourseID) {
      const course = await getCourse(competition.CourseID);
      return { competition, course };
    }
    return { competition };
  }

  throw new Response("Not Found", {
    status: 404,
  });
};

export default function Index() {
  const { competition, course } = useLoaderData<LoaderData>();

  function getTrackStyles(diff: number) {
    const colors = getTrackColor(diff);
    return { backgroundColor: colors.background, color: colors.text };
  }

  return (
    <main>
      <div className="course">
        <h2>{competition.Name}</h2>
        <div className="info">
          {course && (
            <div className="stats">
              <span>
                <i>Par rating: </i>
                {course.ratingDiff}
              </span>
              <span>
                <i>Par score: </i>
                {course.parScore}
              </span>
              <span>
                <i>Rating difference: </i> {course.parRating}
              </span>
            </div>
          )}
          <div className="stats">
            <i className="date">
              {formatDate(competition.Date)} <FiClock />
            </i>
            {competition.CourseID ? (
              <a
                href={`https://discgolfmetrix.com/course/${competition.CourseID}`}
                target="_blank"
                rel="noreferrer"
              >
                {course?.name ?? competition.CourseName} <FiExternalLink />
              </a>
            ) : (
              <span>{competition.CourseName}</span>
            )}
          </div>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <th> No </th>
            <th> Name </th>
            {competition.Tracks.map((track) => (
              <th key={track.Number}> {track.Number} </th>
            ))}
            <th> +/- </th>
            <th> Total </th>
          </tr>
          <tr>
            <td className="blank"></td>
            <td className="blank"></td>
            {competition.Tracks.map((track) => (
              <td key={track.Number} className="par">
                {track.Par}
              </td>
            ))}
            <td className="blank"></td>
            <td className="blank"></td>
          </tr>
          {competition.Results.map((result) => (
            <tr key={result.OrderNumber}>
              <td>{result.OrderNumber}</td>
              <td>{result.Name}</td>
              {result.PlayerResults.map((pRes, index) => (
                <td style={getTrackStyles(pRes.Diff)} key={result.Name + index}>
                  {pRes.Result}
                </td>
              ))}
              <td>{`${result.Diff > 0 ? "+" : ""}  ${result.Diff}`}</td>
              <td>{result.Sum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div className="error-container">
      <h1>
        {caught.status} {caught.data}
      </h1>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <div>Whooops! {error.message}</div>;
}
