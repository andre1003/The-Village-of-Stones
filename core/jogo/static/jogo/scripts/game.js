var game = new Phaser.Game(1200,600,Phaser.CANVAS);

game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('stage1', stage1State);

game.state.start('boot');