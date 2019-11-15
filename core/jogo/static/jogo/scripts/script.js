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
        return 0.6;
    }
    else if (tipo_ataque === 'basico')
        return 0.8;                   
}

// esta função calcula o dano
function danoDefesa(tipo_ataque, personagem) {
    let dano = 0;
    if(personagem === 'heroi') {
        if (tipo_ataque === 'basico')
            dano = gerarNumeroIntervalo(1, 5);
        else if (tipo_ataque === 'magico')
            dano = gerarNumeroIntervalo(1, 7);
    }
    else if(personagem === 'plox') {
        dano = gerarNumeroIntervalo(1, 4.3);
    }

    return dano;
}

function ataqueCritico(personagem) {
    let p = 0;

    if (personagem === 'heroi')
        p = poisson(numero_rodada, 2); // passa a rodada atual (media heroi = 2)
    else {
        p = poisson(numero_rodada, 5); // media vilão = 5
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

// Essa função deve ser chamada quando o jogador optar por defender o ataque (botão defesa)
function CalculoDefesa(dano_total, num_fase){
    let defesa = gerarNumeroIntervalo(1, 100);
    if (defesa >= 95)
        dano_total = 0; // defesa absoluta!
    else if (defesa > (num_fase * 10) && defesa <= (20 * num_fase))
        dano_total -= num_fase;

    if (dano_total < 0)
        dano_total = 0;

    return dano_total;
}

// Essa função utiliza a pedra do ar (único item ativo)
function usarPedra(vida, podeUsar) {
    if(podeUsar === true)
        return vida + 15;
    else
        return vida;
}

///////////////////////////////////////////////////
//              FUNÇÃO AUTOCOMPLETE              //
///////////////////////////////////////////////////

$(function() {
    $("#search").autocomplete ({
        minLength: 2,
        source: "/autocomplete/"
    })
})
