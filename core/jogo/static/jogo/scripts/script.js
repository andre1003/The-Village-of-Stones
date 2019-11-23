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
function p_acerto_erro(tipo_ataque, personagem) {
    if(personagem === 'voss'){
        if (tipo_ataque === 'magico') {
            return 0.9;
        }
        else if (tipo_ataque === 'basico')
            return 0.9; 
    }
    else if(personagem === 'magus') {
        if (tipo_ataque === 'magico') {
            return 0.8;
        }
        else if (tipo_ataque === 'basico')
            return 0.7;
    }
    else {
        if (tipo_ataque === 'magico') {
            return 0.70;
        }
        else if (tipo_ataque === 'basico')
            return 0.85;
    }
                      
}

// esta função calcula o dano
function danoDefesa(tipo_ataque, personagem) {
    let dano = 0;
    if(personagem === 'heroi') {
        if (tipo_ataque === 'basico')
            dano = gerarNumeroIntervalo(1, 5);
        else if (tipo_ataque === 'magico')
            dano = gerarNumeroIntervalo(2, 7);
    }
    else if(personagem === 'plox') {
        dano = gerarNumeroIntervalo(1, 2);
    }
    else if(personagem === 'zayin') {
        if(tipo_ataque === 'basico')
            dano = gerarNumeroIntervalo(1, 5);
        else if(tipo_ataque === 'magico')
            dano = gerarNumeroIntervalo(1, 6); 
    }
    else if(personagem === 'magus') {
        if(tipo_ataque === 'basico')
            dano = gerarNumeroIntervalo(1, 7);
        else if(tipo_ataque === 'magico')
            dano = gerarNumeroIntervalo(1, 8);
    }
    else if(personagem === 'voss') {
        if(tipo_ataque === 'basico')
            dano = gerarNumeroIntervalo(3, 6);
        else if(tipo_ataque === 'magico')
            dano = gerarNumeroIntervalo(3, 8);
    }

    return dano;
}

function ataqueCritico(personagem, numero_rodada) {
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
function calculoAtaque(tipo_ataque, resultado, personagem, numero_rodada) {
    let dano = danoDefesa(tipo_ataque, personagem); // tenho o dano do ataque

    // se o personagem vai dar ataque critico ou se o valor do dado for mt alto, ele vai dar atk critico
    if (ataqueCritico(personagem, numero_rodada) === true || resultado >= 95)
        dano += danoDefesa(tipo_ataque, personagem); // dano + dano critico

    return dano;
}

// Cálculo do dano final do personagem, esse valor sera tirado da defesa
function definicaoAtaqueFinal(tipo_ataque, personagem, numero_rodada) {
    let p = (p_acerto_erro(tipo_ataque, personagem)) * 100; // em %
    let minimo = 100 - p;
    let resultado = gerarNumeroIntervalo(1, 100);
    let dano;

    if (resultado <= minimo)
        dano = 0;
    else
        dano = calculoAtaque(tipo_ataque, resultado, personagem, numero_rodada);

    return dano;
}

// Essa função deve ser chamada quando o jogador optar por defender o ataque (botão defesa)
function CalculoDefesa(dano_total){
    let defesa = gerarNumeroIntervalo(1, 100);
    if (defesa >= 95) // Se a defesa for maior que 95, defesa absoluta
        dano_total = 0;
    else if (defesa >= 1 && defesa < 30) // Se a defesa estiver entre 1 e 20, defende o número da fase
        dano_total -= Math.floor(dano_total / 4);
    else if(defesa >= 30 && defesa < 70) // Se a defesa estiver entre 20 e 70, defende metade do dano
        dano_total -= Math.floor(dano_total / 2);
    else // Se a defesa estiver entre 70 e 95, defende 3/4 do dano total
        dano_total -= Math.floor((3 * dano_total) / 4);

    if (dano_total < 0)
        dano_total = 0;

    return dano_total;
}

// Essa função utiliza a pedra do ar (único item ativo)
function pedraAr(vida, fase) {
    if(fase == 4) {
        if(vida <= (45 - 2))
            vida += 2;
        else 
            vida = 45;   
    }
    else {
        if(vida <= (30 - 2))
            vida += 2;
        else 
            vida = 30;        
    }
    
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
});

///////////////////////////////////////////////////
//              FUNÇÃO AUTOCOMPLETE              //
///////////////////////////////////////////////////

function enviarDados(num_fase, num_rodada, vida_personagem, vida_boss, dano_personagem, defesa_personagem, opcao_ataque_personagem, tempo_decisao, personagem_atacou, defesa_personagem) {
    $.ajax({
        headers: {
            'X-CSRFTOKEN': csrf,
        },
        url:'/salvar_rodada/' + apelido_jogador + '/' + uuid_jogo,
        type: "POST",
        data: {
            num_fase: num_fase,
            num_rodada: num_rodada,
            vida_personagem:vida_personagem,
            vida_boss:vida_boss,
            dano_personagem:dano_personagem,
            defesa_personagem:defesa_personagem,
            opcao_ataque_personagem:opcao_ataque_personagem,
            tempo_decisao:tempo_decisao,
            personagem_atacou:personagem_atacou,
            defesa_personagem:defesa_personagem,
            csrfmiddlewaretoken: csrf
        },
        success:function(response){console.log('Rodada salva com sucesso.');},
        complete:function(){},
        error:function (xhr, status, error){console.log('erro');}
    });
}


function jogador_morreu() {
    $.ajax({
        headers: {
            'X-CSRFTOKEN': csrf,
        },
        url:'/jogador_morreu/' + apelido_jogador + '/' + uuid_jogo,
        type: "PATCH",
        data: {
            csrfmiddlewaretoken: csrf,
        },
        success:function(response){console.log('Morte do jogador salva com sucesso.');},
        complete:function(){},
        error:function (xhr, status, error){console.log('erro');}
    });
}


function jogador_passou_fase() {
    $.ajax({
        headers: {
            'X-CSRFTOKEN': csrf,
        },
        url:'/jogador_passou_fase/' + apelido_jogador + '/' + uuid_jogo,
        type: "POST",
        data: {
            csrfmiddlewaretoken: csrf,
        },
        success:function(response){console.log('Tentativa do jogador salva com sucesso.');},
        complete:function(){},
        error:function (xhr, status, error){console.log('erro');}
    });
}


function escolha_final(escolha_final) {
    $.ajax({
        headers: {
            'X-CSRFTOKEN': csrf,
        },
        url:'/escolha_final/' + apelido_jogador + '/' + uuid_jogo,
        type: "POST",
        data: {
            escolha_final: escolha_final,
            csrfmiddlewaretoken: csrf,
        },
        success:function(response){console.log('Escolha do jogador salva com sucesso.');},
        complete:function(){},
        error:function (xhr, status, error){console.log('erro');}
    });
}
