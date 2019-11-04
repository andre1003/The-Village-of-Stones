var menuState = { // Objeto do Menu
	create: function(){
		// Música
		this.musica_menu = game.add.audio('musica_menu');	
		this.musica_menu.loop = true;
		this.musica_menu.volume = .5;
		this.musica_menu.play();
		
		// Inserindo logo texto
		var logo = game.add.sprite(515, 40, 'logo');
		logo.smoothed = false;
		logo.scale.setTo(0.2,0.2)

		// Inserindo o texto 'PRESSIONE ENTER'	
		var txt_pressione_enter = game.add.text(game.world.centerX,550,'PRESSIONE ENTER',{font:'30px pixel_arial_r',fill:'#fff'});
		txt_pressione_enter.anchor.set(.5);
			
		game.add.tween(txt_pressione_enter).to({y:250},1000).start();
		
		game.time.events.add(1000,function(){		
			var enter_key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
				enter_key.onDown.addOnce(this.startGame,this);
		},this);
	},
	
	startGame: function(){
		this.musica_menu.stop();
		// Iniciando o estado da introdução da história
		game.state.start('story_screen1');
	}
};
