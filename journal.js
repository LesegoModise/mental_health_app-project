document.addEventListener('alpine:init', () => {
    Alpine.data('journalApp', () => ({
        mood: '',
        entry: '',
        showAnalysis: false,
        recommendations: '',
        entries: [],

        init() {
            this.loadEntries();
        },

        saveMood() {
            if (this.mood) {
                alert(`Mood saved: ${this.mood}`);
            } else {
                alert('Please select a mood.');
            }
        },

        saveEntry() {
            if (this.entry.trim()) {
                const newEntry = {
                    id: 'entry-' + Math.random().toString(36).substr(2, 9),
                    mood: this.mood,
                    content: this.entry,
                    date: new Date().toLocaleString()
                };

                this.entries.push(newEntry);
                this.saveToLocalStorage();
                this.showAnalysis = true;
                this.recommendations = this.analyzeEntry();
                this.entry = ''; // Clear the entry field
                alert('Entry saved successfully!');
            } else {
                alert('Please write something in your entry.');
            }
        },

        analyzeEntry() {
            // Basic analysis based on mood
            if (this.mood === 'Sad' || this.mood === 'Angry') {
                return 'Consider talking to a friend or taking a break to relax.';
            } else if (this.mood === 'Happy') {
                return 'Keep doing what makes you feel great!';
            } else {
                return 'Take time to reflect and care for yourself.';
            }
        },

        loadEntries() {
            // Load saved entries from localStorage
            const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
            this.entries = storedEntries;
        },

        saveToLocalStorage() {
            // Save entries to localStorage
            localStorage.setItem('journalEntries', JSON.stringify(this.entries));
        }
    }));
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
