var gameOverState = {
	create: function(){
		var musica;
		musica = game.add.audio('musica_game_over');
		musica.volume = .5;
		musica.play();

		game.global.marca_morte = 1; // Marcando que o jogador morreu

		this.cenario = game.add.sprite(0,0,'game_over');
		this.cenario.smoothed = false;
		this.cenario.scale.setTo(5,5);
		
		this.btn_lutar = game.add.button(game.world.centerX - 80, game.world.centerY + 130, 'btn_continuar', this.btnLutarAction, this, 0, 0, 1);
		this.btn_lutar.smoothed = false;
		this.btn_lutar.scale.setTo(3,3);
	},
	
	btnLutarAction: function(){
	this.btn_lutar.setFrames(1);

		game.time.events.add(500, function() {  
			game.add.tween(this.cenario).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);    
	        game.add.tween(this.btn_lutar).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
	    }, this);

	    game.time.events.add(2000, function() {
	        game.sound.stopAll(); 
        	// Inicializando o estado do mapa
			game.state.start('mapa');
	    }, this);	
	}
};
