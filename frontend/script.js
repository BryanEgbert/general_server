const API_BASE_URL = "http://127.0.0.1:8000";

async function mainPage() {
    if (localStorage.getItem("username") == null) {
        window.location.replace("./views/login.html");
    } else {
        await loadMainPage();

    }
}

function loginPage() {
    document.getElementById("login-btn").onclick = (e) => {
        inputValue = document.getElementById("login-name-input").value;
    
        localStorage.setItem("username", inputValue)
        window.location.replace("../");
    }
}

async function loadMainPage() {
    let username = localStorage.getItem("username");
    document.getElementById("username").innerText += ` ${username}`;

    let response = await getPosts();
    if (response.ok != true) {
        console.log("Error fetching posts");
    } else {
        let postsElement = document.getElementById("posts");

        for (let post of await response.json()) {
            postsElement.innerHTML += `
            <div class="content">
                <div class="content-header">
                    <p>Posted by <strong>${username}</strong></p>
                    <p style="font-size: 0.8em;">${post['created_at']}</p>
                </div>
                <p>${post["post"]}</p>
                <p class="ml">${post["polarity"]}</p>
            </div>
            `
        }

        postsElement.innerHTML += `<div style="margin: 2em 0"></div>`;

        document.getElementById("post-form").onsubmit = async (e) => {
            let postInput = document.getElementById("post-text-input").value
            let body = {
                'name': username,
                'post': postInput
            }

            let response = await uploadPost(body);

            console.log(response)
        }
    }
}

async function getPosts(limit = 10, last_id = null) {
    let response = await fetch(`${API_BASE_URL}/post/`, {
        // mode: 'no-cors',
        method: "GET",
        headers: {
            "accept": "application/json"
        }
    });

    return response;
}

async function uploadPost(body) {
    let response = await fetch(`${API_BASE_URL}/post/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(body)
    })

    return response;
}