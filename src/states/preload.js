DarkMaze.preloadState = function(game) {

}

DarkMaze.preloadState.prototype = {
    
    preload: function() {
        //game.load.image("url a la imagen de fondo");

        //Mensaje de carga
        var loadinglabel = game.add.text(200, 200, "Cargando...", {font : '50px Courier', fill: '#ffffff'});

        //Se cargan los sprites
        game.load.image('minotauro','assets/images/placeholders/minotauro.png'); //Minotauro
        game.load.image('teseo','assets/images/placeholders/teseo.png'); //Teseo
        game.load.image('button','assets/images/placeholders/button.png'); //Botón
        //Podrían añadirse aquí el resto de imágenes del mismo modo

        // game.load.audio('nombre','url'); Si quisiésemos añadir música se carga aquí
    },

    create: function() {
        game.state.start('menuppal');
    },

    update: function() {

    }

}