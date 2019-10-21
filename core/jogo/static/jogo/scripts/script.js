// Variáveis do Jogo
var id_jogo = 100;    // esta variável armazena um número inteiro que é usando pra identificar o jogo no BD
var ult_rodada; // esta variável recebe da função get_ult_rodada a última rodada referente ao idjogo do BD
var pk_jogador = 5;

// Variáveis rodada
var vida_personagem;
var vida_boss;
var dano_atacante;
var probabilidade_ataque;
var probabilidade_defesa;
var numero_dado;
var numero_rodada;
var tempo_rodada;
var numero_fase;
var personagem_atacou;

// Teste
function resetarJogo(){
    // uuid_jogo = gerarNumeroIntervalo(min, max);
    // ult_rodada = gerarNumeroIntervalo(min, max);
    // pk_jogador = gerarNumeroIntervalo(min, max);
    vida_personagem = 100;
    vida_boss = 100;
    dano_atacante = 0;
    probabilidade_ataque = Math.random();
    probabilidade_defesa = Math.random();
    numero_dado = gerarNumeroIntervalo(0, 6);
    numero_rodada = 0;
    numero_fase = 1;
    personagem_atacou = true;
}

// Esta função atualiza o painel de acordo com as variáveis do sistema
function atualizarPainel() {
    $('#pk_jogador').html(pk_jogador);
    $('#id_jogo').html(id_jogo);
    $('#vida_personagem').html(vida_personagem);
    $('#vida_boss').html(vida_boss);
    $('#dano_atacante').html(dano_atacante);
    $('#probabilidade_ataque').html(probabilidade_ataque);
    $('#probabilidade_defesa').html(probabilidade_defesa);
    $('#numero_dado').html(numero_dado);
    $('#numero_rodada').html(numero_rodada);
    $('#numero_fase').html(numero_fase);
    $('#personagem_atacou').html(personagem_atacou);
}

// Esta função é responsável por atribuir um valor padrão de vida e ataque
function inicializarGame(){

    // apenas para teste
    resetarJogo();

    // aplicando mudanças no painel de visualização
    atualizarPainel();
}

function acao() {
    // get_ult_rodada();

    vida_personagem = 100 - gerarNumeroIntervalo(0, 20);
    vida_boss = 100 - gerarNumeroIntervalo(0, 20);
    dano_atacante = 14;
    probabilidade_ataque = gerarNumeroIntervalo(0, 1);
    probabilidade_defesa = gerarNumeroIntervalo(0, 1);
    numero_dado = gerarNumeroIntervalo(0, 6);
    numero_rodada += 1;
    numero_fase = 1;

    personagem_atacou = personagem_atacou !== true;

    atualizarPainel();
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

function proximaRodada(){
    rodada_atual += 1;
    dano_atual += 1;

    // lista_rodadas.push(rodada_atual);
    // lista_dados.push(dano_atual);
    // addData(myLineChart, rodada_atual, dano_atual);

    document.getElementById("rodada_atual").innerHTML = rodada_atual;

    // player_ataca();

    // exibindo mudanças no formulário
    // atualizaFormulario();resultados_jogo
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

// esta função é responsável por gerar um valor aleatório de [1, 6]
function rolarDado(){
    return Math.floor(Math.random() * 6 + 1);
}

function gerarNumeroIntervalo(min, max) {
    return Math.floor(Math.random() * max + min);
}



////////////////////////////////////////////////////////////////////////////
//                   MODELOS E FUNÇÕES MATEMÁTICAS                        //
////////////////////////////////////////////////////////////////////////////

// Esta função calcula o fatorial de um número
function fat(num) {
    var result = num;
    if (num === 0 || num === 1)
        return 1;
    while (num > 1) {
        num--;
        result *= num;
    }
    return result;
}

function poisson(k, media) {
    var v1 = Math.exp(media * (-1)); // exp^(-media)
    var v2 = Math.pow(media, k);        // media^k
    v1 = v1 * v2; // parte de cima
    v2 = fat(k);

    return v1 / v2;
}
