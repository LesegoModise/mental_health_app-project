<<<<<<< HEAD
document.addEventListener('alpine:init', () => {
    Alpine.data('journalApp', () => ({
        moods: ['Sad', 'Angry', 'Emotional', 'Fine', 'Happy'],
        selectedMood: '',
        entry: '',
        currentPrompt: 'What’s on your mind today?',
        moodData: JSON.parse(localStorage.getItem('moodData')) || [], // Retrieve stored mood data
        chart: null,

        // Fetch mood data from the backend
        fetchMoods() {
            axios.get('http://localhost:4011/api/moods')
                .then(response => {
                    this.moodData = response.data;
                    this.updateChart();
                })
                .catch(error => {
                    console.error('Error fetching moods:', error);
                });
        },

        // Method to save journal entry and selected mood
        saveEntry() {
            if (this.selectedMood) {
                const moodEntry = {
                    mood: this.selectedMood,
                    date: new Date().toLocaleDateString()
                };

                this.moodData.push(moodEntry);
                
                // Save to backend
                axios.post('http://localhost:4011/api/moods', moodEntry)
                    .then(() => {
                        // Save to localStorage
                        localStorage.setItem('moodData', JSON.stringify(this.moodData));
                        
                        // Update the chart with the new mood data
                        this.updateChart();
                        
                        alert('Entry saved!');
                        this.entry = '';
                        this.selectedMood = '';
                    })
                    .catch(error => {
                        console.error('Error saving mood entry:', error);
                    });
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
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                        borderWidth: 1
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

        // Initialize the chart and fetch moods on component load
        init() {
            this.updateChart(); // Initialize the chart with existing data
            this.fetchMoods();  // Fetch latest moods from the backend
        }
    }));
});
=======
// This JS should generate charts for mood reports
>>>>>>> acb31eea7895971cb4d06ed2e0a384196552b8fc
