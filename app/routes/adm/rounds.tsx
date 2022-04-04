import { Round } from "@prisma/client";
import { ActionFunction, Form, LoaderFunction, useLoaderData } from "remix";
import { prisma } from "../../db.server";

export const loader: LoaderFunction = async () => {
  return prisma.round.findMany();
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const metrixId = formData.get("metrixId");

  if (typeof metrixId === "string") {
    await prisma.round.create({ data: { metrixId } });
  }
  return null;
};

export default function Rounds() {
  const rounds = useLoaderData<Round[]>();

  return (
    <div>
      <div>
        {rounds.map((item) => (
          <p key={item.id}> - {item.metrixId} </p>
        ))}
      </div>
      <Form method="post">
        <div className="input-group">
          <label htmlFor="metrixId">Metrix id</label>
          <input id="metrixId" name="metrixId" type="text" />
        </div>
        <button type="submit">Add</button>
      </Form>
    </div>
  );
}
