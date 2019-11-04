var loadState = { // Objeto do Carregamento
	preload: function(){
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

		// Carregando o arquivo de mapa
		game.load.image('mapa_mundi','/static/jogo/img/mapa.png');

		// Carregando o arquivo de cenário
		game.load.spritesheet('sprite_cenario_1','/static/jogo/img/cenario_1.png',240,120);

		// Carregando os arquivos de personagem
		game.load.spritesheet('sprite_heroi','/static/jogo/img/heroi.png',30,50);
		game.load.spritesheet('sprite_plox','/static/jogo/img/plox.png',30,50);
		game.load.spritesheet('sprite_zayin','/static/jogo/img/magus.png',30,50);
		game.load.spritesheet('sprite_magus','/static/jogo/img/zayin.png',30,50);	
		game.load.spritesheet('sprite_magus','/static/jogo/img/voss.png',30,50);

		// Carregando o arquivo de ataque mágico
		game.load.image('ataque_magico','/static/jogo/img/ataque_magico.png');

		// Carregando o arquivo da caixa de diálogo
		game.load.image('caixa_dialogo','/static/jogo/img/dialogo.png');

		// Carregando os arquivos de botão
		game.load.spritesheet('btn_ataque', '/static/jogo/img/btn_ataque.png',40,20);
		game.load.spritesheet('btn_defesa', '/static/jogo/img/btn_defesa.png',40,20);
		game.load.spritesheet('btn_item', '/static/jogo/img/btn_item.png',40,20);

		// Carregando os arquivos de espaço para botão
		game.load.spritesheet('espaco_btn_1', '/static/jogo/img/espaco_btn.png',38,17);
		game.load.spritesheet('espaco_btn_2', '/static/jogo/img/espaco_btn.png',38,33);
		game.load.spritesheet('espaco_btn_3', '/static/jogo/img/espaco_btn.png',38,49);
		game.load.spritesheet('espaco_btn_4', '/static/jogo/img/espaco_btn.png',38,63);	

		// Carregando o arquivo de Game Over
		game.load.image('game_over','/static/jogo/img/game_over.png');

		// Carregando os arquivos de áudio 
		game.load.audio('musica_menu','/static/jogo/audio/menu.mp3');
		game.load.audio('musica_intro_historia','/static/jogo/audio/intro_historia.mp3');
		game.load.audio('musica_mapa_mundi','/static/jogo/audio/mapa_mundi.mp3');
		game.load.audio('som_selecionar_fase','/static/jogo/audio/selecionar_fase.ogg');
		game.load.audio('musica_fase1_dialogo','/static/jogo/audio/fase1_dialogo.mp3');
		game.load.audio('som_fase1_tela_preta','/static/jogo/audio/fase1_tela_preta.mp3');
		game.load.audio('musica_fase1_intro','/static/jogo/audio/fase1_intro.mp3');
		game.load.audio('musica_fase1_loop','/static/jogo/audio/fase1_loop.mp3');
		game.load.audio('som_clique_1','/static/jogo/audio/clique_1.mp3');
		game.load.audio('som_clique_2','/static/jogo/audio/clique_2.mp3');
		game.load.audio('som_hit_basico','/static/jogo/audio/hit_basico.wav');
		game.load.audio('som_hit_magico','/static/jogo/audio/hit_magico.mp3');
		game.load.audio('som_errou','/static/jogo/audio/errou.wav');
		game.load.audio('som_morte_inimigo','/static/jogo/audio/morte_inimigo.ogg');
		game.load.audio('musica_game_over','/static/jogo/audio/game_over.wav');

		// Inicializando o sistema de física do game
		game.physics.startSystem(Phaser.Physics.ARCADE);
	},

	create: function() {
		// Iniciando o estado do menu
		game.state.start('menu');
	}
};
