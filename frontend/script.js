import { getPosts, uploadPost } from "./repository/post_repository.js";

window.onload = async (e) => {
    if (localStorage.getItem("username") == null) {
        window.location.replace("./page/login.html");
    } else {
        await loadMainPage();
    }
}

async function handlePostPagiation(element) {
    let lastChildPostId = element.children[element.children.length - 1].classList[1];

    if (element.scrollTop + element.offsetHeight >= element.scrollHeight) {
        let response = await getPosts(lastChildPostId);
        if (response.ok != true) {
            console.log("Error fetching posts");
        } else {
            for (let post of await response.json()) {
                element.innerHTML += `
                <div class="content ${post['id']}">
                    <div class="content-header">
                        <p>Posted by <strong>${post['name']}</strong></p>
                        <p style="font-size: 0.8em;">${post['created_at']}</p>
                    </div>
                    <p>${post["post"]}</p>
                    <p class="ml">the post is: <strong class="${post["polarity"]}">${post["polarity"]}</strong></p>
                </div>
                `
            }
        }
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
        postsElement.onscroll = async (e) => await handlePostPagiation(postsElement);

        for (let post of await response.json()) {
            postsElement.innerHTML += `
            <div class="content ${post['id']}">
                <div class="content-header">
                    <p>Posted by <strong>${post['name']}</strong></p>
                    <p style="font-size: 0.8em;">${post['created_at']}</p>
                </div>
                <p>${post["post"]}</p>
                <p class="ml">the post is: <strong class="${post["polarity"]}">${post["polarity"]}</strong></p>
            </div>
            `
        }

        document.getElementById("post-form").onsubmit = async (e) => {
            e.preventDefault();
            let postInput = document.getElementById("post-text-input").value
            let body = {
                'name': username,
                'post': postInput
            }

            await uploadPost(body);
        }
    }
}