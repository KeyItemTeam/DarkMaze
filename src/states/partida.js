// var music;
// var loopCount;  <-- Ambas variables son para la música

DarkMaze.partidaState = function(game) {
    this.directions = [ null, null, null, null, null ];
    this.speed = 500;
    this.speed2 = 400;
    this.pos = new Phaser.Point();
    
};



DarkMaze.partidaState.prototype = {

    preload: function() {

    },

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
        //Movimiento teseo
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('tileset', 'tiles');

        this.layer = this.map.createLayer('Capa2');
        this.layer2 = this.map.createLayer('Capa1');
       
        this.map.setCollision(14, true, this.layer);
        


        //Añade el sprite del minotauro y activa las físicas
        this.minotauro = game.add.sprite(48, 80, 'minotauro');

        game.physics.enable(this.minotauro,Phaser.Physics.ARCADE);
        //this.minotauro.body.immovable = true;
        this.minotauro.anchor.setTo(0.5);
        this.minotauro.body.setSize(24, 24, 20, 40);
        this.minotauro.body.collideWorldBounds = true;

        //Añade el sprite de teseo y activa las físicas
        this.teseo = game.add.sprite(352, 368, 'teseo');;
        game.physics.enable(this.teseo,Phaser.Physics.ARCADE);
        //this.teseo.body.immovable = true;
        this.teseo.anchor.setTo(0.5);
        this.teseo.body.setSize(24, 24, 4, 4);
        
        

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
       

    }
    else if (this.sKey.isDown)
    {
        this.teseo.body.velocity.y = this.speed2;
        
    }

    if (this.aKey.isDown)
    {
        this.teseo.body.velocity.x = -this.speed2;
        
    }
    else if (this.dKey.isDown)
    {
        
        this.teseo.body.velocity.x = this.speed2;
    }

    if (this.upKey.isDown)
    {
       this.minotauro.body.velocity.y = -this.speed;
       

    }
    else if (this.downKey.isDown)
    {
        this.minotauro.body.velocity.y = this.speed;
    }

    if (this.leftKey.isDown)
    {
        this.minotauro.body.velocity.x = -this.speed;
    }
    else if (this.rightKey.isDown)
    {
        this.minotauro.body.velocity.x = this.speed;
    }

    if ((Phaser.Math.distance(this.minotauro.x, this.minotauro.y, this.teseo.x, this.teseo.y)<50) && this.spaceKey.isDown ) {
        console.log("atrapado");
        game.state.start('win');
    }

    game.physics.arcade.collide(this.minotauro, this.teseo, collisionHandler, null, this);

    function  collisionHandler(obj1, obj2) {

        game.stage.backgroundColor = '#992d2d' ;
    }

    },
    render: function() {

        game.debug.body(this.minotauro);
        game.debug.body(this.teseo);
        /*
       game.debug.spriteCoords(this.minotauro, 32, 130);
       for (var t = 1; t < 5; t++)
       {
           if (this.directions[t] === null)
           {
               continue;
           }

           var color = 'rgba(0,255,0,0.3)';

           if (this.directions[t].index !== this.safetile)
           {
               color = 'rgba(255,0,0,0.3)';
           }

           if (t === this.current)
           {
               color = 'rgba(255,255,255,0.3)';
           }

           this.game.debug.geom(new Phaser.Rectangle(this.directions[t].worldX, this.directions[t].worldY, 32, 32), color, true);
       }*/

       

    },

}
