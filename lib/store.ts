import {
  AppData, Match, Team, Sport,
  CricketPlayerPerf, VolleyballPlayerPerf, ThrowballPlayerPerf,
  CricketPlayerAggregate, VolleyballPlayerAggregate, ThrowballPlayerAggregate,
  TeamNRR, Player, CricketScore, SetBasedScore
} from './types';

const STORAGE_KEY = 'gm_league_data_v2';

// ─── Seed Data ───────────────────────────────────────────────────────────────

export const defaultData: AppData = {
  adminPassword: 'gmleague2025',
  teams: [
    {
      id: 't1', name: 'Thunder Hawks', sport: 'cricket', gender: 'mens',
      players: [
        { id: 'tc1', name: 'Arjun Kumar', jerseyNumber: 1, role: 'Batsman' },
        { id: 'tc2', name: 'Rahul Singh', jerseyNumber: 2, role: 'Opener' },
        { id: 'tc3', name: 'Virat Sharma', jerseyNumber: 3, role: 'All-Rounder' },
        { id: 'tc4', name: 'Kiran Patel', jerseyNumber: 4, role: 'Batsman' },
        { id: 'tc5', name: 'Dev Nair', jerseyNumber: 5, role: 'Wicket-Keeper Batsman' },
        { id: 'tc6', name: 'Ankit Joshi', jerseyNumber: 6, role: 'Bowler' },
        { id: 'tc7', name: 'Suresh Reddy', jerseyNumber: 7, role: 'Batsman' },
        { id: 'tc8', name: 'Mohit Verma', jerseyNumber: 8, role: 'Bowler' },
        { id: 'tc9', name: 'Ajay Mehta', jerseyNumber: 9, role: 'All-Rounder' },
        { id: 'tc10', name: 'Rohan Das', jerseyNumber: 10, role: 'Bowler' },
        { id: 'tc11', name: 'Sanjay Gupta', jerseyNumber: 11, role: 'Bowler' },
      ],
      wins: 0, losses: 0, draws: 0, points: 0, color: '#f97316'
    },
    {
      id: 't2', name: 'Royal Strikers', sport: 'cricket', gender: 'mens',
      players: [
        { id: 'rc1', name: 'Amit Shah', jerseyNumber: 1, role: 'Opener' },
        { id: 'rc2', name: 'Ravi Kumar', jerseyNumber: 2, role: 'Bowler' },
        { id: 'rc3', name: 'Nikhil Rao', jerseyNumber: 3, role: 'All-Rounder' },
        { id: 'rc4', name: 'Pradeep Iyer', jerseyNumber: 4, role: 'Batsman' },
        { id: 'rc5', name: 'Sandeep More', jerseyNumber: 5, role: 'Wicket-Keeper Batsman' },
        { id: 'rc6', name: 'Deepak Tiwari', jerseyNumber: 6, role: 'Bowler' },
        { id: 'rc7', name: 'Varun Pillai', jerseyNumber: 7, role: 'Batsman' },
        { id: 'rc8', name: 'Harsh Malhotra', jerseyNumber: 8, role: 'Bowler' },
        { id: 'rc9', name: 'Shiv Krishnan', jerseyNumber: 9, role: 'All-Rounder' },
        { id: 'rc10', name: 'Tushar Bose', jerseyNumber: 10, role: 'Bowler' },
        { id: 'rc11', name: 'Neeraj Aggarwal', jerseyNumber: 11, role: 'Bowler' },
      ],
      wins: 0, losses: 0, draws: 0, points: 0, color: '#3b82f6'
    },
    {
      id: 't7', name: 'Desert Eagles', sport: 'cricket', gender: 'mens',
      players: [
        { id: 'de1', name: 'Vikram Seth', jerseyNumber: 1, role: 'Opener' },
        { id: 'de2', name: 'Sameer Khan', jerseyNumber: 2, role: 'Batsman' },
        { id: 'de3', name: 'Ishaan Gupta', jerseyNumber: 3, role: 'All-Rounder' },
        { id: 'de4', name: 'Yash Vardhan', jerseyNumber: 4, role: 'Bowler' },
        { id: 'de5', name: 'Sahil Raj', jerseyNumber: 5, role: 'Bowler' },
        { id: 'de6', name: 'Kabir Singh', jerseyNumber: 6, role: 'Wicket-Keeper' },
        { id: 'de7', name: 'Manish Pandey', jerseyNumber: 7, role: 'Batsman' },
        { id: 'de8', name: 'Rishabh Pant', jerseyNumber: 8, role: 'All-Rounder' },
        { id: 'de9', name: 'Hardik Roy', jerseyNumber: 9, role: 'Bowler' },
        { id: 'de10', name: 'Bhuvi Kumar', jerseyNumber: 10, role: 'Bowler' },
        { id: 'de11', name: 'Shami Ahmed', jerseyNumber: 11, role: 'Bowler' },
      ],
      wins: 0, losses: 0, draws: 0, points: 0, color: '#f59e0b'
    },
    {
      id: 't3', name: 'Smash Kings', sport: 'volleyball', gender: 'mens',
      players: [
        { id: 'vc1', name: 'Akash Teja', jerseyNumber: 1, role: 'Setter' },
        { id: 'vc2', name: 'Bharat Lal', jerseyNumber: 2, role: 'Outside Spiker' },
        { id: 'vc3', name: 'Chetan Roy', jerseyNumber: 3, role: 'Libero' },
        { id: 'vc4', name: 'Dinesh Nair', jerseyNumber: 4, role: 'Opposite Spiker' },
        { id: 'vc5', name: 'Eshan Patil', jerseyNumber: 5, role: 'Middle Blocker' },
        { id: 'vc6', name: 'Farhan Ali', jerseyNumber: 6, role: 'Setter' },
      ],
      wins: 0, losses: 0, draws: 0, points: 0, color: '#8b5cf6'
    },
    {
      id: 't4', name: 'Net Blazers', sport: 'volleyball', gender: 'mens',
      players: [
        { id: 'vd1', name: 'Gaurav Singh', jerseyNumber: 1, role: 'Setter' },
        { id: 'vd2', name: 'Harish Kumar', jerseyNumber: 2, role: 'Outside Spiker' },
        { id: 'vd3', name: 'Indra Bose', jerseyNumber: 3, role: 'Libero' },
        { id: 'vd4', name: 'Jay Sharma', jerseyNumber: 4, role: 'Opposite Spiker' },
        { id: 'vd5', name: 'Karthik V', jerseyNumber: 5, role: 'Middle Blocker' },
        { id: 'vd6', name: 'Lokesh M', jerseyNumber: 6, role: 'Setter' },
      ],
      wins: 0, losses: 0, draws: 0, points: 0, color: '#10b981'
    },
    {
      id: 't8', name: 'Sky High', sport: 'volleyball', gender: 'mens',
      players: [
        { id: 'sh1', name: 'Pawan Kalyan', jerseyNumber: 1, role: 'Setter' },
        { id: 'sh2', name: 'Mahesh Babu', jerseyNumber: 2, role: 'Attacker' },
        { id: 'sh3', name: 'Prabhas Raj', jerseyNumber: 3, role: 'Blocker' },
        { id: 'sh4', name: 'Allu Arjun', jerseyNumber: 4, role: 'Libero' },
        { id: 'sh5', name: 'Ram Charan', jerseyNumber: 5, role: 'Server' },
        { id: 'sh6', name: 'Jr NTR', jerseyNumber: 6, role: 'Setter' },
      ],
      wins: 0, losses: 0, draws: 0, points: 0, color: '#06b6d4'
    },
    {
      id: 't5', name: 'Thunder Queens', sport: 'throwball', gender: 'womens',
      players: [
        { id: 'tba1', name: 'Ananya Sharma', jerseyNumber: 1, role: 'Thrower' },
        { id: 'tba2', name: 'Bhavna Rao', jerseyNumber: 2, role: 'Catcher' },
        { id: 'tba3', name: 'Chitra Nair', jerseyNumber: 3, role: 'Thrower' },
        { id: 'tba4', name: 'Deepa Pillai', jerseyNumber: 4, role: 'Catcher' },
        { id: 'tba5', name: 'Esha Gupta', jerseyNumber: 5, role: 'Thrower' },
        { id: 'tba6', name: 'Farida Khan', jerseyNumber: 6, role: 'Catcher' },
        { id: 'tba7', name: 'Geeta Kumari', jerseyNumber: 7, role: 'Thrower' },
      ],
      wins: 0, losses: 0, draws: 0, points: 0, color: '#ec4899'
    },
    {
      id: 't6', name: 'Fire Flowers', sport: 'throwball', gender: 'womens',
      players: [
        { id: 'tbb1', name: 'Hema Reddy', jerseyNumber: 1, role: 'Thrower' },
        { id: 'tbb2', name: 'Isha Patel', jerseyNumber: 2, role: 'Catcher' },
        { id: 'tbb3', name: 'Jyoti Singh', jerseyNumber: 3, role: 'Thrower' },
        { id: 'tbb4', name: 'Kavya Das', jerseyNumber: 4, role: 'Catcher' },
        { id: 'tbb5', name: 'Lalita Mehta', jerseyNumber: 5, role: 'Thrower' },
        { id: 'tbb6', name: 'Meena Iyer', jerseyNumber: 6, role: 'Catcher' },
        { id: 'tbb7', name: 'Nisha V', jerseyNumber: 7, role: 'Thrower' },
      ],
      wins: 0, losses: 0, draws: 0, points: 0, color: '#f43f5e'
    },
    {
      id: 't9', name: 'Pink Panthers', sport: 'throwball', gender: 'womens',
      players: [
        { id: 'pp1', name: 'Sonal Chauhan', jerseyNumber: 1, role: 'Thrower' },
        { id: 'pp2', name: 'Pooja Hegde', jerseyNumber: 2, role: 'Catcher' },
        { id: 'pp3', name: 'Rashmika Mandanna', jerseyNumber: 3, role: 'Thrower' },
        { id: 'pp4', name: 'Samantha Ruth', jerseyNumber: 4, role: 'Catcher' },
        { id: 'pp5', name: 'Nayanthara', jerseyNumber: 5, role: 'Thrower' },
        { id: 'pp6', name: 'Kajal Aggarwal', jerseyNumber: 6, role: 'Catcher' },
        { id: 'pp7', name: 'Tamannaah', jerseyNumber: 7, role: 'Thrower' },
      ],
      wins: 0, losses: 0, draws: 0, points: 0, color: '#d946ef'
    },
  ],
  matches: [
  {
    "id": "cr_m_1",
    "sport": "cricket",
    "teamAId": "t2",
    "teamBId": "t7",
    "status": "completed",
    "date": "2025-03-1",
    "venue": "Main Ground",
    "round": "League Stage",
    "score": {
      "innings": [
        {
          "battingTeamId": "t2",
          "bowlingTeamId": "t7",
          "runs": 84,
          "wickets": 1,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        },
        {
          "battingTeamId": "t7",
          "bowlingTeamId": "t2",
          "runs": 86,
          "wickets": 6,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        }
      ],
      "currentInnings": 2,
      "totalOvers": 10,
      "format": "10"
    },
    "winnerId": "t7",
    "createdAt": "2026-04-02T15:21:40.900Z",
    "updatedAt": "2026-04-02T15:21:40.900Z"
  },
  {
    "id": "cr_m_2",
    "sport": "cricket",
    "teamAId": "t2",
    "teamBId": "t1",
    "status": "completed",
    "date": "2025-03-2",
    "venue": "Main Ground",
    "round": "League Stage",
    "score": {
      "innings": [
        {
          "battingTeamId": "t2",
          "bowlingTeamId": "t1",
          "runs": 145,
          "wickets": 3,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        },
        {
          "battingTeamId": "t1",
          "bowlingTeamId": "t2",
          "runs": 118,
          "wickets": 8,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        }
      ],
      "currentInnings": 2,
      "totalOvers": 10,
      "format": "10"
    },
    "winnerId": "t2",
    "createdAt": "2026-04-02T15:21:40.900Z",
    "updatedAt": "2026-04-02T15:21:40.900Z"
  },
  {
    "id": "cr_m_3",
    "sport": "cricket",
    "teamAId": "t2",
    "teamBId": "t1",
    "status": "completed",
    "date": "2025-03-3",
    "venue": "Main Ground",
    "round": "League Stage",
    "score": {
      "innings": [
        {
          "battingTeamId": "t2",
          "bowlingTeamId": "t1",
          "runs": 89,
          "wickets": 3,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        },
        {
          "battingTeamId": "t1",
          "bowlingTeamId": "t2",
          "runs": 128,
          "wickets": 7,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        }
      ],
      "currentInnings": 2,
      "totalOvers": 10,
      "format": "10"
    },
    "winnerId": "t1",
    "createdAt": "2026-04-02T15:21:40.900Z",
    "updatedAt": "2026-04-02T15:21:40.900Z"
  },
  {
    "id": "cr_m_4",
    "sport": "cricket",
    "teamAId": "t2",
    "teamBId": "t7",
    "status": "completed",
    "date": "2025-03-4",
    "venue": "Main Ground",
    "round": "League Stage",
    "score": {
      "innings": [
        {
          "battingTeamId": "t2",
          "bowlingTeamId": "t7",
          "runs": 105,
          "wickets": 4,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        },
        {
          "battingTeamId": "t7",
          "bowlingTeamId": "t2",
          "runs": 163,
          "wickets": 4,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        }
      ],
      "currentInnings": 2,
      "totalOvers": 10,
      "format": "10"
    },
    "winnerId": "t7",
    "createdAt": "2026-04-02T15:21:40.900Z",
    "updatedAt": "2026-04-02T15:21:40.900Z"
  },
  {
    "id": "cr_m_5",
    "sport": "cricket",
    "teamAId": "t2",
    "teamBId": "t7",
    "status": "completed",
    "date": "2025-03-5",
    "venue": "Main Ground",
    "round": "League Stage",
    "score": {
      "innings": [
        {
          "battingTeamId": "t2",
          "bowlingTeamId": "t7",
          "runs": 163,
          "wickets": 4,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        },
        {
          "battingTeamId": "t7",
          "bowlingTeamId": "t2",
          "runs": 141,
          "wickets": 1,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        }
      ],
      "currentInnings": 2,
      "totalOvers": 10,
      "format": "10"
    },
    "winnerId": "t2",
    "createdAt": "2026-04-02T15:21:40.900Z",
    "updatedAt": "2026-04-02T15:21:40.900Z"
  },
  {
    "id": "cr_m_6",
    "sport": "cricket",
    "teamAId": "t2",
    "teamBId": "t1",
    "status": "completed",
    "date": "2025-03-6",
    "venue": "Main Ground",
    "round": "League Stage",
    "score": {
      "innings": [
        {
          "battingTeamId": "t2",
          "bowlingTeamId": "t1",
          "runs": 82,
          "wickets": 1,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        },
        {
          "battingTeamId": "t1",
          "bowlingTeamId": "t2",
          "runs": 138,
          "wickets": 8,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        }
      ],
      "currentInnings": 2,
      "totalOvers": 10,
      "format": "10"
    },
    "winnerId": "t1",
    "createdAt": "2026-04-02T15:21:40.900Z",
    "updatedAt": "2026-04-02T15:21:40.900Z"
  },
  {
    "id": "cr_m_7",
    "sport": "cricket",
    "teamAId": "t1",
    "teamBId": "t7",
    "status": "completed",
    "date": "2025-03-7",
    "venue": "Main Ground",
    "round": "League Stage",
    "score": {
      "innings": [
        {
          "battingTeamId": "t1",
          "bowlingTeamId": "t7",
          "runs": 121,
          "wickets": 3,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        },
        {
          "battingTeamId": "t7",
          "bowlingTeamId": "t1",
          "runs": 110,
          "wickets": 3,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        }
      ],
      "currentInnings": 2,
      "totalOvers": 10,
      "format": "10"
    },
    "winnerId": "t1",
    "createdAt": "2026-04-02T15:21:40.900Z",
    "updatedAt": "2026-04-02T15:21:40.900Z"
  },
  {
    "id": "cr_m_8",
    "sport": "cricket",
    "teamAId": "t7",
    "teamBId": "t1",
    "status": "completed",
    "date": "2025-03-8",
    "venue": "Main Ground",
    "round": "League Stage",
    "score": {
      "innings": [
        {
          "battingTeamId": "t7",
          "bowlingTeamId": "t1",
          "runs": 100,
          "wickets": 4,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        },
        {
          "battingTeamId": "t1",
          "bowlingTeamId": "t7",
          "runs": 141,
          "wickets": 6,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        }
      ],
      "currentInnings": 2,
      "totalOvers": 10,
      "format": "10"
    },
    "winnerId": "t1",
    "createdAt": "2026-04-02T15:21:40.900Z",
    "updatedAt": "2026-04-02T15:21:40.900Z"
  },
  {
    "id": "cr_m_9",
    "sport": "cricket",
    "teamAId": "t1",
    "teamBId": "t7",
    "status": "completed",
    "date": "2025-03-9",
    "venue": "Main Ground",
    "round": "League Stage",
    "score": {
      "innings": [
        {
          "battingTeamId": "t1",
          "bowlingTeamId": "t7",
          "runs": 91,
          "wickets": 1,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        },
        {
          "battingTeamId": "t7",
          "bowlingTeamId": "t1",
          "runs": 91,
          "wickets": 5,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        }
      ],
      "currentInnings": 2,
      "totalOvers": 10,
      "format": "10"
    },
    "winnerId": "t7",
    "createdAt": "2026-04-02T15:21:40.900Z",
    "updatedAt": "2026-04-02T15:21:40.900Z"
  },
  {
    "id": "cr_m_10",
    "sport": "cricket",
    "teamAId": "t1",
    "teamBId": "t7",
    "status": "completed",
    "date": "2025-03-10",
    "venue": "Main Ground",
    "round": "League Stage",
    "score": {
      "innings": [
        {
          "battingTeamId": "t1",
          "bowlingTeamId": "t7",
          "runs": 113,
          "wickets": 7,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        },
        {
          "battingTeamId": "t7",
          "bowlingTeamId": "t1",
          "runs": 138,
          "wickets": 6,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        }
      ],
      "currentInnings": 2,
      "totalOvers": 10,
      "format": "10"
    },
    "winnerId": "t7",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "cr_m_11",
    "sport": "cricket",
    "teamAId": "t2",
    "teamBId": "t7",
    "status": "completed",
    "date": "2025-03-11",
    "venue": "Main Ground",
    "round": "League Stage",
    "score": {
      "innings": [
        {
          "battingTeamId": "t2",
          "bowlingTeamId": "t7",
          "runs": 159,
          "wickets": 4,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        },
        {
          "battingTeamId": "t7",
          "bowlingTeamId": "t2",
          "runs": 86,
          "wickets": 1,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        }
      ],
      "currentInnings": 2,
      "totalOvers": 10,
      "format": "10"
    },
    "winnerId": "t2",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "cr_m_12",
    "sport": "cricket",
    "teamAId": "t2",
    "teamBId": "t1",
    "status": "completed",
    "date": "2025-03-12",
    "venue": "Main Ground",
    "round": "League Stage",
    "score": {
      "innings": [
        {
          "battingTeamId": "t2",
          "bowlingTeamId": "t1",
          "runs": 167,
          "wickets": 8,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        },
        {
          "battingTeamId": "t1",
          "bowlingTeamId": "t2",
          "runs": 115,
          "wickets": 0,
          "overs": 10,
          "balls": 0,
          "extras": 5,
          "events": [],
          "isComplete": true
        }
      ],
      "currentInnings": 2,
      "totalOvers": 10,
      "format": "10"
    },
    "winnerId": "t2",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_1",
    "sport": "volleyball",
    "teamAId": "t4",
    "teamBId": "t3",
    "status": "completed",
    "date": "2025-03-1",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 12,
          "teamB": 15,
          "isComplete": true,
          "winner": "B"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t3",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_2",
    "sport": "volleyball",
    "teamAId": "t4",
    "teamBId": "t8",
    "status": "completed",
    "date": "2025-03-2",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 12,
          "teamB": 15,
          "isComplete": true,
          "winner": "B"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t8",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_3",
    "sport": "volleyball",
    "teamAId": "t3",
    "teamBId": "t8",
    "status": "completed",
    "date": "2025-03-3",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 15,
          "teamB": 12,
          "isComplete": true,
          "winner": "A"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t3",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_4",
    "sport": "volleyball",
    "teamAId": "t8",
    "teamBId": "t3",
    "status": "completed",
    "date": "2025-03-4",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 15,
          "teamB": 12,
          "isComplete": true,
          "winner": "A"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t8",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_5",
    "sport": "volleyball",
    "teamAId": "t8",
    "teamBId": "t4",
    "status": "completed",
    "date": "2025-03-5",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 15,
          "teamB": 12,
          "isComplete": true,
          "winner": "A"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t8",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_6",
    "sport": "volleyball",
    "teamAId": "t8",
    "teamBId": "t3",
    "status": "completed",
    "date": "2025-03-6",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 15,
          "teamB": 12,
          "isComplete": true,
          "winner": "A"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t8",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_7",
    "sport": "volleyball",
    "teamAId": "t4",
    "teamBId": "t8",
    "status": "completed",
    "date": "2025-03-7",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 15,
          "teamB": 12,
          "isComplete": true,
          "winner": "A"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t4",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_8",
    "sport": "volleyball",
    "teamAId": "t8",
    "teamBId": "t3",
    "status": "completed",
    "date": "2025-03-8",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 12,
          "teamB": 15,
          "isComplete": true,
          "winner": "B"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t3",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_9",
    "sport": "volleyball",
    "teamAId": "t3",
    "teamBId": "t8",
    "status": "completed",
    "date": "2025-03-9",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 12,
          "teamB": 15,
          "isComplete": true,
          "winner": "B"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t8",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_10",
    "sport": "volleyball",
    "teamAId": "t4",
    "teamBId": "t8",
    "status": "completed",
    "date": "2025-03-10",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 12,
          "teamB": 15,
          "isComplete": true,
          "winner": "B"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t8",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_11",
    "sport": "volleyball",
    "teamAId": "t3",
    "teamBId": "t4",
    "status": "completed",
    "date": "2025-03-11",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 12,
          "teamB": 15,
          "isComplete": true,
          "winner": "B"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t4",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_12",
    "sport": "volleyball",
    "teamAId": "t4",
    "teamBId": "t8",
    "status": "completed",
    "date": "2025-03-12",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 15,
          "teamB": 12,
          "isComplete": true,
          "winner": "A"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t4",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_13",
    "sport": "volleyball",
    "teamAId": "t8",
    "teamBId": "t3",
    "status": "completed",
    "date": "2025-03-13",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 12,
          "teamB": 15,
          "isComplete": true,
          "winner": "B"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t3",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_14",
    "sport": "volleyball",
    "teamAId": "t3",
    "teamBId": "t8",
    "status": "completed",
    "date": "2025-03-14",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 15,
          "teamB": 12,
          "isComplete": true,
          "winner": "A"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t3",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_15",
    "sport": "volleyball",
    "teamAId": "t3",
    "teamBId": "t8",
    "status": "completed",
    "date": "2025-03-15",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 12,
          "teamB": 15,
          "isComplete": true,
          "winner": "B"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t8",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "vb_m_16",
    "sport": "volleyball",
    "teamAId": "t4",
    "teamBId": "t3",
    "status": "completed",
    "date": "2025-03-16",
    "venue": "Indoor Court 1",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 15,
          "teamB": 12,
          "isComplete": true,
          "winner": "A"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t4",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "tb_m_1",
    "sport": "throwball",
    "teamAId": "t5",
    "teamBId": "t6",
    "status": "completed",
    "date": "2025-03-1",
    "venue": "Outdoor Court 2",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 15,
          "teamB": 12,
          "isComplete": true,
          "winner": "A"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t5",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "tb_m_2",
    "sport": "throwball",
    "teamAId": "t6",
    "teamBId": "t9",
    "status": "completed",
    "date": "2025-03-2",
    "venue": "Outdoor Court 2",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 15,
          "teamB": 12,
          "isComplete": true,
          "winner": "A"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t6",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  },
  {
    "id": "tb_m_3",
    "sport": "throwball",
    "teamAId": "t6",
    "teamBId": "t9",
    "status": "completed",
    "date": "2025-03-3",
    "venue": "Outdoor Court 2",
    "round": "League Stage",
    "score": {
      "sets": [
        {
          "teamA": 25,
          "teamB": 18,
          "isComplete": true,
          "winner": "A"
        },
        {
          "teamA": 21,
          "teamB": 25,
          "isComplete": true,
          "winner": "B"
        },
        {
          "teamA": 15,
          "teamB": 12,
          "isComplete": true,
          "winner": "A"
        }
      ],
      "currentSet": 3,
      "setsToWin": 2
    },
    "winnerId": "t6",
    "createdAt": "2026-04-02T15:21:40.901Z",
    "updatedAt": "2026-04-02T15:21:40.901Z"
  }
]
};

// ─── Persistence ─────────────────────────────────────────────────────────────

export function loadData(): AppData {
  if (typeof window === 'undefined') return defaultData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) { saveData(defaultData); return defaultData; }
    return JSON.parse(raw) as AppData;
  } catch { return defaultData; }
}
export function saveData(data: AppData) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
export function resetData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

// ─── Basic helpers ────────────────────────────────────────────────────────────

export function getTeamById(data: AppData, id: string): Team | undefined {
  return data.teams.find(t => t.id === id);
}
export function getMatchById(data: AppData, id: string): Match | undefined {
  return data.matches.find(m => m.id === id);
}
export function getMatchesBySport(data: AppData, sport: Sport): Match[] {
  return data.matches.filter(m => m.sport === sport);
}
export function getTeamsBySport(data: AppData, sport: Sport): Team[] {
  return data.teams.filter(t => t.sport === sport);
}
export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
export function getPlayerById(data: AppData, id: string): { player: Player; team: Team } | undefined {
  for (const team of data.teams) {
    const player = team.players.find(p => p.id === id);
    if (player) return { player, team };
  }
}

// ─── Automated Standings ───────────────────────────────────────────────────────

export interface TeamStanding extends Team {
  played: number;
}

export function getAutomatedStandings(data: AppData, sport: Sport): TeamStanding[] {
  const teams = data.teams.filter(t => t.sport === sport);
  const standings: Record<string, TeamStanding> = {};

  teams.forEach(t => {
    standings[t.id] = {
      ...t,
      played: 0,
      wins: t.wins || 0,
      losses: t.losses || 0,
      draws: t.draws || 0,
      points: t.points || 0
    };
  });

  const matches = data.matches.filter(m => m.sport === sport && m.status === 'completed');

  matches.forEach(m => {
    const sA = standings[m.teamAId];
    const sB = standings[m.teamBId];
    if (!sA || !sB) return;

    sA.played++;
    sB.played++;

    if (m.winnerId === m.teamAId) {
      sA.wins++; sA.points += 2;
      sB.losses++;
    } else if (m.winnerId === m.teamBId) {
      sB.wins++; sB.points += 2;
      sA.losses++;
    } else if (m.winnerId === 'draw' || !m.winnerId) {
      sA.draws++; sA.points += 1;
      sB.draws++; sB.points += 1;
    }
  });

  return Object.values(standings).sort((a, b) => b.points - a.points || b.wins - a.wins);
}

// ─── Player Stats (IPL Style) ─────────────────────────────────────────────────

export function getCricketPlayerAggregates(data: AppData): CricketPlayerAggregate[] {
  const cricketTeams = data.teams.filter(t => t.sport === 'cricket');
  const cricketMatches = data.matches.filter(m => m.sport === 'cricket');
  const map = new Map<string, CricketPlayerAggregate>();

  for (const team of cricketTeams) {
    for (const player of team.players) {
      map.set(player.id, {
        player, team,
        matches: 0,
        totalRuns: 0, totalBallsFaced: 0, innings: 0, notOuts: 0,
        highScore: 0, fours: 0, sixes: 0,
        battingAverage: 0, strikeRate: 0, fifties: 0, hundreds: 0,
        wickets: 0, oversBowled: 0, runsConceded: 0,
        bowlingAverage: 0, economy: 0, bestFigures: '0/0', maidens: 0,
        catches: 0, runOuts: 0,
        potmAwards: 0,
        performancePerfs: [],
      });
    }
  }

  for (const match of cricketMatches) {
    if (!match.playerPerformances) continue;
    const perfs = match.playerPerformances as CricketPlayerPerf[];
    for (const perf of perfs) {
      const agg = map.get(perf.playerId);
      if (!agg) continue;
      agg.matches++;
      // Batting
      if (perf.ballsFaced > 0 || perf.runs > 0) {
        agg.innings++;
        if (!perf.isOut) agg.notOuts++;
        agg.totalRuns += perf.runs;
        agg.totalBallsFaced += perf.ballsFaced;
        agg.fours += perf.fours;
        agg.sixes += perf.sixes;
        if (perf.runs > agg.highScore) agg.highScore = perf.runs;
        if (perf.runs >= 100) agg.hundreds++;
        else if (perf.runs >= 50) agg.fifties++;
      }
      // Bowling
      if (perf.oversBowled > 0 || perf.ballsBowled > 0) {
        const totalOvers = perf.oversBowled + perf.ballsBowled / 6;
        agg.oversBowled += totalOvers;
        agg.runsConceded += perf.runsConceded;
        agg.wickets += perf.wicketsTaken;
        agg.maidens += perf.maidens;
        const [bestW] = agg.bestFigures.split('/').map(Number);
        if (perf.wicketsTaken > bestW) {
          agg.bestFigures = `${perf.wicketsTaken}/${perf.runsConceded}`;
        }
      }
      agg.catches += perf.catches;
      agg.runOuts += perf.runOuts;
      if (perf.isPlayerOfMatch) agg.potmAwards++;
      agg.performancePerfs.push(perf);
    }
  }

  for (const agg of map.values()) {
    const dismissals = agg.innings - agg.notOuts;
    agg.battingAverage = dismissals > 0 ? +(agg.totalRuns / dismissals).toFixed(2) : agg.totalRuns > 0 ? 999 : 0;
    agg.strikeRate = agg.totalBallsFaced > 0 ? +((agg.totalRuns / agg.totalBallsFaced) * 100).toFixed(2) : 0;
    agg.economy = agg.oversBowled > 0 ? +(agg.runsConceded / agg.oversBowled).toFixed(2) : 0;
    agg.bowlingAverage = agg.wickets > 0 ? +(agg.runsConceded / agg.wickets).toFixed(2) : 0;
  }

  return Array.from(map.values()).filter(a => a.matches > 0 || a.innings > 0);
}

export function getTopPerformers(data: AppData, sport: Sport) {
  if (sport === 'cricket') {
    const aggs = getCricketPlayerAggregates(data);
    return {
      orangeCap: [...aggs].sort((a, b) => b.totalRuns - a.totalRuns).slice(0, 5),
      purpleCap: [...aggs].sort((a, b) => b.wickets - a.wickets || a.economy - b.economy).slice(0, 5),
      mvp: [...aggs].sort((a, b) => b.potmAwards - a.potmAwards || b.totalRuns - a.totalRuns).slice(0, 5)
    };
  }
  return null;
}
