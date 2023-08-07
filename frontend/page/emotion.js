import { predictTextEmption } from "../repository/emotion_repository.js";

window.onload = async (e) => {

    let form = document.getElementById("emotion-form");
    let predictionResultElement = document.getElementById("predict_result");
    let topEmotionsElement = document.getElementById("top-emotions");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        topEmotionsElement.innerHTML = "";
        let res = await predictTextEmption(form.elements['emotion_sentence'].value)

        let jsonRes = await res.json();
        console.log(jsonRes)

        predictionResultElement.innerHTML = `
        <p><strong>admiration:</strong> ${(jsonRes["prediction"]["admiration"] * 100).toFixed(2)}</p>
        <p><strong>amusement:</strong> ${(jsonRes["prediction"]["amusement"] * 100).toFixed(2)}</p>
        <p><strong>anger:</strong> ${(jsonRes["prediction"]["anger"])}</p>
        <p><strong>annoyance:</strong> ${(jsonRes["prediction"]["annoyance"] * 100).toFixed(2)}</p>
        <p><strong>approval:</strong> ${(jsonRes["prediction"]["approval"] * 100).toFixed(2)}</p>
        <p><strong>caring:</strong> ${(jsonRes["prediction"]["caring"] * 100).toFixed(2)}</p>
        <p><strong>confusion:</strong> ${(jsonRes["prediction"]["confusion"] * 100).toFixed(2)}</p>
        <p><strong>curiosity:</strong> ${(jsonRes["prediction"]["curiosity"] * 100).toFixed(2)}</p>
        <p><strong>desire:</strong> ${(jsonRes["prediction"]["desire"] * 100).toFixed(2)}</p>
        <p><strong>dissapointment:</strong> ${(jsonRes["prediction"]["dissapointment"] * 100).toFixed(2)}</p>
        <p><strong>disapproval:</strong> ${(jsonRes["prediction"]["disapproval"] * 100).toFixed(2)}</p>
        <p><strong>disgust:</strong> ${(jsonRes["prediction"]["disgust"] * 100).toFixed(2)}</p>
        <p><strong>embarrassment:</strong> ${(jsonRes["prediction"]["embarrassment"] * 100).toFixed(2)}</p>
        <p><strong>excitement:</strong> ${(jsonRes["prediction"]["excitement"] * 100).toFixed(2)}</p>
        <p><strong>fear:</strong> ${(jsonRes["prediction"]["fear"] * 100).toFixed(2)}</p>
        <p><strong>gratitude:</strong> ${(jsonRes["prediction"]["gratitude"] * 100).toFixed(2)}</p>
        <p><strong>grief:</strong> ${(jsonRes["prediction"]["grief"] * 100).toFixed(2)}</p>
        <p><strong>joy:</strong> ${(jsonRes["prediction"]["joy"] * 100).toFixed(2)}</p>
        <p><strong>love:</strong> ${(jsonRes["prediction"]["love"] * 100).toFixed(2)}</p>
        <p><strong>nervousness:</strong> ${(jsonRes["prediction"]["nervousness"] * 100).toFixed(2)}</p>
        <p><strong>optimism:</strong> ${(jsonRes["prediction"]["optimism"] * 100).toFixed(2)}</p>
        <p><strong>pride:</strong> ${(jsonRes["prediction"]["pride"] * 100).toFixed(2)}</p>
        <p><strong>realization:</strong> ${(jsonRes["prediction"]["realization"] * 100).toFixed(2)}</p>
        <p><strong>relief:</strong> ${(jsonRes["prediction"]["relief"] * 100).toFixed(2)}</p>
        <p><strong>remorse:</strong> ${(jsonRes["prediction"]["remorse"] * 100).toFixed(2)}</p>
        <p><strong>sadness:</strong> ${(jsonRes["prediction"]["sadness"] * 100).toFixed(2)}</p>
        <p><strong>surprise:</strong> ${(jsonRes["prediction"]["surprise"] * 100).toFixed(2)}</p>
        <p><strong>neutral:</strong> ${(jsonRes["prediction"]["neutral"] * 100).toFixed(2)}</p>
        `

        for (let emotions of jsonRes["top_emotions"]) {
            topEmotionsElement.innerHTML += `
            <li>${emotions}</li>
            `
        }
    })
}