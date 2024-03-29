var creditos4State = {
	create: function() {
		if(game.global.escolha_jogador == 0) { 
			this.conteudo = [
				"Porém, no fundo o herói ficou assombrado por um pensamento."
			];
		} 
		else if(game.global.escolha_jogador == 1) {
			this.conteudo = [
				"Porém, no fundo o herói ficou assombrado por um pensamento."
			];
		}

		this.line = [];
		this.wordIndex = 0;
		this.lineIndex = 0;
		this.wordDelay = 100;
		this.lineDelay = 2500;

		this.texto = game.add.text(240, 270, '', {font: "20px Montserrat", fill: "#fff"});
    	this.nextLine();
	},

	nextLine: function() {
	    if (this.lineIndex === this.conteudo.length)
	    {
	        //  We're finished
	        game.time.events.add(2000, function() {      
	        	game.add.tween(this.texto).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
	        }, this);
	        game.time.events.add(4000, function() {game.state.start('creditos5');}, this);
	        return;
	    }

	    //  Split the current line on spaces, so one word per array element
	    this.line = this.conteudo[this.lineIndex].split(' ');

	    //  Reset the word index to zero (the first word in the line)
	    this.wordIndex = 0;

	    //  Call the 'nextWord' function once for each word in the line (line.length)
	    game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);

	    //  Advance to the next line
	    this.lineIndex++;

	},

	nextWord: function() {
	    //  Add the next word onto the text string, followed by a space
	    this.texto.text = this.texto.text.concat(this.line[this.wordIndex] + " ");

	    //  Advance the word index to the next word in the line
	    this.wordIndex++;

	    //  Last word?
	    if (this.wordIndex === this.line.length)
	    {
	        //  Add a carriage return
	        this.texto.text = this.texto.text.concat("\n");

	        //  Get the next line after the lineDelay amount of ms has elapsed
	        game.time.events.add(this.lineDelay, this.nextLine, this);
	    }
	}
};
