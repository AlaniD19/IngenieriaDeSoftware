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
        question: "Encuentra el seno del ángulo que se muestra en el siguiente triángulo.",
        choice1: "0.555",
        choice2: "0.678",
        choice3: "0.896",
        choice4: "0.444",
        answer: 1,
        image: {
            fuente: "img/img_Ex5/e6_f1.png",
            width: "500px",
            height: "350px",
        },
    },
    {
        question: "Encuentra el coseno del ángulo que se muestra en el siguiente triángulo.",
        choice1: "0.896",
        choice2: "0.654",
        choice3: "0.768",
        choice4: "0.999",
        answer: 3,
        image: {
            fuente: "img/img_Ex5/e6_f2.png",
            width: "340px",
            height: "420px",
        },
    },
    {
        question: "Encuentra la tangente del ángulo que se muestra en el siguiente triángulo.",
        choice1: "1.44",
        choice2: "1.66",
        choice3: "1.876",
        choice4: "1.141",
        answer: 2,
        image: {
            fuente: "img/img_Ex5/e6_f3.png",
            width: "450px",
            height: "300px",
        },
    },
    {
        question: "Encuentra el valor de la hipotenusa del siguiente triángulo.",
        choice1: "5.22",
        choice2: "9.63",
        choice3: "7.77",
        choice4: "6.92",
        answer: 4,
        image: {
            fuente: "img/img_Ex5/e6_f4.png",
            width: "250px",
            height: "390px",
        },
    },
    {
        question: "Encuentra el área del siguiente triángulo.",
        choice1: "11.25",
        choice2: "9.85",
        choice3: "8.99",
        choice4: "10.5",
        answer: 4,
        image: {
            fuente: "img/img_Ex5/e6_f5.png",
            width: "270px",
            height: "400px",
        },
    },
    {
        question: "Encuentra el área del siguiente paralelogramo",
        choice1: "12",
        choice2: "19",
        choice3: "11",
        choice4: "10",
        answer: 4,
        image: {
            fuente: "img/img_Ex5/e6_f6.png",
            width: "450px",
            height: "230px",
        },
    },
    {
        question: "Encuentra el volumen del siguiente cilindro si su altura es de 13cm y el radio de la base es de 3.5 cm",
        choice1: "500.29cm3",
        choice2: "682.89cm3",
        choice3: "762.9cm3",
        choice4: "434.89cm3",
        answer: 1,
        image: {
            fuente: "img/img_Ex5/e6_f7.png",
            width: "240px",
            height: "280px",
        },
    },
    {
        question: "Encuentra el volumen de la siguiente esfera si su radio es de 5.5 cm.",
        choice1: "495.89cm3",
        choice2: "234.89cm3",
        choice3: "783.99cm3",
        choice4: "696.91cm3",
        answer: 4,
        image: {
            fuente: "img/img_Ex5/e6_f8.png",
            width: "200px",
            height: "200px",
        },
    },
    {
        question: "Menciona dos aspectos que no cambian en una transformación rígida",
        choice1: "Posición y ángulos",
        choice2: "lados y ángulos.",
        choice3: "posición y área.",
        choice4: "orientación y perímetro.",
        answer: 2,
        image: {
            fuente: "",
            width: "",
            height: "",
        },
    },
    {
        question: "Menciona dos  aspectos que cambian en una dilatación.",
        choice1: "Posición y ángulos",
        choice2: "lados y orientación",
        choice3: "ángulos y lados.",
        choice4: "lados y perímetro.",
        answer: 4,
        image: {
            fuente: "",
            width: "",
            height: "",
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