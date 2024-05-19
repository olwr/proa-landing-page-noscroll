import { questions } from "./questions.js";
import { videos } from "./videos.js";

// Elements
const progressBar = document.querySelector('.progress-bar__img');
const pageElement = document.querySelectorAll('.page__break');
const videoTag = document.querySelector('.video__tag');
const questionElement = document.querySelector('#question');
const videoElement = document.querySelector('iframe');
const feedback = document.querySelector('.feedback');
const answerButton = document.querySelector('#answer-buttons');
const nextBtn = document.querySelector('#next-btn');

const progress = [16, 32, 48, 64, 80, 100];

// Index
let currentIndex = 0;
let tagImgIndex = 1;

export default function start() {
    currentIndex = 0;
    showVideo();
    showQuestion();
}

// Functions
function showVideo() {
    let currentVideo = videos[currentIndex];
    videoElement.src = currentVideo.src;
    videoElement.title = currentVideo.title;
}

function showQuestion() {
    resetPage();
    
    let currentQuestion = questions[currentIndex];
    videoTag.textContent = `Vídeo ${tagImgIndex} de 6`;
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const img = document.createElement('img');
        img.src = `/src/assets/ALTERNATIVA_${answer.alternative}-DARK.png`;

        const button = document.createElement('button');
        button.textContent = answer.text;
        button.ariaLabel = `alternativa ${answer.alternative}`;
        button.appendChild(img);

        button.classList.add('btn__answer');
        answerButton.appendChild(button);

        progressBar.src = `/src/assets/BARRA_${tagImgIndex}.png`;
        progressBar.alt = `barra de progresso: ${progress[currentIndex]}%`;

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        };

        button.addEventListener('click', selectedAnswer);
    });
};

function selectedAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    let currentFeedback = questions[currentIndex];

    if (isCorrect) {
        selectedBtn.classList.add('correct');
        feedback.textContent = 'Resposta certa!';
        feedback.style.color = 'var(--green)';
    } else {
        selectedBtn.classList.add('incorrect');
        feedback.textContent = currentFeedback.feedback;
        feedback.style.color = 'var(--red)'
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextBtn.style.display = 'block';
};

function resetPage() {
    nextBtn.style.display = 'none';
    window.scrollTo(0, 50);
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
        videoTag.textContent = ``;
        feedback.textContent = '';
    }
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    tagImgIndex++;

    if (currentIndex < questions.length) {
        showVideo();
        showQuestion();
    } else {
        pageElement[0].style.display = 'none';
        pageElement[1].classList.add('visible');
        progressBar.style.display = 'none';
    };
});