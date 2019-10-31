var endState = {
	create: function(){
		var txt_vencedor;
		var musica;

		if(game.global.vencedor == 0) {
			txt_vencedor = game.add.text(400,250,'MONSTRO VENCEDOR!',{font:'30px pixel_arial_r',fill:'#fff'});
			musica = game.add.audio('musica_loser');
			musica.loop = true;
			musica.volume = .5;
			musica.play();
		}
		else {
			txt_vencedor = game.add.text(430,250,'HEROI VENCEDOR!',{font:'30px pixel_arial_r',fill:'#fff'});
			musica = game.add.audio('musica_winner');
			musica.loop = true;
			musica.volume = .5;
			musica.play();
		}
		
		var txt_fim_jogo = game.add.text(game.world.centerX,400,'FIM DO JOGO!',{font:'20px pixel_arial_r',fill:'#fff'});
		txt_fim_jogo.anchor.set(.5);
		txt_fim_jogo.alpha = 0;

		game.time.events.add(3000,function() {
			game.add.tween(txt_fim_jogo).to({alpha:1},500).to({alpha:0},500).loop().start();
			
			var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
				enterKey.onDown.addOnce(this.backToMenu,this);
		},this);
	},
	
	backToMenu: function(){
        game.sound.stopAll(); 
        // Inicializando o estado do menu
		game.state.start('menu');
	}
};
