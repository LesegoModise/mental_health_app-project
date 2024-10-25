document.addEventListener('alpine:init', () => {
    Alpine.data('moodChartComponent', () => ({
        moodChart: null, // Chart instance
        userId: 1, // Assuming user_id is 1

        async fetchMoodData() {
            try {
                const response = await fetch(`http://127.0.0.1:4011/api/moods`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                // Ensure we return an array of moods
                return Array.isArray(data.moods) ? data.moods : [];
            } catch (error) {
                console.error("Error fetching mood data:", error);
                return [];
            }
        },

        async updateChart() {
            const moodData = await this.fetchMoodData();

            // Ensure moodData is an array
            if (!Array.isArray(moodData)) {
                console.error("Expected an array but got:", moodData);
                return;
            }

            const moodCounts = moodData.reduce((counts, mood) => {
                counts[mood] = (counts[mood] || 0) + 1;
                return counts;
            }, {});

            const labels = ['happy', 'sad', 'angry', 'tired', 'neutral'];
            const data = labels.map(mood => moodCounts[mood] || 0);

            // Create the chart if it doesn't exist, otherwise update it
            if (!this.moodChart) {
                this.moodChart = new Chart(document.getElementById('moodChart').getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Mood Frequency',
                            data: data,
                            backgroundColor: [
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(54, 162, 235, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 205, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(54, 162, 235, 1)'
                            ],
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
            } else {
                // Update existing chart data
                this.moodChart.data.datasets[0].data = data;
                this.moodChart.update();
            }
        },

        // Initialize chart on page load
        async initChart() {
            await this.updateChart();
            document.addEventListener('mood-updated', async () => {
                await this.updateChart(); // Fetch new data and update the chart
            });
        }
    }));
});
