// Esta função limpa todos os campos do formulário quando acionada
function resetarJogo(){
    // resetando o primeiro bloco
    document.getElementById("vida_bloco1").value = 0;
    document.getElementById("ataque_bloco1").value = 0;

    // resetando o segundo bloco
    document.getElementById("vida_bloco2").value = 0;
    document.getElementById("ataque_bloco2").value = 0;

    rodada_atual = 0;
    document.getElementById("rodada_atual").innerHTML = rodada_atual;
}


// Esta função é responsável por atribuir um valor padrão de vida e ataque
function inicializarGame(){
    // primeiro bloco
    document.getElementById("vida_bloco1").value = 10;
    document.getElementById("ataque_bloco1").value = 1;

    // segundo bloco
    document.getElementById("vida_bloco2").value = 10;
    document.getElementById("ataque_bloco2").value = 1;
    
    // rodada
    document.getElementById("rodada_atual").innerHTML = rodada_atual;
}


function proximaRodada(){
    rodada_atual += 1;
    dano_atual += 1;

    // lista_rodadas.push(rodada_atual);
    // lista_dados.push(dano_atual);
    addData(myLineChart, rodada_atual, dano_atual);

    document.getElementById("rodada_atual").innerHTML = rodada_atual;

    player_ataca();
}


// Adiciona uma nova data no gráfico
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}


// Esta função calcula a vida do boss quando o jogador ataca
function player_ataca(){
    // validando dano
    if((document.getElementById("vida_bloco2").value - document.getElementById("ataque_bloco1").value) < 0)
        document.getElementById("vida_bloco2").value = 0;
    else
        document.getElementById("vida_bloco2").value -= document.getElementById("ataque_bloco1").value;
}


// esta função é responsável por gerar um valor aleatório de [1, 6]
function rolarDado(){
    return Math.floor(Math.random() * 6 + 1);
}