import { predictTextEmption } from "../repository/emotion_repository.js";

window.onload = async (e) => {

    let form = document.getElementById("emotion-form");
    let predictionResultElement = document.getElementById("predict_result");
    let topEmotionsElement = document.getElementById("top-emotions");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let res = await predictTextEmption(form.elements['emotion_sentence'].value)

        let jsonRes = await res.json();
        console.log(jsonRes)

        predictionResultElement.innerHTML += `
        <p><strong>admiration:</strong> ${jsonRes["prediction"]["admiration"]}</p>
        <p><strong>amusement:</strong> ${jsonRes["prediction"]["amusement"]}</p>
        <p><strong>anger:</strong> ${jsonRes["prediction"]["anger"]}</p>
        <p><strong>annoyance:</strong> ${jsonRes["prediction"]["annoyance"]}</p>
        <p><strong>approval:</strong> ${jsonRes["prediction"]["approval"]}</p>
        <p><strong>caring:</strong> ${jsonRes["prediction"]["caring"]}</p>
        <p><strong>confusion:</strong> ${jsonRes["prediction"]["confusion"]}</p>
        <p><strong>curiosity:</strong> ${jsonRes["prediction"]["curiosity"]}</p>
        <p><strong>desire:</strong> ${jsonRes["prediction"]["desire"]}</p>
        <p><strong>dissapointment:</strong> ${jsonRes["prediction"]["dissapointment"]}</p>
        <p><strong>disapproval:</strong> ${jsonRes["prediction"]["disapproval"]}</p>
        <p><strong>disgust:</strong> ${jsonRes["prediction"]["disgust"]}</p>
        <p><strong>embarrassment:</strong> ${jsonRes["prediction"]["embarrassment"]}</p>
        <p><strong>excitement:</strong> ${jsonRes["prediction"]["excitement"]}</p>
        <p><strong>fear:</strong> ${jsonRes["prediction"]["fear"]}</p>
        <p><strong>gratitude:</strong> ${jsonRes["prediction"]["gratitude"]}</p>
        <p><strong>grief:</strong> ${jsonRes["prediction"]["grief"]}</p>
        <p><strong>joy:</strong> ${jsonRes["prediction"]["joy"]}</p>
        <p><strong>love:</strong> ${jsonRes["prediction"]["love"]}</p>
        <p><strong>nervousness:</strong> ${jsonRes["prediction"]["nervousness"]}</p>
        <p><strong>optimism:</strong> ${jsonRes["prediction"]["optimism"]}</p>
        <p><strong>pride:</strong> ${jsonRes["prediction"]["pride"]}</p>
        <p><strong>realization:</strong> ${jsonRes["prediction"]["realization"]}</p>
        <p><strong>relief:</strong> ${jsonRes["prediction"]["relief"]}</p>
        <p><strong>remorse:</strong> ${jsonRes["prediction"]["remorse"]}</p>
        <p><strong>sadness:</strong> ${jsonRes["prediction"]["sadness"]}</p>
        <p><strong>surprise:</strong> ${jsonRes["prediction"]["surprise"]}</p>
        <p><strong>neutral:</strong> ${jsonRes["prediction"]["neutral"]}</p>
        `

        for (let emotions of jsonRes["top_emotions"]) {
            topEmotionsElement.innerHTML += `
            <li>${emotions}</li>
            `
        }
    })
}