```javascript
/* =========================================================
   INVITACIÓN DE GRADUACIÓN
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const inicio = document.getElementById("inicio");
    const invitacion = document.getElementById("invitacion");
    const btnEntrar = document.getElementById("btnEntrar");

    const musica = document.getElementById("musica");
    const botonMusica = document.getElementById("botonMusica");


    /* =====================================================
       ENTRAR A LA INVITACIÓN
    ===================================================== */

    btnEntrar.addEventListener("click", function () {

        inicio.style.opacity = "0";
        inicio.style.transition = "opacity 1s ease";

        setTimeout(function () {

            inicio.style.display = "none";

            invitacion.classList.remove("oculto");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });


            /* Intentar iniciar música */

            musica.play()
                .then(function () {

                    botonMusica.classList.add("reproduciendo");

                    botonMusica.textContent = "🔊";

                })
                .catch(function () {

                    botonMusica.textContent = "🎵";

                });

        }, 1000);

    });


    /* =====================================================
       BOTÓN DE MÚSICA
    ===================================================== */

    botonMusica.addEventListener("click", function () {

        if (musica.paused) {

            musica.play()
                .then(function () {

                    botonMusica.textContent = "🔊";

                    botonMusica.classList.add("reproduciendo");

                })
                .catch(function () {

                    alert(
                        "No se pudo reproducir la música. " +
                        "Verifica que graduacion.mp3 esté en el repositorio."
                    );

                });

        } else {

            musica.pause();

            botonMusica.textContent = "🔇";

            botonMusica.classList.remove("reproduciendo");

        }

    });


    /* =====================================================
       EFECTO AL HACER SCROLL
    ===================================================== */

    const elementos = document.querySelectorAll(
        ".foto, .dato, .tarjeta, .nombre"
    );


    const observador = new IntersectionObserver(
        function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.style.animation =
                        "aparecer 1s ease forwards";

                    observador.unobserve(entrada.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    elementos.forEach(function (elemento) {

        elemento.style.opacity = "0";

        observador.observe(elemento);

    });

});
```

