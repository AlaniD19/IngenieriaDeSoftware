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
        question: "¿De qué tipo son las ecuaciones lineales?",
        choice1: "a+b=0",
        choice2: "ax+b=0",
        choice3: "a=0",
        choice4: "a+c+b=1",
        answer: 2,
    },
    {
        question: "¿Cuál es el valor de θ  en la siguiente ecuación?   3θ+ 1 = θ - 2",
        choice1: "θ=3/2",
        choice2: "θ=2/3",
        choice3: "θ=-3/2",
        choice4: "θ=3",
        answer: 3,
    },
    {
        question: "Resolver el siguiente sistema por el método de igualación: x= (3y-5) /2 ;  2y+x=15 ",
        choice1: "x=-5 ; y=-5",
        choice2: "x=-5 ; y=5",
        choice3: "x=5 ; y=-5",
        choice4: "x=5 ; y=5",
        answer: 4,
    },
    {
        question: "Resolver el siguiente sistema por el método de reducción: 2x=y-2  ;  3x=5y+4 ",
        choice1: "x=-2; y=-2",
        choice2: "x=2; y=-2",
        choice3: "x=-2; y=2",
        choice4: "x=2; y=2",
        answer: 1,
    },
    {
        question: "Resolver el siguiente sistema por el método de sustitución: 2x=12+2y  ;  3y-2x=5y ",
        choice1: "x=-3; y=-3",
        choice2: "x=-3; y=3",
        choice3: "x=3; y=-3",
        choice4: "x=3; y=3",
        answer: 3,
    },
    {
        question: "¿Cuáles son los valores de x y de y?  2x+3y=20   ;  x-2y=3",
        choice1: "x=7 y=2",
        choice2: "x=-7 y=2",
        choice3: "x=2 y=7",
        choice4: "x=2 y=-7",
        answer: 1,
    },
    {
        question: "¿Cuáles son los valores de a y b?  a+3b=1  ;  2a-3b=11 ",
        choice1: "a=-1 b=4",
        choice2: "a=4 b=4",
        choice3: "a=1 b=4",
        choice4: "a=1 b=1",
        answer: 3,
    },
    {
        question: "¿Cuáles son los valores de x y de y?  5x+2y=20  ; 2x–4y=-16 ",
        choice1: "x=3 y=2",
        choice2: "x=3 y=-2",
        choice3: "x=-3 y=2",
        choice4: "x=-3 y=-2",
        answer: 3,
    },
    {
        question: "¿Cómo se representan las ecuaciones lineales sin solución?",
        choice1: "Geométricamente existen dos rectas con diferente pendiente y tenemos un punto de intersección",
        choice2: "Geométricamente son dos rectas paralelas que nunca se intersecan.",
        choice3: "Geométricamente es una recta.",
        choice4: "Ninguna de las anteriores",
        answer: 2,
    },
    {
        question: "¿Cuáles son las palabras que faltan en el siguiente enunciado?  ;  Una _________ algebraica es un enunciado matemático que relaciona dos expresiones ______ que involucran al menos _________.",
        choice1: "ecuación, logarítmicas, un número",
        choice2: "función, algebraicas,  una variable",
        choice3: "recta, algebraicas, un número",
        choice4: "ecuación, algebraicas, una variable",
        answer: 4,
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
})

register.addEventListener('click', () => {
    document.getElementById('input-score').value = score;
    document.getElementById('form-score').submit();
});

startGame();