/* =========================================================
   INVITACIÓN DE GRADUACIÓN - JAIRO HERNÁNDEZ
   NAVEGACIÓN POR PÁGINAS Y MÚSICA
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const inicio = document.getElementById("inicio");
    const invitacion = document.getElementById("invitacion");
    const btnEntrar = document.getElementById("btnEntrar");

    const musica = document.getElementById("musica");
    const botonMusica = document.getElementById("botonMusica");

    const paginas = Array.from(
        invitacion.querySelectorAll(".pagina")
    );

    let paginaActual = 0;


    /* =====================================================
       CREAR BOTONES DE NAVEGACIÓN
    ===================================================== */

    paginas.forEach(function (pagina, indice) {

        const navegacion = document.createElement("div");
        navegacion.className = "navegacion-paginas";

        const anterior = document.createElement("button");
        anterior.className = "btn-pagina btn-anterior";
        anterior.textContent = "← Anterior";
        anterior.type = "button";

        const indicador = document.createElement("span");
        indicador.className = "indicador-pagina";

        const siguiente = document.createElement("button");
        siguiente.className = "btn-pagina btn-siguiente";
        siguiente.type = "button";

        navegacion.appendChild(anterior);
        navegacion.appendChild(indicador);
        navegacion.appendChild(siguiente);

        const contenedor = pagina.querySelector(
            ".portada-contenido, .final-contenido"
        );

        if (contenedor) {
            contenedor.appendChild(navegacion);
        } else {
            pagina.appendChild(navegacion);
        }

        anterior.addEventListener("click", function () {
            mostrarPagina(indice - 1);
        });

        siguiente.addEventListener("click", function () {
            mostrarPagina(indice + 1);
        });

    });


    /* =====================================================
       MOSTRAR UNA SOLA PÁGINA
    ===================================================== */

    function mostrarPagina(indice) {

        if (indice < 0 || indice >= paginas.length) {
            return;
        }

        paginaActual = indice;

        paginas.forEach(function (pagina, posicion) {

            const activa = posicion === paginaActual;

            pagina.classList.toggle("pagina-activa", activa);

            const anterior = pagina.querySelector(".btn-anterior");
            const siguiente = pagina.querySelector(".btn-siguiente");
            const indicador = pagina.querySelector(".indicador-pagina");

            anterior.disabled = paginaActual === 0;

            if (paginaActual === paginas.length - 1) {
                siguiente.textContent = "Volver al inicio ↑";
            } else {
                siguiente.textContent = "Siguiente →";
            }

            indicador.textContent =
                "Página " + (paginaActual + 1) +
                " de " + paginas.length;

            siguiente.setAttribute(
                "aria-label",
                paginaActual === paginas.length - 1
                    ? "Volver al inicio"
                    : "Ir a la página siguiente"
            );

        });

        // En la última página, el botón permite volver a la portada.
        const botonFinal = paginas[paginaActual].querySelector(
            ".btn-siguiente"
        );

        if (paginaActual === paginas.length - 1) {
            botonFinal.onclick = function () {
                mostrarPagina(0);
            };
        } else {
            botonFinal.onclick = null;
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       ENTRAR A LA INVITACIÓN
    ===================================================== */

    btnEntrar.addEventListener("click", function () {

        inicio.style.opacity = "0";
        inicio.style.transition = "opacity 0.8s ease";

        setTimeout(function () {

            inicio.style.display = "none";
            invitacion.classList.remove("oculto");

            mostrarPagina(0);

            // Intentar iniciar la música al pulsar el botón.
            reproducirMusica();

        }, 800);

    });


    /* =====================================================
       REPRODUCIR MÚSICA
    ===================================================== */

    function reproducirMusica() {

        musica.play()
            .then(function () {

                botonMusica.textContent = "🔊";
                botonMusica.classList.add("reproduciendo");
                botonMusica.setAttribute(
                    "aria-label",
                    "Silenciar música"
                );

            })
            .catch(function () {

                botonMusica.textContent = "🎵";
                botonMusica.classList.remove("reproduciendo");

                // El invitado puede intentar reproducirla
                // con el botón de música.
            });

    }


    /* =====================================================
       BOTÓN PARA ACTIVAR O DESACTIVAR LA MÚSICA
    ===================================================== */

    botonMusica.addEventListener("click", function () {

        if (musica.paused) {
            reproducirMusica();
        } else {

            musica.pause();

            botonMusica.textContent = "🔇";
            botonMusica.classList.remove("reproduciendo");

            botonMusica.setAttribute(
                "aria-label",
                "Activar música"
            );

        }

    });


    /* =====================================================
       ANIMACIONES AL MOSTRAR ELEMENTOS
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const elementos = document.querySelectorAll(
            ".foto, .dato, .tarjeta, .nombre"
        );

        const observador = new IntersectionObserver(
            function (entradas) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {

                        entrada.target.style.animation =
                            "aparecer 0.8s ease forwards";

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
    }
});
