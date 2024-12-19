

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Mencegah reload halaman

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validasi login
        if (username === "admin" && password === "admin123") {
            alert("Login berhasil!");
            window.location.href = "coba.html"; // mengarahkan ke halaman admin
        } else {
            errorMessage.textContent = "Username atau password salah!";
            errorMessage.style.color = "red";
        }
    });
});


