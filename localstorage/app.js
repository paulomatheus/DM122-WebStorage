const form = document.querySelector('form');
const main = document.querySelector('main');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("[app.js] Form triggered!");
    console.log("[app.js] email: ", form.email.value);
    window.localStorage.setItem('email', form.email.value);
    console.log("[app.js] Email saved to LocalStorage.");
});

function loadSavedEmail() {
    console.log("[app.js] Loading saved email from LocalStorage...");
    const email = window.localStorage.getItem('email');
    if (email) {
        console.log("[app.js] Found saved email:", email);      
        const spanEmail = document.querySelector(".email");
        spanEmail.textContent = email;
    } else {
        console.log("[app.js] No saved email found in LocalStorage.");
    }
}

loadSavedEmail();