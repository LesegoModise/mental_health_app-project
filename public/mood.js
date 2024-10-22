document.addEventListener('alpine:init', () => {
    Alpine.data('moodTracker', () => ({
        mood: '', // This holds the selected mood
        statusMessage: '',

        selectMood(selectedMood) {
            this.mood = selectedMood;  // Update the mood variable when an emoji is clicked
            this.updateMoodData();
        },

        submitMood() {
            if (!this.mood) {
                this.statusMessage = 'Please select a mood!';
                return;
            }
            // Save the mood and redirect
            localStorage.setItem('selectedMood', this.mood);
            this.statusMessage = `Mood saved locally: ${this.mood}. We do not have a database set up yet.`;

            // Redirect after submission
            setTimeout(() => {
                window.location.href = 'journal.html';
            }, 3000);
        },

        updateMoodData() {
            let currentMoodData = JSON.parse(localStorage.getItem('moodData')) || [];
            currentMoodData.push({ mood: this.mood, date: new Date().toISOString() });
            localStorage.setItem('moodData', JSON.stringify(currentMoodData));
            document.dispatchEvent(new CustomEvent('mood-updated', { detail: this.mood }));
        }
    }));
});
