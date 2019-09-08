// Variáveis do sistema
var rodada_atual = 0;
var lista_rodadas = [0];
var dano_atual = 0;
var lista_dados = [0];

// Variáveis do jogador
var vida_jogador;
var dano_jogador;
var defesa_jogador;

// Variáveis do boos
var vida_boss;
var dano_boss;
var defesa_boss;


// Esta função atualiza os valores das variáveis com base no que está no formulário
function atualizaVariaveis(){
    /*
        O atributo step do html retorna uma string para o js.
        Convertendo string -> float
    */
    // jogador
    vida_jogador = parseFloat(document.getElementById("vida_jogador").value);
    dano_jogador = parseFloat(document.getElementById("ataque_jogador").value);
    defesa_jogador = parseFloat(document.getElementById("defesa_jogador").value);

    // boss
    vida_boss = parseFloat(document.getElementById("vida_boss").value);
    dano_boss = parseFloat(document.getElementById("ataque_boss").value);
    defesa_boos = parseFloat(document.getElementById("defesa_boss").value);
}

// Esta função atualiza os valores das variáveis do jogo (formulário)
function atualizaFormulario(){
    // jogador
    document.getElementById("vida_jogador").value = vida_jogador;
    document.getElementById("ataque_jogador").value = dano_jogador;
    document.getElementById("defesa_jogador").value = defesa_jogador;

    // boss
    document.getElementById("vida_boss").value = vida_boss;
    document.getElementById("ataque_boss").value = dano_boss;
    document.getElementById("defesa_boss").value = defesa_boos;

    document.getElementById("rodada_atual").innerHTML = rodada_atual;
}

// Esta função atualiza todos os campos do formulário
function resetarJogo(){
    
    vida_jogador = 10;
    dano_jogador = 1;
    defesa_jogador = 0.4;

    // boss
    vida_boss = 10;
    dano_boss = 1;
    defesa_boos = 0.4;
        
    rodada_atual = 0;

    // aplicando mudanças no painel de visualização
    atualizaFormulario();
}

// Esta função é responsável por atribuir um valor padrão de vida e ataque
function inicializarGame(){

    // apenas para teste
    resetarJogo();

    // jogador
    document.getElementById("dano_jogador").value = dano_jogador;
    document.getElementById("defesa_jogador").value = defesa_jogador;
    document.getElementById("vida_jogador").value = vida_jogador;

    // segundo bloco
    document.getElementById("dano_boss").value = dano_boss;
    document.getElementById("ataque_boss").value = ataque_boss;
    document.getElementById("defesa_boos").value = defesa_boss;
    
    // rodada
    document.getElementById("rodada_atual").innerHTML = rodada_atual;
}

function proximaRodada(){
    rodada_atual += 1.0;
    dano_atual += 1.0;

    // lista_rodadas.push(rodada_atual);
    // lista_dados.push(dano_atual);
    addData(myLineChart, rodada_atual, dano_atual);

    document.getElementById("rodada_atual").innerHTML = rodada_atual;

    player_ataca();

    // exibindo mudanças no formulário
    atualizaFormulario();
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
    if(vida_boss - dano_jogador < 0)
        vida_boss = 0;
    else
        vida_boss -= dano_jogador;
}

function boss_ataca(){
    if (vida_jogador - dano_boss < 0)
        vida_jogador = 0;
    else
        vida_jogador -= dano_boss;
}