var preStage1State = { 
	create: function(){
		// Música e sons
		this.musica_fase1_dialogo = game.add.audio('musica_fase1_dialogo');
		this.musica_fase1_dialogo.loop = true;
		this.musica_fase1_dialogo.volume = .5;
		this.musica_fase1_dialogo.play();
		this.som_fase1_tela_preta = game.add.audio('som_fase1_tela_preta');

		this.finalizar = false;

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
		    "Plox: VOCÊ!?",
		    "Herói: Oi? AH, é você de novo Plox?",
		    "Plox: Você não vai tirar ela de mim!",
		    "Herói: Retirar o quê? Do que você está\nfalando?",
		    "Plox: Dessa jóia que achei atrás daquela\nárvore.",
		    "Herói: ...",
		    "Herói: Essa joia é... a... pedra elementar\ndo ar..."
		];

		this.index = 0;
		this.line = '';
		this.texto = game.add.text(180, 460, '', { font: "40px Montserrat", fill: "#000"});
		this.nextLine();
	},

	updateLine: function() {
	    if (this.line.length < this.content[this.index].length) {
	        this.line = this.content[this.index].substr(0, this.line.length + 1);
	        // text.text = line;
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
	    } else {
	    	if(this.finalizar == true) {
	    		this.monstro.animations.stop();
	    		this.monstro.animations.play('atacar');
	    		game.time.events.add(Phaser.Timer.SECOND * 1, function() {
	    			game.sound.stopAll();
	    			game.state.start('stage1');
	    		}, this);
	    	}
	    	else {
		    	this.cenario.visible = false;
		    	this.heroi.visible = false;
		    	this.monstro.visible = false;
		    	this.caixa_dialogo.visible = false;
		    	this.texto.visible = false;
		    	this.musica_fase1_dialogo.pause();
		    	this.som_fase1_tela_preta.play();
		    	game.time.events.add(Phaser.Timer.SECOND * 2, this.voltarDialogo, this);
		    }
	    }
	},

	voltarDialogo: function() {
		this.musica_fase1_dialogo.play();

		this.content = [
			"",
		    "Herói: Ela pertence ao reino, você não\npode ficar com ela.",
		    "Plox: Mas... Mas... ela é tão bonitinha...",
		    "Plox: QUERO ELA DE VOLTA!"
		];

		this.cenario.visible = true;
	    this.heroi.visible = true;
	    this.monstro.visible = true;
	    this.caixa_dialogo.visible = true;

	    this.index = 0;
		this.line = '';
		this.texto.text = '';
		this.nextLine();
	    this.texto.visible = true;
	    this.finalizar = true;
	}
};
