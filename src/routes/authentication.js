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
        await pool.query("INSERT INTO user_exam (user,exam,score,passed) VALUES (?,1,0,1)", [req.user.id_user]);
        await pool.query("INSERT INTO user_exam (user,exam,score,passed) VALUES (?,2,0,1)", [req.user.id_user]);
        await pool.query("INSERT INTO user_exam (user,exam,score,passed) VALUES (?,3,0,1)", [req.user.id_user]);
        await pool.query("INSERT INTO user_exam (user,exam,score,passed) VALUES (?,4,0,1)", [req.user.id_user]);
        await pool.query("INSERT INTO user_exam (user,exam,score,passed) VALUES (?,5,0,1)", [req.user.id_user]);
        await pool.query("INSERT INTO user_exam (user,exam,score,passed) VALUES (?,6,0,1)", [req.user.id_user]);
        /* TOPICS */
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,1)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,2)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,3)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,4)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,5)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,6)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,7)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,8)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,9)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,10)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,11)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,12)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,13)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,14)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,15)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,16)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,17)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,18)", [req.user.id_user]);
        await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,19)", [req.user.id_user]);
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
                await pool.query("INSERT INTO user_exam (user,exam,score,passed) VALUES (?,?,?,1)", [req.user.id_user,exam,score]);
                req.flash('message', '¡Felicidades! Has aprobado la unidad, se desbloqueo la siguiente unidad, ¡A estudiar!');
                res.redirect('/course');
            } else {
                await pool.query("INSERT INTO user_exam (user,exam,score,passed) VALUES (?,?,?,0)", [req.user.id_user,exam,score]);
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
    res.render('course.html', {unit: unit})
});
router.get('/progress', isLoggedIn, async (req, res) => {
    examPassed = await pool.query('SELECT * FROM user_exam WHERE user = ?', [req.user.id_user]);
    var progress1 = {
        unit1Score:     '-',
        unit1Passed:    '-'
    };
    var progress2 = {
        unit2Score:     '-',
        unit2Unlock:    '-',
        unit2Passed:    '-'
    };
    var progress3 = {
        unit3Score:     '-',
        unit3Unlock:    '-',
        unit3Passed:    '-'
    };
    var progress4 = {
        unit4Score:     '-',
        unit4Unlock:    '-',
        unit4Passed:    '-'
    };
    var progress5 = {
        unit5Score:     '-',
        unit5Unlock:    '-',
        unit5Passed:    '-'
    };
    var progress6 = {
        unit6Score:     '-',
        unit6Unlock:    '-',
        unit6Passed:    '-'
    };

    if (examPassed.length == 0) {
        res.render('progress.html', {progress1,progress2,progress3,progress4,progress5,progress6});
    }
    else {
        var unit = 0; 
        var tries = 0;
        for (var i=0 ; i<examPassed.length ; i++) {
            if ( examPassed[i].passed == 1 || examPassed[i].passed == 0) {
                unit += 1;
            }
        }

        if (unit >= 1) {
            progress1.unit1Score = examPassed[0].score;
            progress1.unit1Passed = examPassed[0].passed;
            if (progress1.unit1Passed == 1) { progress2.unit2Unlock = 1 }
        }
        if (unit >= 2) {
            progress2.unit2Score    = examPassed[1].score;
            progress2.unit2Passed   = examPassed[1].passed;
            if (progress2.unit2Passed == 1) { progress3.unit3Unlock = 1 }
        }
        if (unit >= 3) {
            progress3.unit3Score    = examPassed[2].score;
            progress3.unit3Passed   = examPassed[2].passed;
            if (progress3.unit3Passed == 1) { progress4.unit4Unlock = 1 }
        }
        if (unit >= 4) {
            progress4.unit4Score    = examPassed[3].score;
            progress4.unit4Passed   = examPassed[3].passed;
            if (progress4.unit4Passed == 1) { progress5.unit5Unlock = 1 }
        }
        if (unit >= 5) {
            progress5.unit5Score    = examPassed[4].score;
            progress5.unit5Passed   = examPassed[4].passed;
            if (progress5.unit5Passed == 1) { progress6.unit6Unlock = 1 }
        }
        if (unit >= 6) {
            progress6.unit6Score    = examPassed[5].score;
            progress6.unit6Passed   = examPassed[5].passed;
        }
        res.render('progress.html', {progress1,progress2,progress3,progress4,progress5,progress6});
    }
});

/* ROUTES FOR TOPIC UNIT */
router.get('/3/:unit/:topic', isLoggedIn, async (req, res) => {
    const {unit, topic} = req.params;
    if (unit == 1){
        if (topic == 1){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 1 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic1'); }
            else {            
                await pool.query("INSERT INTO user_topic (user,topic) VALUES (?,?)", [req.user.id_user,1]);
                res.redirect('/topic1');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 2 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic2'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,2]);
                res.redirect('/topic2');
            }
        }
        else if (topic == 3){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 3 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic3'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,3]);
                res.redirect('/topic3');
            }
        }
    }
    else if (unit == 2) {
        if (topic == 1){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 4 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic4'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,4]);
                res.redirect('topic4');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 5 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic5'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,5]);
                res.redirect('/topic5');
            }
        }
        else if (topic == 3){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 6 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic6'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,6]);
                res.redirect('/topic6');
            }
        }
    }
    else if (unit == 3){
        if (topic == 1){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 7 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic7'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,7]);
                res.redirect('topic7');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 8 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic8'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,8]);
                res.redirect('topic8');
            }
        }
        else if (topic == 3){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 9 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic9'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,9]);
                res.redirect('topic9');
            }
        }
        else if (topic == 4){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 10 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic10'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,10]);
                res.redirect('topic10');
            }
        }
        else if (topic == 5){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 11 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic11'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,11]);
                res.redirect('topic11');
            }
        }
    }
    else if (unit == 4){
        if (topic == 1){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 12 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic12'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,12]);
                res.redirect('topic12');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 13 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic13'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,13]);
                res.redirect('topic13');
            }
        }
    }
    else if (unit == 5){
        if (topic == 1){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 14 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic14'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,14]);
                res.redirect('/topic14');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 15 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic15'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,15]);
                res.redirect('/topic15');
            }
        }
    }
    else if (unit == 6){
        if (topic == 1){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 16 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic16'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,16]);
                res.redirect('/topic16');
            }
        }
        else if (topic == 2){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 17 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic17'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,17]);
                res.redirect('/topic17');
            }
        }
        else if (topic == 3){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 18 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic18'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,18]);
                res.redirect('/topic18');
            }
        }
        else if (topic == 4){
            topic_query = await pool.query('SELECT id_user_topic FROM user_topic WHERE topic = 19 AND user = ?', [req.user.id_user]);
            if (topic_query.length > 0) { res.redirect('/topic19'); }
            else {            
                await pool.query('INSERT INTO user_topic (user,topic) VALUES (?,?)', [req.user.id_user,19]);
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
    res.render('topic_1_Trascendentes.html');
});
router.get('/topic3', isLoggedIn, (req, res) => {
    res.render('topic_1_Irracionales.html');
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
    res.render('topic_3_Binomio.html');
});
router.get('/topic8', isLoggedIn, (req, res) => {
    res.render('topic_3_BinomioNewton.html');
});
router.get('/topic9', isLoggedIn, (req, res) => {
    res.render('topic_3_Desigualdad.html');
});
router.get('/topic10', isLoggedIn, (req, res) => {
    res.render('topic_3_Ecuaciones.html');
});
router.get('/topic11', isLoggedIn, (req, res) => {
    res.render('topic_3_FuncionCuadratica.html');
});
router.get('/topic12', isLoggedIn, (req, res) => {
    res.render('topic_4_Congruencia.html');
});
router.get('/topic13', isLoggedIn, (req, res) => {
    res.render('topic_4_Semejanza.html');
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
router.get('/exam6', isLoggedIn, (req, res) => {
    res.render('quiz6.html');
});

module.exports = router;  