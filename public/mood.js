document.addEventListener('alpine:init', () => {
    Alpine.data('moodTracker', () => ({
        mood: '', // Holds the selected mood
        statusMessage: '',

        async selectMood(selectedMood) {
            this.mood = selectedMood; // Update the mood variable when a mood is selected
        },

        async submitMood() {
            if (!this.mood) {
                this.statusMessage = 'Please select a mood!';
                return;
            }

            try {
                // Save the selected mood to the database
                const response = await fetch('http://127.0.0.1:4011/api/moods', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ mood: this.mood, user_id: 1 }) 
                });

                if (response.ok) {
                    this.statusMessage = `Mood saved: ${this.mood}`;
                    document.dispatchEvent(new CustomEvent('mood-updated', { detail: this.mood }));

                    // Redirect after submission
                    setTimeout(() => {
                        window.location.href = 'journal.html';
                    }, 3000);
                } else {
                    this.statusMessage = 'Error saving mood to the database.';
                }
            } catch (error) {
                console.error('Error submitting mood:', error);
                this.statusMessage = 'Failed to submit mood. Please try again.';
            }
        }
    }));
});
