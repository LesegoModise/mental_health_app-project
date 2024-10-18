document.addEventListener('alpine:init', () => {
    Alpine.data('journalApp', () => ({
        moods: ['Sad', 'Angry', 'Emotional', 'Fine', 'Happy'],
        moodData: JSON.parse(localStorage.getItem('moodData')) || [], // Retrieve stored mood data
        chart: null,

        // Fetch mood data from the backend
        fetchMoods() {
            axios.get('http://localhost:4011/api/moods')
                .then(response => {
                    if (response.data && Array.isArray(response.data)) {
                        this.moodData = response.data;
                        this.updateChart();
                    } else {
                        console.error('Invalid data format from API');
                    }
                })
                .catch(error => {
                    console.error('Error fetching moods:', error);
                });
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
                    responsive: true,  // Ensures the chart adapts to different screen sizes
                    maintainAspectRatio: false, // Allows chart resizing if needed
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1  // Controls the step size of the Y-axis
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',  // Ensure legend is displayed correctly
                        }
                    }
                }
            });
        },
        listenForMoodUpdates() {
            document.addEventListener('mood-updated', () => {
                this.moodData = JSON.parse(localStorage.getItem('moodData')) || [];
                this.updateChart();
            });
        },

        // Initialize the chart and fetch moods on component load
        init() {
            this.updateChart(); // Initialize the chart with existing data
            this.fetchMoods();  // Fetch latest moods from the backend
            this.listenForMoodUpdates();
        }
    }));
});