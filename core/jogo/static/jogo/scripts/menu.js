var menuState = { // Objeto do Menu
	create: function(){
		// Música
		this.musica_menu = game.add.audio('musica_menu');	
		this.musica_menu.loop = true;
		this.musica_menu.volume = .5;
		this.musica_menu.play();

		this.fundo = game.add.sprite(0,0,'fundo_3');
		this.fundo.smoothed = false;
		this.fundo.scale.setTo(10,10);
		this.fundo.animations.add('stop',[0,1],0.8,true);
		this.fundo.animations.play('stop');
		
		// Inserindo logo texto
		this.logo = game.add.sprite(515, 40, 'logo');
		this.logo.smoothed = false;
		this.logo.scale.setTo(0.2,0.2)

		this.btn_jogar = game.add.button(game.world.centerX - 80, game.world.centerY - 50, 'btn_jogar', this.btnJogarAction, this, 0, 0, 1);
		this.btn_jogar.smoothed = false;
		this.btn_jogar.scale.setTo(4,4);
	},
	
	btnJogarAction: function(){
		this.btn_jogar.setFrames(1);

		game.time.events.add(500, function() {  
			game.add.tween(this.fundo).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);    
	        game.add.tween(this.logo).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
	        game.add.tween(this.btn_jogar).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
	    }, this);

	    game.time.events.add(2000, function() {
	        this.musica_menu.stop();
	        // Iniciando o estado da introdução da história 1
	        game.state.start('end2_stage4');
	    }, this);
	}
};
