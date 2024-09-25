import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const PORT = process.env.PORT || 4011;

// Middleware
const app = express();
app.use(express.static('public'))
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

// Create a table for storing mood data
db.serialize(() => {
  db.run(`CREATE TABLE moods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood TEXT,
    date TEXT
  )`);
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




app.listen(PORT, function () {
    console.log(`Server started http://localhost:${PORT}`);
})
