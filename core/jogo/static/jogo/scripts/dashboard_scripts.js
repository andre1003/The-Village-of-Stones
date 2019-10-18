// Apresentação biblioteca
// var ult;

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
//             ult = data;
//             console.log(data);
//             //ult_rodada = data;
//         },
//         complete:function(){},
//         error:function (xhr, textStatus, thrownError){}
//     });
// }