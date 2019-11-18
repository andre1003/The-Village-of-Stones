var mapaState = {
	create: function() {
		this.musica_mapa = game.add.audio('musica_mapa_mundi');
		this.musica_mapa.loop = true;
		this.musica_mapa.volume = .5;
		this.musica_mapa.play();
		this.som_selecionar_fase = game.add.audio('som_selecionar_fase');

		this.cenario = game.add.sprite(0,0,'mapa_mundi');
		this.cenario.smoothed = false;
		this.cenario.scale.setTo(0.5,0.5);

		if(game.global.fase_concluida == 0) 
			this.heroi = game.add.sprite(195,game.world.height - 312,'sprite_heroi');
		else if(game.global.fase_concluida == 1)
			this.heroi = game.add.sprite(445,game.world.height - 312,'sprite_heroi');
		else if(game.global.fase_concluida == 2)
			this.heroi = game.add.sprite(695,game.world.height - 312,'sprite_heroi');
		else if(game.global.fase_concluida == 3)
			this.heroi = game.add.sprite(945,game.world.height - 312,'sprite_heroi');

		this.heroi.smoothed = false;
		this.heroi.scale.setTo(2,2);
		game.physics.arcade.enable(this.heroi);
		this.heroi.body.collideWorldBounds = true;
		this.heroi.animations.add('stop',[0,1],2,true);
		this.heroi.animations.add('atacar',[2,3,4,5,6,7],7,true);

		this.heroi.animations.play('stop');

		this.btn_lutar = game.add.button(game.world.centerX - 80, game.world.centerY + 130, 'btn_lutar', this.btnLutarAction, this, 0, 0, 1);
		this.btn_lutar.smoothed = false;
		this.btn_lutar.scale.setTo(4,4);
	},

	btnLutarAction: function() {	
		this.som_selecionar_fase.play();
		this.btn_lutar.setFrames(1);

		game.time.events.add(1000, function() {
				this.heroi.animations.stop();
	        	game.add.tween(this.cenario).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
	        	game.add.tween(this.heroi).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
	        	game.add.tween(this.btn_lutar).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
	    }, this);

		game.time.events.add(2000, function() {
	    	this.musica_mapa.stop();

	    	if(game.global.fase_concluida == 0)  
	    		game.state.start('pre_stage1'); // Inicializando o estado da pré-fase 1
			else if(game.global.fase_concluida == 1)
				game.state.start('pre_stage2'); // Inicializando o estado da pré-fase 2
			else if(game.global.fase_concluida == 2)
				game.state.start('pre_stage3'); // Inicializando o estado da pré-fase 3
			else if(game.global.fase_concluida == 3)
				game.state.start('pre_stage4'); // Inicializando o estado da pré-fase 4
	    }, this);
	}
};
