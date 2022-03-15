var nave = document.getElementById('nave');
var tela = document.getElementById('tela');

document.addEventListener("keydown", function (e) {

    // movendo a nave para a esquerda e deixando dentro da tela
    var left = parseInt(window.getComputedStyle(nave).getPropertyValue("left"));
    if (e.key == "ArrowLeft" && left > 5) {
        nave.style.left = left - 17 + "px";
    }
    // movendo a nave para a direita e deixando dentro da tela
    if (e.key == "ArrowRight" && left < 960) {
        nave.style.left = left + 17 + "px";
    }

    // configurando os tiros
    if (e.key == "ArrowUp") {
        var tiros = document.createElement("div");
        tiros.classList.add("tiro");
        tela.appendChild(tiros);

        var movendoTiros = setInterval(() => {

            //configurando a destruição das naves invasoras
            var invasores = document.getElementsByClassName("invasor");

            for (var i = 0; i < invasores.length; i++) {
                var invasor = invasores[i];

                //busca o tamanho dos invasores e do tiro
                var tamanhoInvasor = invasor.getBoundingClientRect();
                var tamanhoTiro = tiros.getBoundingClientRect();

                // verifica se o tiro acerta o invasor
                if (tamanhoTiro.left >= tamanhoInvasor.left && tamanhoTiro.right <= tamanhoInvasor.right &&
                    tamanhoTiro.top <= tamanhoInvasor.bottom)
                // remove o invasor caso o tiro o acerte
                {
                    invasor.parentElement.removeChild(invasor);

                    // acrescentando pontos ao acertar uma nave 
                    var pontuacaoAtual = parseInt(document.getElementById("pontos").innerHTML);

                    document.getElementById("pontos").innerHTML = pontuacaoAtual + 100;
                }
            }

            //configurando a saida do tiro
            var tirosSaida = parseInt(window.getComputedStyle(tiros).getPropertyValue("bottom"));

            // finalizando o tiro
            if (tirosSaida >= 510) {
                clearInterval(movendoTiros);
            }

            //ajustando o local de saida do tiro
            var localSaida = left + 11;
            tiros.style.left = localSaida + "px";
            tiros.style.bottom = tirosSaida + 2 + "px";
        });
    }
});

//criando invasores em intervalo de tempo
var gerarInvasor = setInterval(() => {

    //gerando o invasor
    var novoInvasor = document.createElement("div");
    novoInvasor.classList.add("invasor");

    // criação aleatoria do invasor e dentro da tela

    novoInvasor.style.top = 0;
    novoInvasor.style.left = parseInt(Math.random() * 930) + "px";

    tela.appendChild(novoInvasor);

}, 1500);

var movendoInvasores = setInterval(() => {

    var invasores = document.getElementsByClassName("invasor");
    
    for (var i = 0; i < invasores.length; i++) {
        //aumentando o topo de cada nave, para que elas apareçam descendo na tela
        var novoInvasor = invasores[i];
        var invasoresTop = parseInt(window.getComputedStyle(novoInvasor).getPropertyValue("top"));

        //verifica se o invasor acerta a nave; 440 é o tamanho da altura da tela menos o da nave
        if (invasoresTop >= 440) {
            alert("Fim do jogo!!!!");
            clearInterval(movendoInvasores);
            window.location.reload();
        }

        // distância percorrida pelo invasor a cada intervalo de tempo definido ao fim desta função set interval 
        novoInvasor.style.top = invasoresTop + 20 + "px";
    }   

}, 200)



