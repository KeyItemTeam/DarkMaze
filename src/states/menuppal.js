DarkMaze.menuppalState = function(game) {

}

//Se accede a la partida
function irPartida () {

    game.state.start('partida');

}

 //Se accede a la pantalla donde se explican los contoles
function irControles () {

    game.state.start('controles');

}

DarkMaze.menuppalState.prototype = {

    preload: function() {

    },

    create: function() {

        game.add.text(100, 100, 'Dark Maze', {font: '50px Courier', fill: '#c6f9ac'});
        game.add.text(150, 150, 'Un juego hecho por Key Item Team', {font: '15px Courier', fill: '#ffffff'});
        game.add.text(100, 320, '[DEBUG] Pulsa A para acceder al menú de selección de equipos', {font: '13px Courier', fill: '#ffffff'});

        //Se crean los botones y se les asignan funciones
        button = game.add.button(400, 200, 'bpartida', irPartida);
        button.scale.setTo(0.5,0.5);
        button = game.add.button(600, 200, 'bcontroles', irControles);
        button.scale.setTo(0.5,0.5);

        var akey= game.input.keyboard.addKey(Phaser.Keyboard.A);

        //Al pulsar A, se va a la función start
        akey.onDown.addOnce(this.start, this);

    },
    
    //Se accede al menú de equipos (debug)
    start: function() {

        game.state.start('menuequipos');

    }

}