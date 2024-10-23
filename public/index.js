import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';



// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// Initialize SQLite database
// const db = new sqlite3.Database(':memory:');

// Create a table for storing mood data
db.serialize(() => {
  db.run(`CREATE TABLE moods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood TEXT,
    date TEXT
  )`);
});
const db = new sqlite3.Database('./moods.db', (err) => {
  if (err) {
      console.error('Error connecting to the database:', err.message);
  } else {
      console.log('Connected to the SQLite database.');
  }
});

// Route to get mood data for a specific user
app.get('/api/moods/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const sql = `SELECT mood, COUNT(*) AS mood_count FROM moods WHERE user_id = ? GROUP BY mood`;

  db.all(sql, [userId], (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json(rows);
  });
});


// Endpoint to save a new mood entry
app.post('/api/moods', (req, res) => {
  const { mood, date } = req.body;
  db.run(`INSERT INTO moods (mood, date) VALUES (?, ?)`, [mood, date], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Endpoint to get all mood entries
app.get('/api/moods', (req, res) => {
  db.all(`SELECT * FROM moods`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Endpoint to get mood counts
app.get('/api/moods/counts', (req, res) => {
  db.all(`SELECT mood, COUNT(*) as count FROM moods GROUP BY mood`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/moods', (req, res) => {
  const sql = 'SELECT mood, COUNT(*) AS mood_count FROM moods WHERE user_id = ? GROUP BY mood';
  db.query(sql, [req.query.user_id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });



app.post('/journal', (req, res) => {
    const { content, mood, userId } = req.body;

    if (!userId || !content || !mood) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const entry = {
        id: uuidv4(),
        content,
        mood,
        date: new Date().toLocaleString(),
    };

    if (!journalEntries[userId]) {
        journalEntries[userId] = [];
    }

    journalEntries[userId].push(entry);

    // Simple analysis logic - extend as needed
    let recommendations = '';
    if (mood === 'Sad' || mood === 'Angry') {
        recommendations = 'Consider talking to a friend or taking a break to relax.';
    } else if (mood === 'Happy') {
        recommendations = 'Keep doing what makes you feel great!';
    } else {
        recommendations = 'Take time to reflect and care for yourself.';
    }

    res.status(201).json({ message: 'Entry saved', entry, recommendations });
});

// Fetch entries for a specific user
app.get('/journal/:userId', (req, res) => {
    const userId = req.params.userId;
    const entries = journalEntries[userId] || [];
    res.json(entries);
});