DarkMaze.menupjState = function(game) {

}

function vuelta () { //Sirve para el debug, vuelve al menú principal
    game.state.start('menuppal');
}

DarkMaze.menupjState.prototype = {

    preload: function() {

    },

    create: function() {
        var texto = game.add.text(50, 100, 'Enhorabuena, has llegado al menú de personajes OwO', {font: '20px Courier', fill: '#ffffff'});
        var texto = game.add.text(50, 300, 'Pulsa R para volver al menú principal [debug]', {font: '15px Courier', fill: '#ffffff'});
        var rkey= game.input.keyboard.addKey(Phaser.Keyboard.R);
        rkey.onDown.addOnce(vuelta, this);
        
    },

    start: function() {
        
    }

}