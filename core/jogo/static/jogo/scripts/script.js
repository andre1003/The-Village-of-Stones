// Variáveis do Jogo
var id_jogo = null;    // esta variável armazena um número inteiro que é usando pra identificar o jogo no BD
var ult_rodada = null; // esta variável recebe da função get_ult_rodada a última rodada referente ao idjogo do BD

// Variáveis do sistema
var rodada_atual;
var lista_rodadas;
var dano_atual;
var lista_dados;

// Variáveis do jogador
var vida_jogador;
var dano_jogador;
var defesa_jogador;

// Variáveis do boos
var vida_boss;
var dano_boss;
var defesa_boss;



// Esta função atualiza os valores das variáveis com base no que está no obg ult_rodada
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

function criarGrafico(var_grafico, id_canvas){
    ctx = document.getElementById(id_canvas).getContext('2d');
    var_grafico = new Chart(ctx, {
        type: 'line',
        data: {
            // eixo x
            labels: rodada_atual,
            // eixo y
            datasets: [
                {
                    data: lista_dados,
                    backgroundColor: ['rgba(255, 99, 132, 0.7)']
                }
            ],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });

    return var_grafico;
}

// Esta função atualiza todos os campos do formulário
function resetarJogo(){
    // jogador
    vida_jogador = 10;
    dano_jogador = 1;
    defesa_jogador = 0.4;

    // boss
    vida_boss = 10;
    dano_boss = 1;
    defesa_boos = 0.4;
        
    rodada_atual = 0;
    dano_atual = 0;

    // resetando listas do gráfico
    lista_rodadas = [0];
    lista_dados = [0];

    myLineChart.destroy(); // deletando gráfico
    myLineChart = criarGrafico(myLineChart, 'myChart'); // criando um novo gráfico


    // aplicando mudanças no painel de visualização
    atualizaFormulario();
}

// Esta função é responsável por atribuir um valor padrão de vida e ataque
function inicializarGame(){

    // apenas para teste
    resetarJogo();

    // aplicando mudanças no painel de visualização
    atualizaFormulario();
}

function proximaRodada(){
    rodada_atual += 1;
    dano_atual += 1;

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

function resetGrafico(chart){
    chart.data.labels = [0];
    // chart.data.datasets.data = [0];
    websiteChart.config.data = [0];
    chart.destroy();
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

// esta função é responsável por gerar um valor aleatório de [1, 6]
function rolarDado(){
    return Math.floor(Math.random() * 6 + 1);
}