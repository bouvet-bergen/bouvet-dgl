import { rest } from "msw";

const delay = process.env.NODE_ENV === "test" ? 0 : 1500;

const handlers = [
  rest.get(
    "https://discgolfmetrix.com/api.php?content=result",
    async (req, res, ctx) => {
      return res(ctx.delay(delay), ctx.json({}));
    }
  ),
];

export { handlers };
