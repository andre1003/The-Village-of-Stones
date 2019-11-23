var preStage2State = { 
	create: function(){
		// Música e sons
		this.musica_fase2_dialogo = game.add.audio('musica_fase2_3_dialogo');
		this.musica_fase2_dialogo.loop = true;
		this.musica_fase2_dialogo.volume = .5;
		this.musica_fase2_dialogo.play();

		this.finalizar = false;

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
		this.monstro.animations.add('atacar',[2,3,4,5,6,7],7,true);
		
		// Iniciando as animações iniciais
    	this.cenario.animations.play('stop');
		this.heroi.animations.play('stop');
		this.monstro.animations.play('stop');

		this.caixa_dialogo = game.add.sprite(115,130,'caixa_dialogo');
		this.caixa_dialogo.smoothed = false;
		this.caixa_dialogo.scale.setTo(4,4);

		this.content = [
			"",
		    "Herói: Parado aí...",
		    "Zayin: ...",
		    "Zayin: Pois não?",
		    "Herói: Você sabe do que estou falando, você é um dos \nmonstro quer roubar..."
		];

		this.index = 0;
		this.line = '';
		this.texto = game.add.text(180, 460, '', { font: "30px Montserrat", fill: "#000"});
		this.nextLine();
	},

	updateLine: function() {
	    if (this.line.length < this.content[this.index].length) {
	        this.line = this.content[this.index].substr(0, this.line.length + 1);
	        this.texto.setText(this.line);
	    }
	    else {
	        //  Wait 2 seconds then start a new line
	        game.time.events.add(Phaser.Timer.SECOND * 3, this.nextLine, this);
	    }
	},

	nextLine: function() {
	    this.index++;

	    if (this.index < this.content.length) {
	        this.line = '';
	        game.time.events.repeat(20, this.content[this.index].length + 1, this.updateLine, this);
	    } 
	    else if(this.finalizar == true) {
	    	this.musica_fase2_dialogo.stop();
	    	game.state.start('stage2');
	    }
	    else {
	    	this.voltarDialogo();
	    	this.monstro.animations.play('atacar');
	    }
	},

	voltarDialogo: function() {
		this.content = [
			"",
			"Zayin: QUACK! QUACK! QUACK! NÃO ME FAÇA RIR.",
			"Herói: ???",
			"Zayin: Se quiser a pedra que tanto quer, venha pegar!"
			];

		game.time.events.add(1000, function() {
			this.monstro.animations.stop();
			this.monstro.animations.play('stop');
		}, this);

		this.index = 0;
		this.line = '';
		this.texto.text = '';
		this.nextLine();
	    this.finalizar = true;
	}
};
