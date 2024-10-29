document.addEventListener('alpine:init', () => {
    Alpine.data('login', () => ({
        username: '',
        password: '',
        role: 'user',
        rememberMe: false,
        errors: {},

        async submit(event) {
            event.preventDefault();

            const userCredentials = {
                username: 'Eric Nkosi',
                password: 'EricNkosi91'
            };

            const adminCredentials = {
                username: 'Cynthia Genaro',
                password: 'CynthiaGenaroAdmin!'
            };


            if (
                (this.role === 'user' &&
                    this.username === userCredentials.username &&
                    this.password === userCredentials.password) ||
                (this.role === 'admin' &&
                    this.username === adminCredentials.username &&
                    this.password === adminCredentials.password)
            ) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', this.role);

                location.href = this.role === 'admin' ? './admin_dashboard.html' : './mood_selection.html';
            } else {
                this.errors = {
                    username: 'Invalid username',
                    password: 'Invalid password'
                };
            }
        },

        signUp() {
            location.href = './registration.html';
        }
    }));
});