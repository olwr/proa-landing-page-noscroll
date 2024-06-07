import showPage from "./pages.js";
import start from "./show.js";

const subBtn = document.querySelector('#sub-form-button');
const partners = window.location.search;

subBtn.action = `https://plataforma.proa.org.br/login/signup.php${partners}`;

// subBtn.addEventListener('submit', (e) => {
//     e.preventDefault();

//     window.location.href = `https://plataforma.proa.org.br/login/signup.php${partners}`
// })

showPage();
start();