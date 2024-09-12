document.addEventListener('alpine:init', () => {
    Alpine.data('dashboard', () => ({

        navigateToRecommendation() {
            window.location.href = './recommendation.html';
        }

    }))
})