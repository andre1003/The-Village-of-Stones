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

// esta função é responsável por gerar um valor aleatório entre [1, 6]
function rolarDado(){
    return Math.floor(Math.random() * 6 + 1);
}

// Esta função é capaz de gerar um valor aleatório dentro de [min,max]
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

// Modelo binomial apresentado pela professora
function poisson(k, media) {
    var v1 = Math.exp(media * (-1)); // exp^(-media)
    var v2 = Math.pow(media, k);        // media^k
    v1 = v1 * v2; // parte de cima
    v2 = fat(k);  // parte de baixo

    return v1 / v2;
}

// esta função é onde definimos as probabilidades
function p_acerto_erro(tipo_ataque, tipo_defesa) {
    if (tipo_ataque === 'ar') {
        if (tipo_defesa === 'fogo')       // (ar, fogo)
            return 0.5;
        else if (tipo_defesa === 'terra') // (ar, terra)
            return 0.85;
        else if (tipo_defesa === 'agua')  // (ar, agua)
            return 0.2;
        else
            return 0.7;                   // (ar, basico)
    }
    else if (tipo_ataque === 'basico' && tipo_defesa === 'basico')
        return 0.3;                       // (basico, basico)
    else
        return 0.7;
}


function danoDefesa(tipo_ataque) {
    var dano = 0;

    if (tipo_ataque === 'basico')
        dano = gerarNumeroIntervalo(1, 4);
    else if (tipo_ataque === 'magico')
        dano = gerarNumeroIntervalo(1, 6);
    // else if (tipo_ataque === 'nenhum')
        // return dano;
    return dano;
}

function Defesa(dano, tipo_ataque, tipo_defesa) {
    var p = 0, resultado, minimo;

    if (tipo_defesa === 'nenhum')
        return dano;

    p = (1 - p_acerto_erro(tipo_ataque, tipo_defesa)) * 100; // pegando o complemento, em porcentagem
    resultado = gerarNumeroIntervalo(1, 100);
    minimo = 100 - p;

    if (resultado >= 95) // Defesa crítica
        dano = 0;
    else if (resultado <= minimo)
        return dano;
    else {
        if (p >= 70)
            dano -= 3;
        else if (dano >= 40 && dano < 70)
            dano -= 2;
        else
            dano -= 1;
    }

    return dano;
}

function ataqueCritico(personagem) {
    var p = 0;

    if (personagem === 'heroi')
        p = poisson(n_partida, media)
    else {
        p = poisson(n_partida, 10);
        var minimo = 100 - (p * 100);
        var resultado = gerarNumeroIntervalo(1, 100);

        if (resultado <= minimo)
            return false;
        else
            return true;
    }
}

function calculoAtaque(tipo_ataque, resultado) {
    var dano = danoDefesa(tipo_ataque);

    if (ataqueCritico == true || resultado >= 95)
        dano += danoDefesa(tipo_ataque);

    return dano;
}

function DefinicaoAcertoErro(tipo_ataque, tipo_defesa) {
    var p = (p_acerto_erro(tipo_ataque, tipo_ataque)) * 100; // em %
    var minimo = 100 - p;
    var resultado = gerarNumeroIntervalo(1, 100);
    var dano;

    if (resultado <= minimo)
        dano = 0;
    else
        dano = calculoAtaque(tipo_ataque, resultado);

    return dano;
}