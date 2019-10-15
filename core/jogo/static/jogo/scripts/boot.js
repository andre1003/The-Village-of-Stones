var bootState = {
	preload: function(){
		game.load.image('progress_bar','../img/progress_bar.png');
	},
	
	create: function(){
		game.state.start('load');
	}
};
