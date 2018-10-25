// var music;
// var loopCount;  <-- Ambas variables son para la música

DarkMaze.partidaState = function(game) {
    this.speed = 200; // velocidad al andar
    this.run = 500; // velocidad al correr
    this.speed2 = 100;
    this.run2 = 400;
    this.rocaTime = 0;
    this.rocaSalud= 3;
    this.rocaTrue = true;
    this.direccion=1;
    this.mov = false;
};



DarkMaze.partidaState.prototype = {
    init: function(){
        // scale the game 4x
       // game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
       // game.scale.setUserScale(2,2);

        // enable crisp rendering
        game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)
    },
    preload: function() {

    },
    
    create: function() {
        game.world.setBounds(0, 0, 1400, 1400);
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
        //Movimiento teseo
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);

        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('tileset', 'tiles');

        this.layer = this.map.createLayer('Capa2');
        this.layer2 = this.map.createLayer('Capa1');
        this.layer3 = this.map.createLayer('Capa3');
        this.layer3.alpha = 0.7;
        
        this.map.setCollision(14, true, this.layer);
        


        //Añade el sprite del minotauro y activa las físicas
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
        //this.minotauro.body.immovable = true;
        this.minotauro.anchor.setTo(0.5);
        this.minotauro.body.setSize(24, 24, 20, 40);
        this.minotauro.body.collideWorldBounds = true;

        //Añade el sprite de teseo y activa las físicas
        this.teseo = game.add.sprite(352, 368, 'teseo');
        this.teseo.animations.add('idle',[0,1,2,3], 6, true);
        this.teseo.animations.add('idleBack',[4,5,6,7], 6, true);
        this.teseo.animations.add('idleLeft',[8,9,10,11], 6, true);
        this.teseo.animations.add('idleRight',[12,13,14,15], 6, true);
        this.teseo.animations.play("idle");
        
        game.physics.enable(this.teseo,Phaser.Physics.ARCADE);
        //this.teseo.body.immovable = true;
        this.teseo.anchor.setTo(0.5);
        this.teseo.body.setSize(24, 24, 20, 40);

        //Rocas
        this.roca= game.add.sprite(0, 0, 'roca');
        game.physics.enable(this.roca,Phaser.Physics.ARCADE);
        this.roca.exists = false;
        this.roca.visible = false;
        
        game.camera.follow(this.minotauro);
        game.camera.deadzone = new Phaser.Rectangle(100, 100, 100, 50);
    },

    update: function() {
        this.minotauro.body.velocity.x = 0;
        this.minotauro.body.velocity.y = 0;
        this.teseo.body.velocity.x = 0;
        this.teseo.body.velocity.y = 0;
        
    
        this.physics.arcade.collide(this.teseo, this.layer);
        this.physics.arcade.collide(this.minotauro, this.layer);

        this.mov = false;
        

        if (this.wKey.isDown)
    {
       this.teseo.body.velocity.y = -this.speed2;
       this.teseo.animations.play("idleBack");
       if (this.shiftKey.isDown) {
        this.teseo.body.velocity.y = -this.run2; 
    }
       
    }
    else if (this.sKey.isDown)
    {
        this.teseo.body.velocity.y = this.speed2;
        this.teseo.animations.play("idle");
        if (this.shiftKey.isDown) {
            this.teseo.body.velocity.y = this.run2; 
        }
        
    }

    if (this.aKey.isDown)
    {
        this.teseo.body.velocity.x = -this.speed2;
        if(this.downKey.isDown){
            this.teseo.animations.play("idle");
        }else if(this.upKey.isDown){
            this.teseo.animations.play("idleBack");
        }else{
            this.teseo.animations.play("idleLeft");
        }
        if (this.shiftKey.isDown) {
            this.teseo.body.velocity.x = -this.run2; 
        }
        
    }
    else if (this.dKey.isDown)
    {
        this.teseo.body.velocity.x = this.speed2;
        if(this.downKey.isDown){
            this.teseo.animations.play("idle");
        }else if(this.upKey.isDown){
            this.teseo.animations.play("idleBack");
        }else{
            this.teseo.animations.play("idleRight");
        }
        if (this.shiftKey.isDown) {
            this.teseo.body.velocity.x = this.run2; 
        }

    }
    if (this.qKey.isDown&&this.rocaTrue)
    {
        this.roca.reset((this.math.snapToFloor(Math.floor(this.teseo.body.x), 32) / 32)*32, (this.math.snapToFloor(Math.floor(this.teseo.body.y), 32) / 32)*32);
        this.roca.exists = true;
        this.roca.visible = true;
        this.roca.body.inmovable = true;
        this.roca.body.moves=false;
        this.rocaTrue=false;
    }

    if (this.upKey.isDown)
    {
       this.minotauro.body.velocity.y = -this.speed;
       this.minotauro.animations.play("walkBack");
       if (this.shiftKey.isDown) {
        this.minotauro.body.velocity.y = -this.run; 
    }
        this.direccion = 0;
        this.mov = true;
    }
    else if (this.downKey.isDown)
    {
        this.minotauro.body.velocity.y = this.speed;
        this.minotauro.animations.play("walk");
        if (this.shiftKey.isDown) {
            this.minotauro.body.velocity.y = this.run; 
        }
        this.direccion = 1;
        this.mov = true;
    }

    if (this.leftKey.isDown)
    {
        this.minotauro.body.velocity.x = -this.speed;
        if(this.downKey.isDown){
            this.minotauro.animations.play("walk");
        }else if(this.upKey.isDown){
            this.minotauro.animations.play("walkBack");
        }else{
            this.minotauro.animations.play("walkLeft");
        }

        if (this.shiftKey.isDown) {
            this.minotauro.body.velocity.x = -this.run; 
        }
        this.direccion = 2;
        this.mov = true;
    }
    else if (this.rightKey.isDown)
    {
        this.minotauro.body.velocity.x = this.speed;
        if(this.downKey.isDown){
            this.minotauro.animations.play("walk");
        }else if(this.upKey.isDown){
            this.minotauro.animations.play("walkBack");
        }else{
            this.minotauro.animations.play("walkRight");
        }
        if (this.shiftKey.isDown) {
            this.minotauro.body.velocity.x = this.run; 
        }
        this.direccion = 3;
        this.mov = true;
    }
    if(this.mov ===false)
    {
    if (this.direccion === 1) this.minotauro.animations.play("idle");
    if (this.direccion === 0) this.minotauro.animations.play("idleBack");
    if (this.direccion === 2) this.minotauro.animations.play("idleLeft");
    if (this.direccion === 3) this.minotauro.animations.play("idleRight");
    }
    if ((Phaser.Math.distance(this.minotauro.x, this.minotauro.y, this.teseo.x, this.teseo.y)<50) && this.spaceKey.isDown ) {
        console.log("atrapado");
        game.state.start('win');
    }
    if ((Phaser.Math.distance(this.minotauro.x, this.minotauro.y, this.roca.x, this.roca.y)<50) && this.spaceKey.isDown &&(game.time.now > this.rocaTime)) {
        this.rocaTime = game.time.now + 500;
        this.rocaSalud--;
        console.log(this.rocaSalud);
    }

    if(this.rocaSalud < 1){
        this.roca.kill();
        }
    game.physics.arcade.collide(this.minotauro, this.teseo, collisionHandler, null, this);
    
    game.physics.arcade.collide(this.minotauro, this.roca, collisionHandler, null, this);

    function  collisionHandler(obj1, obj2) {

        game.stage.backgroundColor = '#992d2d' ;
    }
        
    //LUZ
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

        game.debug.body(this.minotauro);
        game.debug.body(this.teseo);
    },

}
