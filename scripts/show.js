import { videos, video } from "./videos.js";
import { questions } from "./questions.js";

// Element selectors
const videoElement = document.querySelector('.iframe');
const videoTag = document.querySelector('.video__tag');
const pageElement = document.querySelectorAll('.page');
const feedback = document.querySelector('.feedback');
const questionElement = document.querySelector('#question');
const answerButton = document.querySelector('#answer-buttons');
const nextBtn = document.querySelector('.next-btn');

// Index
let currentIndex = 0;

export default function start() {
    currentIndex = 0;
    nextBtn.innerHTML = 'Avançar';
    showVideo();
    showQuestion();
};

// Functions
function showVideo() {
    let currentVideo = videos[currentIndex];
    videoElement.src = currentVideo;
}

function showQuestion() {
    resetQuestion();
    
    let currentQuestion = questions[currentIndex];
    videoTag.innerHTML = `Vídeo: ${currentIndex+1} de 6`;
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn__answer');
        answerButton.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectedAnswer);
    })
};

function selectedAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    if (isCorrect) {
        selectedBtn.classList.add('correct');
        // selectedBtn.setAttribute('disabled', 'true');
        nextBtn.style.display = 'block';
        feedback.innerHTML = 'Resposta certa!'

        Array.from(answerButton.children).forEach(button => {
            button.disabled = 'true';
        })

    } else {
        selectedBtn.classList.add('incorrect');
        feedback.innerHTML = 'Resposta errada! Tente novamente'
    }
}

nextBtn.addEventListener('click', () => {
    currentIndex++;

    if (currentIndex < questions.length) {
        showVideo();
        showQuestion();
    } else {
        pageElement[0].style.display = 'none';
        pageElement[1].classList.add('visible');
    }
})

function resetQuestion() {
    nextBtn.style.display = 'none';
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
        videoTag.innerHTML = ``;
        feedback.innerHTML = '';
    }
}