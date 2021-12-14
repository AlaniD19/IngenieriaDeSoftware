const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const finalPage = document.querySelector("#finalPage");
const finalScore = document.querySelector("#finalScore");
const reset = document.querySelector("#reset");
const register = document.querySelector("#register");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

/* PREGUNTAS */
let questions = [
    {
        question: "¿Cuál de los siguientes números no es algebraico?",
        choice1:"-3",
        choice2:"1",
        choice3:"3/8",
        choice4:"π",
        answer:4,
    },
    {
        question: "El conjunto de los números naturales es contable, y se pueden ordenar los números algebraicos en una correspondencia 1 a 1 con números enteros, por lo que también son contables.",
        choice1:"Verdadero",
        choice2:"Falso",
        choice3:"",
        choice4:"",
        answer:1,
    },
    {
        question: "¿Qué función de la siguiente lista no es trascendente?",
        choice1:"sin (x)",
        choice2:"log (x)",
        choice3:"a^x",
        choice4:"b",
        answer:4,
    },
    {
        question: "Todas las raices son irracionales",
        choice1:"Verdadero",
        choice2:"Falso",
        choice3:"",
        choice4:"",
        answer:2,
    },
    {
        question: "¿Qué es un número algebraico?",
        choice1: "Es cualquier número que es solución de un polinomio no nulo con coeficientes racionales.",
        choice2: "Es un número que no se puede escribir en fracción - el decimal sigue para siempre sin repetirse.",
        choice3: "Un número que no es solución de ninguna ecuación polinómica con coeficientes racionales",
        choice4: "Ninguna de las anteriores",
        answer: 1,
    },
    {
        question: "¿Qué es un número racional?",
        choice1: "Es cualquier número que es solución de un polinomio no nulo con coeficientes racionales.",
        choice2: "Es un número que no se puede escribir en fracción - el decimal sigue para siempre sin repetirse.",
        choice3: "Un número que no es solución de ninguna ecuación polinómica con coeficientes racionales",
        choice4: "Ninguna de las anteriores",
        answer: 2,
    },
    {
        question: "¿Qué es un  número trascendente?",
        choice1: "Es cualquier número que es solución de un polinomio no nulo con coeficientes racionales.",
        choice2: "Es un número que no se puede escribir en fracción - el decimal sigue para siempre sin repetirse.",
        choice3: "Un número que no es solución de ninguna ecuación polinómica con coeficientes racionales",
        choice4: "Ninguna de las anteriores",
        answer: 3,
    },
    {
        question: "¿Qué tipo de número es √4 ?",
        choice1: "Racional",
        choice2: "Irracional",
        choice3: "Algebraico",
        choice4: "Ninguno de las anteriores",
        answer: 1,
    },
    {
        question: "Los número trascendentes deben ser numerables.",
        choice1: "Verdadero",
        choice2: "Falso",
        choice3:"",
        choice4:"",
        answer: 2,
    },
    {
        question:"¿Qué tipo de número es π",
        choice1: "Racional",
        choice2: "Irracional",
        choice3: "Algebraico",
        choice4: "Ninguna de las anteriores",
        answer: 2,
    }
];


const SCORE_POINTS = 1;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        finalScore.innerText = score;
        return finalPage.classList.add("active");
    }

    questionCounter++;
    progressText.innerText = 'Pregunta '+ questionCounter + ' de '+ MAX_QUESTIONS;
    progressBarFull.style.width = (questionCounter*10)+'%';

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

reset.addEventListener('click', () => {
    window.location.reload();
});

register.addEventListener('click', () => {
    document.getElementById('input-score').value = score;
    document.getElementById('form-score').submit();
});

startGame();