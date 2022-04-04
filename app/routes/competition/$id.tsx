import { useLoaderData, LoaderFunction, Link, useCatch, CatchBoundaryComponent } from 'remix';
import { useOptionalUser } from "~/utils";
import { fetchCompetition } from '~/api/competitions.server';
import { Competition } from '~/models/competition.server';
import { formatDate } from '~/utils/date';

export const loader: LoaderFunction =  async ({ params }) => {
    if(params?.id){
        const stuff = await fetchCompetition(params.id);
        return stuff; 
    }

    throw new Response("Not Found", {
        status: 404,
    });
}

export default function Index() {
  const user = useOptionalUser();
  const competition = useLoaderData<Competition>();

  return (
    <main>
      <header>
        <h1> Bouvet DGL 🥏 </h1>
        <div className="user">{user ? user.email : ''}</div>
        <Link to={user ? "/logout" : "/login"} > {user ? "Logout" : "Login"} </Link>
      </header>
      {competition.Name} - {formatDate(competition.Date)} - {competition.CourseName} - Number of players {competition.Results.length}
    </main>
  );
}

export function CatchBoundary(): CatchBoundaryComponent {
    const caught = useCatch();
    return (
      <div>
          Whooops! {caught.statusText}
      </div>
    );
  }