var DarkMaze = {}

DarkMaze.bootState = function(game) {

}

DarkMaze.bootState.prototype = {

    preload: function() {

    },

    create: function() {

        //Inicia las físicas
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Llamada al estado preload
        game.state.start('preload');
        
    },

    update: function() {

    }

}