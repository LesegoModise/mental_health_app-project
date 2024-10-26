import express from 'express'
import cors from 'cors'
import * as sqlite from 'sqlite'
import sqlite3 from 'sqlite3'


app.use(express.static('public'))
app.use(express.json())
app.use(cors())

const db = await sqlite.open({ //This open the database connection
  filename: './data_plan.db',
  driver: sqlite3.Database
});

await db.migrate();


// Example endpoint to fetch all journal entries
app.get('/journal-entries', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM journal_entries')
       res.json({
      message: 'Success',
      data: rows,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // await db.all('SELECT * FROM journal_entries', [], (err, rows) => {
  //   console.log({err, rows});
  //   if (err) {
  //     res.status(400).json({ error: err.message });
  //     return;
  //   }
  //   res.json({
  //     message: 'Success',
  //     data: rows,
  //   });
  // });
});

// Example endpoint to add a new journal entry
app.post('/journal-entries', async (req, res) => {
  // try {
  //   const rows = await db.all('INSERT INTO journal_entries')
  //   res.json({
  //     message: 'Journal entry added successfully',
  //     data: { id: this.lastID, user_id, entry_date, content, mood },
  //   });
  // } catch (error) {
  //   res.status(400).json({ error: 'Missing required fields: user_id, entry_date, or content' });
  // }


  console.log('Request body:', req.body); // Log the request body for debugging

  const { user_id, entry_date, content, mood } = req.body;
  if (!user_id || !entry_date || !content) {
    return res.status(400).json({ error: 'Missing required fields: user_id, entry_date, or content' });
  }

  const query = 'INSERT INTO journal_entries (user_id, entry_date, content, mood) VALUES (?, ?, ?, ?)';
  const params = [user_id, entry_date, content, mood];

  db.run(query, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Journal entry added successfully',
      data: { id: this.lastID, user_id, entry_date, content, mood },
    });
  });
});



app.listen(PORT, function () {
  console.log(`Server started http://localhost:${PORT}`);
})

import express from 'express';
import cors from 'cors';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';


const app = express();

app.use(express.static('public'))
app.use(express.json())
app.use(cors())

// const db = await sqlite.open({ //This open the database connection
//   filename: './data_plan.db',
//   driver: sqlite3.Database
// });
db.run(`
  CREATE TABLE moods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  mood TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
  `)


db.getDatabaseInstance(() => {
  
  db.run(`
      CREATE TABLE IF NOT EXISTS moods (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          mood TEXT NOT NULL,
          date TEXT DEFAULT CURRENT_TIMESTAMP,
          user_id INTEGER NOT NULL
      )
  `, (err) => {
      if (err) {
          console.error("Error creating moods table:", err);
      } else {
          console.log("Moods table created or already exists.");
      }
  });
});

await db.migrate();

// Connect to SQLite database
// const db = new sqlite3.Database('./database.db', (err) => {
//   if (err) {
//     console.error('Error opening database:', err.message);
//   } else {
//     console.log('Connected to the SQLite database.');
//   }
// });

// Example endpoint to fetch all journal entries
app.get('/journal-entries', (req, res) => {
  db.all('SELECT * FROM journal_entries', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Success',
      data: rows,
    });
  });
});

// Example endpoint to add a new journal entry
app.post('/journal-entries', (req, res) => {
  console.log('Request body:', req.body); // Log the request body for debugging

  const { user_id, entry_date, content, mood } = req.body;
  if (!user_id || !entry_date || !content) {
    return res.status(400).json({ error: 'Missing required fields: user_id, entry_date, or content' });
  }

  const query = 'INSERT INTO journal_entries (user_id, entry_date, content, mood) VALUES (?, ?, ?, ?)';
  const params = [user_id, entry_date, content, mood];

  db.run(query, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Journal entry added successfully',
      data: { id: this.lastID, user_id, entry_date, content, mood },
    });
  });
});

// Endpoint to save a mood
app.post('http://127.0.0.1:4011/api/moods', (req, res) => {
  const { mood, user_id } = req.body;
  db.run(`INSERT INTO moods (mood, user_id) VALUES (?, ?)`, [mood, user_id], function (err) {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
  });
});

// Endpoint to fetch all moods
app.get('http://127.0.0.1:4011/api/moods', (req, res) => {
  db.all(`SELECT * FROM moods`, [], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json({ moods: rows });
  });
});

const PORT = process.env.PORT || 4011;
app.listen(PORT, function () {
  console.log(`Server started http://localhost:${PORT}`);
})
