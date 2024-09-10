// function showRegisterForm() {
//   document.getElementById('login-form').classList.add('hidden');
//   document.getElementById('register-form').classList.remove('hidden');
// }

// function register() {
//   // Capture input data
//   const name = document.getElementById('name').value;
//   const surname = document.getElementById('surname').value;
//   const email = document.getElementById('email').value;

//   if (name && surname && email) {
//       document.getElementById('register-form').classList.add('hidden');
//       const welcomeMessage = document.getElementById('welcome-message');
//       welcomeMessage.querySelector('h2').innerText = 'Welcome to Through The Skull!';
//       welcomeMessage.querySelector('p').innerText = `
//           We're so glad you've joined our community. Your mental well-being is important to us, and we're here to support you every step of the way. Whether you're looking for resources, guidance, or a safe space to share your thoughts, you've come to the right place.

//           Take your time to explore, connect with others, and remember that you're never alone on this journey. If you ever need help or have questions, our team is here for you.

//           Welcome to a place where your mental health matters.
//       `;
//       welcomeMessage.classList.remove('hidden');
//   }
// }

// function login() {
//   const uniqueId = document.getElementById('unique-id').value;

//   if (uniqueId) {
//       document.getElementById('login-form').classList.add('hidden');
//       const welcomeMessage = document.getElementById('welcome-message');
//       welcomeMessage.querySelector('h2').innerText = 'Thank you for Coming back!';
//       welcomeMessage.querySelector('p').innerText = '';
//       welcomeMessage.classList.remove('hidden');
//       // Display appreciation animation here (you can add an animation library or custom CSS for that)
//   } else {
//       alert('Please enter your Unique ID or sign up.');
//   }
// }

// function mentalHealth() {
//   return {
//       showSplash: true,
//       isRegistering: false,
//       loginData: {
//           username: '',
//           password: ''
//       },
//       registerData: {
//           fullName: '',
//           username: '',
//           email: '',
//           password: '',
//           confirmPassword: ''
//       },
//       rememberMe: false,
//       selectedLanguage: 'en',

//       login() {
//           if (this.loginData.username && this.loginData.password) {
//               alert('Logging in...');
//               // Handle login logic here
//               // Show terms and conditions page
//           } else {
//               alert('Please fill in all fields.');
//           }
//       },
//       register() {
//           if (this.registerData.password === this.registerData.confirmPassword) {
//               // Store user data (can use localStorage or send to a database)
//               localStorage.setItem('userData', JSON.stringify(this.registerData));
//               alert('Registration successful!');
//               this.isRegistering = false;
//           } else {
//               alert('Passwords do not match!');
//           }
//       }
//   }
// }


document.addEventListener('alpine:init', () => {
    Alpine.data('mentalHealth', () => ({
        showSplash: true,
        isRegistering: false,
        loginData: {
            username: '',
            password: ''
        },
        registerData: {
            fullName: '',
            surname: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        rememberMe: false,
        selectedLanguage: 'en',

        showRegisterForm() {
            this.showSplash = false;
            this.isRegistering = true;
        },

        register() {
            const { fullName, surname, email, password, confirmPassword } = this.registerData;
            if (fullName && surname && email && password && password === confirmPassword) {
                localStorage.setItem('userData', JSON.stringify(this.registerData));
                this.isRegistering = false;
                this.showSplash = true;
                document.getElementById('welcome-message').innerHTML = `
                    <h2>Welcome to Through The Skull!</h2>
                    <p>
                        We're so glad you've joined our community. Your mental well-being is important to us, and we're here to support you every step of the way. Whether you're looking for resources, guidance, or a safe space to share your thoughts, you've come to the right place.
                        Take your time to explore, connect with others, and remember that you're never alone on this journey. If you ever need help or have questions, our team is here for you.
                        Welcome to a place where your mental health matters.
                    </p>
                `;
                document.getElementById('welcome-message').classList.remove('hidden');
            } else {
                alert('Please fill in all fields correctly and ensure passwords match.');
            }
        },

        login() {
            const { username, password } = this.loginData;
            if (username && password) {
                this.showSplash = false;
                document.getElementById('welcome-message').innerHTML = `
                    <h2>Thank you for Coming back!</h2>
                    <p>We're glad to see you again!</p>
                `;
                document.getElementById('welcome-message').classList.remove('hidden');
                // You can add animation logic here if needed
            } else {
                alert('Please enter your username and password.');
            }
        },

        changeLanguage(event) {
            this.selectedLanguage = event.target.value;
            // Handle language change logic here
        }
    }));
});
