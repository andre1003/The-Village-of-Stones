var game = new Phaser.Game(1200,600,Phaser.AUTO, 'game-section');

game.global = {
	fase_concluida: 0,
	escolha_jogador: -1
};

/* Adicionando todos os estados */
game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);

game.state.add('story1_screen1', story1Screen1State);
game.state.add('story1_screen2', story1Screen2State);
game.state.add('story1_screen3', story1Screen3State);
game.state.add('story1_screen4', story1Screen4State);
game.state.add('story1_screen5', story1Screen5State);
game.state.add('story1_screen6', story1Screen6State);
game.state.add('story1_screen7', story1Screen7State);

game.state.add('mapa', mapaState);

game.state.add('pre_stage1', preStage1State);
game.state.add('stage1', stage1State);
game.state.add('end_stage1', endStage1State);

game.state.add('pre_stage2', preStage2State);
game.state.add('stage2', stage2State);
game.state.add('end_stage2', endStage2State);

game.state.add('pre_stage3', preStage3State);
game.state.add('stage3', stage3State);
game.state.add('end_stage3', endStage3State);

game.state.add('pre_stage4', preStage4State);
game.state.add('stage4', stage4State);
game.state.add('end1_stage4', end1Stage4State)
game.state.add('story2_screen1', story2Screen1State);
game.state.add('story2_screen2', story2Screen2State);
game.state.add('story2_screen3', story2Screen3State);
game.state.add('story2_screen4', story2Screen4State);
game.state.add('story2_screen5', story2Screen5State);;
game.state.add('end2_stage4', end2Stage4State);
game.state.add('creditos', creditosState);

game.state.add('game_over', gameOverState);

// Inicializando o estado do boot
game.state.start('boot');
