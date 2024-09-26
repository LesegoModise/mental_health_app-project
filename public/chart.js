document.addEventListener('alpine:init', () => {
    Alpine.data('journalApp', () => ({
        moods: ['Sad', 'Angry', 'Emotional', 'Fine', 'Happy', 'Anxious'],
        moodData: [],
        chart: null,

        init() {
            this.fetchMoods();
        },

        fetchMoods() {
            axios.get('http://localhost:4011/api/moods')
                .then(response => {
                    console.log(response.data);
                    this.moodData = response.data;
                    this.updateChart();
                })
                .catch(error => {
                    console.error('Error fetching moods:', error);
                });
        },
        // Method to update the chart
        updateChart() {
            const moodCounts = this.moods.map(mood => this.moodData.filter(entry => entry.mood === mood).length);

            // Destroy the existing chart before creating a new one
            if (this.chart) {
                this.chart.destroy();
            }

            this.createChart(moodCounts);
        },

        updateChart() {
            const moodCounts = this.moods.map(mood =>
                this.moodData.filter(entry => entry.mood === mood).length
            );

            if (this.chart) {
                this.chart.data.datasets[0].data = moodCounts;
                this.chart.update();
            } else {
                this.createChart(moodCounts);
            }
        },

        createChart(moodCounts) {
            const ctx = document.getElementById('moodChart').getContext('2d');
            this.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.moods,
                    datasets: [{
                        label: 'Mood Frequency',
                        data: moodCounts,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
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
        }
    }));
});