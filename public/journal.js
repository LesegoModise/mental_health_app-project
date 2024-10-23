document.addEventListener('alpine:init', () => {
    Alpine.data('journalApp', () => ({
        mood: '',
        entry: '',
        showAnalysis: false,
        recommendations: '',
        entries: [],
        mood: localStorage.getItem('selectedMood') || '',


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

        async saveEntry() {
            if (this.entry.trim()) {
                const newEntry = {
                    id: 'entry-' + Math.random().toString(36).substr(2, 9),
                    mood: this.mood,
                    content: this.entry,
                    date: new Date().toLocaleString()
                };

                

                const response = await axios.post('http://localhost:4011/predict', {
                    statement: this.entry
                })

                const data = await axios.post('/journal-entries', newEntry );

                console.log('data', data.data)
                console.log('predictions', response.data);


                this.entries.push(newEntry);
                this.saveToLocalStorage();
                this.showAnalysis = true;
                this.recommendations = this.analyzeEntry();
                this.entry = ''; // Clear the entry field
                // alert('Entry saved successfully!');
            } else {
                alert('Please write something in your entry.');
            }
            localStorage.setItem('journalEntry', this.entry);
            // window.location.href = "recommendation.html";
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