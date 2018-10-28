DarkMaze.rankingState = function(game) {

}

DarkMaze.rankingState.prototype = {

preload: function() {},

create: function() {
    console.log(tj1);
    console.log(tj2);
    if (tj1>tj2) {
        var texto = game.add.text(100, 200, '¡Ha ganado el segundo jugador!', {font: '30px Courier', fill: '#c6f9ac'});
        var texto = game.add.text(100, 250, 'Con una diferencia de ', {font: '13px Courier', fill: '#ffffff'});
        var texto = game.add.text(270, 250, Math.trunc(tj1-tj2), {font: '13px Courier', fill: '#ffffff'});
        var texto = game.add.text(295, 250, ' segundos respecto al primer jugador. ', {font: '13px Courier', fill: '#ffffff'});
        
    } else if (tj1==tj2){
        var texto = game.add.text(100, 200, '¡Empate!', {font: '30px Courier', fill: '#ffffff'});
        var texto = game.add.text(100, 250, 'Ambos habéis tardado ', {font: '13px Courier', fill: '#ffffff'});
        var texto = game.add.text(270, 250, Math.trunc(tj1), {font: '13px Courier', fill: '#ffffff'});
        var texto = game.add.text(295, 250, ' segundos. ', {font: '13px Courier', fill: '#ffffff'});
    } else if (tj1<tj2) {
        var texto = game.add.text(100, 200, '¡Ha ganado el primer jugador!', {font: '30px Courier', fill: '#c6f9ac'});
        var texto = game.add.text(100, 250, 'Con una diferencia de ', {font: '13px Courier', fill: '#ffffff'});
        var texto = game.add.text(270, 250, Math.trunc(tj2-tj1), {font: '13px Courier', fill: '#ffffff'});
        var texto = game.add.text(295, 250, ' segundos respecto al segundo jugador. ', {font: '13px Courier', fill: '#ffffff'});
    }
},

start: function() {}

}