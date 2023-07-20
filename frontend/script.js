function mainPage() {
    if (localStorage.getItem("username") == null) {
        window.location.replace("/login");
    } else {
        document.getElementById("username").innerText += ` ${localStorage.getItem("username")}`;
    }
}

function loginPage() {
    document.getElementById("login-btn").onclick = (e) => {
        inputValue = document.getElementById("login-name-input").value;
        console.log("test")
    
        localStorage.setItem("username", inputValue)
        window.location.replace("../");
    }
}