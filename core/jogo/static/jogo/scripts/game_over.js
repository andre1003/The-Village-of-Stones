var gameOverState = {
	create: function(){
		var musica;
		musica = game.add.audio('musica_game_over');
		musica.loop = true;
		musica.volume = .5;
		musica.play();

		this.cenario = game.add.sprite(0,0,'game_over');
		this.cenario.smoothed = false;
		this.cenario.scale.setTo(5,5);
		
		var txt_pressione_enter = game.add.text(game.world.centerX,450,'PRESSIONE ENTER',{font:'20px pixel_arial_r',fill:'#fff'});
		txt_pressione_enter.anchor.set(.5);
		txt_pressione_enter.alpha = 0;

		game.time.events.add(1000,function() {
			game.add.tween(txt_pressione_enter).to({alpha:1},500).to({alpha:0},500).loop().start();
			
			var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
				enterKey.onDown.addOnce(this.backToMenu,this);
		},this);
	},
	
	backToMenu: function(){
        game.sound.stopAll(); 
        // Inicializando o estado do menu
		game.state.start('menu');
	}
};
