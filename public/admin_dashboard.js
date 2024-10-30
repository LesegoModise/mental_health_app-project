document.addEventListener('alpine:init', () => {
    console.log("Alpine initialized");
    Alpine.data('admin', () => ({
        profileMenuOpen: false,
        successMessage: '',
        totalUsers: 0,
        upcomingAppointments: 0,
        engagementTrends: 'Low',
        userReports: [],
        userReportsVisible: false,
        sessionNotes: 'No notes available yet.',

        init() {
            this.fetchUserReports();
        },

        async fetchUserReports() {
            try {
                const response = await axios.get('/admin/journal-entries');
                this.userReports = response.data.data;
                this.userReportsVisible = true;
            } catch (error) {
                console.error('Failed to fetch user reports:', error);
            }
        },

        async generateReport() {
            try {
                const response = await axios.post('/api/generate-report');
                const data = response.data.predictionCounts; // Assume API response gives prediction counts
                this.createCharts(data); // Pass the data to create charts
                alert('Report generated successfully!');
            } catch (error) {
                console.error('Failed to generate report:', error);
            }
        },
        
    }));
});
