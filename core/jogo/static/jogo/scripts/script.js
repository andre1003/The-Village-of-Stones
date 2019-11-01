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
var numero_fase;
var personagem_atacou;


// let escopo local


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
    let result = num;
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
    let v1 = Math.exp(media * (-1)); // exp^(-media)
    let v2 = Math.pow(media, k);        // media^k
    v1 = v1 * v2; // parte de cima
    v2 = fat(k);  // parte de baixo

    return (v1 / v2);
}

// esta função é onde definimos as probabilidades
function p_acerto_erro(tipo_ataque) {
    if (tipo_ataque === 'magico') {
        /*if (tipo_defesa === 'fogo')       // (ar, fogo)
            return 0.5;
        else if (tipo_defesa === 'terra') // (ar, terra)
            return 0.85;
        else if (tipo_defesa === 'agua')  // (ar, agua)
            return 0.2;
        else
            return 0.7;                   // (ar, basico)*/
        return 0.6;
    }
    else if (tipo_ataque === 'basico')
        return 0.8;                       // (basico, basico)
}

function danoDefesa(tipo_ataque, personagem) {
    let dano = 0;
    if(personagem === 'heroi') {
        if (tipo_ataque === 'basico')
            dano = gerarNumeroIntervalo(1, 4);
        else if (tipo_ataque === 'magico')
            dano = gerarNumeroIntervalo(1, 6);
    }
    else if(personagem === 'plox') {
        dano = gerarNumeroIntervalo(1, 3);
    }

    return dano;
}

/*function Defesa(dano, tipo_ataque, tipo_defesa) {
    let p = 0, resultado, minimo;

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

    if (dano < 0)
        dano = 0;

    return dano;
}*/

function ataqueCritico(personagem) {
    let p = 0;

    if (personagem === 'heroi')
        p = poisson(numero_rodada, 5); // passa a rodada atual (media heroi = 5)
    else {
        p = poisson(numero_rodada, 10); // media vilão = 10
    }

    let minimo = 100 - (p * 100); // complemento da probabilidade em %
    let resultado = gerarNumeroIntervalo(1, 100); // gerar valor aleatório entre 1-100

    // o usuário tem que tirar um numero aleatório maior que minimo necessário para acertar
    if (resultado <= minimo)
        return false; // não conseguiu atingir o minimo necessário
    else
        return true; // conseguiu atingir o minimo necessário
}

// Ataque bruto
function calculoAtaque(tipo_ataque, resultado, personagem) {
    let dano = danoDefesa(tipo_ataque, personagem); // tenho o dano do ataque

    // se o personagem vai dar ataque critico ou se o valor do dado for mt alto, ele vai dar atk critico
    if (ataqueCritico(personagem) === true || resultado >= 95)
        dano += danoDefesa(tipo_ataque, personagem); // dano + dano critico


    return dano;
}

// Cálculo do dano final do personagem, esse valor sera tirado da defesa
function definicaoAtaqueFinal(tipo_ataque, personagem) {
    let p = (p_acerto_erro(tipo_ataque)) * 100; // em %
    let minimo = 100 - p;
    let resultado = gerarNumeroIntervalo(1, 100);
    let dano;

    if (resultado <= minimo)
        dano = 0;
    else
        dano = calculoAtaque(tipo_ataque, resultado, personagem);

    return dano;
}

////////////////////////////////////////////////////////////////
//              FUNÇÃO AUTOCOMPLETE, NÃO APAGAR               //
////////////////////////////////////////////////////////////////

$(function() {
    $("#search").autocomplete ({
        minLength: 2,
        source: "/autocomplete/"
    })
})