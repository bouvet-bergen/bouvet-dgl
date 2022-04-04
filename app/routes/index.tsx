import { useLoaderData, LoaderFunction, Link, LinksFunction } from 'remix';
import { useOptionalUser } from "~/utils";
import { fetchCompetitions } from '~/api/competitions.server';
import { FrontPageData } from '~/models/competition.server';
import { formatDate } from '~/utils/date';
import stylesUrl from '~/styles/index.css';

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesUrl }, 
  ];
};

export const loader: LoaderFunction =  async () => {
  const stuff = await fetchCompetitions();

  return stuff; 
}

export default function Index() {
  const user = useOptionalUser();
  const { competitions, scores } = useLoaderData<FrontPageData>();

  return (
    <main>
      <header className="header">
        <h1> Bouvet DGS 🥏 </h1>
        <div className="user">{user ? user.email : ''}
          <Link to={user ? "/logout" : "/login"} > {user ? "Logout" : "Login"} </Link>
          {user && (
            <>
              <Link to="adm/courses"> Courses </Link>
              <Link to="adm/rounds"> Rounds </Link>
            </>
          )}
        </div>
      </header>
      <div className="content">
      <div>
          <h2>Highscore</h2>
          <ul>
            {scores.map(user => 
              <li key={user.UserId}> {user.UserName} {user.Rating} </li>
            )}
          </ul>
        </div>
        <div>
          <h2>Runder</h2>
          <ul>
            {competitions.map(competition=> 
              <li key={competition.ID}> 
                <Link to={`/competition/${competition.ID}`}> 
                  {competition.Name} - {formatDate(competition.Date)} - {competition.CourseName} - Number of players {competition.Results.length} 
                </Link> 
              </li>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}