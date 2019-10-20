// Apresentação biblioteca
var dashboard_vida = [];
var dashboard_distribuicao_probabilidades = [];

// Esta função pega o JSON do jogo focando em retornar a vida do personagem pelo turno
// $(function () {
//     // var url = "get_ult_rodada";
//     //
//     // $.getJSON(url, function (res) {
//     //     /* transformando o dicionário em data */
//     //     return res;
//     // })
// });


// function getVidaBossPersonagem() {
//     console.log("Pegando o valor da ultima rodada");
//     $.ajax({
//         url:'/dashboard/vida/',
//         type: "GET",
//         data: {id_jogo: 1, csrfmiddlewaretoken: '{{ csrf_token }}'},
//         dataType: 'json',
//         //success:function(response){alert("OK");},
//         success: function (data) {
//             dashboard_vida = data;
//             console.log(data);
//             //ult_rodada = data;
//         },
//         complete:function(){},
//         error:function (xhr, textStatus, thrownError){}
//     });
// }

// Gráficos de vida no decorrer do game vindos do personagem e do boss
$.ajax({
    url:'/dashboard/vida/',
    type: "GET",
    data: {id_jogo: uuid_jogo, csrfmiddlewaretoken: '{{ csrf_token }}'},
    dataType: 'json',
    success: function (data) {
        dashboard_vida = data;
        console.log('Exibindo a distribuição de vida por rodadas\n');
        console.log(dashboard_vida);
        //ult_rodada = data;

        Highcharts.chart('vida_personagem_boss', {
            title: { text: 'Vida do personagem no decorrer do jogo' },
            //subtitle: {
            //    text: 'Source: thesolarfoundation.com'
            //},´
            xAxis: {
                allowDecimals: false, // impedindo que as rodadas sejas números reais
                // categories: [0,1,2,3,4,5,6,7,8,9,10],
                title: { text: 'Rodadas'}, min: 0,
            },

            yAxis: {title:{text: 'Quantidade de vida'}, min: 0, max: 100,},
            //legend: {
            //    layout: 'vertical',
            //   align: 'right',
            //    verticalAlign: 'middle'
            //},

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: true
                    },
                    pointStart: 0
                }
            },

            series: [
                {name: 'Usuário', data: data['vida']['personagem']},
                {name: 'Boss', data: data['vida']['boss']},
            ],

            responsive: {
                rules: [{
                    condition: {maxWidth: 500},
                    chartOptions: {
                        legend: {layout: 'horizontal', align: 'center', verticalAlign: 'top'}
                    }
                }]
            }
        });

        // Gráficos de distribuição de probabilidades do personagem e do boss
        Highcharts.chart('distribuicao_probabilidades', {
            title: { text: 'Probabilidades do personagem no decorrer do jogo' },
            //subtitle: {
            //    text: 'Source: thesolarfoundation.com'
            //},´
            xAxis: { title: { text: 'Rodadas' }, min: 0, },
            yAxis: { title: { text: 'Probabilidade' }, min: 0, max: 1, },
            //legend: {
            //    layout: 'vertical',
            //   align: 'right',
            //    verticalAlign: 'middle'
            //},
            plotOptions: { series: { label: { connectorAllowed: true }, pointStart: 0 } },

            series: [
                { name: 'Usuário', data: dashboard_distribuicao_probabilidades['personagem']},
                { name: 'Boss', data: dashboard_distribuicao_probabilidades['boss']},
            ],

            responsive: {
                rules: [{
                    condition: {maxWidth: 500},
                    chartOptions: {
                        legend: {layout: 'horizontal', align: 'center', verticalAlign: 'top'}
                    }
                }]
            }

        });
    },
    complete:function(){},
    error:function (xhr, textStatus, thrownError){}
});
