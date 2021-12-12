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
    if (unit == 1){
        if (topic == 1){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 1 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_1_Algebraicos.html'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,1]);
                res.render('topics/topic_1_Algebraicos.html');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 2 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_1_Irracionales.html'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,2]);
                res.render('topics/topic_1_Irracionales.html');
            }
        }
        else if (topic == 3){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 3 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_1_Trascendentes.html');}
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,3]);
                res.render('topics/topic_1_Trascendentes.html');
            }
        }
    }
    else if (unit == 2) {
        if (topic == 1){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 4 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_2_QueEs.html'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,4]);
                res.render('topics/topic_2_QueEs.html');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 5 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_2_Ejemplos.html'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,5]);
                res.render('topics/topic_2_Ejemplos.html');
            }
        }
        else if (topic == 3){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 6 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_2_Ecuaciones2x2.html');}
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,6]);
                res.render('topics/topic_2_Ecuaciones2x2.html');
            }
        }
    }
    else if (unit == 3){}
    else if (unit == 4){}
    else if (unit == 5){
        if (topic == 1){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 14 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_5_Teorema.html'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,14]);
                res.render('topics/topic_5_Torema.html');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 15 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_5_Distancia.html'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,15]);
                res.render('topics/topic_5_Distancia.html');
            }
        }
    }
    else if (unit == 6){
        if (topic == 1){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 16 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_6_Razones.html'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,16]);
                res.render('topics/topic_6_Razones.html');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 17 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_6_Area.html'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,17]);
                res.render('topics/topic_6_Area.html');
            }
        }
        else if (topic == 3){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 18 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_6_Volumen.html'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,18]);
                res.render('topics/topic_6_Volumen.html');
            }
        }
        else if (topic == 4){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 19 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.render('topics/topic_6_Transformaciones.html'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,19]);
                res.render('topics/topic_6_Transformaciones.html');
            }
        }
    }
    else { res.redirect('/course');}
});

/* ROUTES FOR EXAM UNIT */
router.get('/exam/:unit', isLoggedIn, async (req, res) => {
    const {unit} = req.params;
    console.log(unit);
    var validatedTopics = await pool.query('SELECT id_user_topic FROM user_topic WHERE user = ?', [req.user.id_user]);
    if (unit == 1) {
        if (validatedTopics.length >= 3) {res.redirect('/exam1');}
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas de la unidad 1 antes de aplicar el examen campeón');
            res.redirect('/course');
        }
    }
    else if (unit == 2) {
        if (validatedTopics.length >= 6) {res.render('exam/quiz2.html');}
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas de la unidad 2 antes de aplicar el examen campeón');
            res.redirect('/course');
        }
    }
    else if (unit == 3) {
        if (validatedTopics.length >= 11) {res.render('exam/quiz3.html');}
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas de la unidad 3 antes de aplicar el examen campeón');
            res.redirect('/course');
        }
    }
    else if (unit == 4) {
        if (validatedTopics.length >= 13) {res.render('exam/quiz4.html');}
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas de la unidad 4 antes de aplicar el examen campeón');
            res.redirect('/course');
        }
    }
    else if (unit == 5) {
        if (validatedTopics.length >= 15) res.render('exam/quiz5.html');
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas de la unidad 5 antes de aplicar el examen campeón');
            res.redirect('/course');
        }
    }
    else if (unit == 6) {
        if (validatedTopics.length >= 19) res.render('exam/quiz6.html');
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas de la unidad 6 antes de aplicar el examen campeón');
            res.redirect('/course');
        }
    }
    else { res.redirect('/course'); }
});

router.get('/exam1', isLoggedIn, (req, res) => {
    res.render('exam/quiz1.html');
});

module.exports = router;  