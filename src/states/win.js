DarkMaze.winState = function(game) {

}

function vuelta () { //Sirve para el debug, vuelve al menú principal
    game.state.start('menuppal');
    if (partidas < 2) {
        game.state.start('partida');
    }
}

DarkMaze.winState.prototype = {

    preload: function() {

    },

    create: function() {

        if (!perseguidorWIN) {
            var texto = game.add.text(100, 200, 'Ganó Teseo.', {font: '30px Courier', fill: '#ffffff'});
        } else {
            var texto = game.add.text(100, 200, 'Ganó el minotauro.', {font: '30px Courier', fill: '#ffffff'});   
        }
        console.log(partidas);
        var texto1 = game.add.text(100, 400, 'Pulsa R para volver al menú ppal o iniciar 2da ronda [debug]', {font: '10px Courier', fill: '#ffffff'});
        var rkey= game.input.keyboard.addKey(Phaser.Keyboard.R);
        rkey.onDown.addOnce(vuelta, this);


        
    },

    start: function() {
        
    }

}