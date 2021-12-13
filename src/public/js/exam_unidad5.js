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
        question: "Calcula el cuadrado de los tres lados de estos triángulos y selecciona cuál de ellos cumple con el teorema de Pitágoras.",
        choice1: "T1",
        choice2: "T2",
        choice3: "T3",
        choice4: "T4",
        answer: 2,
        image: {
            fuente: "img/img_Ex5/Examen5_fig1.png",
            width: "800px",
            height: "200px",
        },
    },
    {
        question: "Halla la medida, en centímetros, del cateto desconocido de un triángulo rectángulo, cuya hipotenusa mide 10 cm y el cateto conocido mide 8 cm.",
        choice1: "10 cm",
        choice2: "8 cm",
        choice3: "5cm",
        choice4: "6cm",
        answer: 4,
        image: {
            fuente: "img/img_Ex5/e5_f2.png",
            width: "300px",
            height: "200px",
        },
    },
    {
        question: "Se quiere colocar un cable desde la cima de una torre de 25 metros de altura hasta un punto situado a 50 metros de la base de la torre. ¿Cuánto debe medir el cable?",
        choice1: "25m",
        choice2: "50.78m",
        choice3: "55.9m",
        choice4: "28.9",
        answer: 3,
        image: {
            fuente: "",
            width: "",
            height: "",
        },
    },
    {
        question: "Una parcela de terreno cuadrado dispone de un camino de longitud 2√2 kilómetros (segmento discontinuo) que la atraviesa según se muestra en la siguiente imagen:Calcular el área total de la parcela.",
        choice1: "2 km2",
        choice2: "4 km2",
        choice3: "8 km2",
        choice4: "5 km2",
        answer: 2,
        image: {
            fuente: "img/img_Ex5/e5_f3.png",
            width: "250px",
            height: "250px",
        },
    },
    {
        question: "Se desea pintar una cuadrado inscrito en una circunferencia de radio R = 3 cm como se muestra en la figura: Calcule el área del cuadrado.",
        choice1: "13 cm2",
        choice2: "16 cm2",
        choice3: "18 cm2",
        choice4: "20 cm2",
        answer: 3,
        image: {
            fuente: "img/img_Ex5/e5_f4.png",
            width: "250px",
            height: "250px",
        },
    },
    {
        question: "Calcular la distancia entre los puntos A(-3, 10) y B(8, 10)",
        choice1: "11",
        choice2: "10",
        choice3: "13",
        choice4: "8",
        answer: 1,
        image: {
            fuente: "",
            width: "",
            height: "",
        },
    },
    {
        question: "Calcular la distancia entre los puntos A(-6, -2) y B(5, 2).",
        choice1: "9",
        choice2: "8.67",
        choice3: "13.9",
        choice4: "11.7",
        answer: 4,
        image: {
            fuente: "",
            width: "",
            height: "",
        },
    },
    {
        question: "Calcula el área del siguiente cuadrado.",
        choice1: "6  u2",
        choice2: "11 u2",
        choice3: "9 u2",
        choice4: "10 u2",
        answer: 3,
        image: {
            fuente: "img/img_Ex5/e5_f5.png",
            width: "270px",
            height: "250px",
        },
    },
    {
        question: "Calcular el área del siguiente círculo.",
        choice1: "28.27 u2",
        choice2: "30.81 u2",
        choice3: "26.9 u2",
        choice4: "10.11 u2",
        answer: 1,
        image: {
            fuente: "img/img_Ex5/e5_f6.png",
            width: "300px",
            height: "275px",
        },
    },
    {
        question: "Calcular el perímetro del siguiente triángulo.",
        choice1: "25.06",
        choice2: "28.99",
        choice3: "18.75",
        choice4: "30.08",
        answer: 1,
        image: {
            fuente: "img/img_Ex5/e5_f7.png",
            width: "300px",
            height: "275px",
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