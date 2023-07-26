import { API_BASE_URL } from "../consts.js";

export async function getPosts(last_id = null, limit = 10) {
    let url = `${API_BASE_URL}/post/?limit=${limit}`
    if (last_id != null) {
        url += `&last_id=${last_id}`
    }

    let response = await fetch(url, {
        method: "GET",
        headers: {
            "accept": "application/json"
        }
    });

    return response;
}

export async function uploadPost(body) {
    let response = await fetch(`${API_BASE_URL}/post/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(body)
    })

    return response;
}