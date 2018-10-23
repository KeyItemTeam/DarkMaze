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
        this.minotauro.animations.play("idle");
        
        game.physics.enable(this.minotauro,Phaser.Physics.ARCADE);
        //this.minotauro.body.immovable = true;
        this.minotauro.anchor.setTo(0.5);
        this.minotauro.body.setSize(24, 24, 20, 40);
        this.minotauro.body.collideWorldBounds = true;

        //Añade el sprite de teseo y activa las físicas
        this.teseo = game.add.sprite(352, 368, 'teseo');
        game.physics.enable(this.teseo,Phaser.Physics.ARCADE);
        //this.teseo.body.immovable = true;
        this.teseo.anchor.setTo(0.5);
        this.teseo.body.setSize(24, 24, 4, 4);

        //Rocas
        this.roca= game.add.sprite(0, 0, 'teseo');
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


        if (this.wKey.isDown)
    {
       this.teseo.body.velocity.y = -this.speed2;
       if (this.shiftKey.isDown) {
        this.teseo.body.velocity.y = -this.run2; 
    }
       
    }
    else if (this.sKey.isDown)
    {
        this.teseo.body.velocity.y = this.speed2;
        if (this.shiftKey.isDown) {
            this.teseo.body.velocity.y = this.run2; 
        }
        
    }

    if (this.aKey.isDown)
    {
        this.teseo.body.velocity.x = -this.speed2;
        if (this.shiftKey.isDown) {
            this.teseo.body.velocity.x = -this.run2; 
        }
        
    }
    else if (this.dKey.isDown)
    {
        this.teseo.body.velocity.x = this.speed2;
        if (this.shiftKey.isDown) {
            this.teseo.body.velocity.x = this.run2; 
        }

    }
    if (this.qKey.isDown&&this.rocaTrue)
    {
        this.roca.reset((this.math.snapToFloor(Math.floor(this.teseo.x), 32) / 32)*32, (this.math.snapToFloor(Math.floor(this.teseo.y), 32) / 32)*32);
        this.roca.exists = true;
        this.roca.visible = true;
        this.roca.body.inmovable = true;
        this.roca.body.moves=false;
        this.rocaTrue=false;
    }

    if (this.upKey.isDown)
    {
       this.minotauro.body.velocity.y = -this.speed;
       this.minotauro.animations.play("idleBack");
       if (this.shiftKey.isDown) {
        this.minotauro.body.velocity.y = -this.run; 
    }
       

    }
    else if (this.downKey.isDown)
    {
        this.minotauro.body.velocity.y = this.speed;
        this.minotauro.animations.play("idle");
        if (this.shiftKey.isDown) {
            this.minotauro.body.velocity.y = this.run; 
        }

    }

    if (this.leftKey.isDown)
    {
        this.minotauro.body.velocity.x = -this.speed;
        if(this.downKey.isDown){
            this.minotauro.animations.play("idle");
        }else if(this.upKey.isDown){
            this.minotauro.animations.play("idleBack");
        }else{
            this.minotauro.animations.play("idleLeft");
        }

        if (this.shiftKey.isDown) {
            this.minotauro.body.velocity.x = -this.run; 
        }
    }
    else if (this.rightKey.isDown)
    {
        this.minotauro.body.velocity.x = this.speed;
        if(this.downKey.isDown){
            this.minotauro.animations.play("idle");
        }else if(this.upKey.isDown){
            this.minotauro.animations.play("idleBack");
        }else{
            this.minotauro.animations.play("idleRight");
        }
        if (this.shiftKey.isDown) {
            this.minotauro.body.velocity.x = this.run; 
        }

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
    game.physics.arcade.collide(this.teseo, this.roca, collisionHandler, null, this);
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
        
    this.map.removeTile(Math.trunc(this.minotauro.x / 32), Math.trunc(this.minotauro.y / 32), 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) + 1, Math.trunc(this.minotauro.y / 32), 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) - 1, Math.trunc(this.minotauro.y / 32), 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) + 1, Math.trunc(this.minotauro.y / 32) + 1, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32), Math.trunc(this.minotauro.y / 32) + 1, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) - 1, Math.trunc(this.minotauro.y / 32) + 1, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) - 1, Math.trunc(this.minotauro.y / 32) - 1, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32), Math.trunc(this.minotauro.y / 32) - 1, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) + 1, Math.trunc(this.minotauro.y / 32) - 1, 'Capa3');

    this.map.removeTile(Math.trunc(this.minotauro.x / 32) - 2, Math.trunc(this.minotauro.y / 32), 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) - 2, Math.trunc(this.minotauro.y / 32) - 1, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) - 2, Math.trunc(this.minotauro.y / 32) - 2, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) - 2, Math.trunc(this.minotauro.y / 32) + 1, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) - 2, Math.trunc(this.minotauro.y / 32) + 2, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32), Math.trunc(this.minotauro.y / 32) + 2, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32), Math.trunc(this.minotauro.y / 32) - 2, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) + 2, Math.trunc(this.minotauro.y / 32), 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) + 2, Math.trunc(this.minotauro.y / 32) - 1, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) + 2, Math.trunc(this.minotauro.y / 32) - 2, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) + 2, Math.trunc(this.minotauro.y / 32) + 1, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) + 2, Math.trunc(this.minotauro.y / 32) + 2, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) - 1, Math.trunc(this.minotauro.y / 32) - 2, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) + 1, Math.trunc(this.minotauro.y / 32) - 2, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) - 1, Math.trunc(this.minotauro.y / 32) + 2, 'Capa3');
    this.map.removeTile(Math.trunc(this.minotauro.x / 32) + 1, Math.trunc(this.minotauro.y / 32) + 2, 'Capa3');
        
    },
    render: function() {

        game.debug.body(this.minotauro);
        game.debug.body(this.teseo);
    },

}
