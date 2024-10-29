document.addEventListener('alpine:init', () => {
    Alpine.data('dashboard', () => ({
        profileMenuOpen: false,
        successMessage: '',
        totalUsers: 0,
        upcomingAppointments: 0,
        engagementTrends: 'Low',
        userReports: '',
        userReportsVisible: false,
        sessionNotes: 'No notes available yet.',

        init() {
            this.loadDashboardData();
        },

        async loadDashboardData() {
            try {
                const response = await axios.get('/api/dashboard');
                this.totalUsers = response.data.totalUsers;
                this.upcomingAppointments = response.data.upcomingAppointments;
                this.engagementTrends = response.data.engagementTrends;
            } catch (error) {
                console.error('Failed to load dashboard data:', error);
            }
        },

        async fetchUserReports() {
            try {
                const response = await axios.get('/api/user-reports');
                this.userReports = response.data.reports; // Adjust based on your API response
                this.userReportsVisible = !this.userReportsVisible;
            } catch (error) {
                console.error('Failed to fetch user reports:', error);
            }
        },

        async joinSession() {
            try {
                const response = await axios.get('/api/join-session');
                alert('Joining virtual session...');
                // Handle session join logic here
            } catch (error) {
                console.error('Failed to join session:', error);
            }
        },

        async generateReport() {
            try {
                const response = await axios.post('/api/generate-report');
                alert('Report generated successfully!');
                // Handle report generation logic here
            } catch (error) {
                console.error('Failed to generate report:', error);
            }
        },

        async viewResources() {
            try {
                const response = await axios.get('/api/resources');
                alert('Viewing resources...');
                // Handle resource viewing logic here
            } catch (error) {
                console.error('Failed to load resources:', error);
            }
        },

        openProfileSettings() {
            alert('Opening profile settings...');
            // Logic for opening profile settings
        }
    }));
});
