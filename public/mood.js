document.addEventListener('alpine:init', () => {
    Alpine.data('moodTracker', () => ({
            mood: '',
            status: '',
            userId: '',
            // moodData: JSON.parse(localStorage.getItem('moodData')) || [],
    
       
        init() {
            // Load saved mood from localStorage
            const savedMood = localStorage.getItem('userMood');
            if (savedMood) {
                // this.mood = savedMood;
                // this.status = `Previously recorded mood: ${savedMood}`;
            }
        },
        
        submitMood(mood) {
            if (!mood) {
                this.status = 'Please select a mood!';
                return;
            }

            this.status = 'Submitting your mood...';

            
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