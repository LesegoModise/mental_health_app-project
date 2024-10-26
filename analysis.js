// document.getElementById('analyzeBtn').addEventListener('click', async function () {

//     // Function to clean the user input text
//     function cleanText(text) {
//         // Convert to lowercase
//         let cleanedText = text.toLowerCase();
        
//         // Remove special characters and numbers
//         cleanedText = cleanedText.replace(/[^a-z\s]/g, '');
        
//         // Optional: Remove stop words (e.g., "the", "is")
//         const stopWords = ['the', 'is', 'in', 'and', 'a', 'to', 'it'];
//         cleanedText = cleanedText.split(' ').filter(word => !stopWords.includes(word)).join(' ');
        
//         return cleanedText;
//     }

//     // Capture user input from the text area
//     const userInput = document.getElementById('userInput').value;
//     const cleanedInput = cleanText(userInput);  // Clean the input text

//     // Make sure to replace 'your-ml-api-url' with the actual API URL where your model is deployed
//     const apiUrl = 'https://your-ml-api-url/analyze';

//     try {
//         // Send a request to your ML model API
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ text: cleanedInput })  // Send cleaned input to API
//         });

//         const result = await response.json();  // Get the API result (e.g., sentiment prediction)
//         const prediction = result.prediction;

//         // Display analysis result to the user
//         document.getElementById('result').innerText = `Analysis Result: ${prediction}`;

//         // Provide feedback based on the prediction
//         provideFeedback(prediction);
//     } catch (error) {
//         console.error('Error:', error);
//         document.getElementById('result').innerText = 'Error in analyzing text.';
//     }
// });

// // Optional real-time input analysis
// document.getElementById('userInput').addEventListener('input', async function () {
//     const userInput = document.getElementById('userInput').value;
//     const cleanedInput = cleanText(userInput);

//     if (cleanedInput) {
//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ text: cleanedInput })
//             });

//             const result = await response.json();
//             document.getElementById('result').innerText = `Real-time Analysis: ${result.prediction}`;
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }
// });

// // Function to provide feedback based on the prediction
// function provideFeedback(prediction) {
//     const feedbackDiv = document.getElementById('feedback');
//     feedbackDiv.innerHTML = '';  // Clear any existing feedback

//     if (prediction === 'positive') {
//         feedbackDiv.innerHTML = 'You seem to be in a good mood! Check out this motivational video: <a href="https://example.com">Watch Now</a>';
//     } else if (prediction === 'negative') {
//         feedbackDiv.innerHTML = 'It looks like you might be feeling down. Here’s a motivational article: <a href="https://example.com">Read Here</a>. If you need to talk to someone, consider reaching out to a therapist.';
//     } else if (prediction === 'anxiety') {
//         feedbackDiv.innerHTML = 'It seems like you’re feeling anxious. Try some relaxation techniques. Here’s a calming video: <a href="https://example.com">Watch Here</a>. You might also want to consider talking to a therapist.';
//     } else if (prediction === 'depression') {
//         feedbackDiv.innerHTML = 'You may be experiencing signs of depression. Please talk to a therapist or someone who can help. Here are some resources: <a href="https://example.com">Get Help</a>';
//     } else {
//         feedbackDiv.innerHTML = 'Keep journaling! You’re doing great.';
//     }
// }
