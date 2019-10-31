var loadState = { // Objeto do Carregamento
	preload: function(){
		// Inserindo o texto 'CARREGANDO'
		var txt_carregando = game.add.text(game.world.centerX,150,'CARREGANDO...',{font:'25px pixel_arial_r',fill:'#fff'});
		txt_carregando.anchor.set(.5);
		
		// Inserindo a barra de progresso
		var progress_bar = game.add.sprite(game.world.centerX,250,'progress_bar');
		progress_bar.anchor.set(.5);
		game.load.setPreloadSprite(progress_bar);

		// Carregando os arquivos de logo
		game.load.image('logo','/static/jogo/img/logo.png');

		// Carregando os arquivos de cenário
		game.load.spritesheet('sprite_cenario_1','/static/jogo/img/cenario_1.png',240,120);
		//game.load.spritesheet('sprite_cenario_2','img/cenario_2.png',240,120);
		//game.load.spritesheet('sprite_cenario_3','img/cenario_3.png',240,120);
		//game.load.spritesheet('sprite_cenario_4','img/cenario_4.png',240,120);

		// Carregando os arquivos de botão
		game.load.spritesheet('btn_ataque', '/static/jogo/img/btn_ataque.png',40,20);
		game.load.spritesheet('btn_defesa', '/static/jogo/img/btn_defesa.png',40,20);
		game.load.spritesheet('btn_item', '/static/jogo/img/btn_item.png',40,20);
		game.load.spritesheet('btn_pedra', '/static/jogo/img/btn_pedra.png',40,20);
		game.load.spritesheet('btn_executa', '/static/jogo/img/btn_executa.png',40,20);

		// Carregando os arquivos de espaço para botão
		game.load.spritesheet('espaco_btn_1', '/static/jogo/img/espaco_btn.png',38,17);
		game.load.spritesheet('espaco_btn_2', '/static/jogo/img/espaco_btn.png',38,33);
		game.load.spritesheet('espaco_btn_3', '/static/jogo/img/espaco_btn.png',38,49);
		game.load.spritesheet('espaco_btn_4', '/static/jogo/img/espaco_btn.png',38,63);

		// Carregando os arquivos de personagem
		game.load.spritesheet('sprite_heroi','/static/jogo/img/heroi.png',30,50);
		//game.load.spritesheet('sprite_plox','img/plox.png',30,50);
		//game.load.spritesheet('sprite_zayin','img/zayin.png',30,50);
		game.load.spritesheet('sprite_magus','/static/jogo/img/magus.png',30,50);
		//game.load.spritesheet('sprite_voss','img/voss.png',30,50);	

		// Carregando os arquivos de áudio 
		game.load.audio('musica_menu_1','/static/jogo/audio/menu_1.mp3');
		game.load.audio('musica_menu_2','/static/jogo/audio/menu_2.mp3');
		// game.load.audio('som_clique_menu','audio/clique_menu.mp3');
		game.load.audio('musica_fase_1','/static/jogo/audio/fase_1.mp3');
		// game.load.audio('musica_fase_2','audio/fase_2.mp3');
		// game.load.audio('musica_fase_3','audio/fase_3.mp3');
		// game.load.audio('musica_fase_4','audio/fase_4.mp3');
		game.load.audio('som_clique_1','/static/jogo/audio/clique_1.mp3');
		game.load.audio('som_clique_2','/static/jogo/audio/clique_2.mp3');
		game.load.audio('som_ataque_heroi','/static/jogo/audio/ataque_heroi.ogg');
		game.load.audio('som_ataque_monstro','/static/jogo/audio/ataque_monstro.ogg');
		game.load.audio('musica_loser','/static/jogo/audio/loser.mp3');
		game.load.audio('musica_winner','/static/jogo/audio/winner.mp3');

		// Inicializando o sistema de física do game
		game.physics.startSystem(Phaser.Physics.ARCADE);
	},

	create: function() {
		// Iniciando o estado do menu
		game.state.start('menu');
	}
};
