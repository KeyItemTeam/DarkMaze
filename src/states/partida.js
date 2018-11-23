//Variables para la música
var music; 
var loopCount;  

//Variables para la partida
var partidas = 0; // Sirve para llevar cuenta del número de partida actual
var tj1; // Guarda el tiempo que aguanta el j1 jugando como Teseo
var tj2; // Guarda el tiempo que aguanta el j2 jugando como Teseo
var tiempo =5;
var pulsoCount = 0;

DarkMaze.partidaState = function(game) {
    
};

DarkMaze.partidaState.prototype = {

    create: function() {

        //Contador que al llegar al final pasa a la siguiente ronda o acaba la partida
        game.time.events.add(Phaser.Timer.MINUTE * tiempo, endGame, this);

        //Para añadir música
        music = game.add.audio('bgm');
        punch = game.add.audio('punch');
        moo = game.add.audio('moo');
        torch = game.add.audio('torch');
        stone = game.add.audio('stone');

        //Reproduce la música al iniciar la partida
        if(partidas ==0){
        music.play(); 
        music.loopFull(0.6); } //pone el volumen a 0.6 

        //Prepara el teclado el jugador 1
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

        //Prepara el teclado para el jugador 2
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.oKey = game.input.keyboard.addKey(Phaser.Keyboard.O);

        //Prepara el teclado para usar la roca de Teseo
        this.qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);

        //Prepara el teclado para usar la habilidad de antorcha del minotauro
        this.pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
        
        //Tecla para hacer invisible a Teseo (debug)
        this.mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
        
        //Cargamos el mapa, su tileset y sus capas, también añadimos colisiones
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('tileset', 'tiles');
        this.layer = this.map.createLayer('Capa2'); // Capa de tiles
        this.layer2 = this.map.createLayer('Capa1'); // Capa de colisiones
        this.layer3 = this.map.createLayer('Capa3'); // Capa de oscuridad 
        this.layer3.alpha = 0.7;
        this.map.setCollision(14, true, this.layer); 

        //Añade las animaciones del Minotauro
        this.minotauro = game.add.sprite(48, 80, 'minotauro');
        this.minotauro.animations.add('idle',[0,1,2,3], 6, true);
        this.minotauro.animations.add('idleBack',[4,5,6,7], 6, true);
        this.minotauro.animations.add('idleLeft',[8,9,10,11], 6, true);
        this.minotauro.animations.add('idleRight',[12,13,14,15], 6, true);
        this.minotauro.animations.add('walk',[16,17,18,19,20,21,22,23], 6, true);
        this.minotauro.animations.add('walkBack',[24,25,26,27,28,29,30,31], 6, true);
        this.minotauro.animations.add('walkLeft',[32,33,34,35,36,37,38,39], 6, true);
        this.minotauro.animations.add('walkRight',[40,41,42,43,44,45,46,47], 6, true);
        this.minotauro.animations.add('attack',[48,49,50,51], 12, true);
        this.minotauro.animations.add('attackBack',[52,53,54,55], 12, true);
        this.minotauro.animations.add('attackLeft',[56,57,58,59], 12, true);
        this.minotauro.animations.add('attackRight',[60,61,62,63], 12, true);
        this.minotauro.animations.play("idle");

        //Activa las físicas del Minotauro
        game.physics.enable(this.minotauro,Phaser.Physics.ARCADE);
        this.minotauro.anchor.setTo(0.5);
        this.minotauro.body.setSize(24, 24, 20, 30); //Hitbox
       
        //Inicializamos variables del Minotauro
        this.minotauro.speed = 150; // Su velocidad
        this.minotauro.run = 225; // Su velocidad corriendo
        this.minotauro.direction= 1; //La dirección en la que mira
        this.minotauro.mov= false; // Si se está moviendo
        this.minotauro.cancelAnim = false; // Para cancelar el resto de animaciones al atacar

        //Añade las animaciones de Teseo
        this.teseo = game.add.sprite(810, 550, 'teseo');
        this.teseo.animations.add('idle',[0,1,2,3], 6, true);
        this.teseo.animations.add('idleBack',[4,5,6,7], 6, true);
        this.teseo.animations.add('idleLeft',[8,9,10,11], 6, true);
        this.teseo.animations.add('idleRight',[12,13,14,15], 6, true);
        this.teseo.animations.add('walk',[16,17,18,19,20,21,22,23], 12, true);
        this.teseo.animations.add('walkBack',[24,25,26,27,28,29,30,31], 12, true);
        this.teseo.animations.add('walkLeft',[32,33,34,35,36,37,38,39], 12, true);
        this.teseo.animations.add('walkRight',[40,41,42,43,44,45,46,47], 12, true);
        this.teseo.animations.play("idle");
        
        //Activa las físicas de Teseo
        game.physics.enable(this.teseo,Phaser.Physics.ARCADE);
        this.teseo.anchor.setTo(0.5);
        this.teseo.body.setSize(24, 24, 20, 30); //Hitbox

        //Inicializamos variables de Teseo
        this.teseo.speed = 125; // Su velocidad
        this.teseo.run = 175; // Su velocidad corriendo
        this.teseo.direction= 1; //La dirección en la que mira
        this.teseo.mov= false; // Si se está moviendo
        this.teseo.cancelAnim = false; // Para cancelar el resto de animaciones al atacar

        //Añade el sprite de la roca, activa sus físicas e inicializa sus variables
        this.roca = game.add.sprite(0, 0, 'roca');
        game.physics.enable(this.roca,Phaser.Physics.ARCADE);
        this.roca.exists = false; //La roca no existe hata que Teseo la ponga en el escenario
        this.roca.visible = false;
        this.roca.time = 0; // tiempo hasta que se le pueda dar el siguiente golpe a la roca
        this.roca.salud= 3; // puntos de salud de la roca
        this.roca.used = true; // sirve para saber si a Teseo ha usado ya su roca 

        //Añade el sprite del pulso
        this.pulso = game.add.sprite(this.teseo.x, this.teseo.y, 'pulso');
        
        //Crea un grupo de antorchas, activas sus físicas e inicializa sus variables
        this.antorchas = game.add.group();
        this.antorchas.enableBody = true;
        this.antorchas.physicsBodyType = Phaser.Physics.ARCADE;
        this.antorchas.cantidad = 2; //Cantidad de antorchas del Minotauro
        this.antorchas.time = 0; //Tiempo hasta poner otra antorcha
        
        //Se añaden propiedades a cada hijo antorcha del grupo
        for (var i = 0; i < 2; i++)
        {
            var b = this.antorchas.create(0, 0, 'antorcha');
            b.animations.add('idle',[0,1,2,3], 6, true);
            b.animations.play("idle");
            b.name = 'antorcha' + i;
            b.exists = false; //Hasta que el minotauro no pone la antorcha no existe
            b.visible = false;
        }
        
        //Interfaz del tiempo
        styleTiempo = { font: "30px Arial", fill: "#ffffff", align: "center" };
        tiempoText = game.add.text(this.world.centerX, 0, game.time.events.duration, styleTiempo);

        //Interfaz del número de antorchas
        this.antorchaIcono = game.add.sprite(20, 4, 'antorcha');
        this.antorchaIcono.scale.setTo(0.8, 0.8);
        styleHabilidad = { font: "25px Arial", fill: "#ffffff", align: "left" };
        habilidadText = game.add.text(50, 3, "x0" + this.antorchas.cantidad, styleHabilidad);
    },

    update: function() {
        
        //Se va actualizando la interfaz con el tiempo
        habilidadText.text = "x0" + this.antorchas.cantidad;
        minutes = Math.floor(game.time.events.duration / 60000) % 60;
        seconds = Math.floor(game.time.events.duration / 1000) % 60;

        if (seconds < 10)
        seconds = '0' + seconds;

        if (minutes < 10)
        minutes = '0' + minutes;

        tiempoText.text = (minutes + ':' + seconds);
        
        //Se ponen las velocidades a 0 para que el movimiento no sea infinito
        this.minotauro.body.velocity.x = 0; 
        this.minotauro.body.velocity.y = 0;
        this.teseo.body.velocity.x = 0;
        this.teseo.body.velocity.y = 0;
        
        //Se activan las colisiones con el escenario
        this.physics.arcade.collide(this.teseo, this.layer);
        this.physics.arcade.collide(this.minotauro, this.layer);

        //Se ponen el movimiento a false para cambiar la animación al idle si no se mueve el jugador
        this.minotauro.mov = false; 
        this.teseo.mov = false; 

        //Se pone a false para cancelar la animación de atacar
        this.minotauro.cancelAnim = false;

        //El pulso siempre sigue a Teseo pero no es visible si Teseo no está corriendo
        this.pulso.reset((this.math.snapToFloor(Math.floor(this.teseo.body.x), 32) / 32)*32, (this.math.snapToFloor(Math.floor(this.teseo.body.y), 32) / 32)*32);
        this.pulso.visible = false;
        
        //Hace invisible a Teseo al pulsar "m" (debug)
        this.teseo.alpha = 1;
        if (this.mKey.isDown && (this.map.hasTile(Math.trunc(this.teseo.x / 32), Math.trunc(this.teseo.y / 32), 'Capa3'))) {
            this.teseo.alpha = 0;
        }
        
        //Para la animación de ataque del minotauro
        if (this.spaceKey.isDown) {
           
            if (this.minotauro.direction === 0||this.minotauro.direction === 5||this.minotauro.direction === 7) this.minotauro.animations.play("attackBack");
            if (this.minotauro.direction === 1||this.minotauro.direction === 4||this.minotauro.direction === 6) this.minotauro.animations.play("attack");
            if (this.minotauro.direction === 2) this.minotauro.animations.play("attackLeft");
            if (this.minotauro.direction === 3) this.minotauro.animations.play("attackRight");
            this.minotauro.cancelAnim=true;
        }

        //Movimiento de Teseo por teclado

        //Al principio lo maneja el j2, luego el j1
        if (partidas == 0){
            this.teseo.direction = moverDir(this.teseo, this.wKey,this.sKey, this.aKey, this.dKey, this.oKey);
        } else {
            this.teseo.direction = moverDir(this.teseo,this.upKey,this.downKey, this.leftKey, this.rightKey, this.shiftKey);
        }
        
        //Movimiento del Minotauro por teclado

        //Al principio lo maneja el j1, luego el j2
        if (partidas == 0) {
        this.minotauro.direction = moverDir(this.minotauro, this.upKey,this.downKey, this.leftKey, this.rightKey, this.shiftKey);
        } else {
            this.minotauro.direction = moverDir(this.minotauro,this.wKey,this.sKey, this.aKey, this.dKey, this.oKey);
        }
        
        //Con "q" Teseo puede poner rocas
        if (this.qKey.isDown&&this.roca.used)
        {
            stone.play(); //Reproduce el sonido de la piedra
            this.roca.reset((this.math.snapToFloor(Math.floor(this.teseo.body.x), 32) / 32)*32, (this.math.snapToFloor(Math.floor(this.teseo.body.y), 32) / 32)*32); //Pone la ...
            //... roca en la casilla en la que se encuentre Teseo
            this.roca.exists = true;
            this.roca.visible = true;
            this.roca.body.inmovable = true;
            this.roca.body.moves=false;
            this.roca.used=false; //Solo una roca por partida
        }
   
        //Sire para atrapar a Teseo al pulsar espacio
        if (estaCerca(this.minotauro, this.teseo, 50) && this.spaceKey.isDown ) {

            moo.play(); 
            partidas++; //Se pasa a la siguiente ronda
            tiempoJugadores(); // Se guarda el tiempo del jugador Teseo

            if (partidas == 2) 
            game.state.start('ranking',true, false, tj1, tj2);

            else 
            game.state.start('win', true, false);
        }

        //Sirve para que el minotauro pueda destrozar la roca de Teseo
        if (estaCerca(this.minotauro, this.roca, 50) && this.spaceKey.isDown &&(game.time.now > this.roca.time)) {
            this.roca.time = game.time.now + 500;
            punch.play();
            this.roca.salud--;
        }

        //Comprueba la vida de la roca yy va cambiando su sprite
        if (this.roca.salud === 2)
        this.roca.frame=1;
        else if(this.roca.salud === 1)
        this.roca.frame=2;
        if(this.roca.salud < 1)
        this.roca.kill();

        //Sirve para colocar antorchas con el minotauro
        if (this.pKey.isDown && this.antorchas.cantidad !== 0 &&(game.time.now > this.antorchas.time)) {
            torch.play();
            this.antorchas.time = game.time.now + 250;
            this.antorcha = this.antorchas.getFirstExists(false);
            this.antorcha.reset((this.math.snapToFloor(Math.floor(this.minotauro.x), 32) / 32) * 32, (this.math.snapToFloor(Math.floor(this.minotauro.y), 32) / 32) * 32);
            this.antorchas.activada=true;
            this.antorchas.cantidad--;
            this.antorcha.exists = true;
        }    

        //Se aplica la función para cada hija del grupo antochas (para recogerlas)
        this.antorchas.forEach(antorchaCerca,this,true, this.minotauro,50);

        //Sirve para que Teseo deje un pulso al correr
        if (this.oKey.isDown && partidas==0) {
        if (pulsoCount<10) {
        this.pulso.visible = true; } 
        pulsoCount++;
            if (pulsoCount==80) pulsoCount=0;
        console.log(pulsoCount); } 
            else if (partidas==0) {
            pulsoCount=0;
        }

        if (this.shiftKey.isDown && partidas!=0) {
        if (pulsoCount<10) {
            this.pulso.visible = true; } 
            pulsoCount++;
                if (pulsoCount==80) pulsoCount=0;
            console.log(pulsoCount); } 
                else if (partidas==1) {
                pulsoCount=0;
            }
        
        //Se aplican el resto de colisiones
        game.physics.arcade.collide(this.minotauro, this.teseo);
        game.physics.arcade.collide(this.minotauro, this.roca);

        //LUZ

        //Se llena la capa 3 del mapa de tiles de una tile negra
        for (var i = 0; i < 27; i++) {
            for (var j = 0; j < 20; j++) 
            this.map.putTile(21, i, j, 'Capa3');
        }
    
        //Luz minotauro
        luz(this.minotauro, 3, this.map);

        //Luz teseo
        if (this.teseo.alpha == 1)
        luz(5, this.teseo, this.map);

        //Luz antorcha
        this.antorchas.forEach(luz,this,true, 2,this.map);
    
    },

    render: function() {

        //game.debug.body(this.minotauro);
        //game.debug.body(this.teseo);
        //game.debug.text("Time until event: " + game.time.events.duration, 32, 32)
    },
}

////////////////////////////////

//Elimina las tiles oscuras al rededor de un personaje "iluminando" el mapa
function luz ( pj,distancia, mapa) {

    var dist = -(distancia-1);
    for (var i = dist; i < distancia; i++) {
        for (var j = dist; j < distancia; j++) {
           mapa.removeTile(Math.trunc(pj.x / 32) + i, Math.trunc(pj.y / 32) + j, 'Capa3');
        }
    }

}

// Devuelve true si el objeto 1 está a la distancia que le pongas del objeto 2
function estaCerca (pj1, pj2, dist) {

    if (Phaser.Math.distance(pj1.x, pj1.y, pj2.x, pj2.y)<dist)  return true;

}

// Funcion para recoger antorchas por el minotauro (a la distancia que se le asigne)
function antorchaCerca (child, pj, dist) {

    if (estaCerca(pj,child, dist) && this.spaceKey.isDown &&(game.time.now > this.antorchas.time)) {
       this.antorchas.time = game.time.now + 500;
       this.antorchas.cantidad++;
       child.exists = false;
   }

} 

//Mueve al personaje en la dirección asignada
function mover (pj, direction, vel) {

    switch(direction) 
    {
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
    if(pj.cancelAnim === false){
    if (direction === 0||direction === 5||direction === 7) pj.animations.play("walkBack");
    if (direction === 1||direction === 4||direction === 6) pj.animations.play("walk");
    if (direction === 2) pj.animations.play("walkLeft");
    if (direction === 3) pj.animations.play("walkRight");
    }

}

// Asigna unas teclas al personaje seleccionado y define su movimiento.

function moverDir (pj, up, down, left, right, runKey) {

    if (up.isDown)
    {
        pj.direction = 0; 
        pj.mov = true;
    }

    if (down.isDown)
    {
        pj.direction = 1;
        pj.mov = true;
    }

    if (left.isDown)
    {
        if(down.isDown)
        pj.direction = 4;

        else if(up.isDown)
        pj.direction = 5;

        else
        pj.direction = 2;
        
        pj.mov = true;
    }

    if (right.isDown)
    {
        if(down.isDown)
        pj.direction = 6;

        else if(up.isDown)
        pj.direction = 7;

        else
        pj.direction = 3;
        
        pj.mov = true;
    }

    //Si no está atacando y no se está moviendo, cambiar la animación a idle
    if(pj.mov === false && pj.cancelAnim === false)
    {
    if (pj.direction === 0||pj.direction === 4||pj.direction === 6) pj.animations.play("idleBack");
    if (pj.direction === 1||pj.direction === 5||pj.direction === 7) pj.animations.play("idle");
    if (pj.direction === 2) pj.animations.play("idleLeft");
    if (pj.direction === 3) pj.animations.play("idleRight");
    }else if(pj.mov===true){

    if (runKey.isDown) 
    mover(pj, pj.direction, pj.run);
         
    else 
    mover(pj, pj.direction, pj.speed);
        
    }
    return pj.direction;

}

//Termina el juego o avanza a la siguiente ronda
function endGame(){

    partidas ++;
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
    tj1 = (ms-game.time.events.duration)/1000; 

    //Luego cuanto tarda el j2
    else 
    tj2 = (ms-game.time.events.duration)/1000;
        
}