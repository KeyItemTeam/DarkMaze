// var music;
// var loopCount;  <-- Ambas variables son para la música

DarkMaze.partidaState = function(game) {
    this.speedMin = 200; // velocidad al andar Minotauro
    this.runMin = 500; // velocidad al correr Minotauro
    this.speedTes = 100; // velocidad al andar Teseo
    this.runTes = 400; // velocidad al correr Teseo
    this.rocaTime = 0; // tiempo hasta que se le pueda dar el siguiente golpe a la roca
    this.rocaSalud= 3; // puntos de salud de la roca
    this.rocaTrue = true; // sirve para saber si a Teseo ha usado ya su roca 
    this.direccionMin = 1; //Para saber la direccion del Minotauro
    this.movMin = false; // Detecta si el Minotauro se está moviendo
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
        
        //Movimiento de Teseo por teclado

        if (this.wKey.isDown)
    {
       this.teseo.body.velocity.y = -this.speedTes;
       this.teseo.animations.play("idleBack");
       if (this.shiftKey.isDown) {
        this.teseo.body.velocity.y = -this.runTes; 
    }
       
    }
    else if (this.sKey.isDown)
    {
        this.teseo.body.velocity.y = this.speedTes;
        this.teseo.animations.play("idle");
        if (this.shiftKey.isDown) {
            this.teseo.body.velocity.y = this.runTes; 
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
       this.minotauro.body.velocity.y = -this.speedMin;
       this.minotauro.animations.play("walkBack");
       if (this.shiftKey.isDown) {
        this.minotauro.body.velocity.y = -this.runMin; 
    }
        this.direccionMin = 0; 
        this.movMin = true;
    }
    else if (this.downKey.isDown)
    {
        this.minotauro.body.velocity.y = this.speedMin;
        this.minotauro.animations.play("walk");
        if (this.shiftKey.isDown) {
            this.minotauro.body.velocity.y = this.runMn; 
        }
        this.direccionMin = 1;
        this.movMin = true;
    }

    if (this.leftKey.isDown)
    {
        this.minotauro.body.velocity.x = -this.speedMin;
        if(this.downKey.isDown){
            this.minotauro.animations.play("walk");
        }else if(this.upKey.isDown){
            this.minotauro.animations.play("walkBack");
        }else{
            this.minotauro.animations.play("walkLeft");
        }

        if (this.shiftKey.isDown) {
            this.minotauro.body.velocity.x = -this.runMin; 
        }
        this.direccionMin = 2;
        this.movMin = true;
    }
    else if (this.rightKey.isDown)
    {
        this.minotauro.body.velocity.x = this.speedMin;
        if(this.downKey.isDown){
            this.minotauro.animations.play("walk");
        }else if(this.upKey.isDown){
            this.minotauro.animations.play("walkBack");
        }else{
            this.minotauro.animations.play("walkRight");
        }
        if (this.shiftKey.isDown) {
            this.minotauro.body.velocity.x = this.runMin; 
        }
        this.direccionMin = 3;
        this.movMin = true;
    }
    if(this.movMin ===false)
    {
    if (this.direccionMin === 1) this.minotauro.animations.play("idle");
    if (this.direccionMin === 0) this.minotauro.animations.play("idleBack");
    if (this.direccionMin === 2) this.minotauro.animations.play("idleLeft");
    if (this.direccionMin === 3) this.minotauro.animations.play("idleRight");
    }

    //Sire para atrapar a Teseo al pulsar espacio
    if ((Phaser.Math.distance(this.minotauro.x, this.minotauro.y, this.teseo.x, this.teseo.y)<50) && this.spaceKey.isDown ) {
        console.log("atrapado");
        game.state.start('win');
    }

    //Sirve para que el minotauro pueda destrozar la roca de Teseo
    if ((Phaser.Math.distance(this.minotauro.x, this.minotauro.y, this.roca.x, this.roca.y)<50) && this.spaceKey.isDown &&(game.time.now > this.rocaTime)) {
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
    for (var i = -2; i < 3; i++) {
        for (var j = -2; j < 3; j++) {
            this.map.removeTile(Math.trunc(this.minotauro.x / 32) + i, Math.trunc(this.minotauro.y / 32) + j, 'Capa3');
        }
    }

    //Luz teseo
    for (var i = -4; i < 5; i++) {
        for (var j = -4; j < 5; j++) {
            this.map.removeTile(Math.trunc(this.teseo.x / 32) + i, Math.trunc(this.teseo.y / 32) + j, 'Capa3');
        }
    }
        
    },

    render: function() {

        //game.debug.body(this.minotauro);
        //game.debug.body(this.teseo);
    },

}
