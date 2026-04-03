import { sql } from '@vercel/postgres';
import { AppData, Team, Match, Player } from './types';
import { defaultData } from './store';
import path from 'path';
import fs from 'fs';

// Detect Vercel environment
const isVercel = process.env.VERCEL === '1' || !!process.env.POSTGRES_URL;

// Local SQLite fallback for testing/dev
let localDb: any = null;
function getLocalDb() {
  if (!localDb) {
    const DB_PATH = path.join(process.cwd(), 'gm_league.db');
    const Database = eval('require')('better-sqlite3');
    localDb = new Database(DB_PATH);
  }
  return localDb;
}

export async function initDb() {
  if (!isVercel) {
    getLocalDb().exec(`
      CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT);
      CREATE TABLE IF NOT EXISTS teams (id TEXT PRIMARY KEY, name TEXT, sport TEXT, gender TEXT, color TEXT, wins INTEGER, losses INTEGER, draws INTEGER, points INTEGER);
      CREATE TABLE IF NOT EXISTS players (id TEXT PRIMARY KEY, teamId TEXT, name TEXT, jerseyNumber INTEGER, role TEXT);
      CREATE TABLE IF NOT EXISTS matches (id TEXT PRIMARY KEY, sport TEXT, teamAId TEXT, teamBId TEXT, status TEXT, date TEXT, venue TEXT, round TEXT, winnerId TEXT, playerOfTheMatch TEXT, score TEXT, playerPerformances TEXT);
    `);
    
    const row = getLocalDb().prepare("SELECT value FROM settings WHERE key = 'db_version'").get() as any;
    if (!row || row.value !== 'v7_local') {
        await resetDb();
        getLocalDb().prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run('db_version', 'v7_local');
    }
    return;
  }

  // Postgres Init
  await sql`CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT)`;
  await sql`CREATE TABLE IF NOT EXISTS teams (id TEXT PRIMARY KEY, name TEXT, sport TEXT, gender TEXT, color TEXT, wins INTEGER, losses INTEGER, draws INTEGER, points INTEGER)`;
  await sql`CREATE TABLE IF NOT EXISTS players (id TEXT PRIMARY KEY, team_id TEXT, name TEXT, jersey_number INTEGER, role TEXT)`;
  await sql`CREATE TABLE IF NOT EXISTS matches (id TEXT PRIMARY KEY, sport TEXT, team_a_id TEXT, team_b_id TEXT, status TEXT, date TEXT, venue TEXT, round TEXT, winner_id TEXT, player_of_the_match TEXT, score JSONB, player_performances JSONB)`;
}

export async function seedData(data: AppData) {
    if (!isVercel) {
        getLocalDb().transaction(() => {
            getLocalDb().prepare('DELETE FROM players').run();
            getLocalDb().prepare('DELETE FROM teams').run();
            getLocalDb().prepare('DELETE FROM matches').run();
            for (const t of data.teams) {
                getLocalDb().prepare('INSERT INTO teams VALUES (?,?,?,?,?,?,?,?,?)').run(t.id, t.name, t.sport, t.gender, t.color, t.wins, t.losses, t.draws, t.points);
                for (const p of t.players) getLocalDb().prepare('INSERT INTO players VALUES (?,?,?,?,?)').run(p.id, t.id, p.name, p.jerseyNumber, p.role);
            }
            for (const m of data.matches) {
                getLocalDb().prepare('INSERT INTO matches VALUES (?,?,?,?,?,?,?,?,?,?,?,?)').run(m.id, m.sport, m.teamAId, m.teamBId, m.status, m.date, m.venue, m.round, m.winnerId, m.playerOfTheMatch, JSON.stringify(m.score), JSON.stringify(m.playerPerformances));
            }
        })();
        return;
    }

    // Postgres Seed
    await sql`DELETE FROM players`; await sql`DELETE FROM teams`; await sql`DELETE FROM matches`;
    for (const t of data.teams) {
        await sql`INSERT INTO teams VALUES (${t.id}, ${t.name}, ${t.sport}, ${t.gender}, ${t.color}, ${t.wins}, ${t.losses}, ${t.draws}, ${t.points})`;
        for (const p of t.players) await sql`INSERT INTO players VALUES (${p.id}, ${t.id}, ${p.name}, ${p.jerseyNumber}, ${p.role})`;
    }
    for (const m of data.matches) {
        await sql`INSERT INTO matches VALUES (${m.id}, ${m.sport}, ${m.teamAId}, ${m.teamBId}, ${m.status}, ${m.date}, ${m.venue}, ${m.round}, ${m.winnerId}, ${m.playerOfTheMatch}, ${JSON.stringify(m.score)}, ${JSON.stringify(m.playerPerformances)})`;
    }
}

export async function resetDb() {
    if (!isVercel) {
        getLocalDb().exec('DELETE FROM players; DELETE FROM teams; DELETE FROM matches; DELETE FROM settings;');
        await seedData(defaultData);
        return;
    }
    await sql`DELETE FROM players`; await sql`DELETE FROM teams`; await sql`DELETE FROM matches`; await sql`DELETE FROM settings`;
    await seedData(defaultData);
}

export async function clearDb() {
    if (!isVercel) {
        getLocalDb().exec('DELETE FROM players; DELETE FROM teams; DELETE FROM matches;'); return;
    }
    await sql`DELETE FROM players`; await sql`DELETE FROM teams`; await sql`DELETE FROM matches`;
}

export async function getAllData(): Promise<AppData> {
    if (!isVercel) {
        const teamsRows = getLocalDb().prepare('SELECT * FROM teams').all() as any[];
        const playersRows = getLocalDb().prepare('SELECT * FROM players').all() as any[];
        const matchesRows = getLocalDb().prepare('SELECT * FROM matches').all() as any[];
        const playersByTeam: any = {};
        playersRows.forEach(p => { if (!playersByTeam[p.teamId]) playersByTeam[p.teamId] = []; playersByTeam[p.teamId].push({ id: p.id, name: p.name, jerseyNumber: p.jerseyNumber, role: p.role }); });
        const teams = teamsRows.map(t => ({ ...t, players: playersByTeam[t.id] || [] }));
        const matches = matchesRows.map(m => ({ ...m, teamAId: m.teamAId, teamBId: m.teamBId, winnerId: m.winnerId, playerOfTheMatch: m.playerOfTheMatch, score: JSON.parse(m.score || 'null'), playerPerformances: JSON.parse(m.playerPerformances || '[]'), createdAt: m.createdAt || new Date().toISOString(), updatedAt: m.updatedAt || new Date().toISOString() }));
        return { teams, matches, adminPassword: 'gmleague2025' };
    }

    const t = await sql`SELECT * FROM teams`;
    const p = await sql`SELECT * FROM players`;
    const m = await sql`SELECT * FROM matches`;
    const playersByTeam: any = {};
    p.rows.forEach(p => { if (!playersByTeam[p.team_id]) playersByTeam[p.team_id] = []; playersByTeam[p.team_id].push({ id: p.id, name: p.name, jerseyNumber: p.jersey_number, role: p.role }); });
    const teams = t.rows.map(t => ({ id: t.id, name: t.name, sport: t.sport, gender: t.gender, color: t.color, wins: t.wins, losses: t.losses, draws: t.draws, points: t.points, players: playersByTeam[t.id] || [] }));
    const matches = m.rows.map(m => ({ id: m.id, sport: m.sport, teamAId: m.team_a_id, teamBId: m.team_b_id, status: m.status, date: m.date, venue: m.venue, round: m.round, winnerId: m.winner_id, playerOfTheMatch: m.player_of_the_match, score: m.score, playerPerformances: m.player_performances, createdAt: m.created_at, updatedAt: m.updated_at }));
    return { teams, matches, adminPassword: 'gmleague2025' };
}
