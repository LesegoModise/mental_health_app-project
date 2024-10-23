document.addEventListener('alpine:init', () => {
    Alpine.data('report', () => ({
        data:[],
        navigateToRecommendation() {
            window.location.href = './recommendation.html';
        },

        init(){
            this.getEntries ()
        },

        async  getEntries() {
            console.log('getEntries')
            try {
                const response = await fetch('/journal-entries');
                const data = await response.json();
                this.data = data.data
                console.log(data.data); // Display the data in the console
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        }
    
    }))
})