var creditosState = { 
	create: function(){
		// Música e sons
		this.musica_creditos = game.add.audio('musica_creditos');
		this.musica_creditos.loop = true;
		this.musica_creditos.volume = .5;
		this.musica_creditos.play();

		if(game.global.escolha_jogador == 0) { 
			this.content = [
				"",
			    "O herói tomou sua decisão...\nSalvar a vila do humanos. \nA felicidade voltou a reinar novamente em HumanTown. \nPorém, no fundo o herói ficou assombrado por um pensamento. \nA felicidade não era para todos."
			];
		} 
		else if(game.global.escolha_jogador == 1) {
			this.content = [
				"",
				"O herói tomou sua decisão...\nSalvar a vila do monstros. \nA felicidade voltou a reinar novamente em MonsterTown. \nPorém, no fundo o herói ficou assombrado por um pensamento. \nA felicidade não era para todos."
			];
		}

		this.index = 0;
		this.line = '';
		this.texto = game.add.text(250, 180, '', { font: "20px Montserrat", fill: "#fff"});
		this.nextLine();
	},

	updateLine: function() {
	    if (this.line.length < this.content[this.index].length) {
	        this.line = this.content[this.index].substr(0, this.line.length + 1);
	        this.texto.setText(this.line);
	    }
	    else {
	        //  Wait 2 seconds then start a new line
	        game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
	    }
	},

	nextLine: function() {
	    this.index++;

	    if (this.index < this.content.length) {
	        this.line = '';
	        game.time.events.repeat(20, this.content[this.index].length + 1, this.updateLine, this);
	    } else {
	    	game.time.events.add(500, function() {  
				game.add.tween(this.texto).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);    
	        }, this);
	    	game.time.events.add(2000, function() { 
	    		this.musica_creditos.stop();
	    		game.state.start('menu'); 
	    	}, this);
	    }
	}
};
