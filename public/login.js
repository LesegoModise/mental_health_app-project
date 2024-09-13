document.addEventListener('alpine:init', () => {
    Alpine.data('login', () => ({
        username: '',
        password: '',
        rememberMe: false,
        errors: {},

        async submit(event) {
            event.preventDefault();

            const correctUsername = 'Eric Nkosi';
            const correctPassword = 'EricNkosi91';

            if (this.username === correctUsername && this.password === correctPassword) {
                location.href = './dashboard.html';
            } else {
                this.errors = {
                    username: 'Invalid username or password',
                    password: 'Invalid username or password'
                };
                setTimeout(() => {
                    this.errors = {};
                }, 5000);
            }
        },

        signUp() {
            location.href = './registration.html';
        }
    }));
});