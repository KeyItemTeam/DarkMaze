var timer;
var total = 3;

DarkMaze.winState = function(game) {

}

function updateCounter() {

    total--;
    if (total == 0) {
        total = 3;
         game.state.start('partida');
    }
 
}

DarkMaze.winState.prototype = {

    preload: function() {

    },

    create: function() {

        timer = game.time.create(false);
        timer.loop(1000, updateCounter, this);
        timer.start();

        
    },

    start: function() {
        
    },

    render: function () {
        game.debug.text(total, 32, 64);
        
    }

}