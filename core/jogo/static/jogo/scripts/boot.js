var bootState = { // Objeto do Boot
	preload: function(){
		// Carregando o arquivo da barra de progresso
		game.load.image('progress_bar','/static/jogo/img/progress_bar.png');
	},
	
	create: function(){
		// Iniciando o estado do carregamento
		game.state.start('load');
	}
};
