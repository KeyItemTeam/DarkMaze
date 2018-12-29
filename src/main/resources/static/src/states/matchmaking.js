DarkMaze.matchmakingState = function (game) {

}

nuevaroca = {
	x: 0,
	y: 0
}

WSResponse_createRocamsg = false;

DarkMaze.matchmakingState.prototype = {
	
	// Obtenemos el número de jugadores creados con this.getNumPlayers. Si ya hay 
	// suficientes jugadores, echa al menú al jugador para que lo vuelva a intentar.
	init: function () {
		
		//CREA EL WEBSOCKET
		game.global.connection = new WebSocket('ws://localhost:8080/websocket'); // es igual a local host
	    game.global.connection.onerror = function (e) {
	        console.log("WS error: " + e);
	    }
	    //"cuando ocurra esto, haz esto otro" guarda las instrucciones como si fuese una variable
	    game.global.connection.onmessage = function(msg) {
	        console.log("WS message: " + msg.data);
	        misdatos = JSON.parse(msg.data);
	        
	        WSResponse_createRocamsg = false;
	        
	        switch(misdatos.protocolo){
	        
	        case "createRoca_msg":
	        	nuevaroca = {
	                x: misdatos.otherposX,
	                y: misdatos.otherposY
	            };
	        	 WSResponse_createRocamsg = true;
	        	break;
	        
	        
	        default:
				System.out.println("ERROR: Mensaje no soportado");
	        }
	        }
	        
	    ///////////////////////////////////////////////
	    
		this.getNumPlayers(function (numPlayers) {
			if (numPlayers.length > 1) {
				console.log ('==========================================================');
				console.log ('= El servidor está lleno. Vuelve a intentarlo más tarde. =');
				console.log ('==========================================================');
				game.state.start('menuState');
			}
		});
	},
		
    preload: function () {
        var text = "- MatchMaking -\n Esperando otro jugador \n para iniciar partida.";
        var style = { font: "45px Arial", fill: "#0040FF", align: "center" };
        var t = game.add.text(game.world.centerX - 200, 0, text, style);
    },

    
    create: function () {
    	this.createPlayer();
    },

    
    update: function () {
		this.getNumPlayers(function (numPlayers) {
			if (numPlayers.length === 2) {
				console.log ('##### COMIENZA EL JUEGO #####');
				game.state.start('partida');
			}
		});
    }, 
    
    getNumPlayers: function (callback) {
        $.ajax({
            url: 'http://localhost:8080/game',
        }).done(function (data) {
            callback(data);
        })
    },
    
    createPlayer: function () {
        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/game',
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
        }).done(function (data) {
            console.log("Player created: " + JSON.stringify(data));
            game.global.player1 = data
        })
    }
}