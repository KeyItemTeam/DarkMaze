DarkMaze.menuequiposState = function(game) {

}

var button;

DarkMaze.menuequiposState.prototype = {

    preload: function() {

    },

    create: function() {
        var texto = game.add.text(100, 100, '¡Pulsa en el botón para ir al menú de personajes!', {font: '30px Courier', fill: '#ffffff'});
        button = game.add.button(game.world.centerX - 95, 300, 'button', this.start);
        button.scale.setTo(0.75,0.75);
    },

    start: function() {
        game.state.start('menupj');
    }

}









  

