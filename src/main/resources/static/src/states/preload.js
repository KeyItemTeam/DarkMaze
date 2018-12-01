DarkMaze.preloadState = function(game) {

}

DarkMaze.preloadState.prototype = {
    
    preload: function() {

        //Mensaje de carga
        game.add.text(200, 200, "Cargando...", {font : '50px Courier', fill: '#ffffff'});

        //Se cargan el mapa
        game.load.tilemap('map', 'assets/laberinto.json', null, Phaser.Tilemap.TILED_JSON);

        // Se cargan los sprites
        game.load.spritesheet('minotauro', 'assets/sprites/minotauro.png', 64, 64); //Minotauro
        game.load.spritesheet('teseo', 'assets/sprites/teseo.png', 64, 64); //Teseo
        game.load.spritesheet('roca','assets/sprites/roca.png', 32,32); // Roca
        game.load.spritesheet('antorcha', 'assets/sprites/antorcha.png', 32,32); // Antorcha
        game.load.image('tiles', 'assets/tileset.png'); // Tileset para el mapa
        game.load.image('pulso', 'assets/images/placeholders/pulso.png'); // Pulso
        game.load.image('button','assets/images/placeholders/button.png'); //Botón
        game.load.image('bpartida', 'assets/images/partida1.png'); // Botón de partida
        game.load.image('bcontroles', 'assets/images/controles.png'); // Botón de controles
        game.load.image('reloj', 'assets/sprites/reloj.png'); // Icono de reloj
        game.load.image('iconoMinotauro', 'assets/sprites/iconoMinotauro.png'); //Icono del minotauro
        game.load.image('iconoTeseo', 'assets/sprites/iconoTeseo.png'); //Icono de teseo

        // Se cargan los sonidos
        game.load.audio('bgm','assets/sounds/musica.mp3');
        game.load.audio('punch','assets/sounds/punch.mp3');
        game.load.audio('moo','assets/sounds/moo.mp3');
        game.load.audio('torch','assets/sounds/torch.mp3');
        game.load.audio('stone','assets/sounds/stone.mp3');
        game.load.audio('clock', 'assets/sounds/clock.mp3');

    },

    create: function() {

        //Cuando se carga todo, se accede al estado menú
        this.state.start('menuppal');

    },

    update: function() {

    }

}
