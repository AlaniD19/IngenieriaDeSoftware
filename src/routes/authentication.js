const express = require('express');
const router = express.Router();
const passport = require('passport');


router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
}));

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next)
});

router.get('/dashboard/profile', (req, res) => {
    res.render('dashboard.html');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard.html');
});

module.exports = router;  