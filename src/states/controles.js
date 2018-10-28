DarkMaze.controlesState = function(game) {

}

function vuelta () { //Sirve para el debug, vuelve al menú principal
    game.state.start('menuppal');
}

DarkMaze.controlesState.prototype = {

    preload: function() {

    },

    create: function() {
        var texto = game.add.text(50, 100, 'Durante la primera ronda:', {font: '20px Courier', fill: '#c6f9ac'});
        var texto = game.add.text(50, 150, 'Minotauro: mov con flechas, correr SHIFT, antorcha P, romper roca, recoger antorcha y atrapar SPACE.', {font: '13px Courier', fill: '#ffffff'});
        var texto = game.add.text(50, 170, 'Teseo: mov con WASD, correr O, roca Q, invisibilidad M.', {font: '13px Courier', fill: '#ffffff'});

        var texto = game.add.text(50, 200, 'Durante la segunda ronda:', {font: '20px Courier', fill: '#c6f9ac'});
        var texto = game.add.text(50, 250, 'Minotauro: mov con WASD, correr O, antorcha P, romper roca, recoger antorcha y atrapar SPACE.', {font: '13px Courier', fill: '#ffffff'});
        var texto = game.add.text(50, 270, 'Teseo: mov con flechas, correr SHIFT, roca Q, invisibilidad M', {font: '13px Courier', fill: '#ffffff'});

        var texto = game.add.text(50, 400, 'Pulsa R para volver al menú principal (¡Mucha suerte!)', {font: '10px Courier', fill: '#c6f9ac'});
        var rkey= game.input.keyboard.addKey(Phaser.Keyboard.R);
        rkey.onDown.addOnce(vuelta, this);
        
    },

    start: function() {
        
    }

}