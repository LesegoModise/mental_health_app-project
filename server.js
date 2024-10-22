const express = require('express');
const cors = require('cors'); // Import the cors package
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

// Use the CORS middleware
app.use(cors()); // Enable CORS for all requests

// Middleware to parse JSON
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

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


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});