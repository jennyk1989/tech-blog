// response to log out button being clicked 
async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace('/'); //return user to homepage after logging out
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#logout').addEventListener('click', logout);