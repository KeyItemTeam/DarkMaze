// var music;
// var loopCount;  <-- Ambas variables son para la música
var perseguidorWIN = true;


DarkMaze.partidaState = function(game) {
    
    
};



DarkMaze.partidaState.prototype = {

    create: function() {

        game.time.events.add(Phaser.Timer.MINUTE * 1, endGame, this);
     /* //Para añadir música
        music = game.add.audio('musica');
        music.play();
        music.loopFull(0.6); //pone el volumen a 0.6 */


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
        
        //Cargamos el mapa, su tileset y sus capas, también añadimos colisiones

        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('tileset', 'tiles');

        this.layer = this.map.createLayer('Capa2'); // Capa de tiles
        this.layer2 = this.map.createLayer('Capa1'); // Capa de colisiones
        this.layer3 = this.map.createLayer('Capa3'); // Capa de oscuridad 
        this.layer3.alpha = 0.7;
        
        this.map.setCollision(14, true, this.layer); 
        


        //Añade las animaciones del minotauro y activa sus físicas

        this.minotauro = game.add.sprite(48, 80, 'minotauro');
        this.minotauro.animations.add('idle',[0,1,2,3], 6, true);
        this.minotauro.animations.add('idleBack',[4,5,6,7], 6, true);
        this.minotauro.animations.add('idleLeft',[8,9,10,11], 6, true);
        this.minotauro.animations.add('idleRight',[12,13,14,15], 6, true);
        this.minotauro.animations.add('walk',[16,17,18,19,20,21,22,23], 6, true);
        this.minotauro.animations.add('walkBack',[24,25,26,27,28,29,30,31], 6, true);
        this.minotauro.animations.add('walkLeft',[32,33,34,35,36,37,38,39], 6, true);
        this.minotauro.animations.add('walkRight',[40,41,42,43,44,45,46,47], 6, true);
        this.minotauro.animations.play("idle");
        
        game.physics.enable(this.minotauro,Phaser.Physics.ARCADE);
        this.minotauro.anchor.setTo(0.5);
        this.minotauro.body.setSize(24, 24, 20, 30); //Hitbox
       
        this.minotauro.speed = 200;
        this.minotauro.run = 400;
        this.minotauro.direction= 1;
        this.minotauro.mov= false;

        //Añade las animaciones de Teseo y activa sus físicas

        this.teseo = game.add.sprite(352, 368, 'teseo');
        this.teseo.animations.add('idle',[0,1,2,3], 6, true);
        this.teseo.animations.add('idleBack',[4,5,6,7], 6, true);
        this.teseo.animations.add('idleLeft',[8,9,10,11], 6, true);
        this.teseo.animations.add('idleRight',[12,13,14,15], 6, true);
        this.teseo.animations.add('walk',[16,17,18,19,20,21,22,23], 12, true);
        this.teseo.animations.add('walkBack',[24,25,26,27,28,29,30,31], 12, true);
        this.teseo.animations.add('walkLeft',[32,33,34,35,36,37,38,39], 12, true);
        this.teseo.animations.add('walkRight',[40,41,42,43,44,45,46,47], 12, true);
        this.teseo.animations.play("idle");
        
        game.physics.enable(this.teseo,Phaser.Physics.ARCADE);
        this.teseo.anchor.setTo(0.5);
        this.teseo.body.setSize(24, 24, 20, 30); //Hitbox

        this.teseo.speed = 100;
        this.teseo.run = 200;
        this.teseo.direction= 1;
        this.teseo.mov= false;

        //Añade el sprite de la roca y activa sus físicas
        this.roca= game.add.sprite(0, 0, 'roca');
        game.physics.enable(this.roca,Phaser.Physics.ARCADE);
        this.roca.exists = false; //La roca no existe hata que Teseo la ponga en el escenario
        this.roca.visible = false;
        this.roca.time = 0; // tiempo hasta que se le pueda dar el siguiente golpe a la roca
        this.roca.salud= 3; // puntos de salud de la roca
        this.roca.used = true; // sirve para saber si a Teseo ha usado ya su roca 


        
        //Añade el sprite del pulso
        this.pulso = game.add.sprite(this.teseo.x, this.teseo.y, 'pulso');
        
        //Añade el sprite de antorcha
        this.antorcha = game.add.sprite(this.minotauro.x, this.minotauro.y, 'antorcha');
        this.antorcha.exists = false;
        this.antorcha.visible = false;
    },

    update: function() {

        //Se ponen las velocidadeserrrrrrrrrrd a 0 para que el movimiento no sea infinito
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

        //El pulso siempre sigue a Teseo pero no es visible si Teseo no está corriendo
        this.pulso.reset((this.math.snapToFloor(Math.floor(this.teseo.body.x), 32) / 32)*32, (this.math.snapToFloor(Math.floor(this.teseo.body.y), 32) / 32)*32);
        this.pulso.visible = false;
        
        //Movimiento de Teseo por teclado

        this.teseo.direction = moverDir(this.teseo, this.wKey,this.sKey, this.aKey, this.dKey, this.oKey);

        //Movimiento del minotauro

        this.minotauro.direction = moverDir(this.minotauro, this.upKey,this.downKey, this.leftKey, this.rightKey, this.shiftKey);

    //Con q Teseo puede poner rocas
    if (this.qKey.isDown&&this.roca.used)
    {
        this.roca.reset((this.math.snapToFloor(Math.floor(this.teseo.body.x), 32) / 32)*32, (this.math.snapToFloor(Math.floor(this.teseo.body.y), 32) / 32)*32); //Pone la ...
        //... roca en la casilla en la que se encuentre Teseo
        this.roca.exists = true;
        this.roca.visible = true;
        this.roca.body.inmovable = true;
        this.roca.body.moves=false;
        this.roca.used=false;
    }
   
    //Sire para atrapar a Teseo al pulsar espacio
    if (estaCerca(this.minotauro, this.teseo, 50) && this.spaceKey.isDown ) {
        console.log("atrapado");
        game.state.start('win', true, false, perseguidorWIN);
    }

    //Sirve para que el minotauro pueda destrozar la roca de Teseo
    if (estaCerca(this.minotauro, this.roca, 50) && this.spaceKey.isDown &&(game.time.now > this.roca.time)) {
        this.roca.time = game.time.now + 500;
        this.roca.salud--;
        console.log(this.roca.salud);
    }

    if(this.roca.salud < 1){ // 
        this.roca.kill();
    }

    //Sirve para colocar antorchas con el minotauro
    if (this.pKey.isDown) {
        this.antorcha.reset((this.math.snapToFloor(Math.floor(this.minotauro.x), 32) / 32) * 32, (this.math.snapToFloor(Math.floor(this.minotauro.y), 32) / 32) * 32);
        this.antorcha.exists = true;
        this.antorcha.visible = true;
    }    

    //Sirve para que Teseo deje un pulso al correr
    if (this.oKey.isDown) {
        this.pulso.visible = true;
    }    
        
     //Se aplican el resto de colisiones
    game.physics.arcade.collide(this.minotauro, this.teseo);
    game.physics.arcade.collide(this.minotauro, this.roca);

    //LUZ

    //Se llena la capa 3 del mapa de tiles de una tile negra
    for (var i = 0; i < 27; i++) {
        for (var j = 0; j < 18; j++) {
            this.map.putTile(21, i, j, 'Capa3');
        }
    }
        
    //Luz minotauro
    luz(3, this.minotauro, this.map);

    //Luz teseo
    luz(5, this.teseo, this.map);
    
    //Luz antorcha
    if (this.antorcha.exists) {

        luz(3,this.antorcha,this.map);

    }
    
    },

    render: function() {

        //game.debug.body(this.minotauro);
        //game.debug.body(this.teseo);
        game.debug.text("Time until event: " + game.time.events.duration, 32, 32)
    },
}

////////////////////////////////

//Elimina las tiles oscuras al rededor de un personaje "iluminando" el mapa
function luz (distancia, pj, mapa) {
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
    if (direction === 0||direction === 5||direction === 7) pj.animations.play("walkBack");
    if (direction === 1||direction === 4||direction === 6) pj.animations.play("walk");
    if (direction === 2) pj.animations.play("walkLeft");
    if (direction === 3) pj.animations.play("walkRight");

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
        if(down.isDown){
            pj.direction = 4;
        }else if(up.isDown){
            pj.direction = 5;
        }else{
            pj.direction = 2;
        }
        
        pj.mov = true;
        
    }
    if (right.isDown)
    {
        if(down.isDown){
            pj.direction = 6;
        }else if(up.isDown){
            pj.direction = 7;
        }else{
            pj.direction = 3;
        }
        
        pj.mov = true;
        
    }
    if(pj.mov === false)
    {
    if (pj.direction === 0||pj.direction === 4||pj.direction === 6) pj.animations.play("idleBack");
    if (pj.direction === 1||pj.direction === 5||pj.direction === 7) pj.animations.play("idle");
    if (pj.direction === 2) pj.animations.play("idleLeft");
    if (pj.direction === 3) pj.animations.play("idleRight");
    }else{

        if (runKey.isDown) {
            mover(pj, pj.direction, pj.run);
         }
        else 
        {
        mover(pj, pj.direction, pj.speed);
        }
    }
    return pj.direction;
}

function endGame(){
    perseguidorWIN = false;
    game.state.start('win', true, false, perseguidorWIN);
    
}
