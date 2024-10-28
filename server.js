import express from 'express'
import cors from 'cors'
import * as sqlite from 'sqlite'
import sqlite3 from 'sqlite3'
const app = express();

app.use(express.static('public'))
app.use(express.json())
app.use(cors())

const db = await sqlite.open({ //This open the database connection
  filename: './data_plan.db',
  driver: sqlite3.Database
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
app.get('/journal-entries', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM journal_entries LIMIT 5')
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
  // console.log(req.body)

  if (!user_id || !entry_date || !content) {
    return res.status(400).json({ error: 'Missing required fields: user_id, entry_date, or content' });
  }
  var response = '';
  // try{
  //   response = await axios.post ('http://localhost:5000/predict');   
  // } catch(error){
  //   // ignore erro for nt
  // }


  const query = 'INSERT INTO journal_entries (user_id, entry_date, content, mood) VALUES (?, ?, ?, ?)';
  const params = [user_id, entry_date, content, mood];

  try {
    await db.run(query, params)
    res.json({
      message: 'Journal entry added successfully',
      data: { response, user_id, entry_date, content, mood },
    });
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
  //   , function (err) {
  //     if (err) {
  //       res.status(400).json({ error: err.message });
  //       return;
  //     }
  //     res.json({
  //       message: 'Journal entry added successfully',
  //       data: { response, user_id, entry_date, content, mood },
  //     });
  //   });
});


const PORT = process.env.PORT || 4011;
app.listen(PORT, function () {
  console.log(`Server started http://localhost:${PORT}`);
})