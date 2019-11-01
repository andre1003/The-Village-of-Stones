var stage1State = { // Objeto da Fase 1
	addMusicaSons: function() { // Adiciona a música e os sons no jogo
		// Música e sons
		this.musica_fase_1 = game.add.audio('musica_fase_1');
		this.musica_fase_1.loop = true;
		this.musica_fase_1.volume = .5;
		this.musica_fase_1.play();
		this.som_ataque_heroi = game.add.audio('som_ataque_heroi');
		this.som_ataque_monstro = game.add.audio('som_ataque_monstro');
		this.som_clique_1 = game.add.audio('som_clique_1');
		this.som_clique_2 = game.add.audio('som_clique_2');
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

		// Monstro
		this.monstro = game.add.sprite(945,game.world.height - 385,'sprite_magus');
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
		this.btn_ataque = game.add.button(game.world.centerX - 485, 500, 'btn_ataque', this.btnAtaqueAction, this, 0, 0, 1);
		this.btn_ataque.smoothed = false;
		this.btn_ataque.scale.setTo(4,4);

		// Opções - Botão Ataque
		this.espaco_ataque = game.add.sprite(game.world.centerX - 485, 312, 'espaco_btn_3');
		this.espaco_ataque.smoothed = false;
		this.espaco_ataque.scale.setTo(4,4);	
		this.txt_ataque_basico_corporal = game.add.text(game.world.centerX - 460, 319, 'BASICO\nCORPORAL', {font: "15px pixel_arial_r", fill: "#fff", align: "center" });
		this.txt_ataque_basico_elementar = game.add.text(game.world.centerX - 463, 384, 'BASICO\nELEMENTAR', {font: "15px pixel_arial_r", fill: "#fff", align: "center" });
		this.txt_ataque_elementar_especial = game.add.text(game.world.centerX - 463, 449, 'ELEMENTAR\nESPECIAL', {font: "15px pixel_arial_r", fill: "#fff", align: "center" });
		

		// Defesa
		this.btn_defesa = game.add.button(game.world.centerX - 285, 500, 'btn_defesa', this.btnDefesaAction, this, 0, 0, 1);
		this.btn_defesa.smoothed = false;
		this.btn_defesa.scale.setTo(4,4);

		// Opções - Botão Defesa
		this.espaco_defesa = game.add.sprite(game.world.centerX - 285, 376, 'espaco_btn_2');
		this.espaco_defesa.smoothed = false;
		this.espaco_defesa.scale.setTo(4,4);
		this.txt_defesa_basica = game.add.text(game.world.centerX - 252, 397, 'BASICA', {font: "18px pixel_arial_r", fill: "#fff", align: "center" });
		this.txt_defesa_elementar = game.add.text(game.world.centerX - 277, 461, 'ELEMENTAR', {font: "18px pixel_arial_r", fill: "#fff", align: "center" });
		

		// Item
		this.btn_item = game.add.button(game.world.centerX - 85, 500, 'btn_item', this.btnItemAction, this, 0, 0, 1);
		this.btn_item.smoothed = false;
		this.btn_item.scale.setTo(4,4);

		// Opções - Botão Item
		this.espaco_item = game.add.sprite(game.world.centerX - 85, 256, 'espaco_btn_4');
		this.espaco_item.smoothed = false;
		this.espaco_item.scale.setTo(4,4);
		this.txt_item_1 = game.add.text(game.world.centerX - 42, 276, 'ITEM 1', {font: "18px pixel_arial_r", fill: "#ffffff", align: "center" });
		this.txt_item_2 = game.add.text(game.world.centerX - 42, 340, 'ITEM 2', {font: "18px pixel_arial_r", fill: "#ffffff", align: "center" });
		this.txt_item_3 = game.add.text(game.world.centerX - 42, 404, 'ITEM 3', {font: "18px pixel_arial_r", fill: "#ffffff", align: "center" });	
		this.txt_item_4 = game.add.text(game.world.centerX - 42, 465, 'ITEM 4', {font: "18px pixel_arial_r", fill: "#ffffff", align: "center" });
		

		// Pedra
		this.btn_pedra = game.add.button(game.world.centerX + 125, 500, 'btn_pedra', this.btnPedraAction, this, 0, 0, 1);
		this.btn_pedra.smoothed = false;
		this.btn_pedra.scale.setTo(4,4);

		// Opções - Botão Pedra
		this.espaco_pedra = game.add.sprite(game.world.centerX + 125, 312, 'espaco_btn_3');
		this.espaco_pedra.smoothed = false;
		this.espaco_pedra.scale.setTo(4,4);	
		this.txt_agua = game.add.text(game.world.centerX + 166, 330, 'AGUA', {font: "18px pixel_arial_r", fill: "#0077be", align: "center" });		
		this.txt_ar = game.add.text(game.world.centerX + 184, 396, 'AR', {font: "18px pixel_arial_r", fill: "#808080", align: "center" });		
		this.txt_fogo = game.add.text(game.world.centerX + 168, 460, 'FOGO', {font: "18px pixel_arial_r", fill: "#ffa500", align: "center" });		

		// Executa
		this.btn_executa = game.add.button(game.world.centerX + 325, 500, 'btn_executa', this.btnExecutaAction, this, 0, 0, 1);
		this.btn_executa.smoothed = false;
		this.btn_executa.scale.setTo(4,4);

		// Textos informativos
		this.txt_score_heroi = game.add.text(22,16,'VIDA: 100\nDANO: 25 (+0)\nDEFESA: 0', {font: "18px pixel_arial_r", fill:"#fff"});
		this.txt_score_monstro = game.add.text(1007,16,'VIDA: 100\nDANO: 25 (+0)\nDEFESA: 0', {font: "18px pixel_arial_r", fill:"#fff"});
		this.txt_tempo_turno = game.add.text(590, 16, '05', {font: "32px pixel_arial_r", fill:"#fff"});
		this.txt_turno = game.add.text(510, 64, 'TURNO: 01', {font: "32px pixel_arial_r", fill:"#fff"});
	},

	create: function(){
		// Variáveis do Jogo
		this.tempo_turno = 5;
		this.turno = 0;
		this.executar = false;
		this.clique = false;

		// Atributos Herói
		this.vida_heroi = 100; 
		this.dano_heroi = 25;
		this.dano_extra_heroi = 0;
		this.defesa_heroi = 0;
		this.agua = false;
		this.ar = false;
		this.fogo = false;
		this.item_1 = false;
		this.item_2 = false;
		this.item_3 = false;
		this.item_4 = false;

		// Atributos Monstro
		this.vida_monstro = 100; 
		this.dano_monstro = 25;
		this.dano_extra_monstro = 0;	
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
		/*if(this.tempo_turno == 0)
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
		}*/
	},

	atualizaTempo: function() {
		if(this.tempo_turno > 0) {
		    this.tempo_turno--;
		    this.txt_tempo_turno.setText(("0" + this.tempo_turno).slice(-2));
		}
	},

	atualizaScore: function() {
		this.txt_score_monstro.text = 'VIDA: ' + this.vida_monstro + '\nDANO: ' + this.dano_monstro + ' (+' + this.dano_extra_monstro + ')' + '\nDEFESA: ' + this.defesa_monstro;
		this.txt_score_heroi.text = 'VIDA: ' + this.vida_heroi + '\nDANO: ' + this.dano_heroi + ' (+' + this.dano_extra_heroi + ')' + '\nDEFESA: ' + this.defesa_heroi;
	},

	habilitarBotoes: function() { // Habilita os botões
		this.clique = false;
		this.btn_ataque.inputEnabled = true;
		this.btn_defesa.inputEnabled = true;
		this.btn_item.inputEnabled = true;
		this.btn_pedra.inputEnabled = true;
		this.btn_executa.inputEnabled = true;
	},

	desabilitarBotoes: function() { // Desabilita os botões
		this.btn_ataque.setFrames(0,0,0);
		this.btn_ataque.inputEnabled = false;
		this.btn_defesa.setFrames(0,0,0);
		this.btn_defesa.inputEnabled = false;
		this.btn_item.setFrames(0,0,0);
		this.btn_item.inputEnabled = false;
		this.btn_pedra.setFrames(0,0,0);
		this.btn_pedra.inputEnabled = false;
		this.btn_executa.setFrames(0,0,0);
		this.btn_executa.inputEnabled = false;
	},

	restaurarAnimacaoBotoes: function() {
		this.btn_ataque.setFrames(0,0,1);
		this.btn_defesa.setFrames(0,0,1);
		this.btn_item.setFrames(0,0,1);
		this.btn_pedra.setFrames(0,0,1);
		this.btn_executa.setFrames(0,0,1);
	},

	desativarOpcoes: function() { // Desativa as opções dos botões
		this.txt_ataque_basico_corporal.visible = false;
		this.txt_ataque_basico_corporal.inputEnabled = false;
		this.txt_ataque_basico_elementar.visible = false;
		this.txt_ataque_basico_elementar.inputEnabled = false;
		this.txt_ataque_elementar_especial.visible = false;
		this.txt_ataque_elementar_especial.inputEnabled = false;
		this.espaco_ataque.visible = false;
		this.txt_defesa_basica.visible = false;
		this.txt_defesa_basica.inputEnabled = false;
		this.txt_defesa_elementar.visible = false;
		this.txt_defesa_elementar.inputEnabled = false;
		this.espaco_defesa.visible = false;
		this.txt_item_1.visible = false;
		this.txt_item_1.inputEnabled = false;
		this.txt_item_2.visible = false;
		this.txt_item_2.inputEnabled = false;
		this.txt_item_3.visible = false;
		this.txt_item_3.inputEnabled = false;
		this.txt_item_4.visible = false;
		this.txt_item_4.inputEnabled = false;
		this.espaco_item.visible = false;
		this.txt_agua.visible = false;
		this.txt_agua.inputEnabled = false;
		this.txt_ar.visible = false;
		this.txt_ar.inputEnabled = false;
		this.txt_fogo.visible = false;
		this.txt_fogo.inputEnabled = false;
		this.espaco_pedra.visible = false;	
	},

	txtAtaqueBasicoCorporalAction: function() { // Ação ao clicar no botão Basico Corporal
		this.som_clique_2.play();
		this.dano_extra_heroi = 5;
		this.atualizaScore();
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
	}, 

	txtAtaqueBasicoElementarAction: function() { // Ação ao clicar no botão Basico Elementar
		this.som_clique_2.play();
		this.dano_extra_heroi = 10;
		this.atualizaScore();
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
	},

	txtAtaqueElementarEspecialAction: function() { // Ação ao clicar no botão Elementar Especial
		this.som_clique_2.play();
		this.dano_extra_heroi = 15;
		this.atualizaScore();
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
	},

	btnAtaqueAction: function() { // Ação ao clicar no botão Ataque
		this.som_clique_1.play();

		// Desativando os outros botões
		this.btn_defesa.inputEnabled = false;
		this.btn_item.inputEnabled = false;
		this.btn_pedra.inputEnabled = false;
		this.btn_executa.inputEnabled = false;

		if(this.clique == false) {
			this.clique = true;
			this.btn_ataque.setFrames(1);
			this.espaco_ataque.visible = true;	
			this.txt_ataque_basico_corporal.visible = true;
			this.txt_ataque_basico_corporal.inputEnabled = true;
			this.txt_ataque_basico_corporal.events.onInputDown.add(this.txtAtaqueBasicoCorporalAction, this);
			this.txt_ataque_basico_elementar.visible = true;
			this.txt_ataque_basico_elementar.inputEnabled = true;
			this.txt_ataque_basico_elementar.events.onInputDown.add(this.txtAtaqueBasicoElementarAction, this);
			this.txt_ataque_elementar_especial.visible = true;
			this.txt_ataque_elementar_especial.inputEnabled = true;
			this.txt_ataque_elementar_especial.events.onInputDown.add(this.txtAtaqueElementarEspecialAction, this);
		}
		else {
			this.clique = false;
			this.desativarOpcoes();
			this.habilitarBotoes();
			this.restaurarAnimacaoBotoes();
		}
	},

	txtDefesaBasicaAction: function() { // Ação ao clicar no botão Basica
		this.som_clique_2.play();
		this.defesa_heroi = 5;
		this.atualizaScore();
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
	},
 
	txtDefesaElementarAction: function() { // Ação ao clicar no botão Elementar
		this.som_clique_2.play();
		this.defesa_heroi = 10;
		this.atualizaScore();
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
	},

	btnDefesaAction: function() { // Ação ao clicar no botão Defesa
		this.som_clique_1.play();

		// Desativando os outros botões
		this.btn_ataque.inputEnabled = false;
		this.btn_item.inputEnabled = false;
		this.btn_pedra.inputEnabled = false;
		this.btn_executa.inputEnabled = false;

		if(this.clique == false) {
			this.clique = true;
			this.btn_defesa.setFrames(1);
			this.espaco_defesa.visible = true;
			this.txt_defesa_basica.visible = true;
			this.txt_defesa_basica.inputEnabled = true;
			this.txt_defesa_basica.events.onInputDown.add(this.txtDefesaBasicaAction, this);
			this.txt_defesa_elementar.visible = true;
			this.txt_defesa_elementar.inputEnabled = true;
			this.txt_defesa_elementar.events.onInputDown.add(this.txtDefesaElementarAction, this);
		}
		else {
			this.clique = false;
			this.desativarOpcoes();
			this.habilitarBotoes();
			this.restaurarAnimacaoBotoes();
		}
	},

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
		this.btn_defesa.inputEnabled = false;
		this.btn_pedra.inputEnabled = false;
		this.btn_executa.inputEnabled = false;

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

	txtAguaAction: function() { // Ação ao clicar no botão Agua
		this.som_clique_2.play();
		this.agua = true;
		this.ar = false;
		this.fogo = false;
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
	},

	txtArAction: function() { // Ação ao clicar no botão Ar
		this.som_clique_2.play();
		this.agua = false;
		this.ar = true;
		this.fogo = false;
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
	},
 
	txtFogoAction: function() { // Ação ao clicar no botão Fogo
		this.som_clique_2.play();
		this.agua = false;
		this.ar = false;
		this.fogo = true;
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
	},

	btnPedraAction: function() { // Ação ao clicar no botão Pedra
		this.som_clique_1.play();

		// Desativando os outros botões 
		this.btn_ataque.inputEnabled = false;
		this.btn_defesa.inputEnabled = false;
		this.btn_item.inputEnabled = false;
		this.btn_executa.inputEnabled = false;

		if(this.clique == false) { 
			this.clique = true;
			this.btn_pedra.setFrames(1);
			this.espaco_pedra.visible = true;
			this.txt_agua.visible = true;
			this.txt_agua.inputEnabled = true;
			this.txt_agua.events.onInputDown.add(this.txtAguaAction, this);
			this.txt_ar.visible = true;
			this.txt_ar.inputEnabled = true;
			this.txt_ar.events.onInputDown.add(this.txtArAction, this);
			this.txt_fogo.visible = true;
			this.txt_fogo.inputEnabled = true;
			this.txt_fogo.events.onInputDown.add(this.txtFogoAction, this);
		}
		else {
			this.clique = false;
			this.desativarOpcoes();
			this.habilitarBotoes();
			this.restaurarAnimacaoBotoes();
		}
	},

	btnExecutaAction: function() { // Ação ao clicar no botão Executa
		this.som_clique_1.play();
		this.executar = true;
	},

	opcoesMonstro: function() {
		// Opção de Ataque
		var opcao_ataque = Math.floor(Math.random() * 4);

		if(opcao_ataque == 0) 
			this.dano_extra_monstro = 0;
		else if(opcao_ataque == 1) 
			this.dano_extra_monstro = 5;
		else if(opcao_ataque == 2) 
			this.dano_extra_monstro = 10;
		else 
			this.dano_extra_monstro = 15;

		// Opção de Defesa
		var opcao_defesa = Math.floor(Math.random() * 4);

		if(opcao_defesa == 0) 
			this.defesa_monstro = 0;
		else if(opcao_defesa == 1) 
			this.defesa_monstro = 5;
		else 
			this.defesa_monstro = 10;
	
		this.atualizaScore();
	},

	ataqueHeroi: function() {
		this.som_ataque_heroi.play();
		this.heroi.animations.stop();

		if(this.agua == true)
			this.heroi.tint = 0x0077be;

		else if(this.ar == true)
			this.heroi.tint = 0x808080;

		else if(this.fogo == true)
			this.heroi.tint = 0xffa500;

		this.heroi.animations.play('atacar');
		var dado_monstro = Math.floor(Math.random() * 2);

		if(dado_monstro == 1) {
			this.vida_monstro -= this.dano_heroi + this.dano_extra_heroi - this.defesa_monstro;
			this.defesa_monstro = 0;

			if(this.vida_monstro < 0)
				this.vida_monstro = 0;

			this.monstro.tint = 0xff0000;
		}
		else 
			this.monstro.tint = 0x0000ff;

		this.dano_extra_heroi = 0;
		this.agua = false;
		this.ar = false;
		this.fogo = false;
		this.atualizaScore();
	},

	ataqueMonstro: function() {
		this.som_ataque_monstro.play();
		this.monstro.animations.stop();
		this.monstro.animations.play('atacar');
		var dado_heroi = Math.floor(Math.random() * 2);

		if(dado_heroi == 1) {
			this.vida_heroi -= this.dano_monstro + this.dano_extra_monstro - this.defesa_heroi;
			this.defesa_heroi = 0;

			if(this.vida_heroi < 0)
				this.vida_heroi = 0;

			this.heroi.tint = 0xff0000;
		}
		else {
			this.heroi.tint = 0x0000ff;
		}

		this.dano_extra_monstro = 0;
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
		if(this.opcao_estado == 1) {
			this.btn_executa.setFrames(0,0,1);
			this.habilitarBotoes();
		}
		
		this.heroi.animations.play('stop');
		this.monstro.animations.play('stop');

		if(this.vida_monstro <= 0) {
			game.global.vencedor = 1;
			// Iniciando o estado do fim
			game.sound.stopAll(); 
            game.state.start('end');
		}

		if(this.vida_heroi <= 0) {
			game.global.vencedor = 0;
			// Iniciando o estado do fim
			game.sound.stopAll(); 
			game.state.start('end');
		}
	},

	jogadaMonstro: function() {
		this.txt_turno.text = 'TURNO: ' + ("0" + this.turno).slice(-2);	

		if(this.dano_extra_heroi != 0) {
			this.dano_extra_heroi = 0;
			this.atualizaScore();
		}

		this.agua = false;
		this.ar = false;
		this.fogo = false;

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
			this.monstro.animations.play('right');
			game.add.tween(this.monstro).to({x: '120'}, 500, Phaser.Easing.Linear.None, true);
			this.heroi.animations.play('right');
			game.add.tween(this.heroi).to({x: '20'}, 500, Phaser.Easing.Linear.None, true);
			this.heroi.tint = 0xffffff;

			this.txt_turno.text = 'TURNO: ' + ("0" + parseInt(this.turno + 1)).slice(-2);
			this.tempo_turno = 6;
			this.timer.loop(1000, this.atualizaTempo, this);
    		this.timer.start();
		}

		this.opcao_estado = 1;
	}
};
