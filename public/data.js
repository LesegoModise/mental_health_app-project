const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./journal_database.db');

// Function to add a new journal entry
function addJournalEntry(userId, content) {
    const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    db.run('INSERT INTO journal_entries (user_id, entry_date, content) VALUES (?, ?, ?)', 
           [userId, today, content], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('New journal entry added');
    });
}

// Call the function to add an entry
addJournalEntry(1, 'Today I learned how to set up an SQLite database in VS Code.');


// Function to fetch journal entries from the last 7 days
function getWeeklyReport(userId) {
  db.all('SELECT * FROM journal_entries WHERE user_id = ? AND entry_date >= DATE("now", "-7 days")', 
         [userId], 
         (err, rows) => {
      if (err) {
          console.error(err.message);
      } else {
          console.log('Weekly Report:', rows);
      }
  });
}

// Call the function to generate the weekly report for user with ID 1
getWeeklyReport(1);
