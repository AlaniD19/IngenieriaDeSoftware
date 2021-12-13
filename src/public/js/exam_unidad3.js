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
        question: "Pregunta : Resuleve el siguiente binomio [2x + x + (x^2)]^2",
        choice1: "(x^2) - 6x + 9",
        choice2: "(x^2) + 2x + 1",
        choice3: "(x^4) + 2(x^3) + 5(x^2) + 4x + 4",
        choice4: "4(x^4) + 4(x^2) + 1",
        answer: 3,
    },
    {
        question: "Pregunta : Resuelve el siguiente binomio al cubo (2 + 3x)^3",
        choice1: "1 - 6x + 12(x^2) - 8(x^3)",
        choice2: "8 + 36x + 54(x^2) + 27(x^3)",
        choice3: "4(x^4) + 4(x^2) + 1",
        choice4: "(x^2) - 2x + 1",
        answer: 2,
    },
    {
        question: "Pregunta : Resuelve la desigualdad 3(x + 2) > -9",
        choice1: "x >= -2",
        choice2: "x < 5",
        choice3: "x > -3",
        choice4: "x > -5",
        answer: 4,
    },
    {
        question: "Pregunta : Resuelve la desigualdad 2(x + 5) - 10 > 4(2x + 6) - 1",
        choice1: "x <= -4",
        choice2: "x > -3",
        choice3: "x > -1",
        choice4: "x < 5",
        answer: 1,
    },
    {
        question: "Pregunta : Resuelve la siguiente ecuación 5 - 2(1 - x) = 2x - 3",
        choice1: "x = -3",
        choice2: "x = 5",
        choice3: "No existe ningun valor para x",
        choice4: "x pertenece a los reales (R)",
        answer: 3,
    },
    {
        question: "Pregunta : Resuelve la siguiente ecuación [(1/2) * ((4x/3) - 4)] - 4 = 0",
        choice1: "x = 9",
        choice2: "X = (0/2) = 0",
        choice3: "x = -(32/16)",
        choice4: "x = (1/2)",
        answer: 1,
    },
    {
        question: "Pregunta : Resuelve la siguiente ecuación (x^2) + 3x + 2 = 0",
        choice1: "x1 = 3(√2)y, x2= -3(√2)",
        choice2: "x1=0, x2=-4 ",
        choice3: "x1 = -1, x2 = -2",
        choice4: "x1 = 3 + i, x2 = 1",
        answer: 3,
    },
    {
        question: "Pregunta : Resuelve la siguiente ecuación 2(x^2) + 5x + 2 = 0",
        choice1: "x1 = -(1/2), x2 = -2",
        choice2: "x1 = i, x2 = -i",
        choice3: "x1 = [(1/2) + (i(√3)/3)], x2 = [(1/2) - (i(√3)/3)]",
        choice4: "x1 = 1 + i, x2 = 1 - i",
        answer: 1,
    },
    {
        question: "Pregunta : Encuentra el vértice de la siguiente función y= -(x^2) + 4x - 3",
        choice1: "V(2,1)",
        choice2: "V(-1,0)",
        choice3: "V[(-1/2), (3/4)]",
        choice4: "V(1,1)",
        answer: 1,
    },
    {
        question: "Pregunta : Encuentra el vértice de la siguiente función y= (x^2) + x + 1",
        choice1: "V(2,-5)",
        choice2: "V(-1,-3)",
        choice3: "V(-1,0)",
        choice4: "V(1,1)",
        answer: 3,
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