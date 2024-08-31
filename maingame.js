    var platforms;
    var player;
    var coins;
    var totalcoins = 0;
    var score = 0;
    var grassLayer;
    var health;
    var soaps;
    var map;
    var grassLayer;
    var isLoaded = null;
    var reStartgame = null;
    var NowStartGame = null;
    var NowShowCredits = null;
    var returntoMenu = null;
    var screenCenterX = 0;
    var screenCenterY = 0;

//scenes
let splashscreen = new Phaser.Scene('splashscreen');

let titlescreen = new Phaser.Scene('titlescreen');

let creditsscreen = new Phaser.Scene('creditsscreen');

let shoppingscreen = new Phaser.Scene('shoppingscreen');

let maingame = new Phaser.Scene('maingame');

let gameover = new Phaser.Scene('gameover');

//splashscreen 
    splashscreen.preload = function(){
            screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
            screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
            var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(screenCenterX, screenCenterY, 320, 50);

            var width = window.innerWidth;
            var height = window.innerHeight;
            var loadingText = this.make.text({
                x: screenCenterX,
                y: screenCenterY,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: screenCenterX,
                y: screenCenterY,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = this.make.text({
                x: screenCenterX,
                y: screenCenterY,
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
                progressBar.fillRect(screenCenterX, screenCenterY, 300 * value, 30);
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
        
        this.add.image(screenCenterX, screenCenterY - 100, 'mainlogo').setOrigin(0.5);
        let startButton = this.add.rectangle(screenCenterX, screenCenterY + 200, 200, 100, 0xaaffaa);
        let creditsButton = this.add.circle(screenCenterX + (screenCenterX - 55), (screenCenterY / 5), 50, 0xffaaaa);
        startButton.setInteractive();
        creditsButton.setInteractive();
        this.add.text(screenCenterX, screenCenterY + 200, 'Start game', { fontSize: '30px', fill: '#000' }).setOrigin(0.5);
        this.add.text(screenCenterX + (screenCenterX - 55), screenCenterY / 5, '?', { fontSize: '50px', fill: '#000' }).setOrigin(0.5);
        startButton.on('pointerdown', function (pointer)
        {
            NowStartGame = true;
        });
        creditsButton.on('pointerdown', function (pointer)
        {
            NowShowCredits = true;
        });



    }

    titlescreen.update = function(){
        if (NowStartGame) {
            NowStartGame = false;
            this.scene.start("maingame");
        }
        if (NowShowCredits) {
            NowShowCredits = false;
            this.scene.start("creditsscreen");

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
        var leftarrow = this.add.image(screenCenterX - (screenCenterX / 1.5), screenCenterY + (screenCenterY / 1.5), 'leftArrow').setInteractive();
        leftarrow.setScrollFactor(0);
        var rightarrow = this.add.image(screenCenterX + (screenCenterX / 1.5), screenCenterY + (screenCenterY / 1.5), 'rightArrow').setInteractive();
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
        totalcoins += score;
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

        endText = this.add.text(screenCenterX, screenCenterY - (screenCenterY / 2), 'Game Over', { fontSize: '30px', fill: '#ffffff' }).setOrigin(0.5);
        endScore = this.add.text(screenCenterX, screenCenterY, '0', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        endScore.setText("Your Final Score: " + score + "pc");
        endTotalMoney = this.add.text(screenCenterX, screenCenterY - (screenCenterY / 4), '0', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        endTotalMoney.setText("Total Coins Collected: " + totalcoins + "pc");
        let continueButton = this.add.rectangle(screenCenterX, screenCenterY + 200, 200, 100, 0xaaffaa);
        continueButton.setInteractive();
        continueText = this.add.text(screenCenterX, screenCenterY + 200, 'Restart Game', { fontSize: '20px', fill: '#000' }).setOrigin(0.5);
       let creditsButton = this.add.circle(screenCenterX + (screenCenterX - 55), (screenCenterY / 5), 50, 0xffaaaa);
       creditsButton.setInteractive();
       this.add.text(screenCenterX + (screenCenterX - 55), screenCenterY / 5, '?', { fontSize: '50px', fill: '#000' }).setOrigin(0.5);
        

        continueButton.on('pointerdown', function (pointer)
        {
            reStartgame = true;
        });
        creditsButton.on('pointerdown', function (pointer)
        {
            NowShowCredits = true;
        });

    }

    gameover.update = function(){
        if (reStartgame) {
            reStartgame = false;
            score = 0;
            this.scene.start("maingame");
        }
        if (NowShowCredits) {
            NowShowCredits = false;
            score = 0;
            this.scene.start("creditsscreen");

        }
    }

    creditsscreen.create = function(){
        this.add.text(screenCenterX, screenCenterY + (screenCenterY/2), 'Click to return to menu', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY - (screenCenterY/2) - 80, 'Use left & right arrow Keys or', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY - (screenCenterY/2) - 60, 'Tap on Screen Arrows to move', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY - (screenCenterY/2) - 20, 'Credits', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY - (screenCenterY/2), 'Background Music By:', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY - (screenCenterY/2) + 20, 'TinyWorlds at Open Game Art', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY - (screenCenterY/2) + 40, 'Coin And Bounce SX By:', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY - (screenCenterY/2) + 60, 'NoiseForFun.com', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY - (screenCenterY/2) + 80, 'Tile Set and Background by:', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY - (screenCenterY/2) + 100, 'Bayat games platformer asset set', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY - (screenCenterY/2) + 120, 'Powered by Phaser 3', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY - (screenCenterY/2) + 140, 'Developed by Glory Legaspi', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        this.input.on('pointerdown', function (pointer)
        {
            returntoMenu = true;
        });
    }

    creditsscreen.update = function(){
        if (returntoMenu) {
            returntoMenu = false;
            this.scene.start("titlescreen");
        }
    }

    var config = {
        type: Phaser.AUTO,
        scale: {
        mode: Phaser.Scale.RESIZE,
        },
        backgroundColor: 0xdda0dd,
        physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }},
        scene: [splashscreen, titlescreen, maingame, gameover, creditsscreen, shoppingscreen],
        parent:"game-con",
    };

var game = new Phaser.Game(config);