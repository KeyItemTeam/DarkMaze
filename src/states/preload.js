DarkMaze.preloadState = function(game) {

}

DarkMaze.preloadState.prototype = {
    
    preload: function() {
        //game.load.image("url a la imagen de fondo");

        //Mensaje de carga
        var loadinglabel = game.add.text(200, 200, "Cargando...", {font : '50px Courier', fill: '#ffffff'});

        //Se cargan los sprites
        
        game.load.tilemap('map', 'assets/laberinto.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('minotauro', 'assets/sprites/minotauro.png', 64, 64);//Minotauro
        game.load.spritesheet('teseo', 'assets/sprites/teseo.png', 64, 64); //Teseo
        game.load.spritesheet('roca','assets/sprites/roca.png', 32,32); 
        game.load.spritesheet('antorcha', 'assets/sprites/antorcha.png', 32,32);
        game.load.image('tiles', 'assets/tileset.png');
        game.load.image('pulso', 'assets/images/placeholders/pulso.png');
        game.load.image('button','assets/images/placeholders/button.png'); //Botón
        game.load.image('bpartida', 'assets/images/partida1.png');
        game.load.image('bcontroles', 'assets/images/controles.png');
        game.load.audio('bgm','assets/sounds/musica.mp3');
        game.load.audio('punch','assets/sounds/punch.mp3');
        game.load.audio('moo','assets/sounds/moo.mp3');
        game.load.audio('torch','assets/sounds/torch.mp3');
        game.load.audio('stone','assets/sounds/stone.mp3');

        // game.load.audio('nombre','url'); Si quisiésemos añadir música se carga aquí
    },

    create: function() {
        this.state.start('menuppal');
    },

    update: function() {

    }

}
