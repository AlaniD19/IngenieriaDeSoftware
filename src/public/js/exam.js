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
        question: "Pregunta 1",
        choice1: "22",
        choice2: "19",
        choice3: "qwery",
        choice4: "123456",
        answer: 1,
    },
    {
        question: "Pregunta 1",
        choice1: "22",
        choice2: "19",
        choice3: "qwery",
        choice4: "123456",
        answer: 1,
    },
    {
        question: "Pregunta 1",
        choice1: "22",
        choice2: "19",
        choice3: "qwery",
        choice4: "123456",
        answer: 1,
    },
    {
        question: "Pregunta 1",
        choice1: "22",
        choice2: "19",
        choice3: "qwery",
        choice4: "123456",
        answer: 1,
    },
    {
        question: "Pregunta 1",
        choice1: "22",
        choice2: "19",
        choice3: "qwery",
        choice4: "123456",
        answer: 1,
    },
    {
        question: "Pregunta 1",
        choice1: "22",
        choice2: "19",
        choice3: "qwery",
        choice4: "123456",
        answer: 1,
    },
    {
        question: "Pregunta 1",
        choice1: "22",
        choice2: "19",
        choice3: "qwery",
        choice4: "123456",
        answer: 1,
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

startGame();