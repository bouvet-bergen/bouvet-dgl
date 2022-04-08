export function getTrackColor(
  diff: number,
  par: string
): {
  background: string;
  text: string;
} {
  if (diff < 0 && parseInt(par) + diff === 1) {
    return { background: "var(--ace)", text: "var(--darkText)" };
  }

  switch (diff) {
    case undefined:
      return { background: "transparent", text: "var(--lightText)" };
    case -3:
      return { background: "var(--albatross)", text: "var(--albatross)" };
    case -2:
      return { background: "var(--eagle)", text: "var(--lightText)" };
    case -1:
      return { background: "var(--birdie)", text: "var(--darkText)" };
    case 0:
      return { background: "var(--par)", text: "var(--darkText)" };
    case 1:
      return { background: "var(--bogey)", text: "var(--darkText)" };
    case 2:
      return { background: "var(--dbogey)", text: "var(--lightText)" };
    default:
      return { background: "var(--awful)", text: "var(--lightText)" };
  }
}
