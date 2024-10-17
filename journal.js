// This file should manage journaling functionality
// It should handle journal submissions (POST/journal)
// It should store journals linked to the user's anonymous ID
// It should provide routes for users to view past journal entries

document.addEventListener('alpine:init', () => {
    Alpine.data('journalApp', () => ({

        mood: "",
        entry: "",
        analysisResults: "",
        prediction: "",
        error: "",

        saveEntry() {
            if (!this.entry) {
              this.error = "Please enter your thoughts before submitting.";
              return;
            }
          
            const data = { text: this.entry };
          
            fetch('/predict', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            })
              .then(response => response.json())
              .then(data => {
                this.analysisResults = data.prediction;
                this.prediction = data.prediction;
                this.error = "";
              })
              .catch(error => {
                console.error('Error:', error);
                this.error = "An error occurred. Please try again later.";
              });
          
            this.entry = ""; // Clear the entry field after submission







        },
        predictMentalState() {
            // Retrieve the user's entry
            const entryText = this.entry;
          
            // Preprocess the entry (optional)
            // ...
          
            // Send the entry to the backend API
            fetch('/predict', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: entryText })
            })
              .then(response => response.json())
              .then(data => {
                // Handle the prediction result
                this.prediction = data.prediction;
                console.log('Predicted mental state:', this.prediction);
              })
              .catch(error => {
                console.error('Error:', error);
              });
        },




    }));
});