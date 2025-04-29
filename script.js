function comecar() {
    window.location.href = "jogo.html"
}

document.addEventListener("DOMContentLoaded", function () {
    const musica = document.getElementById("musicaFundo");

    // Começa a música após qualquer clique
    const iniciarMusica = () => {
        musica.play().catch(err => {
            console.warn("Autoplay bloqueado, tente interagir novamente:", err);
        });
        document.removeEventListener("click", iniciarMusica); // Só executa uma vez
    };

    document.addEventListener("click", iniciarMusica);
});