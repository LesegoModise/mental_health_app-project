document.addEventListener('alpine:init', () => {
    Alpine.data('moodTracker', () => ({
            mood: '',
            status: '',
            userId: '',
            saveMood: '',
            // moodData: JSON.parse(localStorage.getItem('moodData')) || [],
    
       
        init() {
            // Load saved mood from localStorage
            const saveMood = localStorage.getItem('saveMood');
            function saveMood(mood) {
                if (mood) {
                  localStorage.setItem('selectedMood', mood);
                  alert('Mood saved! Go to your journal.');
                  window.location.href = "journal.html"; // Redirect to journal page
                } else {
                  alert('Please select a mood!');
                }
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