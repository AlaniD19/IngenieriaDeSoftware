const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const finalPage = document.querySelector("#finalPage");
const finalScore = document.querySelector("#finalScore");
const reset = document.querySelector("#reset");
const register = document.querySelector("#register");
const imagen = document.querySelector("#imagen");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

/* PREGUNTAS */
let questions = [
    {
        question: "Pregunta : Calcular 'x' si el triangulo ABC es equilatero (imagen) ",
        choice1: "x = 120°",
        choice2: "x = 15°",
        choice3: "x = 16°",
        choice4: "x = 40°",
        answer: 2,
        image: {
            fuente: "img/img_Ex4/ex_1.jpg",
            width: "300px",
            height: "300px",
        },
    },
    {
        question: "Pregunta : Calcular 'x' de la figura BQ = AC y AQ = QC",
        choice1: "x = 20°",
        choice2: "x = 36°",
        choice3: "x = 25°",
        choice4: "x = 30°",
        answer: 4,
        image: {
            fuente: "img/img_Ex4/ex_2.jpg",
            width: "300px",
            height: "300px",
        },
    },
    {
        question: "Pregunta : Hallar el valor de 'x' ",
        choice1: "x = 120°",
        choice2: "x = 15°",
        choice3: "x = 30°",
        choice4: "x = 16°",
        answer: 1,
        image: {
            fuente: "img/img_Ex4/ex_3.jpg",
            width: "300px",
            height: "300px",
        },
    },
    {
        question: "Pregunta : Hallar el valor de 'x' ",
        choice1: "x = 5°",
        choice2: "x = 10°",
        choice3: "x = 36°",
        choice4: "x = 15°",
        answer: 2,
        image: {
            fuente: "img/img_Ex4/ex_4.jpg",
            width: "300px",
            height: "300px",
        },
    },
    {
        question: "Pregunta : En la figura AB = CD y AD = EC. Halle x",
        choice1: "x = 24°",
        choice2: "x = 22°",
        choice3: "x = 28°",
        choice4: "x = 32°",
        answer: 3,
        image: {
            fuente: "img/img_Ex4/ex_5.jpg",
            width: "300px",
            height: "300px",
        },
    },
    {
        question: "Pregunta : Calcular x",
        choice1: "x = 3",
        choice2: "x = 6",
        choice3: "x = 5",
        choice4: "x = 4",
        answer: 2,
        image: {
            fuente: "img/img_Ex4/ex_6.jpg",
            width: "300px",
            height: "300px",
        },
    },
    {
        question: "Pregunta : En la figura, si AP = 4 y PC = 4, calcular BC",
        choice1: "x = 3",
        choice2: "x = 5",
        choice3: "x = 6",
        choice4: "x = 4",
        answer: 3,
        image: {
            fuente: "img/img_Ex4/ex_7.jpg",
            width: "300px",
            height: "300px",
        },
    },
    {
        question: "Pregunta : Calcule x ",
        choice1: "x = 5",
        choice2: "x = 9",
        choice3: "x = 12",
        choice4: "x = 6",
        answer: 4,
        image: {
            fuente: "img/img_Ex4/ex_8.jpg",
            width: "300px",
            height: "300px",
        },
    },
    {
        question: "Pregunta : Hallar PQ, si ¬PQ // ¬AC",
        choice1: "3",
        choice2: "6",
        choice3: "5",
        choice4: "4",
        answer: 1,
        image: {
            fuente: "img/img_Ex4/ex_9.jpg",
            width: "300px",
            height: "300px",
        },
    },
    {
        question: "Pregunta : Hallar la altura del trapecio ",
        choice1: "13",
        choice2: "16",
        choice3: "15",
        choice4: "14",
        answer: 3,
        image: {
            fuente: "img/img_Ex4/ex_10.jpg",
            width: "300px",
            height: "300px",
        },
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
        imagen.innerHTML = "";
        return finalPage.classList.add("active");
    }

    questionCounter++;
    progressText.innerText = 'Pregunta '+ questionCounter + ' de '+ MAX_QUESTIONS;
    progressBarFull.style.width = (questionCounter*10)+'%';

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    if(currentQuestion.image.fuente != ""){
        imagen.innerHTML = "<img id = \"img\" src=\""+currentQuestion.image.fuente+"\" width=\""+currentQuestion.image.width+"\" height=\""+currentQuestion.image.height+"\"/>"
    }else{
        imagen.innerHTML = ""
    }
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