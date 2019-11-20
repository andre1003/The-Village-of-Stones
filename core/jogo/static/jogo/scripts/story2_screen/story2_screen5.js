var story2Screen5State = {
	create: function() {
		this.conteudo = [
			"Porém, em um dia de festa, os humanos roubaram as quatro pedras da vila. Tal situação gerou a",
			"desnutrição, a infelicidade e a morte de nossa terra e consequentemente de vários habitantes."
		];
		this.line = [];
		this.wordIndex = 0;
		this.lineIndex = 0;
		this.wordDelay = 100;
		this.lineDelay = 2500;

		this.fundo = game.add.sprite(0,0,'fundo_6');
		this.fundo.smoothed = false;
		this.fundo.scale.setTo(5,5);
		this.texto = game.add.text(115, 475, '', {font: "20px Montserrat", fill: "#fff"});
    	this.nextLine();
	},

	nextLine: function() {
	    if (this.lineIndex === this.conteudo.length)
	    {
	        //  We're finished
	        game.time.events.add(4400, function() {
	        	game.sound.volume = .2;      
	        	game.add.tween(this.fundo).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
	        	game.add.tween(this.texto).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
	        }, this);
	       
	        game.time.events.add(6400, function() {
	        	game.sound.stopAll();  
	        	game.state.start('end2_stage4');
	        }, this);
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
