// Apresentação biblioteca
var dashboard_vida = [];

// Esta função pega o JSON do jogo focando em retornar a vida do personagem pelo turno
// $(function () {
//     // var url = "get_ult_rodada";
//     //
//     // $.getJSON(url, function (res) {
//     //     /* transformando o dicionário em data */
//     //     return res;
//     // })
// });


function getVidaBossPersonagem() {
    console.log("Pegando o valor da ultima rodada");
    $.ajax({
        url:'/dashboard/vida/',
        type: "GET",
        data: {id_jogo: 1, csrfmiddlewaretoken: '{{ csrf_token }}'},
        dataType: 'json',
        //success:function(response){alert("OK");},
        success: function (data) {
            dashboard_vida = data;
            console.log(data);
            //ult_rodada = data;
        },
        complete:function(){},
        error:function (xhr, textStatus, thrownError){}
    });
}

$.ajax({
        url:'/dashboard/vida/',
        type: "GET",
        data: {id_jogo: 1, csrfmiddlewaretoken: '{{ csrf_token }}'},
        dataType: 'json',
        success: function (data) {
            dashboard_vida = data;
            console.log(data);
            //ult_rodada = data;

            Highcharts.chart('vida_personagem_boss', {
                title: {
                    text: 'Vida do personagem no decorrer do jogo'
                },

                //subtitle: {
                //    text: 'Source: thesolarfoundation.com'
                //},´
                xAxis: {
                        //categories: [1,2,3,4,5,6,7,8,9,10],
                        title: {
                           text: 'Rodadas'
                        },
                        min: 0,
                    },

                yAxis: {
                    title: {
                        text: 'Quantidade de vida'
                    },
                    min: 0,
                    max: 100,
                },
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

                series: [{
                    name: 'Usuário',
                    data: data['personagem']
                }, {
                    name: 'Boss',
                    data: data['boss']
                },],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'top'
                            }
                        }
                    }]
                }

            });


            Highcharts.chart('todas-probabilidades', {
                title: {
                    text: 'Vida do personagem no decorrer do jogo'
                },

                //subtitle: {
                //    text: 'Source: thesolarfoundation.com'
                //},´
                xAxis: {
                        //categories: [1,2,3,4,5,6,7,8,9,10],
                        title: {
                           text: 'Rodadas'
                        },
                        min: 0,
                    },

                yAxis: {
                    title: {
                        text: 'Quantidade de vida'
                    },
                    min: 0,
                    max: 100,
                },
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

                series: [{
                    name: 'Usuário',
                    data: data['personagem']
                }, {
                    name: 'Boss',
                    data: data['boss']
                },],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'top'
                            }
                        }
                    }]
                }

            }
            );
        },
        complete:function(){},
        error:function (xhr, textStatus, thrownError){}
    });