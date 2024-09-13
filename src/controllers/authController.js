const router = require('express').Router();

const User = require('../models/User');
const authService = require('../services/authService');
const { getErrorMessage, validate } = require('../utils/errorUtils');

router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', validate(User), async (req, res) => {
  const userData = req.body;

  try {
    await authService.register(userData);

    // Redirect to login with a success message
    res.render('auth/login', { success: 'Registration successful! Please log in.' });
  } catch (err) {
    console.error('Registration error:', err);

    const message = getErrorMessage(err);
    res.render('auth/register', { ...userData, error: message });
  }
});


router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);

    // Set the token in the cookie and redirect to the home page with a success message
    res.cookie('auth', token);

    // Store success message in session or send it directly
    res.render('home', { success: 'Successfully logged in!' });
  } catch (err) {
    const message = getErrorMessage(err);
    res.status(400).render('auth/login', { email, error: message });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('auth');

  res.redirect('/');
});

module.exports = router;
