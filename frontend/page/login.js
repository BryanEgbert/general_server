function loginPage() {
    if (localStorage.getItem("username") != null) {
        window.location.replace("../");
    }

    document.getElementById("login-btn").onclick = (e) => {
        inputValue = document.getElementById("login-name-input").value;
    
        localStorage.setItem("username", inputValue)
        window.location.replace("../");
    }
}