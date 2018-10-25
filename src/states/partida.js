// var music;
// var loopCount;  <-- Ambas variables son para la música

DarkMaze.partidaState = function(game) {
    this.speedMin = 200; // velocidad al andar Minotauro
    this.runMin = 400; // velocidad al correr Minotauro
    this.speedTes = 100; // velocidad al andar Teseo
    this.runTes = 300; // velocidad al correr Teseo
    this.rocaTime = 0; // tiempo hasta que se le pueda dar el siguiente golpe a la roca
    this.rocaSalud= 3; // puntos de salud de la roca
    this.rocaTrue = true; // sirve para saber si a Teseo ha usado ya su roca 
    this.direccionMin = 1; //Para saber la direccion del Minotauro
    this.movMin = false; // Detecta si el Minotauro se está moviendo
    this.tilePulso; // posición del sprite de Pulso
};



DarkMaze.partidaState.prototype = {

    create: function() {

     /* //Para añadir música
        music = game.add.audio('musica');
        music.play();
        music.loopFull(0.6); //pone el volumen a 0.6 */


        //Prepara el teclado para que el jugador humano pueda mover al minotauro
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        //Prepara el teclado para que el jugador humano pueda mover a Teseo (Funciones temporales de prueba)
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);

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
       

        //Añade las animaciones de Teseo y activa sus físicas

        this.teseo = game.add.sprite(352, 368, 'teseo');
        this.teseo.animations.add('idle',[0,1,2,3], 6, true);
        this.teseo.animations.add('idleBack',[4,5,6,7], 6, true);
        this.teseo.animations.add('idleLeft',[8,9,10,11], 6, true);
        this.teseo.animations.add('idleRight',[12,13,14,15], 6, true);
        this.teseo.animations.play("idle");
        
        game.physics.enable(this.teseo,Phaser.Physics.ARCADE);
        this.teseo.anchor.setTo(0.5);
        this.teseo.body.setSize(24, 24, 20, 30); //Hitbox

        //Añade el sprite de la roca y activa sus físicas
        this.roca= game.add.sprite(0, 0, 'roca');
        game.physics.enable(this.roca,Phaser.Physics.ARCADE);
        this.roca.exists = false; //La roca no existe hata que Teseo la ponga en el escenario
        this.roca.visible = false;
        
        //Añade el sprite del pulso
        this.pulso = game.add.sprite(this.teseo.x, this.teseo.y, 'pulso');
        this.roca.visible = false;
    },

    update: function() {

        //Se ponen las velocidades a 0 para que el movimiento no sea infinito
        this.minotauro.body.velocity.x = 0; 
        this.minotauro.body.velocity.y = 0;
        this.teseo.body.velocity.x = 0;
        this.teseo.body.velocity.y = 0;
        
        //Se activan las colisiones con el escenario
        this.physics.arcade.collide(this.teseo, this.layer);
        this.physics.arcade.collide(this.minotauro, this.layer);

        //Se ponen el movimiento a false para camiar la animación al idle si no se mueve el jugador
        this.movMin = false; 
        
        //El pulso siempre sigue a Teseo pero no es visible si Teseo no está corriendo
        this.tilePulso = this.map.getTile(Math.trunc(this.teseo.x / 32), Math.trunc(this.teseo.y / 32));
        this.pulso.x = this.tilePulso.worldX;
        this.pulso.y = this.tilePulso.worldY;
        this.pulso.visible = false;
        
        //Movimiento de Teseo por teclado

    if (this.wKey.isDown)
    {
       this.teseo.body.velocity.y = -this.speedTes;
       this.teseo.animations.play("idleBack");
       if (this.shiftKey.isDown) {
            this.teseo.body.velocity.y = -this.runTes;
            this.pulso.visible = true;
       }
       
    }
    else if (this.sKey.isDown)
    {
        this.teseo.body.velocity.y = this.speedTes;
        this.teseo.animations.play("idle");
        if (this.shiftKey.isDown) {
            this.teseo.body.velocity.y = this.runTes; 
            this.pulso.visible = true;
        }
        
    }

    if (this.aKey.isDown)
    {
        this.teseo.body.velocity.x = -this.speedTes;
        if(this.downKey.isDown){
            this.teseo.animations.play("idle");
        }else if(this.upKey.isDown){
            this.teseo.animations.play("idleBack");
        }else{
            this.teseo.animations.play("idleLeft");
        }
        if (this.shiftKey.isDown) {
            this.teseo.body.velocity.x = -this.runTes; 
            this.pulso.visible = true;
        }
        
    }
    else if (this.dKey.isDown)
    {
        this.teseo.body.velocity.x = this.speedTes;
        if(this.downKey.isDown){
            this.teseo.animations.play("idle");
        }else if(this.upKey.isDown){
            this.teseo.animations.play("idleBack");
        }else{
            this.teseo.animations.play("idleRight");
        }
        if (this.shiftKey.isDown) {
            this.teseo.body.velocity.x = this.runTes; 
            this.pulso.visible = true;
        }

    }

    //Con q Teseo puede poner rocas
    if (this.qKey.isDown&&this.rocaTrue)
    {
        this.roca.reset((this.math.snapToFloor(Math.floor(this.teseo.body.x), 32) / 32)*32, (this.math.snapToFloor(Math.floor(this.teseo.body.y), 32) / 32)*32); //Pone la ...
        //... roca en la casilla en la que se encuentre Teseo
        this.roca.exists = true;
        this.roca.visible = true;
        this.roca.body.inmovable = true;
        this.roca.body.moves=false;
        this.rocaTrue=false;
    }

    //Movimiento del minotauro

    if (this.upKey.isDown)
    {
        this.direccionMin = 0; 
        this.movMin = true;
        
    }

    if (this.downKey.isDown)
    {
        this.direccionMin = 1;
        this.movMin = true;
    }

    if (this.leftKey.isDown)
    {
        if(this.downKey.isDown){
            this.direccionMin = 4;
        }else if(this.upKey.isDown){
            this.direccionMin = 5;
        }else{
            this.direccionMin = 2;
        }
        this.movMin = true;
        
    }
    if (this.rightKey.isDown)
    {
        if(this.downKey.isDown){
            this.direccionMin = 6;
        }else if(this.upKey.isDown){
            this.direccionMin = 7;
        }else{
            this.direccionMin = 3;
        }
        this.movMin = true;
        
    }
    if(this.movMin ===false)
    {
    if (this.direccionMin === 0||this.direccionMin === 4||this.direccionMin === 6) this.minotauro.animations.play("idleBack");
    if (this.direccionMin === 1||this.direccionMin === 5||this.direccionMin === 7) this.minotauro.animations.play("idle");
    if (this.direccionMin === 2) this.minotauro.animations.play("idleLeft");
    if (this.direccionMin === 3) this.minotauro.animations.play("idleRight");
    }else{

        if (this.shiftKey.isDown) {
            mover(this.minotauro, this.direccionMin, this.runMin);
         }
        else 
        {
        mover(this.minotauro, this.direccionMin, this.speedMin);
        }
    }

    //Sire para atrapar a Teseo al pulsar espacio
    if (estaCerca(this.minotauro, this.teseo, 50) && this.spaceKey.isDown ) {
        console.log("atrapado");
        game.state.start('win');
    }

    //Sirve para que el minotauro pueda destrozar la roca de Teseo
    if (estaCerca(this.minotauro, this.roca, 50) && this.spaceKey.isDown &&(game.time.now > this.rocaTime)) {
        this.rocaTime = game.time.now + 500;
        this.rocaSalud--;
        console.log(this.rocaSalud);
    }

    if(this.rocaSalud < 1){ // 
        this.roca.kill();
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
    
    },

    render: function() {

        //game.debug.body(this.minotauro);
        //game.debug.body(this.teseo);
    },
}

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
