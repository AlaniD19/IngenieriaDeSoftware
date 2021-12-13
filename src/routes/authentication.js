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
    if (type == 0) { res.redirect('/dashboard'); }
    else {
        /* EXAM REGISTER */
        await pool.query("INSERT INTO user_exam VALUES ('',?,1,0,1)", [req.user.id_user]);
        await pool.query("INSERT INTO user_exam VALUES ('',?,2,0,1)", [req.user.id_user]);
        await pool.query("INSERT INTO user_exam VALUES ('',?,3,0,1)", [req.user.id_user]);
        await pool.query("INSERT INTO user_exam VALUES ('',?,4,0,1)", [req.user.id_user]);
        await pool.query("INSERT INTO user_exam VALUES ('',?,5,0,1)", [req.user.id_user]);
        await pool.query("INSERT INTO user_exam VALUES ('',?,6,0,1)", [req.user.id_user]);
        /* TOPICS */
        await pool.query("INSERT INTO user_topic VALUES ('',?,1)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,2)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,3)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,4)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,5)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,6)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,7)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,8)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,9)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,10)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,11)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,12)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,13)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,14)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,15)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,16)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,17)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,18)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic VALUES ('',?,19)", [req.user.id_user]);
        /* REDIREC */
        res.redirect('/dashboard');
    }
});
router.post('/updateUser', isLoggedIn, async (req, res) => {
    const {user_email, user_password} = req.body;
    new_password = await helpers.encryptPassword(user_password);
    await pool.query('UPDATE user set user_email = ?, user_password = ? WHERE id_user = ?', [user_email,new_password,req.user.id_user]);
    res.redirect('/profile');
});
router.post('/registerScore/:exam', isLoggedIn, async (req, res) => {
    const {exam} = req.params;
    const {score} = req.body;
    if(req.user.type_course == 0) {
        firstRegister = await pool.query('SELECT passed FROM user_exam WHERE exam = ? AND user = ?', [exam, req.user.id_user]);
        if (firstRegister.length > 0) {
            if(firstRegister[0].passed == 1){
                await pool.query('UPDATE user_exam set score = ? WHERE user = ? AND exam = ?', [score,req.user.id_user,exam]);
                res.redirect('/course');
            } else {
                if (score >= 8) {
                    await pool.query('UPDATE user_exam set score = ?, passed = 1 WHERE user = ? AND exam = ?', [score,req.user.id_user,exam]);
                    req.flash('message', '¡Felicidades! Has aprobado la unidad, se desbloqueo la siguiente unidad, ¡A estudiar!');
                    res.redirect('/course');
                } else {
                    await pool.query('UPDATE user_exam set score = ? WHERE user = ? AND exam = ?', [score,req.user.id_user,exam]);
                    req.flash('message', 'La calificación no es la esperada :c, ¿por qué no repasamos de nuevo las lecciones?');
                    res.redirect('/course');
                }
            }
        } else {
            if (score >= 8) {
                await pool.query("INSERT INTO user_exam VALUES ('',?,?,?,1)", [req.user.id_user,exam,score]);
                req.flash('message', '¡Felicidades! Has aprobado la unidad, se desbloqueo la siguiente unidad, ¡A estudiar!');
                res.redirect('/course');
            } else {
                await pool.query("INSERT INTO user_exam VALUES ('',?,?,?,0)", [req.user.id_user,exam,score]);
                req.flash('message', 'La calificación no es la esperada :c, ¿por qué no repasamos de nuevo las lecciones?');
                res.redirect('/course');
            }
        }
    } else {
        await pool.query('UPDATE user_exam set score = ? WHERE user = ? AND exam = ?', [score,req.user.id_user,exam]);
        res.redirect('/course');
    }
});


/* ROUTE FOR HTML PAGES */
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.html');
});
router.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('home.html');
});
router.get('/course', isLoggedIn, async (req, res) => {
    examPassed = await pool.query('SELECT * FROM user_exam WHERE user = ?', [req.user.id_user]);
    var unit = 1; 
    for (var i=0 ; i<examPassed.length ; i++) {
        if ( examPassed[i].passed == 1 ) {
            unit += 1;
        }
    }
    console.log(unit);
    res.render('course.html', {unit: unit})
    /*
    if (examPassed.length > 0) {
        if (examPassed[0].passed == 1) {
            if(examPassed[1].passed == 1 && examPassed.length > 1) {
                if(examPassed[2].passed == 1) {
                    if(examPassed[3].passed == 1) {
                        if(examPassed[4].passed == 1) {
                            if(examPassed[5].passed == 1) { res.render('course.html', {unit:6});
                            } else { res.render('course.html', {unit:5}); }
                        } else { res.render('course.html', {unit:4}); }
                    } else { res.render('course.html', {unit:3}); }
                } else { res.render('course.html', {unit:2}); }
            } else { res.render('course.html', {unit:1}); }
        } else { res.render('course.html', {unit:0}); }
    } else { res.render('course.html', {unit:0}); } */
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
            if (topic_query.length > 0) { res.redirect('/topic1'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,1]);
                res.redirect('/topic1');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 2 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic2'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,2]);
                res.redirect('/topic2');
            }
        }
        else if (topic == 3){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 3 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic3'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,3]);
                res.redirect('/topic3');
            }
        }
    }
    else if (unit == 2) {
        if (topic == 1){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 4 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic4'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,4]);
                res.redirect('topic4');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 5 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic5'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,5]);
                res.redirect('/topic5');
            }
        }
        else if (topic == 3){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 6 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic6'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,6]);
                res.redirect('/topic6');
            }
        }
    }
    else if (unit == 3){}
    else if (unit == 4){}
    else if (unit == 5){
        if (topic == 1){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 14 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic14'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,14]);
                res.redirect('/topic14');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 15 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic15'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,15]);
                res.redirect('/topic15');
            }
        }
    }
    else if (unit == 6){
        if (topic == 1){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 16 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic16'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,16]);
                res.redirect('/topic16');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 17 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic17'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,17]);
                res.redirect('/topic17');
            }
        }
        else if (topic == 3){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 18 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic18'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,18]);
                res.redirect('/topic18');
            }
        }
        else if (topic == 4){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 19 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic19'); }
            else {            
                await pool.query('INSERT INTO user_topic VALUES (?,?,?)', ['',req.user.id_user,19]);
                res.redirect('/topic19');
            }
        }
    }
    else { res.redirect('/course'); }
});
router.get('/topic1', isLoggedIn, (req, res) => {
    res.render('topic_1_Algebraicos.html');
});
router.get('/topic2', isLoggedIn, (req, res) => {
    res.render('topic_1_Irracionales.html');
});
router.get('/topic3', isLoggedIn, (req, res) => {
    res.render('topic_1_Trascendentes.html');
});
router.get('/topic4', isLoggedIn, (req, res) => {
    res.render('topic_2_QueEs.html');
});
router.get('/topic5', isLoggedIn, (req, res) => {
    res.render('topic_2_Ejemplos.html');
});
router.get('/topic6', isLoggedIn, (req, res) => {
    res.render('topic_2_Ecuaciones2x2.html');
});
router.get('/topic7', isLoggedIn, (req, res) => {
    
});
router.get('/topic8', isLoggedIn, (req, res) => {
    
});
router.get('/topic9', isLoggedIn, (req, res) => {
    
});
router.get('/topic10', isLoggedIn, (req, res) => {
    
});
router.get('/topic11', isLoggedIn, (req, res) => {
    
});
router.get('/topic12', isLoggedIn, (req, res) => {
    
});
router.get('/topic13', isLoggedIn, (req, res) => {
    
});
router.get('/topic14', isLoggedIn, (req, res) => {
    res.render('topic_5_Teorema.html');
});
router.get('/topic15', isLoggedIn, (req, res) => {
    res.render('topic_5_Distancia.html');
});
router.get('/topic16', isLoggedIn, (req, res) => {
    res.render('topic_6_Razones.html');
});
router.get('/topic17', isLoggedIn, (req, res) => {
    res.render('topic_6_Area.html');
});
router.get('/topic18', isLoggedIn, (req, res) => {
    res.render('topic_6_Volumen.html');
});
router.get('/topic19', isLoggedIn, (req, res) => {
    res.render('topic_6_Transformaciones.html');
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
        if (validatedTopics.length >= 6) {res.redirect('/exam2');}
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas de la unidad 2 antes de aplicar el examen campeón');
            res.redirect('/course');
        }
    }
    else if (unit == 3) {
        if (validatedTopics.length >= 11) {res.redirect('/exam3');}
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas de la unidad 3 antes de aplicar el examen campeón');
            res.redirect('/course');
        }
    }
    else if (unit == 4) {
        if (validatedTopics.length >= 13) {res.redirect('/exam4');}
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas de la unidad 4 antes de aplicar el examen campeón');
            res.redirect('/course');
        }
    }
    else if (unit == 5) {
        if (validatedTopics.length >= 15) res.redirect('/exam5');
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas de la unidad 5 antes de aplicar el examen campeón');
            res.redirect('/course');
        }
    }
    else if (unit == 6) {
        if (validatedTopics.length >= 19) res.redirect('/exam6');
        else {
            req.flash('message', 'Debes terminar de estudiar todos los temas de la unidad 6 antes de aplicar el examen campeón');
            res.redirect('/course');
        }
    }
    else { res.redirect('/course'); }
});
router.get('/exam1', isLoggedIn, (req, res) => {
    res.render('quiz1.html');
});
router.get('/exam2', isLoggedIn, (req, res) => {
    res.render('quiz2.html');
});
router.get('/exam3', isLoggedIn, (req, res) => {
    res.render('quiz3.html');
});
router.get('/exam4', isLoggedIn, (req, res) => {
    res.render('quiz4.html');
});
router.get('/exam5', isLoggedIn, (req, res) => {
    res.render('quiz5.html');
});
router.get('/exam5', isLoggedIn, (req, res) => {
    res.render('quiz6.html');
});

module.exports = router;  