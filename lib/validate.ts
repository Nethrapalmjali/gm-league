
const SPORTS = ['cricket', 'volleyball', 'throwball'];
const STATUSES = ['upcoming', 'live', 'completed'];

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/**
 * Checks that a request body has the shape of AppData before it is used to
 * replace the whole database. seedData() deletes existing rows first, so a
 * malformed payload would otherwise wipe data and then crash mid-insert.
 *
 * Returns an error message, or null when the payload is valid.
 */
export function validateAppData(data: unknown): string | null {
  if (!isObj(data)) return 'Body must be a JSON object';
  if (!Array.isArray(data.teams)) return '"teams" must be an array';
  if (!Array.isArray(data.matches)) return '"matches" must be an array';

  for (const [i, t] of data.teams.entries()) {
    if (!isObj(t)) return `teams[${i}] must be an object`;
    if (typeof t.id !== 'string' || !t.id) return `teams[${i}].id must be a non-empty string`;
    if (typeof t.name !== 'string') return `teams[${i}].name must be a string`;
    if (!SPORTS.includes(t.sport as string)) return `teams[${i}].sport is invalid`;
    if (!Array.isArray(t.players)) return `teams[${i}].players must be an array`;
    for (const [j, p] of t.players.entries()) {
      if (!isObj(p) || typeof p.id !== 'string' || typeof p.name !== 'string') {
        return `teams[${i}].players[${j}] must have string id and name`;
      }
    }
  }

  for (const [i, m] of data.matches.entries()) {
    if (!isObj(m)) return `matches[${i}] must be an object`;
    if (typeof m.id !== 'string' || !m.id) return `matches[${i}].id must be a non-empty string`;
    if (!SPORTS.includes(m.sport as string)) return `matches[${i}].sport is invalid`;
    if (!STATUSES.includes(m.status as string)) return `matches[${i}].status is invalid`;
    if (typeof m.teamAId !== 'string' || typeof m.teamBId !== 'string') {
      return `matches[${i}] must have string teamAId and teamBId`;
    }
  }

  return null;
}

