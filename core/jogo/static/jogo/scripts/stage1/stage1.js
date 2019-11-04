var stage1State = { // Objeto da Fase 1
	addMusicaSons: function() { // Adiciona a música e os sons no jogo
		// Música e sons
		this.musica_fase_1_loop = game.add.audio('musica_fase1_intro');
		this.musica_fase_1_loop.loop = true;
		this.musica_fase_1_loop.volume = .5;
		this.musica_fase_1_loop.play();
		this.som_clique_1 = game.add.audio('som_clique_1');
		this.som_clique_2 = game.add.audio('som_clique_2');
		this.som_hit_basico = game.add.audio('som_hit_basico');
		this.som_hit_magico = game.add.audio('som_hit_magico');
		this.som_errou = game.add.audio('som_errou');
		this.som_morte_inimigo = game.add.audio('som_morte_inimigo');
	},

	addObjetos: function() { // Adiciona os objetos na tela do jogo
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
		this.heroi.animations.add('left',[0],10,true);
		this.heroi.animations.add('right',[0,1],10,true);
		this.heroi.animations.add('stop',[0,1],2,true);
		this.heroi.animations.add('atacar',[2,3,4,5,6,7],7,true);

		// Ataque mágico do herói
		this.img_ataque_magico = game.add.sprite(360,game.world.height - 335,'ataque_magico');
		this.img_ataque_magico.smoothed = false;
		this.img_ataque_magico.scale.setTo(3,3);
		this.img_ataque_magico.visible = false;

		// Monstro
		this.monstro = game.add.sprite(945,game.world.height - 385,'sprite_plox');
		this.monstro.smoothed = false;
		this.monstro.scale.setTo(4,4);
		game.physics.arcade.enable(this.monstro);
		this.monstro.body.collideWorldBounds = true;
		this.monstro.animations.add('left',[0,1],10,true);
		this.monstro.animations.add('right',[0],10,true);
		this.monstro.animations.add('stop',[0,1],2,true);
		this.monstro.animations.add('atacar',[2,3,4,5,6,7],7,true);

		/* Botões */

		// Ataque
		this.btn_ataque = game.add.button(game.world.centerX - 350, 500, 'btn_ataque', this.btnAtaqueAction, this, 0, 0, 1);
		this.btn_ataque.smoothed = false;
		this.btn_ataque.scale.setTo(4,4);

		// Opções - Botão Ataque
		this.espaco_ataque = game.add.sprite(game.world.centerX - 350, 376, 'espaco_btn_2');
		this.espaco_ataque.smoothed = false;
		this.espaco_ataque.scale.setTo(4,4);	
		this.txt_ataque_basico = game.add.text(game.world.centerX - 322, 394, 'BASICO', {font: "20px pixel_arial_r", fill: "#fff", align: "center" });
		this.txt_ataque_magico = game.add.text(game.world.centerX - 325, 457, 'MAGICO', {font: "20px pixel_arial_r", fill: "#fff", align: "center" });
		

		// Defesa
		this.btn_defesa = game.add.button(game.world.centerX - 100, 500, 'btn_defesa', this.btnDefesaAction, this, 0, 0, 1);
		this.btn_defesa.smoothed = false;
		this.btn_defesa.scale.setTo(4,4);
		this.btn_defesa.inputEnabled = false;
		this.btn_defesa.tint = 0x808080;

		// Item
		this.btn_item = game.add.button(game.world.centerX + 150, 500, 'btn_item', this.btnItemAction, this, 0, 0, 1);
		this.btn_item.smoothed = false;
		this.btn_item.scale.setTo(4,4);
		this.btn_item.inputEnabled = false;
		this.btn_item.tint = 0x808080;

		// Opções - Botão Item
		this.espaco_item = game.add.sprite(game.world.centerX + 150, 256, 'espaco_btn_4');
		this.espaco_item.smoothed = false;
		this.espaco_item.scale.setTo(4,4);
		this.txt_item_1 = game.add.text(game.world.centerX + 190, 275, 'ITEM 1', {font: "20px pixel_arial_r", fill: "#ffffff", align: "center" });
		this.txt_item_2 = game.add.text(game.world.centerX + 190, 340, 'ITEM 2', {font: "20px pixel_arial_r", fill: "#ffffff", align: "center" });
		this.txt_item_3 = game.add.text(game.world.centerX + 190, 405, 'ITEM 3', {font: "20px pixel_arial_r", fill: "#ffffff", align: "center" });	
		this.txt_item_4 = game.add.text(game.world.centerX + 190, 465, 'ITEM 4', {font: "20px pixel_arial_r", fill: "#ffffff", align: "center" });

		// Textos informativos
		this.txt_score_heroi = game.add.text(22,16,'VIDA: 50\nDANO: 0\nDEFESA: 0', {font: "20px pixel_arial_r", fill:"#fff"});
		this.txt_score_monstro = game.add.text(1052,16,'VIDA: 50\nDANO: 0\nDEFESA: 0', {font: "20px pixel_arial_r", fill:"#fff"});
		this.txt_tempo_turno = game.add.text(590, 16, '15', {font: "32px pixel_arial_r", fill:"#fff"});
		this.txt_turno = game.add.text(510, 64, 'TURNO: 01', {font: "32px pixel_arial_r", fill:"#fff"});

		// Textos: dano recebido herói e vilão
		this.txt_dano_recebido_heroi = game.add.text(140,game.world.height - 410,'', {font: "20px pixel_arial_r", fill:"#c00"});
		this.txt_dano_recebido_monstro = game.add.text(1005,game.world.height - 370,'', {font: "20px pixel_arial_r", fill:"#c00"});
	},

	create: function(){
		// Variáveis do Jogo
		this.tempo_turno = 15;
		this.turno = 0;
		this.executar = false;
		this.clique = false;

		// Atributos Herói
		this.vida_heroi = 50; 
		this.dano_heroi = 0;
		this.defesa_heroi = 0;
		this.ataque_basico = false;
		this.ataque_magico = false;
		this.item_1 = false;
		this.item_2 = false;
		this.item_3 = false;
		this.item_4 = false;

		// Atributos Monstro
		this.vida_monstro = 50; 
		this.dano_monstro = 0;
		this.defesa_monstro = 0;

		// Música e sons
		this.addMusicaSons();

		// Objetos
		this.addObjetos();

		// Desativando as opções dos botões
		this.desativarOpcoes();
		
		// Atualizando o tempo do turno
		this.timer = game.time.create(false);
    	this.timer.loop(1000, this.atualizaTempo, this);
    	this.timer.start();
		
		// Iniciando as animações iniciais
    	this.cenario.animations.play('stop');
		this.heroi.animations.play('stop');
		this.monstro.animations.play('stop');
	},
	
	update: function(){	
		if(this.tempo_turno == 0)
			this.executar = true;

		if(this.executar == true) {
			this.btn_ataque.setFrames(0);
			this.desativarOpcoes();
			this.desabilitarBotoes();
			this.opcoesMonstro();

			if(this.tempo_turno != 0) {
				this.jogadaHeroi();
				game.time.events.add(Phaser.Timer.SECOND * 2, this.jogadaHeroi, this);
				game.time.events.add(Phaser.Timer.SECOND * 2.5, this.estadoInicial, this);
				game.time.events.add(Phaser.Timer.SECOND * 3, this.jogadaMonstro, this);
				game.time.events.add(Phaser.Timer.SECOND * 5, this.jogadaMonstro, this);
				game.time.events.add(Phaser.Timer.SECOND * 5.5, this.estadoInicial, this);
			}  else {
				this.tempo_turno = 1;
				this.jogadaMonstro();
				game.time.events.add(Phaser.Timer.SECOND * 2, this.jogadaMonstro, this);
				game.time.events.add(Phaser.Timer.SECOND * 2.5, this.estadoInicial, this);		
			}
			
			this.executar = false;
		}
	},

	atualizaTempo: function() {
		if(this.tempo_turno > 0) {
		    this.tempo_turno--;
		    this.txt_tempo_turno.setText(("0" + this.tempo_turno).slice(-2));
		}
	},

	atualizaScore: function() {
		this.txt_score_monstro.text = 'VIDA: ' + this.vida_monstro + '\nDANO: ' + this.dano_monstro + '\nDEFESA: ' + this.defesa_monstro;
		this.txt_score_heroi.text = 'VIDA: ' + this.vida_heroi + '\nDANO: ' + this.dano_heroi + '\nDEFESA: ' + this.defesa_heroi;
	},

	habilitarBotoes: function() { // Habilita os botões
		this.clique = false;
		this.btn_ataque.inputEnabled = true;
		//this.btn_defesa.inputEnabled = true;
		//this.btn_item.inputEnabled = true;
	},

	desabilitarBotoes: function() { // Desabilita os botões
		this.btn_ataque.setFrames(0,0,0);
		this.btn_ataque.inputEnabled = false;
		//this.btn_defesa.setFrames(0,0,0);
		//this.btn_defesa.inputEnabled = false;
		//this.btn_item.setFrames(0,0,0);
		//this.btn_item.inputEnabled = false;
	},

	restaurarAnimacaoBotoes: function() {
		this.btn_ataque.setFrames(0,0,1);
		//this.btn_defesa.setFrames(0,0,1);
		//this.btn_item.setFrames(0,0,1);
	},

	desativarOpcoes: function() { // Desativa as opções dos botões
		this.txt_ataque_basico.visible = false;
		this.txt_ataque_basico.inputEnabled = false;
		this.txt_ataque_magico.visible = false;
		this.txt_ataque_magico.inputEnabled = false;
		this.espaco_ataque.visible = false;
		this.txt_item_1.visible = false;
		this.txt_item_1.inputEnabled = false;
		this.txt_item_2.visible = false;
		this.txt_item_2.inputEnabled = false;
		this.txt_item_3.visible = false;
		this.txt_item_3.inputEnabled = false;
		this.txt_item_4.visible = false;
		this.txt_item_4.inputEnabled = false;
		this.espaco_item.visible = false;
	},

	txtAtaqueBasicoAction: function() { // Ação ao clicar no botão Basico
		this.som_clique_2.play();
		this.ataque_basico = true;
		this.ataque_magico = false;
		this.dano_heroi = definicaoAtaqueFinal('basico','heroi');
		this.atualizaScore();
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
		this.executar = true;
	}, 

	txtAtaqueMagicoAction: function() { // Ação ao clicar no botão Magico
		this.som_clique_2.play();
		this.ataque_basico = false;
		this.ataque_magico = true;
		this.dano_heroi = definicaoAtaqueFinal('magico','heroi');
		this.atualizaScore();
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
		this.executar = true;
	},

	btnAtaqueAction: function() { // Ação ao clicar no botão Ataque
		this.som_clique_1.play();

		// Desativando os outros botões
		//this.btn_defesa.inputEnabled = false;
		//this.btn_item.inputEnabled = false;

		if(this.clique == false) {
			this.clique = true;
			this.btn_ataque.setFrames(1);
			this.espaco_ataque.visible = true;	
			this.txt_ataque_basico.visible = true;
			this.txt_ataque_basico.inputEnabled = true;
			this.txt_ataque_basico.events.onInputDown.add(this.txtAtaqueBasicoAction, this);
			this.txt_ataque_magico.visible = true;
			this.txt_ataque_magico.inputEnabled = true;
			this.txt_ataque_magico.events.onInputDown.add(this.txtAtaqueMagicoAction, this);
		}
		else {
			this.clique = false;
			this.desativarOpcoes();
			this.habilitarBotoes();
			this.restaurarAnimacaoBotoes();
		}
	},

	/*btnDefesaAction: function() { // Ação ao clicar no botão Defesa
		this.som_clique_1.play();
		this.defesa_heroi = 0;
	},*/

	txtItem1Action: function() { // Ação ao clicar no botão Item 1
		this.som_clique_2.play();
		this.item_1 = true;
		this.item_2 = false;
		this.item_3 = false;
		this.item_4 = false;
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
	},

	txtItem2Action: function() { // Ação ao clicar no botão Item 2
		this.som_clique_2.play();
		this.item_1 = false;
		this.item_2 = true;
		this.item_3 = false;
		this.item_4 = false;
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
	},

	txtItem3Action: function() { // Ação ao clicar no botão Item 3
		this.som_clique_2.play();
		this.item_1 = false;
		this.item_2 = false;
		this.item_3 = true;
		this.item_4 = false;
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
	},

	txtItem4Action: function() { // Ação ao clicar no botão Item 4
		this.som_clique_2.play();
		this.item_1 = false;
		this.item_2 = false;
		this.item_3 = false;
		this.item_4 = true;
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
	},

	btnItemAction: function() { // Ação ao clicar no botão Item
		this.som_clique_1.play();

		// Desativando os outros botões 
		this.btn_ataque.inputEnabled = false;
		//this.btn_defesa.inputEnabled = false;

		if(this.clique == false) {
			this.clique = true;
			this.btn_item.setFrames(1);
			this.espaco_item.visible = true;
			this.txt_item_1.visible = true;
			this.txt_item_1.inputEnabled = true;
			this.txt_item_1.events.onInputDown.add(this.txtItem1Action, this);
			this.txt_item_2.visible = true;
			this.txt_item_2.inputEnabled = true;
			this.txt_item_2.events.onInputDown.add(this.txtItem2Action, this);
			this.txt_item_3.visible = true;
			this.txt_item_3.inputEnabled = true;
			this.txt_item_3.events.onInputDown.add(this.txtItem3Action, this);
			this.txt_item_4.visible = true;
			this.txt_item_4.inputEnabled = true;
			this.txt_item_4.events.onInputDown.add(this.txtItem4Action, this);
		}
		else {
			this.clique = false;
			this.desativarOpcoes();
			this.habilitarBotoes();
			this.restaurarAnimacaoBotoes();
		}
	},

	opcoesMonstro: function() {
		this.dano_monstro = definicaoAtaqueFinal('basico','plox');
		this.defesa_monstro = 0;
		this.atualizaScore();
	},

	ataqueHeroi: function() {
		if(this.ataque_basico == true && this.dano_heroi > 0) 
			this.som_hit_basico.play();
		else if(this.ataque_magico == true && this.dano_heroi > 0)
			this.som_hit_magico.play();
		else
			this.som_errou.play();
		
		this.heroi.animations.stop();
		this.heroi.animations.play('atacar');

		if(this.ataque_magico == true) {
			this.img_ataque_magico.visible = true;
			game.add.tween(this.img_ataque_magico).to({x: '550'}, 1000, Phaser.Easing.Linear.None, true);

		}

		this.vida_monstro -= this.dano_heroi - this.defesa_monstro;
		this.defesa_monstro = 0;

		if(this.vida_monstro < 0)
			this.vida_monstro = 0;

		this.txt_dano_recebido_monstro.visible = true;

		if(this.dano_heroi == 0) {
			this.txt_dano_recebido_monstro.text = 'ERROU';
			this.monstro.tint = 0xffffff;
		}
		else {
			this.txt_dano_recebido_monstro.text = '-' + this.dano_heroi;
			this.monstro.tint = 0xff0000;
		}

		this.dano_heroi = 0;
		this.atualizaScore();
	},

	ataqueMonstro: function() {
		if(this.dano_monstro > 0) 
			this.som_hit_basico.play();
		else
			this.som_errou.play();
			
		this.monstro.animations.stop();
		this.monstro.animations.play('atacar');
		this.vida_heroi -= this.dano_monstro - this.defesa_heroi;
		this.defesa_heroi = 0;

		if(this.vida_heroi < 0)
			this.vida_heroi = 0;

		this.txt_dano_recebido_heroi.visible = true;

		if(this.dano_monstro == 0) {
			this.txt_dano_recebido_heroi.text = 'ERROU';
			this.heroi.tint = 0xffffff;
		}
		else {
			this.txt_dano_recebido_heroi.text = '-' + this.dano_monstro;
			this.heroi.tint = 0xff0000;
		}

		this.dano_monstro = 0;
		this.atualizaScore();
	},

	jogadaHeroi: function() {
		if(this.heroi.x == 125) {
			this.timer.stop();
			this.turno +=1;
			this.txt_turno.text = 'TURNO: ' + ("0" + this.turno).slice(-2);
			this.heroi.animations.play('right');
			game.add.tween(this.heroi).to({x: '120'}, 1000, Phaser.Easing.Linear.None, true);
			this.monstro.animations.play('right');
			game.add.tween(this.monstro).to({x: '20'}, 1000, Phaser.Easing.Linear.None, true);
			game.time.events.add(Phaser.Timer.SECOND * 1, this.ataqueHeroi, this);  
		} 
		else if(this.heroi.x == 245) {
			if(this.ataque_magico == true) {
				this.img_ataque_magico.visible = false;  
				game.add.tween(this.img_ataque_magico).to({x: '-550'}, 1000, Phaser.Easing.Linear.None, true);
			} 
			
			this.txt_dano_recebido_monstro.visible = false;
			this.heroi.animations.play('left');
			game.add.tween(this.heroi).to({x: '-120'}, 500, Phaser.Easing.Linear.None, true);
			this.monstro.animations.play('left');
			game.add.tween(this.monstro).to({x: '-20'}, 500, Phaser.Easing.Linear.None, true);
			this.heroi.tint = 0xffffff;
			this.monstro.tint = 0xffffff;
		}

		this.opcao_estado = 0;
	},

	estadoInicial: function() {
		if(this.opcao_estado == 1) 
			this.habilitarBotoes();

		
		
		this.heroi.animations.play('stop');
		this.monstro.animations.play('stop');

		if(this.vida_monstro <= 0) {
			game.global.vencedor = 1;
			this.som_morte_inimigo.play();
			// Voltando para o menu
			game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
				game.sound.stopAll(); 
            	game.state.start('menu');
			}, this);
		}

		if(this.vida_heroi <= 0) {
			game.global.vencedor = 0;
			// Iniciando o estado do fim (Game Over)
			game.sound.stopAll(); 
			game.state.start('game_over');
		}
	},

	jogadaMonstro: function() {
		this.txt_turno.text = 'TURNO: ' + ("0" + this.turno).slice(-2);	

		if(this.monstro.x == 945) {
			this.timer.stop();
			this.turno +=1;
			this.txt_turno.text = 'TURNO: ' + ("0" + this.turno).slice(-2);
			this.monstro.animations.play('left');
			game.add.tween(this.monstro).to({x: '-120'}, 1000, Phaser.Easing.Linear.None, true);
			this.heroi.animations.play('left');
			game.add.tween(this.heroi).to({x: '-20'}, 1000, Phaser.Easing.Linear.None, true);
			game.time.events.add(Phaser.Timer.SECOND * 1, this.ataqueMonstro, this);
		}
		else if(this.monstro.x == 825) {
			this.txt_dano_recebido_heroi.visible = false;
			this.monstro.animations.play('right');
			game.add.tween(this.monstro).to({x: '120'}, 500, Phaser.Easing.Linear.None, true);
			this.heroi.animations.play('right');
			game.add.tween(this.heroi).to({x: '20'}, 500, Phaser.Easing.Linear.None, true);
			this.heroi.tint = 0xffffff;

			this.txt_turno.text = 'TURNO: ' + ("0" + parseInt(this.turno + 1)).slice(-2);
			this.tempo_turno = 16;
			this.timer.loop(1000, this.atualizaTempo, this);
    		this.timer.start();
		}

		this.opcao_estado = 1;
	}
};
