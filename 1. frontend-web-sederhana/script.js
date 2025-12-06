document.addEventListener('DOMContentLoaded', function() {
    const pageLoader = document.getElementById('pageLoader');

      window.addEventListener('load', function() {
        setTimeout(function() {
            pageLoader.classList.add('fade-out');
            setTimeout(function() {
                pageLoader.style.display = 'none';
            }, 500);
        }, 1000);     });

    window.addEventListener('beforeunload', function() {
        pageLoader.classList.remove('fade-out');
        pageLoader.style.display = 'flex';
    });

    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            pageLoader.classList.add('fade-out');
            setTimeout(function() {
                pageLoader.style.display = 'none';
            }, 500);
        }
    });
    const form = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const successMessage = document.getElementById('successMessage');

      const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

        function validateFullName() {
        const fullName = fullNameInput.value.trim();

        if (fullName === '') {
            showError(fullNameInput, fullNameError, 'Nama lengkap harus diisi');
            return false;
        } else if (fullName.length < 3) {
            showError(fullNameInput, fullNameError, 'Nama lengkap minimal 3 karakter');
            return false;
        } else {
            clearError(fullNameInput, fullNameError);
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '') {
            showError(emailInput, emailError, 'Email harus diisi');
            return false;
        } else if (!emailPattern.test(email)) {
            showError(emailInput, emailError, 'Format email tidak valid');
            return false;
        } else {
            clearError(emailInput, emailError);
            return true;
        }
    }

    function validatePassword() {
        const password = passwordInput.value;

        if (password === '') {
            showError(passwordInput, passwordError, 'Password harus diisi');
            return false;
        } else if (password.length < 8) {
            showError(passwordInput, passwordError, 'Password minimal 8 karakter');
            return false;
        } else {
            clearError(passwordInput, passwordError);
            return true;
        }
    }

    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (confirmPassword === '') {
            showError(confirmPasswordInput, confirmPasswordError, 'Konfirmasi password harus diisi');
            return false;
        } else if (password !== confirmPassword) {
            showError(confirmPasswordInput, confirmPasswordError, 'Password tidak cocok');
            return false;
        } else {
            clearError(confirmPasswordInput, confirmPasswordError);
            return true;
        }
    }

    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }

    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
    }

    function validateForm() {
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        return isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
    }

    function showSuccessMessage() {
        successMessage.classList.add('show');
        form.reset();

          setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }

      fullNameInput.addEventListener('blur', validateFullName);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', function() {
        validatePassword();
          if (confirmPasswordInput.value !== '') {
            validateConfirmPassword();
        }
    });
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

        fullNameInput.addEventListener('input', function() {
        if (fullNameInput.value.trim() !== '') {
            validateFullName();
        }
    });

    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() !== '') {
            validateEmail();
        }
    });

    passwordInput.addEventListener('input', function() {
        if (passwordInput.value !== '') {
            validatePassword();
        }
    });

    confirmPasswordInput.addEventListener('input', function() {
        if (confirmPasswordInput.value !== '') {
            validateConfirmPassword();
        }
    });

        form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (validateForm()) {
            showSuccessMessage();
        }
    });
});