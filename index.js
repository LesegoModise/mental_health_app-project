// import express from 'express';

// const app = express();

// app.post('/journal', (req, res) => {
//     const { content, mood, userId } = req.body;

//     if (!userId || !content || !mood) {
//         return res.status(400).json({ error: 'All fields are required.' });
//     }

//     const entry = {
//         id: uuidv4(),
//         content,
//         mood,
//         date: new Date().toLocaleString(),
//     };

//     if (!journalEntries[userId]) {
//         journalEntries[userId] = [];
//     }

//     journalEntries[userId].push(entry);

//     // Simple analysis logic - extend as needed
//     let recommendations = '';
//     if (mood === 'Sad' || mood === 'Angry') {
//         recommendations = 'Consider talking to a friend or taking a break to relax.';
//     } else if (mood === 'Happy') {
//         recommendations = 'Keep doing what makes you feel great!';
//     } else {
//         recommendations = 'Take time to reflect and care for yourself.';
//     }

//     res.status(201).json({ message: 'Entry saved', entry, recommendations });
// });

// // Fetch entries for a specific user
// app.get('/journal/:userId', (req, res) => {
//     const userId = req.params.userId;
//     const entries = journalEntries[userId] || [];
//     res.json(entries);
// });