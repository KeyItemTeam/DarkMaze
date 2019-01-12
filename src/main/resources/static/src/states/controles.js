DarkMaze.controlesState = function(game) {

}

//Sirve para el debug, vuelve al menú principal
function vuelta () { 

    game.state.start('menuppal');

}

DarkMaze.controlesState.prototype = {

    preload: function() {

    },

    create: function() {

        //Se explican los controles (Temporales) del juego
        game.add.text(50, 100, 'Controles:', {font: '30px Courier', fill: '#c6f9ac'});
        game.add.text(50, 150, 'Mov con flechas de dirección, correr SHIFT.', {font: '20px Courier', fill: '#ffffff'});
        game.add.text(50, 170, 'Habilidad especial Q, Atacar (Solo Minotauro) SPACE.', {font: '20px Courier', fill: '#ffffff'});
        game.add.text(50, 170, ' ', {font: '20px Courier', fill: '#ffffff'});
        game.add.text(50, 200, 'Reglas', {font: '30px Courier', fill: '#c6f9ac'});
        game.add.text(50, 250, 'Minotauro: Deja antorchas para tapar el camino a Teseo y atrápalo con SPACE.', {font: '20px Courier', fill: '#ffffff'});
        game.add.text(50, 270, 'Teseo: Deja rocas para pararle los pies al Minotauro y aguanta hasta que se acabe el tiempo', {font: '20px Courier', fill: '#ffffff'});

        game.add.text(50, 400, 'Pulsa R para volver al menú principal (¡Mucha suerte!)', {font: '10px Courier', fill: '#c6f9ac'});
        var rkey= game.input.keyboard.addKey(Phaser.Keyboard.R);
        rkey.onDown.addOnce(vuelta, this);
        
    },

    start: function() {
        
    }

}