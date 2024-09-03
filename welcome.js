function showRegisterForm() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('register-form').classList.remove('hidden');
}

function register() {
  // Capture input data
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const email = document.getElementById('email').value;

  if (name && surname && email) {
      document.getElementById('register-form').classList.add('hidden');
      const welcomeMessage = document.getElementById('welcome-message');
      welcomeMessage.querySelector('h2').innerText = 'Welcome to Through The Skull!';
      welcomeMessage.querySelector('p').innerText = `
          We're so glad you've joined our community. Your mental well-being is important to us, and we're here to support you every step of the way. Whether you're looking for resources, guidance, or a safe space to share your thoughts, you've come to the right place.

          Take your time to explore, connect with others, and remember that you're never alone on this journey. If you ever need help or have questions, our team is here for you.

          Welcome to a place where your mental health matters.
      `;
      welcomeMessage.classList.remove('hidden');
  }
}

function login() {
  const uniqueId = document.getElementById('unique-id').value;

  if (uniqueId) {
      document.getElementById('login-form').classList.add('hidden');
      const welcomeMessage = document.getElementById('welcome-message');
      welcomeMessage.querySelector('h2').innerText = 'Thank you for Coming back!';
      welcomeMessage.querySelector('p').innerText = '';
      welcomeMessage.classList.remove('hidden');
      // Display appreciation animation here (you can add an animation library or custom CSS for that)
  } else {
      alert('Please enter your Unique ID or sign up.');
  }
}
