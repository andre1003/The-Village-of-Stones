var end2Stage4State = { 
	create: function(){
		// Música e sons
		this.musica_fase4_dialogo = game.add.audio('musica_fase4_dialogo');
		this.musica_fase4_dialogo.loop = true;
		this.musica_fase4_dialogo.volume = 10.0;
		this.musica_fase4_dialogo.play();

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

		this.content = [
			"",
		    "Voss: Como você pode perceber, nós só queremos o \nque é nosso de volta.",
		    "Herói: Mas e meus amigos... meus familiares...",
		    "Voss: Isso ainda não justifica a injustiça que nós \nsofremos por conta de seu povo!",
		    "Herói: Eu... só queria salvar o dia... ",
		    "Voss: Salvar um dia não é relevante mediante aos \ndanos que foram causados na minha comunidade.",
		    "Herói: Mas eu amo meus conhecidos, meus familiares, \nmeus...",
		    "Voss: Como se monstros não amassem."
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
		else {
			this.texto.destroy();
			this.caixa_dialogo.visible = false;
			this.texto = game.add.text(240, 100, 'Qual vila que o herói mais justo de \n  HumanTown gostaria de salvar?', { font: "40px Montserrat bold", fill: "#fff"});
			this.texto.stroke = '#000000';
    		this.texto.strokeThickness = 3;			
			this.btn_humanos = game.add.button(game.world.centerX - 210, game.world.centerY + 30, 'btn_humanos', this.btnHumanosAction, this, 0, 0, 1);
			this.btn_humanos.smoothed = false;
			this.btn_humanos.scale.setTo(3,3);
			this.btn_monstros = game.add.button(game.world.centerX + 50, game.world.centerY + 30, 'btn_monstros', this.btnMonstrosAction, this, 0, 0, 1);
			this.btn_monstros.smoothed = false;
			this.btn_monstros.scale.setTo(3,3);
		}
	},

	btnHumanosAction: function() {
		this.btn_humanos.setFrames(1);
		game.global.escolha_jogador = 0;
		this.carregarCreditos();
	},

	btnMonstrosAction: function() {
		this.btn_monstros.setFrames(1);
		game.global.escolha_jogador = 1;
		this.carregarCreditos();
	},

	carregarCreditos: function() {
		game.time.events.add(500, function() {  
			game.add.tween(this.cenario).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);    
			game.add.tween(this.heroi).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);  
			game.add.tween(this.monstro).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);  
			game.add.tween(this.texto).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);  
			game.add.tween(this.btn_humanos).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);  
			game.add.tween(this.btn_monstros).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);  
		}, this);
		game.time.events.add(2000, function() { 
			this.musica_fase4_dialogo.stop();
			game.state.start('creditos1'); 
		}, this);
	}

};
