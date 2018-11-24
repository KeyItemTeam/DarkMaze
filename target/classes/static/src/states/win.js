var timer;
var total = 5;

DarkMaze.winState = function(game) {

}

// Un contador para esperar hasta pasar a la siguiente ronda
function updateCounter() {

    total--;
    if (total == 0) {
        game.state.start('partida',true,false);
    }
 
}

DarkMaze.winState.prototype = {

    preload: function() {

    },

    create: function() {

        //Crea el contador y lo varía cada segundo
        timer = game.time.create(false);
        timer.loop(1000, updateCounter, this);
        timer.start();
        game.add.text(50, 100, ('Jugador 1 juega ahora como Teseo \n \n' + 'Jugador 2 juega ahora como Minotauro'), {font: '20px Courier', fill: '#c6f9ac'});
       
    },

    start: function() {
        
    },

    render: function () {
        
    }

}