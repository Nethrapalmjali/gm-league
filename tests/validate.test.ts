import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateAppData } from '../lib/validate.ts';

const team = {
  id: 't1',
  name: 'Team One',
  sport: 'cricket',
  players: [{ id: 'p1', name: 'Player One' }],
};
const match = { id: 'm1', sport: 'cricket', status: 'upcoming', teamAId: 't1', teamBId: 't2' };

test('accepts a well-formed payload', () => {
  assert.equal(validateAppData({ teams: [team], matches: [match] }), null);
});

test('accepts empty teams and matches', () => {
  assert.equal(validateAppData({ teams: [], matches: [] }), null);
});

test('rejects non-object bodies', () => {
  assert.ok(validateAppData(null));
  assert.ok(validateAppData([]));
  assert.ok(validateAppData('x'));
});

test('rejects missing teams or matches arrays', () => {
  assert.match(validateAppData({ matches: [] })!, /teams/);
  assert.match(validateAppData({ teams: [] })!, /matches/);
});

test('rejects teams with bad fields', () => {
  const bad = (t: object) => validateAppData({ teams: [t], matches: [] });
  assert.match(bad({ ...team, id: '' })!, /teams\[0\]\.id/);
  assert.match(bad({ ...team, name: 5 })!, /name/);
  assert.match(bad({ ...team, sport: 'chess' })!, /sport/);
  assert.match(bad({ ...team, players: [{ id: 1, name: 'x' }] })!, /players\[0\]/);
});

test('rejects matches with bad fields', () => {
  const bad = (m: object) => validateAppData({ teams: [], matches: [m] });
  assert.match(bad({ ...match, id: '' })!, /matches\[0\]\.id/);
  assert.match(bad({ ...match, sport: 'chess' })!, /sport/);
  assert.match(bad({ ...match, status: 'paused' })!, /status/);
  assert.match(bad({ ...match, teamAId: undefined })!, /teamAId/);
});
