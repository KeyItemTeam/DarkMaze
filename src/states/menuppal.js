DarkMaze.menuppalState = function(game) {

}

function irPartida () {
    game.state.start('partida');
}

DarkMaze.menuppalState.prototype = {

    preload: function() {

    },

    create: function() {

        var nombrejuego = game.add.text(100, 200, 'Dark Maze', {font: '50px Courier', fill: '#f44242'});
        var instrucinicio = game.add.text(200, 300, 'Pulsa W para iniciar la partida directamente [debug]', {font: '30px Courier', fill: '#ffffff'});
        var instrucmenu = game.add.text(200, 400, 'Pulsa A para acceder al menú de selección de equipos', {font: '30px Courier', fill: '#ffffff'});

        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        var akey= game.input.keyboard.addKey(Phaser.Keyboard.A);

        wkey.onDown.addOnce(irPartida, this);
        akey.onDown.addOnce(this.start, this);


    },

    start: function() {
        game.state.start('menuequipos');

    }

}