// https://phaser.io/examples/v2/text/display-text-word-by-word
var storyScreen7State = {
	create: function() {
        // Inserindo logo texto
	   var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
		logo.smoothed = false;
		logo.scale.setTo(0.6,0.6)
		logo.anchor.setTo(0.5, 0.5);
        logo.alpha = 0;

		game.add.tween(logo).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
		game.time.events.add(5000, function() {
			game.sound.stopAll();  game.state.start('mapa');
		}, this);
	}

};
