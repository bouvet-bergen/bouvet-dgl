import { Round } from '@prisma/client';
import { ActionFunction, Form, LoaderFunction, useLoaderData } from 'remix';
import { prisma } from '../../db.server';

export const loader: LoaderFunction = async () => {
    return prisma.round.findMany(); 
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData(); 
    const metrixId = formData.get("metrixId"); 

    if(typeof metrixId === 'string'){
        await prisma.round.create({ data: { metrixId } })
    }
    return null; 
}

export default function Rounds() {
    const rounds = useLoaderData<Round[]>(); 

    return(
        <div>
            {rounds.map(item => 
                <span key={item.id}> {item.metrixId} </span>    
            )}
            <Form method="post">
                <label htmlFor="metrixId">Metrix id</label>
                <input id="metrixId" name="metrixId" type="text" /> 
                <button type="submit">Add</button>
            </Form>
        </div>
    )
}