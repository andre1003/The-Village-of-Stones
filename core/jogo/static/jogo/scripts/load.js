var loadState = {
	preload: function(){
		var txt_loading = game.add.text(game.world.centerX,150,'LOADING...',{font:'15px emulogic',fill:'#fff'});
		txt_loading.anchor.set(.5);

		var progress_bar = game.add.sprite(game.world.centerX,250,'progress_bar');
		progress_bar.anchor.set(.5);
			
		game.load.setPreloadSprite(progress_bar);

		// Carrega os arquivos de cenário
		game.load.spritesheet('cenario_1','../img/cenario_1.png',240,120);

		// Carrega os arquivos de botão
		game.load.spritesheet('btn_atacar', '../img/btn_atacar.png',40,20);
		game.load.spritesheet('btn_defesa', '../img/btn_defesa.png',40,20);
		game.load.spritesheet('btn_item', '../img/btn_item.png',40,20);
		game.load.spritesheet('btn_pedra', '../img/btn_pedra.png',40,20);
		game.load.spritesheet('btn_executa', '../img/btn_executa.png',40,20);
		
		//Carrega os arquivos de sprite 
		game.load.spritesheet('heroi','../img/heroi.png',30,50);
		game.load.spritesheet('magus','../img/magus.png',30,50);

		//Carrega os arquivos de áudio 
		game.load.audio('teste_1','../audio/teste_1.mp3');
		game.load.audio('teste_2','../audio/teste_2.mp3');

		// Inicializando o sistema de física do game
		game.physics.startSystem(Phaser.Physics.ARCADE);
	},

	create: function() {
		game.state.start('menu');
	}
};




































