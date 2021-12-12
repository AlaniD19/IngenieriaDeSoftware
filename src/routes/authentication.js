const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn} = require('../lib/auth');
const pool = require('../database');
const helpers = require('../lib/helpers');

/* LOGIN AND SIGNUP */
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
/* LOGOUT */
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

/* ROUTE FOR CRUD IN DATABASE */
router.post('/registerTypeCourse', isLoggedIn, async (req, res) => {
    const {type} = req.body;
    await pool.query('UPDATE user set type_course = ? WHERE id_user = ?', [type, req.user.id_user]);
    res.redirect('/dashboard');
});
router.post('/updateUser', isLoggedIn, async (req, res) => {
    const {user_email, user_password} = req.body;
    new_password = await helpers.encryptPassword(user_password);
    await pool.query('UPDATE user set user_email = ?, user_password = ? WHERE id_user = ?', [user_email,new_password,req.user.id_user]);
    res.redirect('/profile');
});

/* ROUTE FOR HTML PAGES */
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.html');
});
router.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('home.html');
});
router.get('/course', isLoggedIn, (req, res) => {
    res.render('course.html');
});
router.get('/progress', isLoggedIn, (req, res) => {
    res.render('progress.html');
});

/* ROUTES FOR TOPIC UNIT */
router.get('/3/:unit/:topic', isLoggedIn, async (req, res) => {
    const {unit, topic} = req.params;
    var viewTopic = {
        user: req.user.id_user,
        topic: null
    }
    if (unit == 1){
        if (topic == 1){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 1 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_1_Algebraicos.html'); }
            else {            
            viewTopic.topic = 1;
            await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,1]);
            res.render('topics/topic_1_Algebraicos.html');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 2 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_1_Irracionales.html'); }
            else {            
            viewTopic.topic = 2;
            await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,2]);
            res.render('topics/topic_1_Irracionales.html');
            }
        }
        else if (topic == 3){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 3 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_1_Trascendentes.html');}
            else {            
            viewTopic.topic = 2;
            await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,3]);
            res.render('topics/topic_1_Trascendentes.html');
            }
        }
    }
    else if (unit == 2) {
        if (topic == 1){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 4 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_1_Algebraicos.html'); }
            else {            
            viewTopic.topic = 1;
            await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,1]);
            res.render('topics/topic_1_Algebraicos.html');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 5 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_1_Irracionales.html'); }
            else {            
            viewTopic.topic = 2;
            await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,2]);
            res.render('topics/topic_1_Irracionales.html');
            }
        }
        else if (topic == 3){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 6 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_1_Trascendentes.html');}
            else {            
            viewTopic.topic = 2;
            await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,3]);
            res.render('topics/topic_1_Trascendentes.html');
            }
        }
    }
    else if (unit == 3){}
    else if (unit == 4){}
    else if (unit == 5){}
    else if (unit == 6){}
    else { res.redirect('/course');}

});

/* ROUTES FOR EXAM UNIT */
router.get('/exam/:unit', isLoggedIn, async (req, res) => {
    const unit = req.params;
    var validatedTopics = await pool.query('SELECT count(id_user_topic) FROM user_topic WHERE user = ?', [req.user.id_user]);
    if (unit == 1) {
        if (validatedTopics == 3) res.render('exam/quiz1.html');
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas del la unidad 1 antes de aplicar el examen campeón');
            res.render('/course');
        }
    }
    else if (unit == 2) {
        if (validatedTopics == 6) res.render('exam/quiz2.html');
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas del la unidad 2 antes de aplicar el examen campeón');
            res.render('/course');
        }
    }
    else if (unit == 3) {
        if (validatedTopics == 11) res.render('exam/quiz3.html');
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas del la unidad 3 antes de aplicar el examen campeón');
            res.render('/course');
        }
    }
    else if (unit == 4) {
        if (validatedTopics == 13) res.render('exam/quiz4.html');
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas del la unidad 4 antes de aplicar el examen campeón');
            res.render('/course');
        }
    }
    else if (unit == 5) {
        if (validatedTopics == 15) res.render('exam/quiz5.html');
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas del la unidad 5 antes de aplicar el examen campeón');
            res.render('/course');
        }
    }
    else if (unit == 6) {
        if (validatedTopics == 19) res.render('exam/quiz6.html');
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas del la unidad 6 antes de aplicar el examen campeón');
            res.render('/course');
        }
    }
});

module.exports = router;  