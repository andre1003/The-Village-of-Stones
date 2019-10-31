var game = new Phaser.Game(1200,600,Phaser.AUTO, 'game-section');

game.global = {
	vencedor: 0
};

/* Adicionando todos os estados */
game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('stage1', stage1State);
game.state.add('end', endState);

// Inicializando o estado do boot
game.state.start('boot');
