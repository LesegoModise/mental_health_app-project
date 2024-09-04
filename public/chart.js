function journalApp() {
    return {
        moods: ['Sad', 'Angry', 'Emotional', 'Fine', 'Happy'],
        selectedMood: '',
        entry: '',
        currentPrompt: 'What’s on your mind today?',
        moodData: JSON.parse(localStorage.getItem('moodData')) || [], // Retrieve stored mood data

        // Method to save journal entry and selected mood
        saveEntry() {
            if (this.selectedMood) {
                this.moodData.push({
                    mood: this.selectedMood,
                    date: new Date().toLocaleDateString()
                });
                localStorage.setItem('moodData', JSON.stringify(this.moodData)); // Save to localStorage
                this.updateChart(); // Update the chart with the new mood data
                alert('Entry saved!');
                this.entry = '';
                this.selectedMood = '';
            } else {
                alert('Please select your mood.');
            }
        },

        // Method to update the chart
        updateChart() {
            const moodCounts = this.moods.map(mood => this.moodData.filter(entry => entry.mood === mood).length);
            if (this.chart) {
                this.chart.data.datasets[0].data = moodCounts;
                this.chart.update();
            } else {
                this.createChart(moodCounts);
            }
        },

        // Method to create the chart
        createChart(moodCounts) {
            const ctx = document.getElementById('moodChart').getContext('2d');
            this.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.moods,
                    datasets: [{
                        label: 'Mood Frequency',
                        data: moodCounts,
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },

        // Initialize the chart on component load
        init() {
            this.updateChart();
        }
    }
}