var end1Stage4State = { 
	create: function(){
		// Música e sons
		this.musica_fase4_dialogo = game.add.audio('musica_fase4_dialogo');
		this.musica_fase4_dialogo.loop = true;
		this.musica_fase4_dialogo.volume = 10.0;

		this.dialogo = true;

		// Cenário
		this.cenario = game.add.sprite(0,0,'sprite_cenario_4');
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
		this.monstro = game.add.sprite(945,game.world.height - 385,'sprite_voss');
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

		this.pedra_terra = game.add.sprite(game.world.centerX - 60, game.world.centerY - 220, 'pedra_terra');
		this.pedra_terra.smoothed = false;
		this.pedra_terra.scale.setTo(9,9);

		this.content = [
			"",
		    "Parabéns! Você conquistou a PEDRA DA TERRA.\nEssa é a última pedra do jogo, agora você tem toda as pedras.\nFinalmente a vila de HumanTown pode ser salva..."
		];

		this.index = 0;
		this.line = '';
		this.texto = game.add.text(300, 260, '', {font: "20px Montserrat", fill: "#fff"});
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
					game.add.tween(this.pedra_terra).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);    
					game.add.tween(this.texto).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
				}, this);
			game.time.events.add(4500, this.dialogoVoss, this);
		
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
	        	this.musica_fase4_dialogo.stop();
	        	// Iniciando o estado do mapa
	        	game.state.start('story2_screen1');
	    	}, this);	  	
	    }
	},

	dialogoVoss: function() {
		this.musica_fase4_dialogo.play();

	    this.content = [
			"",
			"Herói: Não quero que vocês apareçam nunca mais na \nnossa vila.",
			"Voss: Bom, você finalmente alcançou sua justiça, não \né?",
		    "Herói: Claro, agora minha vila pode voltar a viver em \npaz.",
			"Voss: Errado! Não é tão simples assim...",
			"Herói: Como assim?",
		    "Voss: Eu também tenho uma vila, gostaria de ouvir a \nhistória dela?",
		    "Herói: Acho melhor não, eu preciso ir.",
		    "Voss: É esse tipo de atitude a se esperar do herói mais \njusto de HumanTown?",
		    "Herói: Tudo bem... Tudo bem... Pode contá-la."
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
