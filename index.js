import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
// import bodyParser from 'body-parser';

const PORT = process.env.PORT || 4011;

// Middleware
const app = express();
app.use(express.static('public'))
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

// Create a table for storing mood data
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    user_type Text default 'user'
  );`);

  // db.run()

  db.run(`CREATE TABLE IF NOT EXISTS moods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood TEXT,
    date datetime default CURRENT_TIMESTAMP,
    user_id INTEGER,
    foreign key (user_id) REFERENCES users(id)
  );`);

  // delete hard coded user
  db.run('insert into users (username) values (?);',['EricNkosi']);

  // const data = db.all('select * from users;');

  // console.log({data});
  

});

// Endpoint to save a new mood entry
app.post('/api/moods', (req, res) => {
  const { mood, userId } = req.body;
  console.log(req.body);
  
  db.run(`INSERT INTO moods (mood, user_id) VALUES (?, ?)`, [mood, userId || 1], function (err) {
    if (err) {
      console.log(err);
      
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

app.get('/api/moods/:userId', async (req, res) => {
  console.log(req.params);
  
  const result = db.all(`select * from moods where mood = 'angry'`);
  console.log(result);
  
res.json(result)
})

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


// In-memory storage for simplicity (you can replace it with a database like MongoDB or SQLite)
let moodHistory = [];

// Route to handle mood submission
app.post('/api/moods', (req, res) => {
  const { mood, userId } = req.body;

  // Save the mood with a timestamp and anonymous user ID
  const moodRecord = {
    mood,
    userId,
    timestamp: new Date()
  };

  moodHistory.push(moodRecord);

  res.json({
    message: 'Mood recorded successfully!',
    data: moodRecord
  });
});

// Route to retrieve mood history
app.get('/api/moods/:userId', (req, res) => {
  const userId = req.params.userId;

  // Filter mood history by the provided user ID
  const userMoods = moodHistory.filter(mood => mood.userId === userId);

  res.json({
    message: 'Mood history retrieved successfully!',
    data: userMoods
  });
});

app.listen(PORT, function () {
  console.log(`Server started http://localhost:${PORT}`);
})