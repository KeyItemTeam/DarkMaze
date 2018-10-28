DarkMaze.rankingState = function(game) {

}

DarkMaze.rankingState.prototype = {

preload: function() {},

create: function() {
    console.log(tj1);
    console.log(tj2);
    if (tj1>tj2) {
        var texto = game.add.text(100, 200, '¡Ha ganado el segundo jugador!', {font: '30px Courier', fill: '#ffffff'});
    } else if (tj1==tj2){
        var texto = game.add.text(100, 200, '¡Empate!', {font: '30px Courier', fill: '#ffffff'});
    } else if (tj1<tj2) {
        var texto = game.add.text(100, 200, '¡Ha ganado el primer jugador!', {font: '30px Courier', fill: '#ffffff'});
    }
},

start: function() {}

}