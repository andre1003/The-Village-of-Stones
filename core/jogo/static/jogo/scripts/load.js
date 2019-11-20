var loadState = { // Objeto do Carregamento
	preload: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// Inserindo o texto 'CARREGANDO'
		var txt_carregando = game.add.text(game.world.centerX,150,'CARREGANDO...',{font:'25px pixel_arial_r',fill:'#fff'});
		txt_carregando.anchor.set(.5);
		
		// Inserindo a barra de progresso
		var progress_bar = game.add.sprite(game.world.centerX,250,'progress_bar');
		progress_bar.anchor.set(.5);
		game.load.setPreloadSprite(progress_bar);

		// Carregando o arquivo de logo
		game.load.image('logo','/static/jogo/img/logo.png');

		// Carregando os arquivos de fundo da introdução da história
		game.load.image('fundo_1','/static/jogo/img/tela_1.png');
		game.load.image('fundo_2','/static/jogo/img/tela_2.png');
		game.load.spritesheet('fundo_3','/static/jogo/img/tela_3.png',120,60);
		game.load.image('fundo_4','/static/jogo/img/tela_4.png');
		game.load.spritesheet('fundo_5','/static/jogo/img/tela_5.png',120,60);
		game.load.image('fundo_6','/static/jogo/img/tela_6.png');

		// Carregando o arquivo de mapa
		game.load.image('mapa_mundi','/static/jogo/img/mapa.png');

		// Carregando o arquivo de cenário
		game.load.spritesheet('sprite_cenario_1','/static/jogo/img/cenario_1.png',240,120);
		game.load.spritesheet('sprite_cenario_2','/static/jogo/img/cenario_2.png',240,120);
		game.load.spritesheet('sprite_cenario_3','/static/jogo/img/cenario_3.png',240,120);
		game.load.spritesheet('sprite_cenario_4','/static/jogo/img/cenario_4.png',240,120);

		// Carregando os arquivos de personagem
		game.load.spritesheet('sprite_heroi','/static/jogo/img/heroi.png',30,50);
		game.load.spritesheet('sprite_plox','/static/jogo/img/plox.png',30,50);
		game.load.spritesheet('sprite_zayin','/static/jogo/img/zayin.png',40,70);
		game.load.image('folha_zayin','/static/jogo/img/folha_zayin.png');
		game.load.spritesheet('sprite_magus','/static/jogo/img/magus.png',30,50);	
		game.load.spritesheet('sprite_voss','/static/jogo/img/voss.png',30,50);

		// Carregando os arquivos das pedras
		game.load.image('pedra_ar','/static/jogo/img/pedra_ar.png');
		game.load.image('pedra_agua','/static/jogo/img/pedra_agua.png');
		game.load.image('pedra_fogo','/static/jogo/img/pedra_fogo.png');
		game.load.image('pedra_terra','/static/jogo/img/pedra_terra.png');
 
		// Carregando os arquivos de ataque
		game.load.image('ataque_magico_1','/static/jogo/img/ataque_magico_1.png');
		game.load.image('ataque_magico_2','/static/jogo/img/ataque_magico_2.png');
		game.load.image('folha_zayin','/static/jogo/img/folha_zayin.png');
		game.load.spritesheet('trovao','/static/jogo/img/trovao.png',240,120);

		// Carregando o arquivo da caixa de diálogo
		game.load.image('caixa_dialogo','/static/jogo/img/dialogo.png');

		// Carregando os arquivos de botão
		game.load.spritesheet('btn_jogar', '/static/jogo/img/btn_jogar.png',40,20);
		game.load.spritesheet('btn_lutar', '/static/jogo/img/btn_lutar.png',40,20);
		game.load.spritesheet('btn_ok', '/static/jogo/img/btn_ok.png',40,20);
		game.load.spritesheet('btn_ataque', '/static/jogo/img/btn_ataque.png',40,20);
		game.load.spritesheet('btn_defesa', '/static/jogo/img/btn_defesa.png',40,20);
		game.load.spritesheet('btn_pedra', '/static/jogo/img/btn_pedra.png',40,20);
		game.load.spritesheet('btn_continuar', '/static/jogo/img/btn_continuar.png',60,30);
		game.load.spritesheet('btn_monstros', '/static/jogo/img/btn_monstros.png',60,30);
		game.load.spritesheet('btn_humanos', '/static/jogo/img/btn_humanos.png',60,30);		

		// Carregando o arquivo de barra para botão Ataque
		game.load.image('barra_ataque', '/static/jogo/img/barra_ataque.png');

		// Carregando os arquivos de barra para botão Pedra
		game.load.spritesheet('barra_pedra_1', '/static/jogo/img/barra_pedra.png',38,17);
		game.load.spritesheet('barra_pedra_2', '/static/jogo/img/barra_pedra.png',38,33);
		game.load.spritesheet('barra_pedra_3', '/static/jogo/img/barra_pedra.png',38,47);

		// Carregando o arquivo de Game Over
		game.load.image('game_over','/static/jogo/img/game_over.png');

		// Carregando os arquivos de áudio 
		game.load.audio('som_clique_1','/static/jogo/audio/clique_1.mp3');
		game.load.audio('som_clique_2','/static/jogo/audio/clique_2.mp3');
		game.load.audio('som_cura','/static/jogo/audio/cura.wav');
		game.load.audio('som_hit_basico','/static/jogo/audio/hit_basico.wav');
		game.load.audio('som_hit_magico','/static/jogo/audio/hit_magico.mp3');
		game.load.audio('som_errou','/static/jogo/audio/errou.wav');
		game.load.audio('som_morte_inimigo','/static/jogo/audio/morte_inimigo.ogg');
		game.load.audio('musica_menu','/static/jogo/audio/menu.mp3');
		game.load.audio('musica_intro_historia','/static/jogo/audio/intro_historia.mp3');
		game.load.audio('musica_mapa_mundi','/static/jogo/audio/mapa_mundi.mp3');
		game.load.audio('som_selecionar_fase','/static/jogo/audio/selecionar_fase.ogg');
		game.load.audio('musica_fase1_dialogo','/static/jogo/audio/fase1_dialogo.mp3');
		game.load.audio('som_fase1_tela_preta','/static/jogo/audio/fase1_tela_preta.mp3');
		game.load.audio('musica_fase1_intro','/static/jogo/audio/fase1_intro.mp3');
		game.load.audio('musica_fase1_loop','/static/jogo/audio/fase1_loop.mp3');
		game.load.audio('musica_fase2_3_dialogo','/static/jogo/audio/fase2_3_dialogo.mp3');
		game.load.audio('musica_fase2_batalha','/static/jogo/audio/fase2_batalha.mp3');
		game.load.audio('musica_fase3_batalha','/static/jogo/audio/fase3_batalha.mp3');
		game.load.audio('musica_fase4_dialogo','/static/jogo/audio/fase4_dialogo.mp3');
		game.load.audio('musica_fase4_batalha','/static/jogo/audio/fase4_batalha.mp3');
		game.load.audio('som_trovao','/static/jogo/audio/trovao.mp3');
		game.load.audio('musica_creditos','/static/jogo/audio/creditos.mp3');
		game.load.audio('musica_game_over','/static/jogo/audio/game_over.wav');

		// Inicializando o sistema de física do game
		game.physics.startSystem(Phaser.Physics.ARCADE);
	},

	create: function() {
		// Iniciando o estado do menu
		game.state.start('menu');
	}
};
