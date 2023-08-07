import { API_BASE_URL } from "../consts.js";

export async function predictTextEmption(text) {
    console.log(JSON.stringify([text]))
    let url = `${API_BASE_URL}/emotion/`

    let response = await fetch(url, {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify([text])
    });

    return response
}