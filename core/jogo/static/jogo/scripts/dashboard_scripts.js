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
        console.log('Exibindo a distribuição de vida por rodadas');
        console.log(data);

        // Gráfico de distribuição de probabilidades do personagem e do boss
        Highcharts.chart('vida_personagem_boss', {
            // chart: { type: 'spline', }, // suaviza as curvas do gráfico
            title: { text: 'Vida do personagem no decorrer do jogo' },
            xAxis: { title: { text: 'Rodadas'}, min: 0, allowDecimals: false, },
            yAxis: { title:{ text: 'Quantidade de vida'}, min: 0, max: 100,},
            // legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle'},
            plotOptions: { series: { label: { connectorAllowed: false }, pointStart: 0 } },
            series: [
                {name: 'Usuário', data: dashboard_vida['vida']['personagem']},
                {name: 'Boss', data: dashboard_vida['vida']['boss']},
            ],
            responsive: {
                rules: [{ condition: { maxWidth: 1024 },
                    chartOptions: { legend: { layout: 'horizontal', align: 'center', verticalAlign: 'bottom' } }
                }]
            }
        });

        // Gráfico de distribuição de probabilidades do personagem e do boss
        Highcharts.chart('distribuicao_probabilidades', {
            // chart: { type: 'spline', }, // suaviza as curvas do gráfico
            title: { text: 'Probabilidades do personagem no decorrer do jogo' },
            xAxis: { title: { text: 'Rodadas' }, min: 0, allowDecimals: false },
            yAxis: { title: { text: 'Probabilidade' }, min: 0, max: 1, },
            // legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle'},
            plotOptions: { series: { label: { connectorAllowed: false }, pointStart: 0 } },
            series: [
                {name: 'Usuário', data: dashboard_vida['probabilidades']['personagem']},
                {name: 'Boss', data: dashboard_vida['probabilidades']['boss']},
            ],
            responsive: {
                rules: [{ condition: { maxWidth: 1024 },
                    chartOptions: { legend: { layout: 'horizontal', align: 'center', verticalAlign: 'bottom' } }
                }]
            }
        });

        Highcharts.chart('distribuicao_probabilidades0', {
            chart: { type: 'spline', }, // suaviza as curvas do gráfico
            title: { text: 'Probabilidades do personagem no decorrer do jogo' },
            xAxis: { title: { text: 'Rodadas' }, min: 0, },
            yAxis: { title: { text: 'Probabilidade' }, min: 0, max: 1, },
            // legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle'},
            plotOptions: { series: { label: { connectorAllowed: false }, pointStart: 0 }, },
            series: [
                { name: 'Usuário', data: dashboard_vida['probabilidades']['personagem']},
                { name: 'Boss', data: dashboard_vida['probabilidades']['boss']},
            ],
            responsive: {
                rules: [{
                    condition: { maxWidth: 1024 },
                    chartOptions: { legend: { layout: 'horizontal', align: 'center', verticalAlign: 'bottom' } }
                }]
            }
        });
    },
    complete:function(){},
    error:function (xhr, textStatus, thrownError){}
});


// Them ByGates :DDDD
Highcharts.theme = {
    // Cores dos gráficos (possíveis cores para as linhas
    colors: ['#08AEEA', '#89A54E', '#2AF598', '#3D96AE', '#E20473', '#FF4D43'],
    chart: { backgroundColor: { color: 'rgba(28,28,41,0.8)', }, },
    title: {
        style: { color: 'rgba(255, 255, 255, 0.9)', font: 'bold 16px "Montserrat", Verdana, sans-serif' }
    },
    xAxis: {
        title: { style: { color: 'rgba(255, 255, 255, 1)'}},
        labels: { style: { color: 'rgba(255, 255, 255, 1)'}}
    },
    yAxis: {
        title: { style: { color: 'rgba(255, 255, 255, 1)'}},
        labels: { style: { color: 'rgba(255, 255, 255, 1)'}}
    },
    legend: {
        itemStyle: {
            font: '9pt "Montserrat", Verdana, sans-serif', color: 'rgba(255, 255, 255, 1)' },
            itemHoverStyle: { color: 'rgba(255, 255, 255, 0.6)' }
    }
};
// Apply the theme
Highcharts.setOptions(Highcharts.theme);
