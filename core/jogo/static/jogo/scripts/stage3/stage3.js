var stage3State = { // Objeto da Fase 3
	addMusicaSons: function() { // Adiciona a música e os sons no jogo
		// Música e sons
		this.musica_fase_3_loop = game.add.audio('musica_fase3_batalha');
		this.musica_fase_3_loop.loop = true;
		this.musica_fase_3_loop.volume = .4;
		this.musica_fase_3_loop.play();
		this.som_clique_1 = game.add.audio('som_clique_1');
		this.som_clique_1.volume = .1;
		this.som_clique_2 = game.add.audio('som_clique_2');
		this.som_clique_2.volume = .1;
		this.som_hit_basico = game.add.audio('som_hit_basico');
		this.som_hit_basico.volume = .2;
		this.som_hit_magico = game.add.audio('som_hit_magico');
		this.som_hit_magico.volume = .2;
		this.som_cura = game.add.audio('som_cura');
		this.som_cura.volume = .2;
		this.som_errou = game.add.audio('som_errou');
		this.som_errou.volume = .2;
		this.som_morte_inimigo = game.add.audio('som_morte_inimigo');
		this.som_morte_inimigo.volume = .2;
	},

	addObjetos: function() { // Adiciona os objetos na tela do jogo
		// Cenário
		this.cenario = game.add.sprite(0,0,'sprite_cenario_3');
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
		this.img_ataque_magico_1 = game.add.sprite(360,game.world.height - 335,'ataque_magico_1');
		this.img_ataque_magico_1.smoothed = false;
		this.img_ataque_magico_1.scale.setTo(3,3);
		this.img_ataque_magico_1.visible = false;

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

		// Ataque mágico do monstro
		this.img_ataque_magico_2 = game.add.sprite(720,game.world.height - 330,'ataque_magico_2');
		this.img_ataque_magico_2.smoothed = false;
		this.img_ataque_magico_2.scale.setTo(3,3);
		this.img_ataque_magico_2.tint = 0xbd1111;
		this.img_ataque_magico_2.visible = false;

		/* Botões */

		// Ataque
		this.btn_ataque = game.add.button(game.world.centerX - 350, 500, 'btn_ataque', this.btnAtaqueAction, this, 0, 0, 1);
		this.btn_ataque.smoothed = false;
		this.btn_ataque.scale.setTo(4,4);

		// Opções - Botão Ataque
		this.barra_ataque = game.add.sprite(game.world.centerX - 350, 256, 'barra_ataque');
		this.barra_ataque.smoothed = false;
		this.barra_ataque.scale.setTo(4,4);	
		this.txt_ataque_basico = game.add.text(game.world.centerX - 322, 402, 'BASICO', {font: "20px pixel_arial_r", fill: "#fff", align: "center" });
		this.txt_ataque_magico = game.add.text(game.world.centerX - 325, 463, 'MAGICO', {font: "20px pixel_arial_r", fill: "#fff", align: "center" });
		
		// Defesa
		this.btn_defesa = game.add.button(game.world.centerX - 100, 500, 'btn_defesa', this.btnDefesaAction, this, 0, 0, 1);
		this.btn_defesa.smoothed = false;
		this.btn_defesa.scale.setTo(4,4);

		// Pedra
		this.btn_pedra = game.add.button(game.world.centerX + 150, 500, 'btn_pedra', this.btnPedraAction, this, 0, 0, 1);
		this.btn_pedra.smoothed = false;
		this.btn_pedra.scale.setTo(4,4);

		// Opções - Botão Pedra
		this.barra_pedra = game.add.sprite(game.world.centerX + 150, 376, 'barra_pedra_2');
		this.barra_pedra.smoothed = false;
		this.barra_pedra.scale.setTo(4,4);

		this.txt_ar = game.add.text(game.world.centerX + 205, 395, 'AR', {font: "20px pixel_arial_r", fill: "#ffffff", align: "center" });
		this.txt_agua = game.add.text(game.world.centerX + 189, 460, 'AGUA', {font: "20px pixel_arial_r", fill: "#808080", align: "center" });	

		// Textos informativos
		this.txt_score_heroi = game.add.text(42,26,'VIDA: 30\nDANO: 0\nDEFESA: 0', {font: "20px pixel_arial_r", fill:"#fff"});
		this.txt_score_heroi.stroke = '#000000';
    	this.txt_score_heroi.strokeThickness = 3;
		this.txt_score_monstro = game.add.text(1052,26,'VIDA: 30\nDANO: 0', {font: "20px pixel_arial_r", fill:"#fff"});
		this.txt_score_monstro.stroke = '#000000';
    	this.txt_score_monstro.strokeThickness = 3;
		this.txt_tempo_turno = game.add.text(590, 26, '15', {font: "32px pixel_arial_r", fill:"#fff"});
		this.txt_tempo_turno.stroke = '#000000';
    	this.txt_tempo_turno.strokeThickness = 3;
		this.txt_turno = game.add.text(510, 74, 'TURNO: 01', {font: "32px pixel_arial_r", fill:"#fff"});
		this.txt_turno.stroke = '#000000';
    	this.txt_turno.strokeThickness = 3;	

		// Textos: dano recebido herói e monstro
		this.txt_dano_recebido_heroi = game.add.text(140,game.world.height - 410,'', {font: "20px pixel_arial_r", fill:"#fff"});
		this.txt_dano_recebido_heroi.stroke = '#000000';
    	this.txt_dano_recebido_heroi.strokeThickness = 1;	
		this.txt_dano_recebido_monstro = game.add.text(1010,game.world.height - 370,'', {font: "20px pixel_arial_r", fill:"#fff"});
		this.txt_dano_recebido_monstro.stroke = '#000000';
    	this.txt_dano_recebido_monstro.strokeThickness = 1;		
	},

	create: function(){
		// Variáveis do Jogo
		this.tempo_turno = 15;
		this.turno = 0;
		this.executar = false;
		this.clique = false;

		// Atributos Herói
		this.vida_heroi = 30; 
		this.dano_heroi = 0;
		this.defesa_heroi = 0;
		this.defesa_heroi_habilitada = false;
		this.executar_defesa = false;
		this.ataque_basico_heroi = false;
		this.ataque_magico_heroi = false;
		this.ar = false;
		this.cont_ar = -1;

		// Atributos Monstro
		this.vida_monstro = 30; 
		this.dano_monstro_aux = 0;
		this.dano_monstro_total = 0;
		this.dano_monstro = 0;
		this.tipo_ataque_monstro = '';
		this.ataque_basico_monstro = false;
		this.ataque_magico_monstro = false;

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
			this.opcaoMonstro();
			let turno_salvar;

			if(this.tempo_turno != 0 && this.executar_defesa == false) {
				this.jogadaHeroi();
				game.time.events.add(Phaser.Timer.SECOND * 2, this.jogadaHeroi, this);
				game.time.events.add(Phaser.Timer.SECOND * 2.5, this.estadoInicial, this);
				game.time.events.add(Phaser.Timer.SECOND * 3, this.jogadaMonstro, this);
				game.time.events.add(Phaser.Timer.SECOND * 5, this.jogadaMonstro, this);
				game.time.events.add(Phaser.Timer.SECOND * 5.5, this.estadoInicial, this);
				turno_salvar = this.turno;
			}  
			else if(this.tempo_turno == 0 || this.executar_defesa == true) {
				if(this.ar == true) {
					this.cont_ar += 1;
				}

				this.tempo_turno = 1;
				this.executar_defesa = false;
				this.turno +=1;
				this.jogadaMonstro();
				game.time.events.add(Phaser.Timer.SECOND * 2, this.jogadaMonstro, this);
				game.time.events.add(Phaser.Timer.SECOND * 2.5, this.estadoInicial, this);	
				turno_salvar = this.turno - 1;		
			}
		
			let tipo_ataque_h;
			let tipo_ataque_m = 'magico';
			let tempo_decisao = 15 - this.tempo_turno;

			// Enviando os dados do usuário
			if(this.ataque_basico === true)
				tipo_ataque_h = 'basico';
			else if(this.ataque_magico == true)
				tipo_ataque_h = 'magico';
			else
				tipo_ataque_h = 'nenhum'

			enviarDados(
				3, turno_salvar, this.vida_heroi,
				this.vida_monstro - this.dano_heroi, this.dano_heroi, this.defesa_heroi, tipo_ataque_h,
				tempo_decisao,true, this.defesa_heroi);

			// Enviando dados do boss
			if(this.opcao_ataque_monstro == 0)
				tipo_ataque_m = 'basico';

			enviarDados(
				3, turno_salvar+1, this.vida_heroi  - this.dano_monstro,
				this.vida_monstro - this.dano_heroi, this.dano_monstro, 0,
				tipo_ataque_m,0,false, 0);

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
		this.txt_score_monstro.text = 'VIDA: ' + this.vida_monstro + '\nDANO: ' + this.dano_monstro_total + '\n' + this.tipo_ataque_monstro;
		this.txt_score_heroi.text = 'VIDA: ' + this.vida_heroi + '\nDANO: ' + this.dano_heroi + '\nDEFESA: ' + this.defesa_heroi;
	},

	habilitarBotoes: function() { // Habilita os botões
		this.clique = false;
		this.btn_ataque.inputEnabled = true;
		this.btn_defesa.inputEnabled = true;
		this.btn_pedra.inputEnabled = true;
	},

	desabilitarBotoes: function() { // Desabilita os botões
		this.btn_ataque.setFrames(0,0,0);
		this.btn_ataque.inputEnabled = false;
		this.btn_defesa.inputEnabled = false;
		this.btn_pedra.setFrames(0,0,0);
		this.btn_pedra.inputEnabled = false;
	},

	restaurarAnimacaoBotoes: function() {
		this.btn_ataque.setFrames(0,0,1);
		this.btn_pedra.setFrames(0,0,1);
	},

	desativarOpcoes: function() { // Desativa as opções dos botões
		this.txt_ataque_basico.visible = false;
		this.txt_ataque_basico.inputEnabled = false;
		this.txt_ataque_magico.visible = false;
		this.txt_ataque_magico.inputEnabled = false;
		this.barra_ataque.visible = false;
		this.txt_ar.visible = false;
		this.txt_ar.inputEnabled = false;
		this.txt_agua.visible = false;
		this.barra_pedra.visible = false;
	},

	txtAtaqueBasicoAction: function() { // Ação ao clicar no botão Basico
		this.som_clique_2.play();
		this.ataque_basico_heroi = true;
		this.ataque_magico_heroi = false;
		this.dano_heroi = definicaoAtaqueFinal('basico','heroi',this.turno + 1);
		this.atualizaScore();
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
		this.executar = true;
	}, 

	txtAtaqueMagicoAction: function() { // Ação ao clicar no botão Magico
		this.som_clique_2.play();
		this.ataque_basico_heroi = false;
		this.ataque_magico_heroi = true;
		this.dano_heroi = definicaoAtaqueFinal('magico','heroi',this.turno + 1);
		this.atualizaScore();
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
		this.executar = true;
	},

	btnAtaqueAction: function() { // Ação ao clicar no botão Ataque
		this.som_clique_1.play();

		// Desativando os outros botões
		this.btn_defesa.inputEnabled = false;
		this.btn_pedra.inputEnabled = false;

		if(this.clique == false) {
			this.clique = true;
			this.btn_ataque.setFrames(1);
			this.barra_ataque.visible = true;	
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

	btnDefesaAction: function() { // Ação ao clicar no botão Defesa
		this.som_clique_1.play();
		this.defesa_heroi_habilitada = true;
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();
		this.executar_defesa = true;
		this.executar = true;
	},

	txtArAction: function() { // Ação ao clicar no botão Ar
		this.som_clique_2.play();
		this.desativarOpcoes();
		this.habilitarBotoes();
		this.restaurarAnimacaoBotoes();

		if(this.vida_heroi < 30) {
			this.som_cura.play();
			
			this.vida_heroi = pedraAr(this.vida_heroi, 3);

			this.cont_ar = 0;
			this.ar = true;
		}

		this.atualizaScore();
	},

	btnPedraAction: function() { // Ação ao clicar no botão Pedra
		this.som_clique_1.play();

		// Desativando os outros botões 
		this.btn_ataque.inputEnabled = false;
		this.btn_defesa.inputEnabled = false;

		if(this.clique == false) {
			this.clique = true;
			this.btn_pedra.setFrames(1);
			this.barra_pedra.visible = true;
			this.txt_ar.visible = true;

			if(this.cont_ar < 3 && this.cont_ar != -1) {
				this.txt_ar.inputEnabled = false;
				this.txt_ar.tint = 0x808080;	
			}
			else {
				if(this.vida_heroi == 30) {
					this.txt_ar.tint = 0x808080;	
					this.txt_ar.inputEnabled = false;
				}
				else {
					this.txt_ar.tint = 0xffffff;
					this.txt_ar.inputEnabled = true;
				}

				this.ar = false;	
			}

			this.txt_ar.events.onInputDown.add(this.txtArAction, this);
			this.txt_agua.visible = true;
		}
		else {
			this.clique = false;
			this.desativarOpcoes();
			this.habilitarBotoes();
			this.restaurarAnimacaoBotoes();
		}
	},

	opcaoMonstro: function() {
		this.opcao_ataque_monstro = gerarNumeroIntervalo(0, 2);

		if(this.opcao_ataque_monstro == 0) {
			this.dano_monstro_aux = definicaoAtaqueFinal('basico','magus',this.turno + 1);
			this.ataque_basico_monstro = true;
			this.ataque_magico_monstro = false;
		}
		else if(this.opcao_ataque_monstro == 1) {
			this.dano_monstro_aux = definicaoAtaqueFinal('magico','magus',this.turno + 1);
			this.ataque_basico_monstro = false;
			this.ataque_magico_monstro = true;
		}
		
		if(this.defesa_heroi_habilitada == true) {
			this.dano_monstro = CalculoDefesa(this.dano_monstro_aux, 4);

			if(this.dano_monstro >= 2)
				this.dano_monstro -= 2;
			else
				this.dano_monstro = 0;

			this.defesa_heroi = this.dano_monstro_aux - this.dano_monstro;
		} 
		else 
			this.dano_monstro = this.dano_monstro_aux;	

		this.atualizaScore();
	},

	ataqueHeroi: function() {
		if(this.ataque_basico_heroi == true && this.dano_heroi > 0) 
			this.som_hit_basico.play();
		else if(this.ataque_magico_heroi == true && this.dano_heroi > 0)
			this.som_hit_magico.play();
		else
			this.som_errou.play();
		
		this.heroi.animations.stop();
		this.heroi.animations.play('atacar');

		if(this.ataque_magico_heroi == true) {
			this.img_ataque_magico_1.visible = true;
			game.add.tween(this.img_ataque_magico_1).to({x: '550'}, 1000, Phaser.Easing.Linear.None, true);
		}

		this.vida_monstro -= this.dano_heroi;

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
		if(this.ataque_basico_monstro == true && this.dano_monstro > 0) 
			this.som_hit_basico.play();
		else if(this.ataque_magico_monstro == true && this.dano_monstro > 0)
			this.som_hit_magico.play();
		else
			this.som_errou.play();
			
		this.monstro.animations.stop();
		this.monstro.animations.play('atacar');

		if(this.ataque_magico_monstro == true) {
			this.img_ataque_magico_2.visible = true;
			game.add.tween(this.img_ataque_magico_2).to({x: '-520'}, 1000, Phaser.Easing.Linear.None, true);
		}

		this.vida_heroi -= this.dano_monstro;
		this.defesa_heroi = 0;

		if(this.vida_heroi < 0)
			this.vida_heroi = 0;

		this.txt_dano_recebido_heroi.visible = true;

		if(this.dano_monstro == 0) {
			if(this.defesa_heroi_habilitada == true && this.defesa_heroi != 0) 
				this.txt_dano_recebido_heroi.text = 'DEFESA TOTAL';	
			else
				this.txt_dano_recebido_heroi.text = 'ERROU';
			
			this.heroi.tint = 0xffffff;
		}
		else {
			this.txt_dano_recebido_heroi.text = '-' + this.dano_monstro;
			this.heroi.tint = 0xff0000;
		}

		this.defesa_heroi_habilitada = false;
		this.tipo_ataque_monstro = '';
		this.dano_monstro_total = 0;
		this.dano_monstro = 0;
		this.atualizaScore();
	},

	jogadaHeroi: function() {
		if(this.heroi.x == 125) {
			this.timer.stop();
			this.turno += 1;

			if(this.ar == true) {
				this.cont_ar += 1;
			}

			this.txt_turno.text = 'TURNO: ' + ("0" + this.turno).slice(-2);
			this.heroi.animations.play('right');
			game.add.tween(this.heroi).to({x: '120'}, 1000, Phaser.Easing.Linear.None, true);
			this.monstro.animations.play('right');
			game.add.tween(this.monstro).to({x: '20'}, 1000, Phaser.Easing.Linear.None, true);
			game.time.events.add(Phaser.Timer.SECOND * 1, this.ataqueHeroi, this);  
		} 
		else if(this.heroi.x == 245) {
			if(this.ataque_magico_heroi == true) {
				this.img_ataque_magico_1.visible = false;  
				game.add.tween(this.img_ataque_magico_1).to({x: '-550'}, 1000, Phaser.Easing.Linear.None, true);
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
			this.som_morte_inimigo.play();
			// Variável global que indica a fase concluída
			game.global.fase_concluida = 3;

			game.time.events.add(540, function() {
				this.musica_fase_3_loop.stop();
            	game.state.start('end_stage3');
			}, this);
		}

		if(this.vida_heroi <= 0) {
			// Iniciando o estado do fim (Game Over)
			this.musica_fase_3_loop.stop();
			game.state.start('game_over');
		}
	},

	jogadaMonstro: function() {
		this.txt_turno.text = 'TURNO: ' + ("0" + this.turno).slice(-2);	

		if(this.monstro.x == 945) {
			this.dano_monstro_total = this.dano_monstro_aux;

			if(this.ataque_basico_monstro == true)
				this.tipo_ataque_monstro = 'BASICO';
			else if(this.ataque_magico_monstro == true)
				this.tipo_ataque_monstro = 'MAGICO';

			this.atualizaScore();
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
			if(this.ataque_magico_monstro == true) {
				this.img_ataque_magico_2.visible = false;  
				game.add.tween(this.img_ataque_magico_2).to({x: '520'}, 1000, Phaser.Easing.Linear.None, true);
			} 

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
