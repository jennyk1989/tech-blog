// response to + New Post button being clicked
async function newPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input["#post-title"]').value;
    const post_text = document.querySelector('textarea["#post-text"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        document.location.replace('/dashboard'); //load dashboard once new post added successfully
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#new-post-form').addEventListener('submit', newPostHandler);