//Variables para la música
var music;
var loopCount;

//Variables para la partida
var partidas = 0; // Sirve para llevar cuenta del número de partida actual
var tj1; // Guarda el tiempo que aguanta el j1 jugando como Teseo
var tj2; // Guarda el tiempo que aguanta el j2 jugando como Teseo
var tiempo = 5;
var timeRonda = 0;


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

        //El jugador 2 crea un contador que al llegar al final pasa a la siguiente ronda o acaba la partida
        if (game.global.player1.type == "TESEO") {
            game.time.events.add(Phaser.Timer.MINUTE * tiempo, endGame, this);
            timeRonda = game.time.events.duration;
        }

        //El jugador 2 crea la información de la ronda al empezar la partida
        if ((game.global.player1.type == "TESEO") && (partidas == 0)) {
            this.createRonda();
        }

        // Obtenemos la posición del jugador 2 y lo pintamos. No nos importa la física, ya que será
        // el otro jugador en su propia pantalla el que gestione dicho dato. Sólo necesitamos pintarlo
        // para verlo. Utilizamos un callback (player2Data) para que UNA VEZ tengamos la posición
        // del player 2, la pintemos en escenario y así evitar un undefined.
        
            //game.global.player2 = JSON.parse(JSON.stringify(player2Data));
            


        //El jugador 2 actualiza el tiempo de ronda
        if (game.global.player1.type == "TESEO") {
            this.putRonda();
        }

        //El jugador 1 recibe el tiempo de ronda
        if (game.global.player1.type == "MINOTAURO") {
            this.getRonda(function (updateRonda) {
                partidas = updateRonda.numRonda;
                timeRonda = updateRonda.tiempoRonda;
                if (game.debug) {
                    //console.log("Información de la ronda: " + toString(updateRonda) + " actualizada");
                }
            });
        }

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
            addAnim(game.global.player1, 175, 250);
            game.global.player1.animations.play("idle");
            game.global.player1.id = 1;
            game.global.player1.running = false;
            game.global.player1.attacking = false;
            game.global.player1.type = "MINOTAURO";
        } else {
            //Añade las animaciones de Teseo

            game.global.player1 = game.add.sprite(810, 550, 'teseo');
            addAnim(game.global.player1, 150, 200);
            game.global.player1.animations.play("idle");
            game.global.player1.id = 2;
            game.global.player1.running = false;
            game.global.player1.attacking = false;
            game.global.player1.type = "TESEO";
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
        game.global.antorchas = game.add.group();
        game.global.antorchas.enableBody = true;
        game.global.antorchas.physicsBodyType = Phaser.Physics.ARCADE;
        game.global.antorchas.cantidad = 2; //Cantidad de antorchas del Minotauro
        game.global.antorchas.time = 0; //Tiempo hasta poner otra antorcha

        //Se añaden propiedades a cada hijo antorcha del grupo
        for (var i = 0; i < 2; i++) {
            var b = game.global.antorchas.create(0, 0, 'antorcha');
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
        tiempoText = game.add.text(730, 2, timeRonda, styleTiempo);

        //Interfaz del número de antorchas o rocas
        if (game.global.player1.type == "MINOTAURO") {
            this.habilidadIcono = game.add.sprite(20, 6, 'antorcha');
        } else {
            this.habilidadIcono = game.add.sprite(20, 6, 'roca');
        }
        this.habilidadIcono.scale.setTo(0.6, 0.6);
        styleHabilidad = { font: "25px Courier", fill: "#ffffff", align: "left" };
    
        if (game.global.player1.type == "MINOTAURO") {
        	habilidadText = game.add.text(50, 2, "x0" + game.global.antorchas.cantidad, styleHabilidad);
        } else {
        	var rocas = 1;
        	if (!game.global.roca.used) rocas = 0;
        	habilidadText = game.add.text(50, 2, "x0" + rocas, styleHabilidad);
        }
        
        //Interfaz del número de rondas
        rondaText = game.add.text(380, 2, "RONDA " + (partidas + 1), styleHabilidad);

        this.pulso = game.add.sprite(200, 200, 'pulso');
        this.pulso.time = 0;
        if (game.global.player1.type == "MINOTAURO") {
            if (game.debug) {
                console.log("Player2 ha elegido a TESEO")
            }
            //Añade las animaciones de Teseo
            game.global.player2 = game.add.sprite(810, 550, 'teseo');
            addAnim(game.global.player2, 100, 100);
            game.global.player2.id = 2;
            game.global.player2.running = false;
            game.global.player2.attacking = false;

        } else {
            if (game.debug) {
                console.log("Player2 ha elegido a MINOTAURO")
            }
            game.global.player2 = game.add.sprite(48, 80, 'minotauro');
            addAttackAnim(game.global.player2)
            addAnim(game.global.player2, 100, 100)
            game.global.player2.running = false;
            game.global.player2.attacking = false;
            game.global.player2.animations.play("idle");
            game.global.player2.id = 1;

        }
    },

    update: function () {

        //El jugador 2 va actualizando el tiempo que queda de ronda
        if (game.global.player1.type == "TESEO") {
            timeRonda = game.time.events.duration;
        }

        //El jugador 2 va mandando la información de la ronda
        if (game.global.player1.type == "TESEO") {
            this.putRonda();
        }

        //El jugador 1 va recibiendo el tiempo de ronda
        if (game.global.player1.type == "MINOTAURO") {
            this.getRonda(function (updateRonda) {
                partidas = updateRonda.numRonda;
                timeRonda = updateRonda.tiempoRonda;
                if (game.debug) {
                    // console.log("Información de la ronda: " + toString(updateRonda) + " actualizada");
                }
            });
        }

        //Se va actualizando la interfaz con el tiempo
        if (game.global.player1.type == "MINOTAURO") {
        	habilidadText.text = "x0" + game.global.antorchas.cantidad;
        } else {
        	var rocas = 1;
        	if (!game.global.roca.used) rocas = 0;
        	habilidadText.text = "x0" + rocas;
        }
        
        minutes = Math.floor(timeRonda / 60000) % 60;
        seconds = Math.floor(timeRonda / 1000) % 60;

        if (seconds < 10)
            seconds = '0' + seconds;

        if (minutes < 10)
            minutes = '0' + minutes;

        tiempoText.text = (minutes + ':' + seconds);

        //Cuando quedan 10 segundos de ronda empieza a sonar una cuenta atrás
        if (timeRonda == 10) {
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
        game.global.player1.running = false;
        game.global.player1.attacking = false;
        game.global.player1.cancelAnim = false;
        game.global.player2.cancelAnim = false;
        this.pulso.visible = false;

        //Se pone a false para cancelar la animación de atacar
        //El pulso siempre sigue a Teseo pero no es visible si Teseo no está corriendo
        //Hace invisible a Teseo al pulsar "m" (debug)
        game.global.player2.alpha = 1;
        if (this.map.hasTile(Math.trunc(game.global.player2.x / 32), Math.trunc(game.global.player2.y / 32), 'Capa3')) {
            game.global.player2.alpha = 0;
        }

        if (this.spaceKey.isDown && game.global.player1.type == "MINOTAURO") {
            game.global.player1.attacking = true;
            if (game.global.player1.direction === 0 || game.global.player1.direction === 5 || game.global.player1.direction === 7) game.global.player1.animations.play("attackBack");
            if (game.global.player1.direction === 1 || game.global.player1.direction === 4 || game.global.player1.direction === 6) game.global.player1.animations.play("attack");
            if (game.global.player1.direction === 2) game.global.player1.animations.play("attackLeft");
            if (game.global.player1.direction === 3) game.global.player1.animations.play("attackRight");
            game.global.player1.cancelAnim = true;

        } else if (game.global.player2.attacking && game.global.player1.type == "TESEO") {
            if (game.global.player2.direction === 0 || game.global.player2.direction === 5 || game.global.player2.direction === 7) game.global.player2.animations.play("attackBack");
            if (game.global.player2.direction === 1 || game.global.player2.direction === 4 || game.global.player2.direction === 6) game.global.player2.animations.play("attack");
            if (game.global.player2.direction === 2) game.global.player2.animations.play("attackLeft");
            if (game.global.player2.direction === 3) game.global.player2.animations.play("attackRight");
            game.global.player2.cancelAnim = true;
        } else {

        }

        // configuramos teclas
        game.global.player1.direction = moverDir(game.global.player1, this.upKey, this.downKey, this.leftKey, this.rightKey, this.shiftKey);
        gestionAnim(game.global.player2)

        if (WSResponse_createRocamsg) {
            stone.play(); //Reproduce el sonido de la piedra
            game.global.roca.reset(nuevaroca.x, nuevaroca.y);
            game.global.roca.exists = true;
            game.global.roca.visible = true;
            game.global.roca.body.inmovable = true;
            game.global.roca.body.moves = false;
            game.global.roca.used = false; //Solo una roca por partida
            game.global.roca.salud = 3;
            WSResponse_createRocamsg = false;
        }

        if (WSResponse_createAntorchamsg) {
            console.log("llega hasta aquí al menos");
            var antorcha = game.global.antorchas.getFirstExists(false);
            if (antorcha != undefined) {
                console.log("Antorcha vale: " + antorcha);
                antorcha.reset(nuevatorch.x, nuevatorch.y);
                game.global.antorchas.activada = true;
                game.global.antorchas.cantidad--;
                antorcha.exists = true;

                WSResponse_createAntorchamsg = false;

            }
        }

        //Con "q" Teseo puede poner rocas
        if (this.qKey.isDown) {
            if ((game.global.player1.type == "TESEO") && game.global.roca.used) {
                stone.play(); //Reproduce el sonido de la piedra
                game.global.roca.reset((this.math.snapToFloor(Math.floor(game.global.player1.body.x), 32) / 32) * 32, (this.math.snapToFloor(Math.floor(game.global.player1.body.y), 32) / 32) * 32); //Pone la ...
                //... roca en la casilla en la que se encuentre Teseo
                game.global.roca.exists = true;
                game.global.roca.visible = true;
                game.global.roca.body.inmovable = true;
                game.global.roca.body.moves = false;
                game.global.roca.used = false; //Solo una roca por partida
                game.global.roca.salud = 3;
                //Crea la roca
                //this.createRoca();

                //CÓDIGO PARA CREAR LA ROCA CON WEBSOCKETS
                mensaje = {
                    "protocolo": "createRoca_msg",
                    "thisposX": game.global.roca.x,
                    "thisposY": game.global.roca.y
                };
                game.global.connection.send(JSON.stringify(mensaje));


            } else if ((game.global.player1.type == "MINOTAURO") && game.global.antorchas.cantidad !== 0 && (game.time.now > game.global.antorchas.time)) {
                torch.play();
                game.global.antorchas.time = game.time.now + 250;
                var antorcha = game.global.antorchas.getFirstExists(false);
                if (antorcha != undefined) {
                    antorcha.reset((this.math.snapToFloor(Math.floor(game.global.player1.x), 32) / 32) * 32, (this.math.snapToFloor(Math.floor(game.global.player1.y), 32) / 32) * 32);
                    game.global.antorchas.activada = true;
                    game.global.antorchas.cantidad--;
                    antorcha.exists = true;
                    console.log("Antorcha vale: " + antorcha);


                    // CÓDIGO PARA CREAR ANTORCHA(S) CON WEBSOCKETS

                    mensaje = {
                        "protocolo": "createAntorcha_msg",
                        "thisposX": antorcha.x,
                        "thisposY": antorcha.y
                    };
                    game.global.connection.send(JSON.stringify(mensaje));

                    //this.createAntorcha(antorcha.x, antorcha.y);
                    console.log("Antorcha creada en: " + antorcha.x + " - " + antorcha.y);

                }
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

            if (game.global.player1.type == "MINOTAURO" && estaCerca(game.global.player1, game.global.roca, 50) && this.spaceKey.isDown && (game.time.now > game.global.roca.time)) {
                game.global.roca.time = game.time.now + 500;
                punch.play();
                game.global.roca.salud--;
                if (game.global.roca.salud < 1) {
                    stoneBreak.play();
                }


                //CÓDIGO PARA ELIMINAR LA ROCA CON WEBSOCKETS
                mensajeDeleteRoca = {
                    "protocolo": "deleteRoca_msg",
                    "vida": game.global.roca.salud
                };
                game.global.connection.send(JSON.stringify(mensajeDeleteRoca));


            }
        }
        
        if (WSResponse_deleteRocamsg) {
            punch.play();
            game.global.roca.salud = viejaroca.life;
            console.log("Vida de la roca: " + game.global.roca.salud);
            if (game.global.roca.salud == 0) {
                stoneBreak.play();
            }
            console.log("Cambio de sprites");
            if (game.global.roca.salud == 2) {
                game.global.roca.frame = 1;
            }
            else if (game.global.roca.salud == 1) {
                game.global.roca.frame = 2;
            }
            if (game.global.roca.salud == 0) {
                game.global.roca.kill();
            }

            WSResponse_deleteRocamsg = false;
            console.log("bool de borrar ahora: " + WSResponse_deleteRocamsg);
        }

        //Comprueba la vida de la roca yy va cambiando su sprite
        if (game.global.roca.salud === 2)
            game.global.roca.frame = 1;
        else if (game.global.roca.salud === 1)
            game.global.roca.frame = 2;
        if (game.global.roca.salud < 1)
            game.global.roca.kill();


        //Se aplica la función para cada hija del grupo antochas (para recogerlas)
        if (game.global.player1.type == "MINOTAURO") {
            game.global.antorchas.forEach(antorchaCerca, this, true, game.global.player1, 50);
            //tal vez aquí haga falta un this.putAntorcha();
        }

        //Sirve para que Teseo deje un pulso al correr

        if (this.shiftKey.isDown && game.global.player1.type == "TESEO") {
            game.global.player1.pulsoX = (this.math.snapToFloor(Math.floor(game.global.player1.body.x), 32) / 32) * 32;
            game.global.player1.pulsoY = (this.math.snapToFloor(Math.floor(game.global.player1.body.y), 32) / 32) * 32;
            this.pulso.reset(game.global.player1.pulsoX, game.global.player1.pulsoY)
            this.pulso.visible = false;
            if (this.pulso.time < 1000) {
                this.pulso.visible = true;
                game.global.player1.running = true;

            }
            this.pulso.time = this.pulso.time + 100;
            if (this.pulso.time == 4000) this.pulso.time = 0;

        } else if (game.global.player2.running) {
            this.pulso.reset((this.math.snapToFloor(Math.floor(game.global.player2.body.x), 32) / 32) * 32, (this.math.snapToFloor(Math.floor(game.global.player2.body.y), 32) / 32) * 32)
            this.pulso.visible = true;
        }

        //Se aplican el resto de colisiones
        game.physics.arcade.collide(game.global.player1, game.global.player2);
        if (game.global.player1.type == "MINOTAURO")
            game.physics.arcade.collide(game.global.player1, game.global.roca);

        //LUZ

        //Se llena la capa 3 del mapa de tiles de una tile negra
        for (var i = 0; i < 27; i++) {
            for (var j = 0; j < 20; j++)
                this.map.putTile(21, i, j, 'Capa3');
        }

        //Luz minotauro
        if (game.global.player1.type == "MINOTAURO")
            luz(game.global.player1, 3, this.map);
        else
            luz(game.global.player1, 5, this.map);

        //console.log(" y su id1 es" + game.global.player1.id);
        //console.log(" y su id2 es" + game.global.player2.id);

        //Luz antorcha
        game.global.antorchas.forEach(luz, this, true, 2, this.map);

        if(WSResponse_createPjmsg) {
            game.global.player2.x = nuevopj.x;
             game.global.player2.y = nuevopj.y;
        
             //game.global.player2.time = updatePlayer2.time;
             game.global.player2.direction = nuevopj.direction;
             if (game.global.player1.type == "TESEO") {
                 game.global.player2.attacking = nuevopj.attacking;
             } else {
                 game.global.player2.running = nuevopj.running;
                 game.global.player2.pulsoX = nuevopj.x;
                 game.global.player2.pulsoY = nuevopj.y;
             }
             WSResponse_createPjmsg = false;
             if (game.debug) {
                 //console.log("Posicion de player 2: " + updatePlayer2 + " actualizada");
                 //console.log(" y su ide es" + game.global.player2.id);
             }
         };
        mensaje = {
                "protocolo": "createPj_msg",
                "thisposX": game.global.player1.x,
                "thisposY": game.global.player1.y,
                "thisDir": game.global.player1.direction,
                "thisAtk": game.global.player1.attacking,
                "thisRun": game.global.player1.running
            };
            game.global.connection.send(JSON.stringify(mensaje));
            

    },
    // Con este método recuperamos al jugador online (que siempre será considerado PLAYER 2)
   


   
    //RONDAS CON WEBSOCKETS

    /*createRonda: function () {

        data = {
            type: 'CREATE_RONDA'
        }
        ws.send(JSON.stringify(data));
    },

    putRonda: function () {

        data = {
            type: 'PUT_RONDA'
        }
        ws.send(JSON.stringify(data));
    },

    getRonda: function (callback) {

        data = {
            type: 'GET_RONDA'
        }
        ws.send(JSON.stringify(data));
    }, */

    createRonda() {
        var data = {
            numRonda: game.partidas,
            tiempoRonda: game.timeRonda,
        }

        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/ronda',
            data: JSON.stringify(data),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
        }).done(function (data) {
            // console.log("Ronda created: " + JSON.stringify(data));
        })
    },

    putRonda() {
        var data = {
            numRonda: partidas,
            tiempoRonda: timeRonda,
        }

        $.ajax({
            method: "PUT",
            url: 'http://localhost:8080/ronda/',
            data: JSON.stringify(data),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (data) {
            if (game.debug) {
                //console.log("Actualizado número y posición de ronda: " + JSON.stringify(data))
            }
        })
    },

    getRonda(callback) {
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/ronda/',
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

    if (estaCerca(pj, child, dist) && this.spaceKey.isDown && (game.time.now > game.global.antorchas.time)) {
        game.global.antorchas.time = game.time.now + 500;
        game.global.antorchas.cantidad++;
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
    gestionAnim(pj);

    if (pj.mov) {
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

function gestionAnim(pj) {
    if (pj.cancelAnim === false) {
        if (pj.mov === false) {

            if (pj.direction === 0 || pj.direction === 5 || pj.direction === 7) pj.animations.play("idleBack");
            if (pj.direction === 1 || pj.direction === 4 || pj.direction === 6) pj.animations.play("idle");
            if (pj.direction === 2) pj.animations.play("idleLeft");
            if (pj.direction === 3) pj.animations.play("idleRight");

        } else {
            if (pj.direction === 0 || pj.direction === 5 || pj.direction === 7) pj.animations.play("walkBack");
            if (pj.direction === 1 || pj.direction === 4 || pj.direction === 6) pj.animations.play("walk");
            if (pj.direction === 2) pj.animations.play("walkLeft");
            if (pj.direction === 3) pj.animations.play("walkRight");

        }
    }
}