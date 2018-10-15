// var music;
// var loopCount;  <-- Ambas variables son para la música

DarkMaze.partidaState = function(game) {

}

function vuelta () { //Sirve para el debug, vuelve al menú principal
    game.state.start('menuppal');
}

DarkMaze.partidaState.prototype = {

    preload: function() {

    },

    create: function() {

     /* //Para añadir música
        music = game.add.audio('musica');
        music.play();
        music.loopFull(0.6); //pone el volumen a 0.6 */

        var instrucinicio = game.add.text(200, 500, 'Pulsa R para volver al menú principal [debug]', {font: '30px Courier', fill: '#ffffff'});
        var rkey= game.input.keyboard.addKey(Phaser.Keyboard.R);
        rkey.onDown.addOnce(vuelta, this);

        //Prepara el teclado para que el jugador humano pueda mover el sprite
        this.keyboard = game.input.keyboard;

        //Añade el sprite del minotauro y activa las físicas
        this.minotauro = game.add.sprite(400,200,'minotauro');
        this.minotauro.scale.setTo(0.75,0.75);
        this.minotauro.anchor.x = 0.5;
        game.physics.enable(this.minotauro,Phaser.Physics.ARCADE);

        //Añade el sprite de teseo y activa las físicas
        this.teseo = game.add.sprite(800,250,'teseo');
        this.teseo.scale.setTo(0.5,0.5);
        this.teseo.anchor.x = 0.5;
        game.physics.enable(this.teseo,Phaser.Physics.ARCADE);

    },

    update: function() {

    }

}