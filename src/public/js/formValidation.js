// Validation for registration form
function validateRegistrationForm() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const repeatPassword = document.getElementById('repeat-password').value;

  let hasError = false;

  // Reset error messages
  document.getElementById('email-error').classList.add('hidden');
  document.getElementById('password-error').classList.add('hidden');
  document.getElementById('repeat-password-error').classList.add('hidden');

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById('email-error').classList.remove('hidden');
    hasError = true;
  }

  // Password validation
  if (password.length < 6) {
    document.getElementById('password-error').classList.remove('hidden');
    hasError = true;
  }

  // Password match validation
  if (password !== repeatPassword) {
    document.getElementById('repeat-password-error').classList.remove('hidden');
    hasError = true;
  }

  // If validation fails, return false to prevent form submission
  return !hasError;
}

// Attach registration form validation
function attachFormValidation(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener('submit', function (e) {
      if (!validateRegistrationForm()) {
        e.preventDefault(); // Prevent form submission if validation fails
      }
    });
  }
}

// Validation for login form
function validateLoginForm() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  let hasError = false;

  // Reset error messages
  document.getElementById('email-error').classList.add('hidden');
  document.getElementById('password-error').classList.add('hidden');

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById('email-error').classList.remove('hidden');
    hasError = true;
  }

  // Password validation
  if (password.length === 0) {
    document.getElementById('password-error').classList.remove('hidden');
    hasError = true;
  }

  // If validation fails, return false to prevent form submission
  return !hasError;
}

// Attach login form validation
function attachLoginFormValidation(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener('submit', function (e) {
      if (!validateLoginForm()) {
        e.preventDefault(); // Prevent form submission if validation fails
      }
    });
  }
}
