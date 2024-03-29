var endStage2State = { 
	create: function(){
		// Música e sons
		this.musica_fase2_dialogo = game.add.audio('musica_fase2_3_dialogo');
		this.musica_fase2_dialogo.loop = true;
		this.musica_fase2_dialogo.volume = .5;

		this.dialogo = true;	

		// Cenário
		this.cenario = game.add.sprite(0,0,'sprite_cenario_2');
		this.cenario.smoothed = false;
		this.cenario.scale.setTo(5,5);
		this.cenario.animations.add('stop',[0,1],0.8,true);

		// Herói
		this.heroi = game.add.sprite(125,game.world.height - 385,'sprite_heroi');
		this.heroi.smoothed = false;
		this.heroi.scale.setTo(4,4);
		game.physics.arcade.enable(this.heroi);
		this.heroi.body.collideWorldBounds = true;
		this.heroi.animations.add('stop',[0,1],2,true);

		// Monstro
		this.monstro = game.add.sprite(930,game.world.height - 472,'sprite_zayin');
		this.monstro.smoothed = false;
		this.monstro.scale.setTo(4,4);
		game.physics.arcade.enable(this.monstro);
		this.monstro.body.collideWorldBounds = true;
		this.monstro.animations.add('stop',[0,1],2,true);

		// Iniciando as animações iniciais
    	this.cenario.animations.play('stop');
		this.heroi.animations.play('stop');
		this.monstro.animations.play('stop');

		this.caixa_dialogo = game.add.sprite(115,130,'caixa_dialogo');
		this.caixa_dialogo.smoothed = false;
		this.caixa_dialogo.scale.setTo(4,4);

		this.cenario.visible = false;
	    this.heroi.visible = false;
	    this.monstro.visible = false;
	    this.caixa_dialogo.visible = false;

	    this.pedra_agua = game.add.sprite(game.world.centerX - 60, game.world.centerY - 220, 'pedra_agua');
		this.pedra_agua.smoothed = false;
		this.pedra_agua.scale.setTo(9,9);

		this.content = [
			"",
		    "Parabéns, você conquistou a PEDRA DA ÁGUA.\nEssa pedra possui um efeito PASSIVO que aumenta sua defesa em 2 pontos.\nNão é necessário clicar em nada para ativá-la."
		];

		this.index = 0;
		this.line = '';
		this.texto = game.add.text(200, 260, '', {font: "20px Montserrat", fill: "#fff"});
		this.nextLine();
	},

	updateLine: function() {
	    if (this.line.length < this.content[this.index].length) {
	        this.line = this.content[this.index].substr(0, this.line.length + 1);
	        this.texto.setText(this.line);
	    }
	    else {
	        //  Wait 3 seconds then start a new line
	        game.time.events.add(Phaser.Timer.SECOND * 3, this.nextLine, this);
	    }
	},

	nextLine: function() {
	    this.index++;

	    if (this.index < this.content.length) {
	        this.line = '';
	        game.time.events.repeat(20, this.content[this.index].length + 1, this.updateLine, this);
	    } 
	   	else if(this.dialogo == true) {
			game.time.events.add(3000, function() {  
					game.add.tween(this.pedra_agua).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);    
					game.add.tween(this.texto).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
				}, this);
			game.time.events.add(4500, this.dialogoZayin, this);
		
			this.dialogo = false;
		}	
	    else {
	    	game.time.events.add(2500, function() {  
				game.add.tween(this.cenario).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);    
		        game.add.tween(this.heroi).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
		         game.add.tween(this.monstro).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
		        game.add.tween(this.caixa_dialogo).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
		        game.add.tween(this.texto).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
	    	}, this);

	    	game.time.events.add(4000, function() {
	        	this.musica_fase2_dialogo.stop();
	        	// Iniciando o estado do mapa
	        	game.state.start('mapa');
	    	}, this);	  	
	    }
	},

	dialogoZayin: function() {
		this.musica_fase2_dialogo.play();

		this.content = [
		"",
		"Zayin: Você conseguiu o que queria...",
		"Herói: Claro! A minha vila depende disso! Devo retornar \na paz e promover a justiça!",
	    "Zayin: Ah... Você realmente acredita que trazendo as \npedras de volta a sua vila é sinônimo de justiça?",
	    "Herói: ... Sim...",
	    "Zayin: QUACK! QUACK! QUACK!"
	    ];

	    this.cenario.visible = true;
	    this.heroi.visible = true;
	    this.monstro.visible = true;
	    this.caixa_dialogo.visible = true;

	    this.index = 0;
		this.line = '';
		this.texto = game.add.text(180, 460, '', { font: "30px Montserrat", fill: "#000"});
		this.nextLine();
	}
};
