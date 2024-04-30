// Pages
const page = document.querySelector('.page');
const pageOne = document.querySelector('.pg-one');

// Buttons
const btnStart = document.querySelector('#btn-start');

// 
const visible = 'visible';

export default function showPage() {
    btnStart.addEventListener('click', () => {
        page.classList.add(visible);
        btnStart.setAttribute('disabled', true)
        pageOne.style.display = 'none';
    });
};