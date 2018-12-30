

DarkMaze.winState = function(game) {

}

// Un contador para esperar hasta pasar a la siguiente ronda


DarkMaze.winState.prototype = {

    preload: function() {

    },

    create: function() {

        //Crea el contador y lo varía cada segundo
       
        game.add.text(50, 100, ('Gana el Minotauro'), {font: '20px Courier', fill: '#c6f9ac'});
       
    },

    start: function() {
        
    },

    render: function () {
        
    }

}