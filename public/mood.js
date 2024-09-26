document.addEventListener('alpine:init', () => {
    Alpine.data('moodTracker', () => ({
        mood: '',
        isPopoverOpen: false,
statusMessage: '',
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


// script.js

// document.addEventListener('alpine:init', () => {
//     Alpine.data('moodTracker', () => ({
//         mood: '',
//         isPopoverOpen: false,
//         statusMessage: '',

        // openPopover() {
        //     this.isPopoverOpen = true;
        // },

        selectMood(selectedMood) {
            this.mood = selectedMood;
        },

        submitMood() {
            if (!this.mood) {
                this.statusMessage = 'Please select a mood!';
                return;
            }
            // const moodEntry = {
            //     mood: this.mood,
            //     date: new Date().toLocaleDateString(),
            // };

            // axios.post('http://localhost:4011/api/moods', moodEntry)
            // .then(() => {
            //     this.status = 'Mood saved successfully!';
            //     setTimeout(() => {
            //         window.location.href = 'chart.html';  // Redirect to the chart page after saving
            //     }, 1000);
            // })
            // .catch(error => {
            //     this.status = 'Error saving mood: ' + error;
            // });

            // Save the mood in localStorage
            localStorage.setItem('selectedMood', this.mood);
            this.statusMessage = `Mood saved: ${this.mood}`;

            // Simulate the mood submission error since the database isn't ready
            this.statusMessage = 'Mood recorded locally. Database not connected. Redirecting...';

            // Redirect to journal.html after mood submission
            setTimeout(() => {
                window.location.href = 'journal.html';
            }, 3000);

            // Optional: Comment out or remove the axios request since the database is not ready
            /*
            axios.post('/api/moods', {
                mood: this.mood,
                userId: 'exampleUserId', // replace with actual user ID
            })
                .then(response => {
                    localStorage.setItem('userMood', this.mood);
                    this.statusMessage = `Mood recorded: ${this.mood}`;
                })
                .catch(error => {
                    console.error('Error submitting mood:', error);
                    this.statusMessage = 'Error recording mood. Database is not connected yet.';
                });
            */
        }
    }));
});

