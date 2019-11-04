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

		this.heroi = game.add.sprite(195,game.world.height - 312,'sprite_heroi');
		this.heroi.smoothed = false;
		this.heroi.scale.setTo(2,2);
		game.physics.arcade.enable(this.heroi);
		this.heroi.body.collideWorldBounds = true;
		this.heroi.animations.add('stop',[0,1],2,true);
		this.heroi.animations.add('atacar',[2,3,4,5,6,7],7,true);

		this.heroi.animations.play('stop');

		this.txt_pressione_enter = game.add.text(game.world.centerX - 300,440,'PRESSIONE ENTER PARA INICIAR',{font:'30px pixel_arial_r',fill:'#fff'});
		game.time.events.add(1000,function(){		
			var enter_key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
				enter_key.onDown.addOnce(this.startPreStage1,this);
		},this);
	},

	startPreStage1: function() {	
		this.som_selecionar_fase.play();

		game.time.events.add(1000, function() {
				this.heroi.animations.stop();
	        	game.add.tween(this.cenario).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
	        	game.add.tween(this.heroi).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
	        	game.add.tween(this.txt_pressione_enter).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
	    }, this);

		game.time.events.add(2000, function() {
	    		game.sound.stopAll();
	    		 // Inicializando o estado da pré-fase 1
	    		game.state.start('pre_stage1');
	    }, this);
	}
};
