DarkMaze.preloadState = function(game) {

}

DarkMaze.preloadState.prototype = {
    
    preload: function() {
        //game.load.image("url a la imagen de fondo");

        //Mensaje de carga
        var loadinglabel = game.add.text(200, 200, "Cargando...", {font : '50px Courier', fill: '#ffffff'});

        //Se cargan los sprites
        
        game.load.spritesheet('minotauro', 'assets/sprites/minotauro.png', 64, 64,);//Minotauro
        game.load.spritesheet('teseo', 'assets/sprites/teseo.png', 64, 64,); //Teseo
        game.load.image('roca','assets/images/placeholders/roca.png'); 
        game.load.image('button','assets/images/placeholders/button.png'); //Botón
        game.load.tilemap('map', 'assets/laberinto.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/tileset.png');
        game.load.image('pulso', 'assets/images/placeholders/pulso.png');
        game.load.image('antorcha', 'assets/images/placeholders/antorcha.png');
        game.load.audio('bgm','assets/sounds/musica.mp3');
        game.load.audio('punch','assets/sounds/punch.mp3');
        game.load.audio('moo','assets/sounds/moo.mp3');
        game.load.audio('torch','assets/sounds/torch.mp3');
        game.load.audio('stone','assets/sounds/stone.mp3');
        //Podrían añadirse aquí el resto de imágenes del mismo modo

        // game.load.audio('nombre','url'); Si quisiésemos añadir música se carga aquí
    },

    create: function() {
        this.state.start('menuppal');
    },

    update: function() {

    }

}
