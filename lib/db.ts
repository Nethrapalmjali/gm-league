import { sql } from '@vercel/postgres';
import { AppData, Team, Match, Player } from './types';
import { defaultData } from './store';

// Initialize schema (Postgres)
export async function initDb() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS teams (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        sport TEXT NOT NULL,
        gender TEXT NOT NULL,
        color TEXT,
        wins INTEGER DEFAULT 0,
        losses INTEGER DEFAULT 0,
        draws INTEGER DEFAULT 0,
        points INTEGER DEFAULT 0
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS players (
        id TEXT PRIMARY KEY,
        team_id TEXT NOT NULL,
        name TEXT NOT NULL,
        jersey_number INTEGER,
        role TEXT,
        CONSTRAINT fk_team FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS matches (
        id TEXT PRIMARY KEY,
        sport TEXT NOT NULL,
        team_a_id TEXT NOT NULL,
        team_b_id TEXT NOT NULL,
        status TEXT NOT NULL,
        date TEXT NOT NULL,
        venue TEXT,
        round TEXT,
        winner_id TEXT,
        player_of_the_match TEXT,
        score JSONB,
        player_performances JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Ensure versioning (optional)
    const CURRENT_VER = 'v7_pg';
    const row = await sql`SELECT value FROM settings WHERE key = 'db_version'`;
    const dbVer = row.rows.length ? row.rows[0].value : null;

    if (dbVer !== CURRENT_VER) {
        console.log('--- DB VERSION MISMATCH/FRESH: RESETTING POSTGRES ---');
        await resetDb();
        await sql`INSERT INTO settings (key, value) VALUES ('db_version', ${CURRENT_VER}) ON CONFLICT (key) DO UPDATE SET value = ${CURRENT_VER}`;
    }

    // Ensure admin password is set
    const adminRow = await sql`SELECT value FROM settings WHERE key = 'adminPassword'`;
    if (!adminRow.rows.length) {
        await sql`INSERT INTO settings (key, value) VALUES ('adminPassword', ${defaultData.adminPassword})`;
    }
  } catch (err) {
    console.error('initDb error:', err);
    throw err;
  }
}

export async function seedData(data: AppData) {
    try {
        await sql`DELETE FROM players`;
        await sql`DELETE FROM teams`;
        await sql`DELETE FROM matches`;

        for (const team of data.teams) {
            await sql`
                INSERT INTO teams (id, name, sport, gender, color, wins, losses, draws, points)
                VALUES (${team.id}, ${team.name}, ${team.sport}, ${team.gender}, ${team.color}, ${team.wins}, ${team.losses}, ${team.draws}, ${team.points})
                ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name, wins = EXCLUDED.wins, losses = EXCLUDED.losses, draws = EXCLUDED.draws, points = EXCLUDED.points
            `;
            for (const player of team.players) {
                await sql`
                    INSERT INTO players (id, team_id, name, jersey_number, role)
                    VALUES (${player.id}, ${team.id}, ${player.name}, ${player.jerseyNumber || null}, ${player.role || null})
                    ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name, jersey_number = EXCLUDED.jersey_number, role = EXCLUDED.role
                `;
            }
        }
        for (const match of data.matches) {
            await sql`
                INSERT INTO matches (id, sport, team_a_id, team_b_id, status, date, venue, round, winner_id, player_of_the_match, score, player_performances)
                VALUES (
                    ${match.id}, ${match.sport}, ${match.teamAId}, ${match.teamBId}, ${match.status}, ${match.date},
                    ${match.venue}, ${match.round}, ${match.winnerId || null}, ${match.playerOfTheMatch || null},
                    ${JSON.stringify(match.score || null)}, ${JSON.stringify(match.playerPerformances || [])}
                )
                ON CONFLICT (id) DO UPDATE SET
                status = EXCLUDED.status, winner_id = EXCLUDED.winner_id, score = EXCLUDED.score, 
                player_performances = EXCLUDED.player_performances, updated_at = CURRENT_TIMESTAMP
            `;
        }
    } catch (err) {
        console.error('seedData error:', err);
        throw err;
    }
}

export async function resetDb() {
    await sql`DELETE FROM players`;
    await sql`DELETE FROM teams`;
    await sql`DELETE FROM matches`;
    await sql`DELETE FROM settings`;
    await seedData(defaultData);
}

export async function clearDb() {
    await sql`DELETE FROM players`;
    await sql`DELETE FROM teams`;
    await sql`DELETE FROM matches`;
}

export async function getAllData(): Promise<AppData> {
    try {
        const teamsRows = await sql`SELECT * FROM teams`;
        const playersRows = await sql`SELECT * FROM players`;
        const matchesRows = await sql`SELECT * FROM matches`;
        const adminPasswordRow = await sql`SELECT value FROM settings WHERE key = 'adminPassword'`;
        const adminPassword = adminPasswordRow.rows[0]?.value || 'gmleague2025';

        const playersByTeam: Record<string, Player[]> = {};
        playersRows.rows.forEach(p => {
            if (!playersByTeam[p.team_id]) playersByTeam[p.team_id] = [];
            playersByTeam[p.team_id].push({
                id: p.id,
                name: p.name,
                jerseyNumber: p.jersey_number,
                role: p.role
            });
        });

        const teams: Team[] = teamsRows.rows.map(t => ({
            id: t.id,
            name: t.name,
            sport: t.sport,
            gender: t.gender,
            color: t.color,
            wins: t.wins,
            losses: t.losses,
            draws: t.draws,
            points: t.points,
            players: playersByTeam[t.id] || []
        }));

        const matches: Match[] = matchesRows.rows.map(m => {
            return {
                id: m.id,
                sport: m.sport,
                teamAId: m.team_a_id,
                teamBId: m.team_b_id,
                status: m.status,
                date: m.date,
                venue: m.venue,
                round: m.round,
                winnerId: m.winner_id,
                playerOfTheMatch: m.player_of_the_match,
                score: m.score,
                playerPerformances: m.player_performances,
                createdAt: m.created_at,
                updatedAt: m.updated_at
            };
        });

        return { teams, matches, adminPassword };
    } catch (err) {
        console.error('Error in getAllData:', err);
        throw err;
    }
}
