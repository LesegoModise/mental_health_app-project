document.addEventListener('alpine:init', () => {
    Alpine.data('chartData', () => ({
        depressed: 0,
        sad: 0,
        happy: 0,
        neutral: 0,
        angry: 0,
        tired: 0,
        anxiety: 0,
        entries: [],
        async init() {
            await this.getData();
            await this.getAdminJournalEntries()
            this.renderCharts();
        },
        async getAdminJournalEntries(){
            const response = await fetch('/admin/journal-entries');
            const results = await response.json()
            const entries = results.data;
            this.entries = results.data;
            console.log(entries)
        },
        async getData() {
            const url = "/api/user-reports";
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();
                const data = json.reports;
                console.log(data);
                
                this.depressed = data.Depressed || 0;
                this.sad = data.sad || 0;
                this.happy = (data.Happy || 0) + (data.happy || 0); // Combined Happy counts
                this.neutral = data.neutral || 0;
                this.angry = data.angry || 0;
                this.tired = data.tired || 0;
                this.anxiety = data.anxiety || 0;
            } catch (error) {
                console.error(error.message);
            }
        },
        renderCharts() {
            const ctxBar = document.getElementById('barChart').getContext('2d');
            const ctxPie = document.getElementById('pieChart').getContext('2d');

            new Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: ['Depressed', 'Sad', 'Happy', 'Neutral', 'Angry', 'Tired', 'Anxiety'],
                    datasets: [{
                        label: 'Number of Employees',
                        data: [this.depressed, this.sad, this.happy, this.neutral, this.angry, this.tired, this.anxiety],
                        backgroundColor: [
                            'rgba(128, 128, 128, 0.6)', // Grey for Depressed
                            'rgba(0, 0, 255, 0.6)', // Blue for Sad
                            'rgba(0, 128, 0, 0.6)', // Green for Happy
                            'rgba(255, 255, 0, 0.6)', // Yellow for Neutral
                            'rgba(255, 0, 0, 0.6)', // Red for Angry
                            'rgba(211, 211, 211, 0.6)', // Light Grey for Tired
                            'rgba(255, 165, 0, 0.6)' // Orange for Anxiety
                        ],
                        borderColor: [
                            'rgba(128, 128, 128, 1)',
                            'rgba(0, 0, 255, 1)',
                            'rgba(0, 128, 0, 1)',
                            'rgba(255, 255, 0, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(211, 211, 211, 1)',
                            'rgba(255, 165, 0, 1)'
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

            new Chart(ctxPie, {
                type: 'pie',
                data: {
                    labels: ['Depressed', 'Sad', 'Happy', 'Neutral', 'Angry', 'Tired', 'Anxiety'],
                    datasets: [{
                        data: [this.depressed, this.sad, this.happy, this.neutral, this.angry, this.tired, this.anxiety],
                        backgroundColor: [
                            'rgba(128, 128, 128, 0.6)', // Grey for Depressed
                            'rgba(0, 0, 255, 0.6)', // Blue for Sad
                            'rgba(0, 128, 0, 0.6)', // Green for Happy
                            'rgba(255, 255, 0, 0.6)', // Yellow for Neutral
                            'rgba(255, 0, 0, 0.6)', // Red for Angry
                            'rgba(211, 211, 211, 0.6)', // Light Grey for Tired
                            'rgba(255, 165, 0, 0.6)' // Orange for Anxiety
                        ],
                        borderColor: [
                            'rgba(128, 128, 128, 1)',
                            'rgba(0, 0, 255, 1)',
                            'rgba(0, 128, 0, 1)',
                            'rgba(255, 255, 0, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(211, 211, 211, 1)',
                            'rgba(255, 165, 0, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }));
});