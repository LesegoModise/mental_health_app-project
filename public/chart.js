// moodChartComponent
document.addEventListener('alpine:init', () => {
    Alpine.data('moodChartComponent', () => ({
        moodChart: null,
        userId: 1,
        moods: '',

        async fetchMoodData() {
            try {
                const response = await fetch(`http://127.0.0.1:4011/api/moods`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const data = await response.json();
                return Array.isArray(data.moods) ? data.moods : [];
            } catch (error) {
                console.error("Error fetching mood data:", error);
                return [];
            }
        },

        async updateChart(newMood = { mood: this.mood }) {
            let moodData = await this.fetchMoodData();

            // If a new mood is provided, add it to moodData
            if (newMood) {
                moodData.push(newMood);
            }

            const moodCounts = moodData.reduce((counts, mood) => {
                counts[mood] = (counts[mood] || 0) + 1;
                return counts;
            }, {});

            const labels = ['happy', 'sad', 'angry', 'tired', 'neutral'];
            const data = labels.map(mood => moodCounts[mood] || 0);

            // Destroy the chart if it exists to avoid "canvas in use" error
            if (this.moodChart) {
                // this.moodChart.destroy();
            }

            const ctx = document.getElementById('moodChart').getContext('2d');
            this.moodChart = new Chart(ctx, {
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
                        y: { beginAtZero: true }
                    }
                }
            });
        },

        async initChart() {
            await this.updateChart();
            document.addEventListener('mood-updated', async (event) => {
                await this.updateChart(event.detail); // Pass new mood to updateChart
            });
        }
    }));
});

// moodTracker
document.addEventListener('alpine:init', () => {
    Alpine.data('moodTracker', () => ({
        mood: '',
        statusMessage: '',

        async selectMood(selectedMood) {
            this.mood = selectedMood;
        },

        async submitMood() {
            if (!this.mood) {
                this.statusMessage = 'Please select a mood!';
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:4011/api/moods', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
