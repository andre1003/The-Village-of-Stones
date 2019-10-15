var stage1State = {
	create: function(){
		this.tempo = 99;
		this.posicaoHeroi = 130;
		this.executar = false;
		//Música e sons
		this.music = game.add.audio('teste_2');
		this.music.loop = true;
		this.music.volume = .5;
		this.music.play();
		
		this.keys = game.input.keyboard.createCursorKeys();
		this.keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);

		// Cenário
		this.cenario = game.add.sprite(0,0,'cenario_1');
		this.cenario.smoothed = false;
		this.cenario.scale.setTo(5,5);
		this.cenario.animations.add('stop',[0,1],0.8,true);

		// Botões
		this.btn_atacar = game.add.button(game.world.centerX - 485, 500, 'btn_atacar', this.btnAtacarAction, this, 0, 0, 1);
		this.btn_atacar.smoothed = false;
		this.btn_atacar.scale.setTo(4,4);
		this.btn_defesa = game.add.button(game.world.centerX - 285, 500, 'btn_defesa', this.btnDefesaAction, this, 0, 0, 1);
		this.btn_defesa.smoothed = false;
		this.btn_defesa.scale.setTo(4,4);
		this.btn_item = game.add.button(game.world.centerX - 85, 500, 'btn_item', this.btnItemAction, this, 0, 0, 1);
		this.btn_item.smoothed = false;
		this.btn_item.scale.setTo(4,4);
		this.btn_pedra = game.add.button(game.world.centerX + 125, 500, 'btn_pedra', this.btnPedraAction, this, 0, 0, 1);
		this.btn_pedra.smoothed = false;
		this.btn_pedra.scale.setTo(4,4);
		this.btn_executa = game.add.button(game.world.centerX + 325, 500, 'btn_executa', this.btnExecutaAction, this, 0, 0, 1);
		this.btn_executa.smoothed = false;
		this.btn_executa.scale.setTo(4,4);
			
		// Herói
		this.heroi = game.add.sprite(125,game.world.height - 385,'heroi');
		this.heroi.smoothed = false;
		this.heroi.scale.setTo(4,4);
		game.physics.arcade.enable(this.heroi);
		this.heroi.body.collideWorldBounds = true;
		this.heroi.animations.add('left',[0],10,true);
		this.heroi.animations.add('right',[0,1],10,true);
		this.heroi.animations.add('stop',[0,1],2,true);
		this.heroi.animations.add('atacar',[2,3,4,5,6,7],7,true);

		// Vilão
		this.vilao = game.add.sprite(945,game.world.height - 385,'magus');
		this.vilao.smoothed = false;
		this.vilao.scale.setTo(4,4);
		game.physics.arcade.enable(this.vilao);
		this.vilao.body.collideWorldBounds = true;
		this.vilao.animations.add('left',[0,1],10,true);
		this.vilao.animations.add('right',[0],10,true);
		this.vilao.animations.add('stop',[0,1],2,true);
		
		this.txt_score_heroi = game.add.text(16,16,'VIDA: 100',{fontSize:'32px',fill:'#fff'});
		this.txt_tempo = game.add.text(game.world.centerX, 16, '99', {fontSize:'32px',fill:'#fff'});
		this.txt_score_vilao = game.add.text(1030,16,'VIDA: 100',{fontSize:'32px',fill:'#fff'});
		this.vilao.tint = 0xffffff;
		game.time.events.loop(Phaser.Timer.SECOND, this.updateTempo, this);

		/*this.executar = false;
		this.cenario.animations.play('stop');
		this.heroi.animations.play('stop');
		this.heroi.body.velocity.x = 0;
		this.vilao.animations.play('stop');
		this.vilao.body.velocity.x = 0;*/
	},
	
	update: function(){
		this.cenario.animations.play('stop');

		if(this.executar == true) {
			/*if(this.tempo != this.tempo_final && this.opcao_heroi == 'defesa') {
				
			}*/

			

			


			

			if(this.tempo == this.tempo_final && this.opcao_heroi == 'defesa') {
				this.executar = false;

			}
			else if(this.tempo == this.tempo_final && this.opcao_heroi == 'ataque') {
				this.tempo_final = this.tempo - 2;
				this.opcao_heroi = 'defesa';
				this.opcao_vilao = 'ataque';
				this.jogadaHeroi();
				this.jogadaVilao();
			}
		} else {
			this.tempo_final = this.tempo - 2; 
			this.opcao_heroi = 'ataque';
			this.opcao_vilao = 'defesa';

			if(this.opcao_heroi == 'ataque') {
				if(this.vilao.tint != 0xffffff) 
					this.vilao.tint = 0xffffff;
				
				if(this.heroi.x != 125)
					this.heroi.x -= 5;

				if(this.vilao.x != 945)
					this.vilao.x -= 5;
			} else {
				if(this.heroi.tint != 0xffffff) 
					this.heroi.tint = 0xffffff;
				
				if(this.heroi.x != 125)
					this.heroi.x += 5;

				if(this.vilao.x != 945)
					this.vilao.x += 5;
			}

			this.heroi.animations.play('stop');
			this.vilao.animations.play('stop');
		}
	},

	updateTempo: function() {
		if(this.tempo > 0) {
		    this.tempo--;
		    this.txt_tempo.setText(this.tempo);
		}
	},

	btnAtacarAction: function() {
		console.log('click!');
	},

	btnDefesaAction: function() {
		console.log('click!');
	},

	btnItemAction: function() {
		console.log('click!');
	},

	btnPedraAction: function() {
		console.log('click!');
	},

	btnExecutaAction: function() {
		this.executar = true;
	},

	jogadaHeroi: function() {
		if(this.opcao_heroi == 'ataque') {
			if(this.heroi.x != 225) 
				this.heroi.x += 20;

			if(this.heroi.x == 225)
				this.heroi.animations.play('atacar');
		} 
		else if(this.opcao_heroi == 'defesa') {
			if(this.heroi.x != 105) {
				this.heroi.tint = 0xff0000;
				this.heroi.x -= 5;
			}

		}
	},

	jogadaVilao: function() {
		if(this.opcao_vilao == 'ataque') {
			if(this.vilao.x != 845) 
				this.vilao.x -= 20;

			if(this.heroi.x == 845)
				this.heroi.animations.play('stop');
		} 
		else if(this.opcao_vilao == 'defesa') {
			if(this.vilao.x != 965) {
				this.vilao.tint = 0xff0000;
				this.vilao.x += 5;
			}
		}
	}
};