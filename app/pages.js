const progressBar = document.querySelector('.progress-bar__img');
const mainPage = document.querySelector('.first__page');
const videosPage = document.querySelector('.page__break');
const btnStart = document.querySelector('#start-btn');

const visible = 'visible';

progressBar.style.display = 'none';

export default function showPage() {
    btnStart.addEventListener('click', () => {
        videosPage.classList.add(visible);
        progressBar.style.display = 'block';
        mainPage.style.display = 'none';
    })
};