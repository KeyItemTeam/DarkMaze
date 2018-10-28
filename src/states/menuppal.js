DarkMaze.menuppalState = function(game) {

}

function irPartida () {
    game.state.start('partida');
}
function irControles () {
    game.state.start('controles');
}

DarkMaze.menuppalState.prototype = {

    preload: function() {

    },

    create: function() {

        var nombrejuego = game.add.text(100, 100, 'Dark Maze', {font: '50px Courier', fill: '#c6f9ac'});
        var creadores = game.add.text(150, 150, 'Un juego hecho por Key Item Team', {font: '15px Courier', fill: '#ffffff'});
        var instrucmenu = game.add.text(100, 320, '[DEBUG] Pulsa A para acceder al menú de selección de equipos', {font: '13px Courier', fill: '#ffffff'});

        button = game.add.button(400, 200, 'bpartida', irPartida);
        button.scale.setTo(0.5,0.5);
        button = game.add.button(600, 200, 'bcontroles', irControles);
        button.scale.setTo(0.5,0.5);

        
        var akey= game.input.keyboard.addKey(Phaser.Keyboard.A);

       
        akey.onDown.addOnce(this.start, this);


    },

    start: function() {
        game.state.start('menuequipos');

    }

}