    var platforms;
    var player;
    var coins;
    var score = 0;
    var grassLayer;
    var health;
    var soaps;
    var map;
    var grassLayer;
    var isLoaded = null;
    var reStartgame = null;
    var NowStartGame = null;

//scenes
let splashscreen = new Phaser.Scene('splashscreen');

let titlescreen = new Phaser.Scene('titlescreen');

let maingame = new Phaser.Scene('maingame');

let gameover = new Phaser.Scene('gameover');

//splashscreen 
    splashscreen.preload = function(){
            var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(240, 270, 320, 50);
            
            var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: width / 2,
                y: height / 2 - 5,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = this.make.text({
                x: width / 2,
                y: height / 2 + 50,
                text: '',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            assetText.setOrigin(0.5, 0.5);
            
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%');
                progressBar.clear();
                progressBar.fillStyle(0xffffff, 1);
                progressBar.fillRect(250, 280, 300 * value, 30);
            });
            
            this.load.on('fileprogress', function (file) {
                assetText.setText('Loading asset: ' + file.key);
            });
            this.load.on('complete', function () {
                isLoaded = true;
                progressBar.destroy();
                progressBox.destroy();
                loadingText.destroy();
                percentText.destroy();
                assetText.destroy();
            });

        this.load.tilemapTiledJSON('map', 'assets/map1.json');
        this.load.spritesheet('grass-sheet', 'assets/images/grass-sheet.png', {frameWidth: 100, frameHeight: 100});
        this.load.image('sky1', 'assets/background/background.png');
        this.load.image('sky2', 'assets/background/sky.png');
        this.load.image('ground', 'assets/tiles/grass.png');
        this.load.spritesheet('poop', 'assets/poop/default-sheet.png', { frameWidth: 91, frameHeight: 84 });
        this.load.image('soap', 'assets/images/soap.png');
        this.load.image('coin', 'assets/items/coin.png');
        this.load.audio('coinsound', 'assets/sounds/coin.wav');
        this.load.audio('bouncesound', 'assets/sounds/bounce.wav');
        this.load.audio('backgroundmusic', 'assets/sounds/song.mp3');
        this.load.image('leftArrow', 'assets/images/templeftarrow.png');
        this.load.image('rightArrow', 'assets/images/temprightarrow.png');
        this.load.image('mainlogo', 'assets/images/pclogoidea1.png')

    }

    splashscreen.update = function(){
        if (isLoaded) {
            this.scene.start("titlescreen");
        }
    }

//titlescreen

    titlescreen.create = function(){
        this.add.image(400, 200, 'mainlogo');
        startText = this.add.text(200, 450, 'click to start game', { fontSize: '30px', fill: '#ffffff' });
        this.input.on('pointerdown', function (pointer)
        {
            NowStartGame = true;
        });

    }

    titlescreen.update = function(){
        if (NowStartGame) {
            NowStartGame = false;
            this.scene.start("maingame");
        }
    }

//maingame

    maingame.create = function(){
        this.add.image(900, 750, 'sky2');
        this.add.image(900, 1400, 'sky2');
            map = this.make.tilemap({key: 'map'});
            var grass = map.addTilesetImage('grass-sheet');
            //grassLayer = map.createDynamicLayer('grass', grass, 0, 0);
            grassLayer = map.createLayer('grass', grass, 0, 0);
            grassLayer.setCollisionByExclusion([-1]);
            this.physics.world.bounds.width = grassLayer.width;
            this.physics.world.bounds.height = grassLayer.height;

        this.sound.add('coinsound');
        this.sound.add('bouncesound');
        this.backgroundmusic = this.sound.add('backgroundmusic');
        this.backgroundmusic.play({loop:true});

        //this.sound.play('backgroundmusic', { loop: true });
        var leftarrow = this.add.image(100, 550, 'leftArrow').setInteractive();
        leftarrow.setScrollFactor(0);
        var rightarrow = this.add.image(700, 550, 'rightArrow').setInteractive();
        rightarrow.setScrollFactor(0);

        leftarrow.on('pointerdown', function (pointer)
        {
            cursors.left.isDown = true;
        });
        leftarrow.on('pointerout', function (pointer)
        {
            cursors.left.isDown = false;
        });

        leftarrow.on('pointerup', function (pointer)
        {
            cursors.left.isDown = false;
        });

        rightarrow.on('pointerdown', function (pointer)
        {
            cursors.right.isDown = true;
        });
        rightarrow.on('pointerout', function (pointer)
        {
            cursors.right.isDown = false;
        });

        rightarrow.on('pointerup', function (pointer)
        {
            cursors.right.isDown = false;
        });



        player = this.physics.add.sprite(750, 0, 'poop');
        player.setBounce(.5);
        player.setCollideWorldBounds(true);


        coins = this.physics.add.group({
        key: 'coin',
        repeat: 5,
        setXY: { x: Phaser.Math.FloatBetween(0, 1400), y: 0, stepX: Phaser.Math.FloatBetween(50, 100)}
        });

        coins.children.iterate(function (child) {
        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setCollideWorldBounds(true);
        });

        soaps = this.physics.add.group();
        this.physics.add.collider(soaps, grassLayer);
        this.physics.add.collider(player, soaps, soapHit, null, this);

        this.physics.add.collider(coins, grassLayer);
        this.physics.add.collider(player, grassLayer, playbounce, null, this);
        this.physics.add.overlap(player, coins, collectcoin, null, this);

        cursors = this.input.keyboard.createCursorKeys();
            this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
                this.cameras.main.startFollow(player);

        scoreText = this.add.text(10, 5, 'Score: 0pc', { fontSize: '25px', fill: '#000' });
        scoreText.setScrollFactor(0);
        placeholdText = this.add.text(400, 5, 'Poop Collector', { fontSize: '20px', fill: '#000' });
        placeholdText.setScrollFactor(0);


        this.anims.create({
        key: 'left',
        frames: [ { key: 'poop', frame: 2 } ],
        frameRate: 20
        });

        this.anims.create({
        key: 'right',
        frames: [ { key: 'poop', frame: 1 } ],
        frameRate: 20
        });

        this.anims.create({
        key: 'still',
        frames: [ { key: 'poop', frame: 0 } ],
        frameRate: 20
    });

    }

    maingame.update = function(){
    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    if (player.body.velocity.y > 700) {

        player.setVelocityY(700);
    }
        
    if (cursors.left.isDown)
    {
        player.setVelocityX(-200);
        player.anims.play('left');

    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(200);
        player.anims.play('right');
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('still');

    }

    if ((cursors.up.isDown || cursors.space.isDown) && (player.body.onFloor() || player.body.touching.down))
    {
        player.setVelocityY(-700);
    }
    }

    function soapHit(player, soap){
        this.physics.pause();
        this.backgroundmusic.stop();
        gameOver = true;
        this.scene.start('gameover');

    }

    function collectcoin(player, coin){
    coin.disableBody(true, true);
    this.sound.play('coinsound');
    score += 5;
    scoreText.setText('Score: ' + score + "pc");

    if (coins.countActive(true) === 0)
    {
        coins = this.physics.add.group({
        key: 'coin',
        repeat: 5,
        setXY: { x: Phaser.Math.Between(0, 1400), y: 0, stepX: Phaser.Math.Between(50, 100)}
        });
        coins.children.iterate(function (child) {
        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.Between(0.4, 0.8));
        child.setCollideWorldBounds(true);
        });
        //coins.setVelocityY(700);

        this.physics.add.collider(coins, grassLayer);
        this.physics.add.overlap(player, coins, collectcoin, null, this);

        var soap = soaps.create(750, 0, 'soap');
        soap.setBounce(1);
        soap.setCollideWorldBounds(true);
        soap.setVelocity(Phaser.Math.Between(-200, 200), 20);
        soap.allowGravity = false;
    }
    }
    function playbounce(){
        if (player.body.touching.down || player.body.onFloor()){
           this.sound.play('bouncesound');
           player.setVelocityY(-500);
        }
    }
    function makeCoins(){
        coins = this.physics.add.group({
        key: 'coin',
        repeat: 5,
        setXY: { x: 50, y: 0, stepX: 50}
        });
    }

    // Game Over

    gameover.create = function(){

        endText = this.add.text(150, 200, 'Game Over', { fontSize: '100px', fill: '#ffffff' });
        endText.setScrollFactor(0);
        endScore = this.add.text(150, 300, '0', { fontSize: '40px', fill: '#ffffff' });;
        endScore.setText("Your Final Score: " + score + "pc");
        continueText = this.add.text(200, 450, 'click to continue', { fontSize: '30px', fill: '#ffffff' });
        this.input.on('pointerdown', function (pointer)
        {
            reStartgame = true;
        });

    }

    gameover.update = function(){
        if (reStartgame) {
            reStartgame = false;
            this.scene.start("maingame");
        }
    }


    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }},
        scene: [splashscreen, titlescreen, maingame, gameover],
        parent:"game-con",
    };

var game = new Phaser.Game(config);