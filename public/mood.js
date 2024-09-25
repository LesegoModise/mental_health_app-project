document.addEventListener('alpine:init', () => {
    Alpine.data('moodTracker', () => ({
        mood: '',
        status: '',
        status: '',
        submitMood() {
            if (!this.mood) {
                this.status = 'Please select a mood!';
                return;
            }

            // Save mood to localStorage
            localStorage.setItem('selectedMood', this.mood);
            this.status = `Mood saved: ${this.mood}`;
            // Redirect to journal.html
            window.location.href = 'journal.html';

            axios.post('/api/moods', {
                mood: mood,
                userId: this.userId,
            })
                .then(response => {
                    localStorage.setItem('userMood', mood);
                    this.status = `Mood recorded: ${mood}`;
                    // this.mood = mood;
                })
                .catch(error => {
                    console.error('Error submitting mood:', error);
                    this.status = 'Error recording mood. Please try again.';
                });
        },

    }));
})