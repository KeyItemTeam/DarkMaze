DarkMaze.menupjState = function(game) {

}

//Sirve para el debug, vuelve al menú principal
function vuelta () { 
    game.state.start('menuppal');
}

DarkMaze.menupjState.prototype = {

    preload: function() {

    },

    create: function() {
        
        game.add.text(50, 100, 'Enhorabuena, has llegado al menú de personajes OwO', {font: '20px Courier', fill: '#ffffff'});
        game.add.text(50, 300, 'Pulsa R para volver al menú principal [debug]', {font: '15px Courier', fill: '#ffffff'});
        var rkey= game.input.keyboard.addKey(Phaser.Keyboard.R);
        rkey.onDown.addOnce(vuelta, this);
        
    },

    start: function() {
        
    }

}