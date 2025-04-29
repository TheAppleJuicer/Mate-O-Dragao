document.addEventListener("DOMContentLoaded", function () {
    const textoCavalo = document.getElementById('cavalo');
    const descricao = document.getElementById('descricao');
    const descricaoHabilidades = document.getElementById("descricaoHabilidades");

    const texto2 = `O mundo não está mais o mesmo, após as guerras, os soldados estão estagnados, os saqueadores têm sua maior sorte, os sagrados estão tendo que ajudar a maioria das vítimas dos danos colaterais. Porém estes são os problemas no grande escopo: vocês precisam de dinheiro, rápido, muito dinheiro (ou você é um soldado com sede por sangue e só quer matar e ferir outras criaturas — seu psicopata — ), e o jeito mais rápido que vocês conhecem de se adquirir ouro é aventurando, pegando recompensas através de pessoas desesperadas.`;

    const texto = `Seu herói escolhido decidirá que caminho durante esta jornada árdua você progredirá sobre. Complete esta missão e será banhado em riquezas, honras e virtudes e um pouco mais de tudo que quiser, porque apesar de tudo, você matará um dragão. Isto não é uma tarefa para os do coração fraco e de mente abalável, é para aqueles de peito de ferro e de alma espirituada. Desejo-te sorte, aventureiro, que seus caminhos sejam bons e tuas lutas mais ainda.`;

    let isTyping = false;
    let currentTimeouts = [];
    let etapaAtual = 0; // 0 = cavalo, 1 = descrição final
    let textoDescricaoAtual = "";

    function typeWriterEffect(element, text, speed = 30, callback) {
        if (isTyping) return;
        isTyping = true;
        let i = 0;
        element.innerHTML = "";

        function write() {
            if (i < text.length) {
                const char = text.charAt(i);
                element.innerHTML += char;
                if (char === ".") element.innerHTML += "<br><br>";
                i++;
                currentTimeouts.push(setTimeout(write, speed));
            } else {
                isTyping = false;
                if (callback) callback();
            }
        }

        write();
    }

    function skipTypewriter(element, text, callback) {
        if (!isTyping) return;
        currentTimeouts.forEach(clearTimeout);
        currentTimeouts = [];
        element.innerHTML = text.replaceAll(".", ".<br><br>");
        isTyping = false;
        if (callback) callback();
    }

    // Pula o texto atual (cavalo ou descrição)
    window.pularTexto = function () {
        if (etapaAtual === 0) {
            skipTypewriter(textoCavalo, texto2, () => {
                etapaAtual = 1;
                typeWriterEffect(descricao, texto, 30);
            });
        } else if (etapaAtual === 1) {
            skipTypewriter(descricao, texto);
        } else if (etapaAtual === 2) {
            skipTypewriter(descricao, textoDescricaoAtual);
        }
    };


    function mostrarDescricaoHabilidade(texto) {
        descricaoHabilidades.innerText = texto;
    }

    function limparDescricaoHabilidade() {
        descricaoHabilidades.innerText = "";
    }

    // Tornar as funções globais
    window.mostrarDescricaoHabilidade = mostrarDescricaoHabilidade;
    window.limparDescricaoHabilidade = limparDescricaoHabilidade;

    // Inicia com texto do cavalo
    document.getElementById("pularTexto").addEventListener("click", pularTexto);

    typeWriterEffect(textoCavalo, texto2, 30, () => {
        etapaAtual = 1;
        typeWriterEffect(descricao, texto, 30);
    });

    function atualizarAtributos({ forca, agilidade, saude, mente }) {
        desenharBarras("forca", forca);
        desenharBarras("agilidade", agilidade);
        desenharBarras("saude", saude);
        desenharBarras("mente", mente);
    }

    function desenharBarras(id, quantidade) {
        const container = document.getElementById(id);
        container.innerHTML = ""; // Limpa as barras anteriores

        for (let i = 0; i < quantidade; i++) {
            const barra = document.createElement("img");
            barra.src = "/img/umromano.png"; // caminho para seu risco
            barra.alt = "risco";
            container.appendChild(barra);
        }
    }
    // Função para abrir o pop-up
    window.abrirPopup = function () {
        document.getElementById("popup").style.display = "block";
    }

    // Função para fechar o pop-up
    window.fecharPopup = function () {
        document.getElementById("popup").style.display = "none";
    }

    // Função para escolher o herói
    window.escolherHeroi = function (heroi) {
        if (heroi === 'sicario') {
            window.location.href = '/jogo-fr/sicario.html';  // Aqui redireciona para a página do Sicário
        } else if (heroi === 'soldado') {
            window.location.href = '/jogo-fr/soldado.html';  // Aqui redireciona para a página do Soldado
        } else if (heroi === 'sagrado') {
            window.location.href = '/jogo-fr/sagrado.html';  // Aqui redireciona para a página do Sagrado
        }
    }

    // Botões dos heróis
    window.showSicario = function (img) {
        let imagem = document.getElementById('imagemCentral');
        imagem.setAttribute("src", img);
        if (isTyping) return;
        etapaAtual = 2;
        textoDescricaoAtual = "Sicário, um assassino de aluguel, o pior dos piores, quer alguém morto pelo preço mais barato possível? Esse é o seu cara. Só não espere muito dele. Ele faz o que é mandado e acaba com mais dinheiro do que você pagou a ele (ele pode ter te roubado).";
        typeWriterEffect(descricao, textoDescricaoAtual, 30);
        atualizarAtributos({ forca: 2, agilidade: 5, saude: 2, mente: 3 });
    };

    window.showSoldado = function (img) {
        let imagem = document.getElementById('imagemCentral');
        imagem.setAttribute("src", img);
        if (isTyping) return;
        etapaAtual = 2;
        textoDescricaoAtual = "Soldado, máquinas feitas de carne e aço ou apenas aço, treinadas para o combate desde sua criação. Motores irrefreáveis por qualquer coisa em seu caminho. Utilizados em guerra e outros conflitos, mas agora que não há nenhum dos dois, eles ansiam e esperam para dilacerar algo sem serem punidos.";
        typeWriterEffect(descricao, textoDescricaoAtual, 30);
        atualizarAtributos({ forca: 5, agilidade: 2, saude: 3, mente: 2 });
    };

    window.showSagrado = function (img) {
        let imagem = document.getElementById('imagemCentral');
        imagem.setAttribute("src", img);
        if (isTyping) return;
        etapaAtual = 2;
        textoDescricaoAtual = "Sagrado. Seres de fé e poder, chamados por forças divinas ou ancestrais. Sua missão: proteger, curar, punir. 'Santos' quase perfeitos, criados e desenvolvidos por criaturas de ascendência divina para corrigir os erros dos terrestres.";
        typeWriterEffect(descricao, textoDescricaoAtual, 30);
        atualizarAtributos({ forca: 1, agilidade: 3, saude: 2, mente: 6 });
    };


});

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

