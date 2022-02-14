// response to edit
async function editPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input["#post-title"]').value;
    const post_text = document.querySelector('textarea["#post-text"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT', //use PUT method since updating
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

document.querySelector('#edit-post-form').addEventListener('submit', editPostHandler);