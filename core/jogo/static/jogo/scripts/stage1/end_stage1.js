var endStage1State = { 
	create: function(){
		// Música e sons
		this.musica_fase1_dialogo = game.add.audio('musica_fase1_dialogo');
		this.musica_fase1_dialogo.loop = true;
		this.musica_fase1_dialogo.volume = .5;
		this.musica_fase1_dialogo.play();

		// Cenário
		this.cenario = game.add.sprite(0,0,'sprite_cenario_1');
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
		this.monstro = game.add.sprite(945,game.world.height - 385,'sprite_plox');
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

		this.content = [
			"",
		    "Plox: Poxa... Só queria uma decoração para casa. \nBUAAAAAAAAAH!",
		    "Herói: Eu realmente não posso deixar você levar a \npedra.",
		    "Herói: Mas isso é bem estranho, eu achava que os \ntrês monstros levaram as quatro pedras... Como uma \ndelas veio parar aqui?",
		    "Plox: BUAAAAAAH!"
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
	        game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
	    }
	},

	nextLine: function() {
	    this.index++;

	    if (this.index < this.content.length) {
	        this.line = '';
	        game.time.events.repeat(20, this.content[this.index].length + 1, this.updateLine, this);
	    } 
	    else {
	    	game.time.events.add(500, function() {  
				game.add.tween(this.cenario).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);    
		        game.add.tween(this.heroi).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
		         game.add.tween(this.monstro).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
		        game.add.tween(this.caixa_dialogo).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
		        game.add.tween(this.texto).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
	    	}, this);

	    	game.time.events.add(2000, function() {
	        	this.musica_fase1_dialogo.stop();
	        	// Iniciando o estado do mapa
	        	game.state.start('mapa');
	    	}, this);	
	    }
	}
};
