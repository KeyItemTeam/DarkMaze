DarkMaze.menuequiposState = function(game) {

}

var button;

DarkMaze.menuequiposState.prototype = {

    preload: function() {

    },

    create: function() {
        var texto = game.add.text(75, 100, '¡Pulsa en el botón para ir al menú de personajes!', {font: '20px Courier', fill: '#ffffff'});
        button = game.add.button(game.world.centerX - 95, 200, 'button', this.start);
        button.scale.setTo(0.5,0.5);
    },

    start: function() {
        game.state.start('menupj');
    }

}









  

