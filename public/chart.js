document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('moodChart').getContext('2d');

    // Retrieve the stored mood data from localStorage
    const moodData = JSON.parse(localStorage.getItem('moodData')) || [];

    // Count the occurrences of each mood
    const moodCounts = moodData.reduce((counts, entry) => {
        counts[entry.mood] = (counts[entry.mood] || 0) + 1;
        return counts;
    }, {});

    // Define the labels (moods) and data (counts)
    const labels = ['happy', 'sad', 'angry', 'tired', 'neutral'];
    const data = labels.map(mood => moodCounts[mood] || 0);

    // Create the chart using Chart.js
    const moodChart = new Chart(ctx, {
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
});
