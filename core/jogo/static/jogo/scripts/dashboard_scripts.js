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
        console.log('Exibindo a distribuição de vida por rodadas');
        console.log(data);

        // Gráfico de distribuição de probabilidades do personagem e do boss
        // Highcharts.chart('vida_personagem_boss', {
        //     // chart: { type: 'spline', }, // suaviza as curvas do gráfico
        //     title: { text: 'Vida do personagem no decorrer do jogo' },
        //     xAxis: { title: { text: 'Rodadas'}, min: 0, allowDecimals: false, },
        //     yAxis: { title:{ text: 'Quantidade de vida'}, min: 0, max: 100,},
        //     // legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle'},
        //     plotOptions: { series: { label: { connectorAllowed: false }, pointStart: 0 } },
        //     series: [
        //         {name: 'Usuário', data: dashboard_vida['vida']['personagem']},
        //         {name: 'Boss', data: dashboard_vida['vida']['boss']},
        //     ],
        //     responsive: {
        //         rules: [{ condition: { maxWidth: 1024 },
        //             chartOptions: { legend: { layout: 'horizontal', align: 'center', verticalAlign: 'bottom' } }
        //         }]
        //     }
        // });

        Highcharts.chart('vitorias-derrotas-rating', {
            chart: {
                plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false,
                type: 'pie', height: 350, width: 350,
            },
            legend: { align: 'center', verticalAlign: 'top', borderWidth: 0 },
            title: { text: 'Taxa de vitórias do jogador' },
            // subtitle: { text: 'Passe o mouse para mais detalhes' },
            tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>' },
            plotOptions: {
                pie: { allowPointSelect: false, cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '{point.percentage:.2f} %',
                        // format: '<b>{point.name}</b><br>{point.percentage:.2f} %',
                        distance: -55,
                        filter: { property: 'percentage', operator: '>', value: 4 },
                        style: { fontFamily: 'Montserrat', fontSize: '16px' }
                },
                    showInLegend: true, // ativa ou desativa a legenda
                }
            },
            series: [{
                name: 'Porcentagem',
                colorByPoint: true,
                data: [
                    // { name: 'Vitórias', y: 99, color: '#08AEEA' },
                    // { name: 'Derrotas', y: 1, color: '#FF4D43' },

                    { name: 'Vitórias', y: (100 - data['perc_vit_derrota']), color: '#08AEEA' },
                    { name: 'Derrotas', y: data['perc_vit_derrota'], color: '#FF4D43' },
                ]
            }]
        });


        Highcharts.chart('media_dano_fases', {
            chart: { type: 'column' },
            title: { text: undefined },
            xAxis: { title: { text: 'Fases' }, categories: [1, 2, 3, 4] },
            yAxis: { title: { text: 'Dano' }},
            tooltip: { valueDecimals: 3, },
            legend: { align: 'center', verticalAlign: 'top', borderWidth: 0 },
            credits: { enabled: false },
            series: [
                { name: 'Herói',
                    data: [
                        data['media_dano_jogos'][1],
                        data['media_dano_jogos'][2],
                        data['media_dano_jogos'][3],
                        data['media_dano_jogos'][4],
                    ],
                    color: '#FF4D43' },
                { name: 'Média Geral',
                    data: [
                        data['mediaGeral'][1],
                        data['mediaGeral'][2],
                        data['mediaGeral'][3],
                        data['mediaGeral'][4],
                    ], color: '#08AEEA' }
            ],
        });


        Highcharts.chart('vida_restante_fases', {
            chart: { type: 'column' },
            title: { text: undefined },
            // title: { text: 'Média de dano causado' },
            xAxis: { title: { text: 'Fases' }, categories: [1, 2, 3, 4] },
            yAxis: { title: { text: 'Média de dano' }},
            tooltip: { valueDecimals: 3, },
            legend: { align: 'center', verticalAlign: 'top', borderWidth: 0 },
            credits: { enabled: false },
            series: [
                { name: 'Herói', data: [
                    data['media_dano_jogos'][1],
                    data['media_dano_jogos'][2],
                    data['media_dano_jogos'][3],
                    data['media_dano_jogos'][4],
                    ],
                    color: '#FF4D43' },
                { name: 'Boss', data: [2, 2, 3, 2], color: '#08AEEA' }
            ],
        });

        // Gráfico de distribuição de probabilidades do personagem e do boss
        // Highcharts.chart('distribuicao_probabilidades', {
        //     // chart: { type: 'spline', }, // suaviza as curvas do gráfico
        //     // title: { text: 'Probabilidades do personagem no decorrer do jogo' },
        //     title: { text: undefined },
        //     xAxis: { title: { text: 'Rodadas' }, min: 0, allowDecimals: false },
        //     yAxis: { title: { text: 'Probabilidade' }, min: 0, max: 1, },
        //     // legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle'},
        //     plotOptions: { series: { label: { connectorAllowed: false }, pointStart: 0 } },
        //     series: [
        //         {name: 'Usuário', data: dashboard_vida['probabilidades']['personagem']},
        //         {name: 'Boss', data: dashboard_vida['probabilidades']['boss']},
        //     ],
        //     responsive: {
        //         rules: [{ condition: { maxWidth: 1024 },
        //             chartOptions: { legend: { layout: 'horizontal', align: 'center', verticalAlign: 'bottom' } }
        //         }]
        //     }
        // });

        // Highcharts.chart('distribuicao_probabilidades0', {
        //     chart: { type: 'spline', }, // suaviza as curvas do gráfico
        //     // title: { text: 'Probabilidades do personagem no decorrer do jogo' },
        //     title: { text: undefined },
        //     xAxis: { title: { text: 'Rodadas' }, min: 0, },
        //     yAxis: { title: { text: 'Probabilidade' }, min: 0, max: 1, },
        //     // legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle'},
        //     plotOptions: { series: { label: { connectorAllowed: false }, pointStart: 0 }, },
        //     series: [
        //         { name: 'Usuário', data: dashboard_vida['probabilidades']['personagem']},
        //         { name: 'Boss', data: dashboard_vida['probabilidades']['boss']},
        //     ],
        //     responsive: {
        //         rules: [{
        //             condition: { maxWidth: 1024 },
        //             chartOptions: { legend: { layout: 'horizontal', align: 'center', verticalAlign: 'bottom' } }
        //         }]
        //     }
        // });
    },
    complete:function(){},
    error:function (xhr, textStatus, thrownError){}
});


// Them ByGates :DDDD
Highcharts.theme = {
    // Cores dos gráficos (possíveis cores para as linhas
    colors: ['#08AEEA', '#2AF598', '#3D96AE', '#E20473', '#FF4D43'],
    chart: { backgroundColor: { color: 'rgba(28,28,41,0.8)', }, },
    title: {
        style: { color: 'rgba(255, 255, 255, 0.9)', font: 'bold 18px "Montserrat", Verdana, sans-serif' }
    },
    subtitle: {
        style: { color: 'rgba(255, 255, 255, 0.9)', font: '14px "Montserrat", Verdana, sans-serif' }
    },
    xAxis: {
        title: { style: { color: 'rgba(255, 255, 255, 1)', fontSize: '0.9rem'}},
        labels: { style: { color: 'rgba(255, 255, 255, 1)', fontSize: '0.9rem'}}
    },
    yAxis: {
        title: { style: { color: 'rgba(255, 255, 255, 1)', fontSize: '0.9rem'}},
        labels: { style: { color: 'rgba(255, 255, 255, 1)', fontSize: '0.9rem'}}
    },
    legend: {
        itemStyle: {
            fontSize: '0.9rem',
            font: '"Montserrat", Verdana, sans-serif', color: 'rgba(255, 255, 255, 1)'},
            itemHoverStyle: { color: 'rgba(255, 255, 255, 0.6)' }
    }
};
// Apply the theme
Highcharts.setOptions(Highcharts.theme);
