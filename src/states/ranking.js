DarkMaze.rankingState = function(game) {

}

DarkMaze.rankingState.prototype = {

preload: function() {},

create: function() {
    if (winMinotauro>winTeseo) {
        var texto = game.add.text(100, 200, '¡Ha ganado el minotauro!', {font: '30px Courier', fill: '#ffffff'});
    } else if (winMinotauro==winTeseo){
        var texto = game.add.text(100, 200, '¡Empate!', {font: '30px Courier', fill: '#ffffff'});
    } else {
        var texto = game.add.text(100, 200, '¡Ha ganado Teseo!', {font: '30px Courier', fill: '#ffffff'});
    }
},

start: function() {}

}