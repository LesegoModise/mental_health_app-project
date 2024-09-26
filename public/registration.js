document.addEventListener('alpine:init', () => {
    Alpine.data('register', () => ({
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {},
        successMessage: '',

        async submit(event) {
            this.clearErrors();
            this.clearSuccessMessage();

            if (!this.validateForm()) {
                this.clearErrorAfterTimeout();
                return;
            }

            if (this.password === this.confirmPassword) {
                this.successMessage = 'Registration successful!';
                setTimeout(() => {
                    location.href = './consent.html';
                }, 5000);
            } else {
                this.errors.confrimPassword = 'Passwords do not match';
                this.clearErrorsAfterTimeout();
            }
        },

        back() {
            location.href = './login.html';
        },

        validateForm() {
            let isValid = true;

            if (!this.name) {
                this.errors.name = 'Name is required';
                isValid = false;
            }

            if (!this.surname) {
                this.errors.surname = 'Surname is required';
                isValid = false;
            }

            if (!this.username) {
                this.errors.username = 'Username is required';
                isValid = false;
            }

            if (!this.email) {
                this.errors.email = 'Email is required';
                isValid = false;
            } else if (!this.validateEmail(this.email)) {
                this.errors.email = 'Invalid email format';
                isValid = false
            }

            if (!this.password) {
                this.errors.password = 'Password is required';
                isValid = false;
            }

            if (!this.confirmPassword) {
                this.errors.confirmPassword = 'Please confirm your password';
                isValid = false;
            }

            return isValid;
        },

        clearErrors() {
            this.errors = {};
        },

        clearErrorAfterTimeout() {
            setTimeout(() => {
                this.clearErrors();
            }, 5000);
        },

        clearSuccessMessage() {
            this.successMessage = '';
        },

        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        },

        register() {
            location.href = './consent.html'
        },




    }));
});