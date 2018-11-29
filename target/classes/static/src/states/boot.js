var DarkMaze = {}

DarkMaze.bootState = function (game) {

}

DarkMaze.bootState.prototype = {

	preload: function () {
		// Inicia las físicas
		game.physics.startSystem(Phaser.Physics.ARCADE);
	},

	create: function () {
		// Llamada al estado preload
		game.state.start('preload');
	}
}