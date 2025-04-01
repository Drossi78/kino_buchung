$(document).ready(function () {
    console.log("jQuery ist geladen und bereit!");

    window.showLoginForm = function () {
        $("#register-form").hide();
        $("#login-form").show();
    };

    window.showRegisterForm = function () {
        $("#login-form").hide();
        $("#register-form").show();
    };

    $("#registerForm").on("submit", function (event) {
        event.preventDefault();

        const name = $("#register-name").val().trim();
        const email = $("#register-email").val().trim();
        const password = $("#register-password").val().trim();

        if (!name || !email || !password) {
            alert("Bitte alle Felder ausfüllen!");
            return;
        }

        // Daten als JSON senden
        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert("Fehler bei der Registrierung: " + data.error);
            } else {
                alert("Registrierung erfolgreich!");
                $("#registerForm").trigger("reset");
                $("#register-form").hide();
            }
        })
        .catch(error => console.error("Fehler:", error));
    });

    $("#loginForm").on("submit", function (event) {
        event.preventDefault();

        const email = $("#login-email").val().trim();
        const password = $("#login-password").val().trim();

        if (!email || !password) {
            alert("Bitte alle Felder ausfüllen!");
            return;
        }

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert("Fehler beim Login: " + data.error);
            } else {
                alert("Login erfolgreich!");
              window.location.href = "film.html";
            }
        })
        .catch(error => console.error("Fehler:", error));
    });
});
