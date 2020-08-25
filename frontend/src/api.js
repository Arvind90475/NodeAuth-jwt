
const API_URL = "http://localhost:3000/auth/";
const form = document.querySelector('#form');



const loadingElement = document.querySelector('body > div.row > div.col-md-6.col-lg-5 > div > img');
const formError = document.querySelector('#form > div:nth-child(1) > h4');
loadingElement.style.visibility = "hidden";
const validateForm = (email, password) => {
    if (!email || !password) {
        return false
    }
    return true;
}


const makeUser = async (user) => {
    try {
        const data = await fetch(`${API_URL}signup`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        });
        const newUser = await data.json();
        if (newUser.error === 'user already exists') {
            formError.innerHTML = 'User already exists';
        }
        formError.innerHTML = newUser.error;

        return newUser;
    } catch (error) {
        return;
    }
}

form.addEventListener('submit', async (event) => {
    // show loading animation
    form.style.visibility = 'hidden'
    event.preventDefault();
    loadingElement.style.visibility = ""
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!validateForm(email, password)) {
        console.log('enter all fields');
        formError.innerHTML = 'Fill out all the fields'
        form.style.visibility = ''
        loadingElement.style.visibility = 'hidden'
        return false;
    }
    const user = { email, password }
    setTimeout(() => {
        makeUser(user);
        loadingElement.style.visibility = "hidden"
        form.style.visibility = ''
    }, 1000);
});