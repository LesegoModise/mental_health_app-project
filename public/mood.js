document.addEventListener('alpine:init', () => {
    Alpine.data('moodTracker', () => ({
        return: {
            mood: '',
            status: '',
            userId: '',
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
                    // Update status with success message
                    this.status = `Mood recorded: ${mood}`;
                })
                .catch(error => {
                    // Handle error and update status
                    console.error('Error submitting mood:', error);
                    this.status = 'Error recording mood. Please try again.';
                });
        },

    }));
})