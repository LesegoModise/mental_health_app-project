document.addEventListener('alpine:init', () => {
    Alpine.data('journalApp', () => ({
        mood: '',
        entry: '',
        showAnalysis: false,
        recommendations: '',
        entries: [],
        

        init() {
            this.loadEntries();
            function journalApp() {
                return {
                  entry: '',
                  saveEntry() {
                    // Save the journal entry to the server or local storage
                    alert('Entry saved!');
                  }
                };
              }
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