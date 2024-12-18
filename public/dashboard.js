document.addEventListener('alpine:init', () => {
    Alpine.data('dashboard', () => ({
        profileMenuOpen: false,
        successMessage: '',

        init() {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn) {
                // this.showPopover();
                this.successMessage = 'Welcome, Eric Nkosi!';

                localStorage.removeItem('isLoggedIn');

                this.clearSuccessMessageAfterTimeout();
            }
        },

        toggleProfileMenu() {
            this.profileMenuOpen = !this.profileMenuOpen;
            console.log('Profile menu toggled:', this.profileMenuOpen);
        },

        async logout() {
            try {
                await axios.post('/api/logout');
                this.successMessage = 'You have been logged out successfully!';
                setTimeout(() => {
                    window.location.href = './welcome.html';
                }, 2000);
            } catch (error) {
                console.error('Logout failed:', error);
                this.successMessage = 'Logout failed. Please try again.';
            }
        },

        clearSuccessMessageAfterTimeout() {
            setTimeout(() => {
                this.successMessage = '';
            }, 5000);
        },

        // showPopover() {
        //     $(document).ready(function() {
        //         $('#profile-icon').popover('show');
        //     });
        // },

        navigateToMood_Selection() {
            window.location.href = './mood_selection.html';
        },

        navigateToJournal() {
            window.location.href = './journal.html';
        },

        navigateToReport() {
            window.location.href = './report.html';
        },

        navigateToRecommendation() {
            window.location.href = './recommendation.html';
        },

        navigateToMoodChart() {
            window.location.href = './moodchart.html';
        },

        navigateToContactTherapist() {
            window.location.href = './contacttherapist.html';
        },

        navigateToEmergency() {
            window.location.href = './emergency.html';
        }

    }))
})