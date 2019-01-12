DarkMaze.menuppalState = function(game) {

}

//Se accede a la partida
function irPartida () {

    game.state.start('matchmaking');

}

 //Se accede a la pantalla donde se explican los contoles
function irControles () {

    game.state.start('controles');

}

DarkMaze.menuppalState.prototype = {

    init: function() {
        if (game.player1 != null) {
            $.ajax({
                method: "DELETE",
                url: 'http://localhost:8080/game/' + game.player1.id,
                processData: false,
                headers: {
                    "Content-Type": "application/json"
                },
            }).done(function (data) {
                console.log("Player removed: " + JSON.stringify(data));
            })
        }
    },
    
    preload: function() {

    },

    create: function() {
    	game.add.image(game.world.centerX, game.world.centerY, 'pr').anchor.set(0.5);
     
        

        //Se crean los botones y se les asignan funciones
        button = game.add.button(400, 450, 'bpartida', irPartida);
        button.scale.setTo(0.5,0.5);
        button = game.add.button(600, 450, 'bcontroles', irControles);
        button.scale.setTo(0.5,0.5);
        
        var akey= game.input.keyboard.addKey(Phaser.Keyboard.A);

        //Al pulsar A, se va a la función start
        akey.onDown.addOnce(this.start, this);

    },
    
    //Se accede al menú de equipos (debug)
    start: function() {

        game.state.start('menuequipos');

    }

}