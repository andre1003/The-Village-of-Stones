var menuState = {
	create: function(){
		this.music = game.add.audio('teste_1');
		this.music.loop = true;
		this.music.volume = .5;
		this.music.play();
		
		var txt_nome_game = game.add.text(game.world.centerX,150,"RPG Battle Dev",{font:'40px emulogic',fill:'#fff'});
		txt_nome_game.anchor.set(.5);
			
		var txt_press_start = game.add.text(game.world.centerX,550,'PRESS START',{font:'20px emulogic',fill:'#fff'});
		txt_press_start.anchor.set(.5);
			
		game.add.tween(txt_press_start).to({y:250},1000).start();
		
		game.time.events.add(1000,function(){		
			var enter_key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
				enter_key.onDown.addOnce(this.startGame,this);
		},this);
	},
	
	startGame: function(){
		this.music.stop();
		game.state.start('stage1');
	}
};
