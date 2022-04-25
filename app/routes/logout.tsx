import type { ActionFunction, LoaderFunction } from "remix";
import { redirect } from "remix";
import { logout } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  return await logout(request);
};

export const loader: LoaderFunction = async () => {
  return await redirect("/");
};
