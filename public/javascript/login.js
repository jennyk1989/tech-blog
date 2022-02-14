// response to login in button being clicked
async function loginHandler(event) {
    event.preventDefault();
    // grab data from the login form and put in variables
    const username = document.querySelector('#username-login'); //id from username form in login.hbs
    const password = document.querySelector('#password-login'); //id from password form in login.hbs

    //if user inputs username & password...
    if (username && password) {
        const response = await fetch('/api/users/login', {
            // need to POST the username and password from the login form to the server
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            document.location.replace('/dashboard'); // if sign up successful, go to the dashboard
        } else {
            alert(response.statusText);
        }
    }
}


//? listener for login button being clicked:
document.querySelector('.login-form').addEventListener('submit', loginHandler);
document.querySelector('.signup-form').addEventListener('submit', signupHandler);