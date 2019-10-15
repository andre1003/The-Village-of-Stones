var bootState = {
	preload: function(){
		game.load.image('progress_bar','static/jogo/img/progress_bar.png');
	},
	
	create: function(){
		game.state.start('load');
	}
};
