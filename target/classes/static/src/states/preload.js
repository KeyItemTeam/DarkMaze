DarkMaze.preloadState = function (game) {

}

DarkMaze.preloadState.prototype = {

	preload: function () {

		// Mensaje de carga
		game.add.text(200, 200, "Cargando...", {
			font: '50px Courier',
			fill: '#ffffff'
		});

		// Se cargan el mapa
		game.load.tilemap('map', 'assets/laberinto.json', null, Phaser.Tilemap.TILED_JSON);

		// Se cargan los sprites
		game.load.spritesheet('minotauro', 'assets/sprites/minotauro.png', 64, 64);
		game.load.spritesheet('teseo', 'assets/sprites/teseo.png', 64, 64);
		game.load.spritesheet('roca', 'assets/sprites/roca.png', 32, 32);
		game.load.spritesheet('antorcha', 'assets/sprites/antorcha.png', 32, 32);
		game.load.image('tiles', 'assets/tileset.png');
		game.load.image('pulso', 'assets/images/placeholders/pulso.png');
		game.load.image('button', 'assets/images/placeholders/button.png');
		game.load.image('bpartida', 'assets/images/partida1.png');
		game.load.image('bcontroles', 'assets/images/controles.png');

		// Se cargan los sonidos
		game.load.audio('bgm', 'assets/sounds/musica.mp3');
		game.load.audio('punch', 'assets/sounds/punch.mp3');
		game.load.audio('moo', 'assets/sounds/moo.mp3');
		game.load.audio('torch', 'assets/sounds/torch.mp3');
		game.load.audio('stone', 'assets/sounds/stone.mp3');

	},

	create: function () {
		// Cuando se carga todo, se accede al estado menú
		this.state.start('menuppal');
	},

	update: function () {

	}

}
