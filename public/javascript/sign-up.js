// response to signup button being clicked
async function signupHandler(event) {
    event.preventDefault();
    // grab data from the login form and put in variables
    const username = document.querySelector('#username-signup'); //id from username form in signup.hbs
    const password = document.querySelector('#password-signup'); //id from password form in signup.hbs

    //if user inputs username & password...
    if (username && password) {
        const response = await fetch('/api/users/', {
            // need to POST the username and password from the signup form to the server
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            document.location.replace('/dashboard'); // if signup successful, go to the dashboard
        } else {
            alert(response.statusText);
        }
    }
}


//? listener for signup button being clicked:
document.querySelector('#signup-form').addEventListener('submit', signupHandler);