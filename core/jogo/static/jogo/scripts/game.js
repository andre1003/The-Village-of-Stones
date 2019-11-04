var game = new Phaser.Game(1200,600,Phaser.AUTO, 'game-section');

game.global = {
	vencedor: 0
};

/* Adicionando todos os estados */
game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);

game.state.add('story_screen1', storyScreen1State);
game.state.add('story_screen2', storyScreen2State);
game.state.add('story_screen3', storyScreen3State);
game.state.add('story_screen4', storyScreen4State);
game.state.add('story_screen5', storyScreen5State);
game.state.add('story_screen6', storyScreen6State);
game.state.add('story_screen7', storyScreen7State);

game.state.add('mapa', mapaState);

game.state.add('stage1', stage1State);
game.state.add('pre_stage1', preStage1State);

game.state.add('game_over', gameOverState);

// Inicializando o estado do boot
game.state.start('boot');
