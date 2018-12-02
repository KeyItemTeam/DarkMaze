//Variables para la música
var music;
var loopCount;

//Variables para la partida
var partidas = 0; // Sirve para llevar cuenta del número de partida actual
var tj1; // Guarda el tiempo que aguanta el j1 jugando como Teseo
var tj2; // Guarda el tiempo que aguanta el j2 jugando como Teseo
var tiempo = 5;


DarkMaze.partidaState = function (game) {

};

DarkMaze.partidaState.prototype = {
    // Determinamos el id del jugador para saber qué id tiene nuestro rival.
    // De esta forma creamos un "JSON" con la id y podemos aprovechar 
    // this.getPlayer sin hacer cambios evidentes.
    init() {
        if (game.global.player1.id == 1) {
            game.global.player2 = { id: 2 }
          
        } else {
            game.global.player2 = { id: 1 }
         
        }
    },

    //Funciones de Level (preload, create y update)
    preload: function () {
        if (game.debug) {
            //console.log(JSON.stringify(game.global.player1))
            
        }
    },

    create: function () {

        // Obtenemos la posición del jugador 2 y lo pintamos. No nos importa la física, ya que será
        // el otro jugador en su propia pantalla el que gestione dicho dato. Sólo necesitamos pintarlo
        // para verlo. Utilizamos un callback (player2Data) para que UNA VEZ tengamos la posición
        // del player 2, la pintemos en escenario y así evitar un undefined.
        this.getPlayer(function (player2Data) {
            //game.global.player2 = JSON.parse(JSON.stringify(player2Data));
            if (player2Data.type == "TESEO") {
                if (game.debug) {
                    console.log("Player2 ha elegido a TESEO")
                }
                //Añade las animaciones de Teseo
                game.global.player2= game.add.sprite(810, 550, 'teseo');
                addAnim(game.global.player2, 100, 100);
                game.global.player2.id=2;
                
                //this.pulso = game.add.sprite(game.global.player2.x, game.global.player2.y, 'pulso');
                //this.pulso.time = 0;
            } else {
                if (game.debug) {
                    console.log("Player2 ha elegido a MINOTAURO")
                }
                game.global.player2 = game.add.sprite(48, 80, 'minotauro');
                addAttackAnim(game.global.player2)
                addAnim(game.global.player2, 100, 100)
                game.global.player2.animations.play("idle");
                game.global.player2.id=1;
           
            }
        
        })

        /*this.getRoca(function (data) {
            game.global.roca = game.add.sprite(data.x, data.y, 'roca');
            this.physics.enable(game.global.roca, Phaser.Physics.ARCADE);
            game.global.roca.exists = true; //La roca no existe hata que Teseo la ponga en el escenario
            game.global.roca.visible = true;
            game.global.roca.time = 0; // tiempo hasta que se le pueda dar el siguiente golpe a la roca
            game.global.roca.salud = data.salud; // puntos de salud de la roca
            game.global.roca.used = true; // sirve para saber si a Teseo ha usado ya su roca 
         });*/

        //Contador que al llegar al final pasa a la siguiente ronda o acaba la partida
        game.time.events.add(Phaser.Timer.MINUTE * tiempo, endGame, this);

        //Para añadir música
        music = game.add.audio('bgm');
        punch = game.add.audio('punch');
        moo = game.add.audio('moo');
        torch = game.add.audio('torch');
        stone = game.add.audio('stone');
        clockSound = game.add.audio('clock');
        stoneBreak = game.add.audio('stoneBreak');

        //Reproduce la música al iniciar la partida
        if (partidas == 0) {
            music.play();
            music.loopFull(0.6);
        } //pone el volumen a 0.6 

        //Prepara el teclado el jugador 1
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

        //Prepara el teclado para usar la habilidad del personaje
        this.qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);

        //Tecla para hacer invisible a Teseo (debug)
        if (game.debug) {
            this.mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
        }

        //Cargamos el mapa, su tileset y sus capas, también añadimos colisiones
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('tileset', 'tiles');
        this.layer = this.map.createLayer('Capa2'); // Capa de tiles
        this.layer2 = this.map.createLayer('Capa1'); // Capa de colisiones
        this.layer3 = this.map.createLayer('Capa3'); // Capa de oscuridad 
        this.layer3.alpha = 0.7;
        this.map.setCollision(14, true, this.layer);

        //Añade las animaciones del Minotauro
        
        
        if (game.global.player1.type == "MINOTAURO") {
            game.global.player1 = game.add.sprite(48, 80, 'minotauro');
            addAttackAnim(game.global.player1);
            addAnim(game.global.player1, 100, 100);
            game.global.player1.animations.play("idle");
            game.global.player1.id=1;
            game.global.player1.type= "MINOTAURO" ;
        } else {
            //Añade las animaciones de Teseo
        	
            game.global.player1 = game.add.sprite(810, 550, 'teseo');
            addAnim(game.global.player1, 100, 100);
            game.global.player1.animations.play("idle");
            game.global.player1.id=2;
           // this.pulso = game.add.sprite(game.global.player1.x, game.global.player1.y, 'pulso');
            // this.pulso.time = 0;
            game.global.player1.type= "TESEO" ;
        }

        //Añade el sprite de la roca, activa sus físicas e inicializa sus variables
        game.global.roca = game.add.sprite(0, 0, 'roca');
        this.physics.enable(game.global.roca, Phaser.Physics.ARCADE);
        game.global.roca.exists = false; //La roca no existe hata que Teseo la ponga en el escenario
        game.global.roca.visible = false;
        game.global.roca.time = 0; // tiempo hasta que se le pueda dar el siguiente golpe a la roca
        game.global.roca.salud = 3; // puntos de salud de la roca
        game.global.roca.used = true; // sirve para saber si a Teseo ha usado ya su roca 

        //Crea un grupo de antorchas, activas sus físicas e inicializa sus variables
        this.antorchas = game.add.group();
        this.antorchas.enableBody = true;
        this.antorchas.physicsBodyType = Phaser.Physics.ARCADE;
        this.antorchas.cantidad = 2; //Cantidad de antorchas del Minotauro
        this.antorchas.time = 0; //Tiempo hasta poner otra antorcha

        //Se añaden propiedades a cada hijo antorcha del grupo
        for (var i = 0; i < 2; i++) {
            var b = this.antorchas.create(0, 0, 'antorcha');
            b.animations.add('idle', [0, 1, 2, 3], 6, true);
            b.animations.play("idle");
            b.name = 'antorcha' + i;
            b.exists = false;
            b.visible = false;
        }

        //Interfaz de iconos de los jugadores
        if (game.global.player1.type == "MINOTAURO") {
            this.iconoJugador = game.add.sprite(220, 6, 'iconoMinotauro');
        } else {
            this.iconoJugador = game.add.sprite(220, 6, 'iconoTeseo');
        }
        this.iconoJugador.scale.setTo(0.7, 0.7);

        //Interfaz del tiempo
        this.relojIcono = game.add.sprite(815, 8, 'reloj');
        this.relojIcono.scale.setTo(0.5, 0.5);
        styleTiempo = { font: "25px Courier", fill: "#ffffff", align: "center" };
        tiempoText = game.add.text(730, 2, game.time.events.duration, styleTiempo);

        //Interfaz del número de antorchas o rocas
        if (game.global.player1.type == "MINOTAURO") {
            this.habilidadIcono = game.add.sprite(20, 6, 'antorcha');
        } else {
            this.habilidadIcono = game.add.sprite(20, 6, 'roca');
        }        
        this.habilidadIcono.scale.setTo(0.6, 0.6);
        styleHabilidad = { font: "25px Courier", fill: "#ffffff", align: "left" };
        habilidadText = game.add.text(50, 2, "x0" + this.antorchas.cantidad, styleHabilidad);

        //Interfaz del número de rondas
        rondaText = game.add.text(380, 2, "RONDA " + (partidas + 1), styleHabilidad);
    },

    update: function () {

        //Se va actualizando la interfaz con el tiempo
        habilidadText.text = "x0" + this.antorchas.cantidad;
        minutes = Math.floor(game.time.events.duration / 60000) % 60;
        seconds = Math.floor(game.time.events.duration / 1000) % 60;

        if (seconds < 10)
            seconds = '0' + seconds;

        if (minutes < 10)
            minutes = '0' + minutes;

        tiempoText.text = (minutes + ':' + seconds);

        //Cuando quedan 10 segundos de ronda empieza a sonar una cuenta atrás
        if ((minutes == 0) && (seconds == 10)) {
            clockSound.play();
        }
        
        //Se ponen las velocidades a 0 para que el movimiento no sea infinito
        game.global.player1.body.velocity.x = 0;
        game.global.player1.body.velocity.y = 0;

        //Se activan las colisiones con el escenario
        this.physics.arcade.collide(game.global.player1, this.layer);

        //Se ponen el movimiento a false para cambiar la animación al idle si no se mueve el jugador
        game.global.player1.mov = false;
        game.global.player2.mov = false;

        //Se pone a false para cancelar la animación de atacar
        //El pulso siempre sigue a Teseo pero no es visible si Teseo no está corriendo
        //Hace invisible a Teseo al pulsar "m" (debug)
        if (game.global.player1.type == "MINOTAURO") {
            game.global.player1.cancelAnim = false;
            if (this.spaceKey.isDown) {
                if (game.global.player1.direction === 0 || game.global.player1.direction === 5 || game.global.player1.direction === 7) game.global.player1.animations.play("attackBack");
                if (game.global.player1.direction === 1 || game.global.player1.direction === 4 || game.global.player1.direction === 6) game.global.player1.animations.play("attack");
                if (game.global.player1.direction === 2) game.global.player1.animations.play("attackLeft");
                if (game.global.player1.direction === 3) game.global.player1.animations.play("attackRight");
                game.global.player1.cancelAnim = true;
            }
           /* this.pulso.reset((this.math.snapToFloor(Math.floor(game.global.player2.body.x), 32) / 32) * 32, (this.math.snapToFloor(Math.floor(game.global.player2.body.y), 32) / 32) * 32);
            this.pulso.visible = false;
            if (game.debug) {
                game.global.player2.alpha = 1;
                if (this.mKey.isDown && (this.map.hasTile(Math.trunc(game.global.player2.x / 32), Math.trunc(game.global.player2.y / 32), 'Capa3'))) {
                    game.global.player2.alpha = 0;
                }
            }*/
        } else {
            game.global.player2.cancelAnim = false;
           // this.pulso.reset((this.math.snapToFloor(Math.floor(game.global.player1.body.x), 32) / 32) * 32, (this.math.snapToFloor(Math.floor(game.global.player1.body.y), 32) / 32) * 32);
            // this.pulso.visible = false;
            if (this.spaceKey.isDown) {
                if (game.global.player2.direction === 0 || game.global.player2.direction === 5 || game.global.player2.direction === 7) game.global.player2.animations.play("attackBack");
                if (game.global.player2.direction === 1 || game.global.player2.direction === 4 || game.global.player2.direction === 6) game.global.player2.animations.play("attack");
                if (game.global.player2.direction === 2) game.global.player2.animations.play("attackLeft");
                if (game.global.player2.direction === 3) game.global.player2.animations.play("attackRight");
                game.global.player2.cancelAnim = true;
            }
           /* if (game.debug) {
                game.global.player1.alpha = 1;
                if (this.mKey.isDown && (this.map.hasTile(Math.trunc(game.global.player1.x / 32), Math.trunc(game.global.player1.y / 32), 'Capa3'))) {
                    game.global.player1.alpha = 0;
                }
            }*/
        }

        // configuramos teclas
        game.global.player1.direction = moverDir(game.global.player1, this.upKey, this.downKey, this.leftKey, this.rightKey, this.shiftKey);

        //Con "q" Teseo puede poner rocas
        if (this.qKey.isDown && game.global.roca.used) {
        	if (game.global.player1.type == "TESEO") {
            stone.play(); //Reproduce el sonido de la piedra
            game.global.roca.reset((this.math.snapToFloor(Math.floor(game.global.player1.body.x), 32) / 32) * 32, (this.math.snapToFloor(Math.floor(game.global.player1.body.y), 32) / 32) * 32); //Pone la ...
            //... roca en la casilla en la que se encuentre Teseo
            game.global.roca.exists = true;
            game.global.roca.visible = true;
            game.global.roca.body.inmovable = true;
            game.global.roca.body.moves = false;
            game.global.roca.used = false; //Solo una roca por partida

            console.log("ee");

            //Crea la roca
            this.createRoca();
            console.log("a");
        	}
        }

        //Sire para atrapar a Teseo al pulsar espacio

        if (game.global.player1.type == "MINOTAURO") {
            if (estaCerca(game.global.player1, game.global.player2, 50) && this.spaceKey.isDown) {
                moo.play();
                partidas++; //Se pasa a la siguiente ronda
                tiempoJugadores(); // Se guarda el tiempo del jugador Teseo

                if (partidas == 2)
                    game.state.start('ranking', true, false, tj1, tj2);

                else
                    game.state.start('win', true, false);
            }
            //Sirve para que el minotauro pueda destrozar la roca de Teseo
            if (estaCerca(game.global.player1, game.global.roca, 50) && this.spaceKey.isDown && (game.time.now > game.global.roca.time)) {
                game.global.roca.time = game.time.now + 500;
                punch.play();
                game.global.roca.salud--;
                if (game.global.roca.salud < 1) {
                    stoneBreak.play();
                }
                this.putRoca();
            }
        }

        //Comprueba la vida de la roca yy va cambiando su sprite
        if (game.global.roca.salud === 2)
            game.global.roca.frame = 1;
        else if (game.global.roca.salud === 1)
            game.global.roca.frame = 2;
        if (game.global.roca.salud < 1)
            game.global.roca.kill();

        //Sirve para colocar antorchas con el minotauro
        /*if (this.pKey.isDown && this.antorchas.cantidad !== 0 && (game.time.now > this.antorchas.time)) {
            torch.play();
            this.antorchas.time = game.time.now + 250;
            this.antorcha = this.antorchas.getFirstExists(false);
            this.antorcha.reset((this.math.snapToFloor(Math.floor(this.minotauro.x), 32) / 32) * 32, (this.math.snapToFloor(Math.floor(this.minotauro.y), 32) / 32) * 32);
            this.antorchas.activada = true;
            this.antorchas.cantidad--;
            this.antorcha.exists = true;
        }*/

        //Se aplica la función para cada hija del grupo antochas (para recogerlas)
        //this.antorchas.forEach(antorchaCerca, this, true, this.minotauro, 50);

        //Sirve para que Teseo deje un pulso al correr
        /*if (this.oKey.isDown && partidas == 0) {
            if (this.pulso.time < 1000) {
                this.pulso.visible = true;
            }
            this.pulso.time = this.pulso.time + 100;
            if (this.pulso.time == 4000) this.pulso.time = 0; //para cambiar cada cuanto aparece el pulso hay que variar esta condición
            console.log(this.pulso.time);
        }
        else if (partidas == 0) {
            this.pulso.time = 0;
        }*/

        /*if (this.shiftKey.isDown && partidas != 0) {
            if (this.pulso.time < 1000) {
                this.pulso.visible = true;
            }
            this.pulso.time = this.pulso.time + 100;
            if (this.pulso.time == 4000) this.pulso.time = 0;
            console.log(this.pulso.time);
        }
        else if (partidas == 1) {
            this.pulso.time = 0;
        }*/

        //Se aplican el resto de colisiones
        game.physics.arcade.collide(game.global.player1, game.global.player2);
        game.physics.arcade.collide(game.global.player1, game.global.roca);

        //LUZ

        //Se llena la capa 3 del mapa de tiles de una tile negra
        for (var i = 0; i < 27; i++) {
            for (var j = 0; j < 20; j++)
                this.map.putTile(21, i, j, 'Capa3');
        }

        //Luz minotauro
        luz(game.global.player1, 3, this.map);
        
        //console.log(" y su id1 es" + game.global.player1.id);
        //console.log(" y su id2 es" + game.global.player2.id);
        
        //Luz antorcha
        //this.antorchas.forEach(luz, this, true, 2, this.map);

        // Manda al servidor la posición actualizada de player 1 para que el otro jugador pueda actualizarla.
        this.putPlayer();
        //Manda al servidor la posición actualizada de la roca para que el otro jugador pueda verla
        //this.putRoca();

        // Obtiene mediante GET la posición de player 2. Usa un callback para que UNA VEZ tenga su posición,
        // pinte su ubicación.
        this.getPlayer(function (updatePlayer2) {
            game.global.player2.x = updatePlayer2.x;
            game.global.player2.y = updatePlayer2.y;
            game.global.player2.time = updatePlayer2.time;
            game.global.player2.direction = updatePlayer2.direction;
            if (game.global.player1.type == "MINOTAURO") {
                game.global.player2.attack = updatePlayer2.attack;
            }
            game.global.player2.run = updatePlayer2.run;
            if (game.debug) {
                //console.log("Posicion de player 2: " + updatePlayer2 + " actualizada");
                //console.log(" y su ide es" + game.global.player2.id);
            }
        });

        this.getRoca(function (updateRoca) {
            if (updateRoca != null) {
            game.global.roca.x = updateRoca.x;
            game.global.roca.y = updateRoca.y;
            game.global.roca.salud = updateRoca.life;
            game.global.roca.exists = true;
            game.global.roca.visible = true;
            game.global.roca.body.inmovable = true;
            game.global.roca.body.moves = false;
            if (game.debug) {
                console.log("Posicion de la roca: " + toString(updateRoca) + " actualizada");
            }
        }
        });

    },
    // Con este método recuperamos al jugador online (que siempre será considerado PLAYER 2)
    getPlayer(callback) {
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/game/' + game.global.player2.id,
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (data) {
            callback(data);
        })
    },

    // Con este método modificamos al jugador online (que siempre será considerado PLAYER 2)
    putPlayer() {
        var data = {
            id: game.global.player1.id,
            x: game.global.player1.x,
            y: game.global.player1.y,
            direction: game.global.player1.direction,
            run: game.global.player1.run,
            attack: game.global.player1.attack,
            time: game.global.player1.time,
            type: game.global.player1.type 
        }

        $.ajax({
            method: "PUT",
            url: 'http://localhost:8080/game/' + game.global.player1.id,
            data: JSON.stringify(data),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (data) {
            if (game.debug) {
                //console.log("Actualizada posicion de player 1: " + JSON.stringify(data))
            }
        })
    },


    createRoca() {
        var data = {
            x: game.global.roca.x,
            y: game.global.roca.y,
            life: game.global.roca.salud
        }

        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/roca',
            data: JSON.stringify(data),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
        }).done(function (data) {
            console.log("Roca created: " + JSON.stringify(data));
            //game.global.roca = data
        })
    },

    putRoca() {
        var data = {
            x: game.global.roca.x,
            y: game.global.roca.y,
            life: game.global.roca.salud
        }

        $.ajax({
            method: "PUT",
            url: 'http://localhost:8080/roca/',
            data: JSON.stringify(data),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (data) {
            if (game.debug) {
                //console.log("Actualizada posicion de la roca: " + JSON.stringify(data))
            }
        })
    },

    getRoca(callback) {
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/roca/',
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (data) {
            callback(data);
        })
    },

    

    

    render: function () {

        //game.debug.body(this.minotauro);
        //game.debug.body(this.teseo);
        //game.debug.text("Time until event: " + game.time.events.duration, 32, 32)
    },
}

////////////////////////////////

//Elimina las tiles oscuras al rededor de un personaje "iluminando" el mapa
function luz(pj, distancia, mapa) {

    var dist = -(distancia - 1);
    for (var i = dist; i < distancia; i++) {
        for (var j = dist; j < distancia; j++) {
            mapa.removeTile(Math.trunc(pj.x / 32) + i, Math.trunc(pj.y / 32) + j, 'Capa3');
        }
    }

}

// Devuelve true si el objeto 1 está a la distancia que le pongas del objeto 2
function estaCerca(pj1, pj2, dist) {

    if (Phaser.Math.distance(pj1.x, pj1.y, pj2.x, pj2.y) < dist) return true;

}

// Funcion para recoger antorchas por el minotauro (a la distancia que se le asigne)
function antorchaCerca(child, pj, dist) {

    if (estaCerca(pj, child, dist) && this.spaceKey.isDown && (game.time.now > this.antorchas.time)) {
        this.antorchas.time = game.time.now + 500;
        this.antorchas.cantidad++;
        child.exists = false;
    }

}

//Mueve al personaje en la dirección asignada
function mover(pj, direction, vel) {

    switch (direction) {
        case 1:
            pj.body.velocity.y = vel;
            break;
        case 2:
            pj.body.velocity.x = -vel;
            break;
        case 3:
            pj.body.velocity.x = vel;
            break;
        case 4:
            pj.body.velocity.x = -vel;
            pj.body.velocity.y = vel;
            break;
        case 5:
            pj.body.velocity.x = -vel;
            pj.body.velocity.y = -vel;
            break;
        case 6:
            pj.body.velocity.x = vel;
            pj.body.velocity.y = vel;
            break;
        case 7:
            pj.body.velocity.x = vel;
            pj.body.velocity.y = -vel;
            break;
        default:
            pj.body.velocity.y = -vel;
    }

    //Si no está atacando, reproducir animaciones de movimiento
    if (pj.cancelAnim === false) {
        if (direction === 0 || direction === 5 || direction === 7) pj.animations.play("walkBack");
        if (direction === 1 || direction === 4 || direction === 6) pj.animations.play("walk");
        if (direction === 2) pj.animations.play("walkLeft");
        if (direction === 3) pj.animations.play("walkRight");
    }

}

// Asigna unas teclas al personaje seleccionado y define su movimiento.

function moverDir(pj, up, down, left, right, runKey) {

    if (up.isDown) {
        pj.direction = 0;
        pj.mov = true;
    }

    if (down.isDown) {
        pj.direction = 1;
        pj.mov = true;
    }

    if (left.isDown) {
        if (down.isDown)
            pj.direction = 4;

        else if (up.isDown)
            pj.direction = 5;

        else
            pj.direction = 2;

        pj.mov = true;
    }

    if (right.isDown) {
        if (down.isDown)
            pj.direction = 6;

        else if (up.isDown)
            pj.direction = 7;

        else
            pj.direction = 3;

        pj.mov = true;
    }

    //Si no está atacando y no se está moviendo, cambiar la animación a idle
    if (pj.mov === false && pj.cancelAnim === false) {
        if (pj.direction === 0 || pj.direction === 5 || pj.direction === 7) pj.animations.play("idleBack");
        if (pj.direction === 1 || pj.direction === 4 || pj.direction === 6) pj.animations.play("idle");
        if (pj.direction === 2) pj.animations.play("idleLeft");
        if (pj.direction === 3) pj.animations.play("idleRight");
    } else if (pj.mov === true) {

        if (runKey.isDown)
            mover(pj, pj.direction, pj.run);

        else
            mover(pj, pj.direction, pj.speed);

    }
    return pj.direction;

}

//Termina el juego o avanza a la siguiente ronda
function endGame() {

    partidas++;
    tiempoJugadores();

    //Si se termina la segunda ronda va al estado ranking
    if (partidas == 2)
        game.state.start('ranking', true, false, tj1, tj2);

    //Si termina la primera ronda, va al estado win
    else
        game.state.start('win', true, false);

}

//Guarda el tiempo de los jugadores en una ronda
function tiempoJugadores() {

    var ms = tiempo * 60000;
    //Primero guarda cuanto aguanta el j1
    if (partidas == 1)
        tj1 = (ms - game.time.events.duration) / 1000;

    //Luego cuanto tarda el j2
    else
        tj2 = (ms - game.time.events.duration) / 1000;

}

function addAnim(pj, sp, rn) {


    pj.animations.add('idle', [0, 1, 2, 3], 6, true);
    pj.animations.add('idleBack', [4, 5, 6, 7], 6, true);
    pj.animations.add('idleLeft', [8, 9, 10, 11], 6, true);
    pj.animations.add('idleRight', [12, 13, 14, 15], 6, true);
    pj.animations.add('walk', [16, 17, 18, 19, 20, 21, 22, 23], 12, true);
    pj.animations.add('walkBack', [24, 25, 26, 27, 28, 29, 30, 31], 12, true);
    pj.animations.add('walkLeft', [32, 33, 34, 35, 36, 37, 38, 39], 12, true);
    pj.animations.add('walkRight', [40, 41, 42, 43, 44, 45, 46, 47], 12, true);
    pj.animations.play("idle");
    game.physics.enable(pj, Phaser.Physics.ARCADE);
    pj.anchor.setTo(0.5);
    pj.body.setSize(24, 24, 20, 30);
    pj.direction = 1;
    pj.run = rn;
    pj.speed = sp;
    pj.mov = false;
    pj.cancelAnim = false;
}

function addAttackAnim(pj) {

    pj.animations.add('attack', [48, 49, 50, 51], 9, true);
    pj.animations.add('attackBack', [52, 53, 54, 55], 9, true);
    pj.animations.add('attackLeft', [56, 57, 58, 59], 9, true);
    pj.animations.add('attackRight', [60, 61, 62, 63], 9, true);
}
