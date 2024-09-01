    var platforms;
    var player;
    var coins;
    var totalcoins = 55;
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
    var yesShowShopping = null;
    var yesShowCloset = null;
    var yesbuyEasyCapsule = null;
    var returntoMenu = null;
    var screenCenterX = 0;
    var screenCenterY = 0;
    var poopColor = "default";

//scenes
let splashscreen = new Phaser.Scene('splashscreen');

let titlescreen = new Phaser.Scene('titlescreen');

let creditsscreen = new Phaser.Scene('creditsscreen');

let shoppingscreen = new Phaser.Scene('shoppingscreen');

let closetscreen = new Phaser.Scene('closetscreen');

let maingame = new Phaser.Scene('maingame');

let gameover = new Phaser.Scene('gameover');

//splashscreen 
    splashscreen.preload = function(){
            screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
            screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
            var progressBar = this.add.graphics();
            var progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(screenCenterX - screenCenterX / 2, screenCenterY - 50, screenCenterX, 50);

            var width = window.innerWidth;
            var height = window.innerHeight;
            var loadingText = this.make.text({
                x: screenCenterX,
                y: screenCenterY - 100,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            var percentText = this.make.text({
                x: screenCenterX,
                y: screenCenterY + 100,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
            
            var assetText = this.make.text({
                x: screenCenterX,
                y: screenCenterY + 50,
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
                progressBar.fillRect(screenCenterX - screenCenterX / 2, screenCenterY - 50, screenCenterX * value, 50);
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
        this.load.spritesheet('defaultpoop', 'assets/poop/spritesheet.png', { frameWidth: 91, frameHeight: 84 });
        this.load.spritesheet('redpoop', 'assets/poop/spritesheetred.png', { frameWidth: 91, frameHeight: 84 });
        this.load.spritesheet('yellowpoop', 'assets/poop/spritesheetyellow.png', { frameWidth: 91, frameHeight: 84 });
        this.load.spritesheet('bluepoop', 'assets/poop/spritesheetblue.png', { frameWidth: 91, frameHeight: 84 });
        this.load.image('soap', 'assets/images/soap.png');
        this.load.image('coin', 'assets/items/coin.png');
        this.load.audio('coinsound', 'assets/sounds/coin.wav');
        this.load.audio('bouncesound', 'assets/sounds/bounce.wav');
        this.load.audio('enemyhitsound', 'assets/sounds/danlucaz__game-fx-6.wav');
        this.load.audio('backgroundmusic', 'assets/sounds/song.mp3');
        this.load.audio('uipopsound', 'assets/sounds/unfa__cartoon-pop-distorted.flac');
        this.load.image('leftArrow', 'assets/images/templeftarrow.png');
        this.load.image('rightArrow', 'assets/images/temprightarrow.png');
        this.load.image('mainlogo', 'assets/images/pclogoidea1.png');
    }

    splashscreen.create = function(){
        this.anims.create({
        key: 'defaultleft',
        frames: [ { key: 'defaultpoop', frame: 2 } ],
        frameRate: 20
        });

        this.anims.create({
        key: 'defaultright',
        frames: [ { key: 'defaultpoop', frame: 1 } ],
        frameRate: 20
        });

        this.anims.create({
        key: 'defaultstill',
        frames: [ { key: 'defaultpoop', frame: 0 } ],
        frameRate: 20
    });
        //red
        this.anims.create({
        key: 'redleft',
        frames: [ { key: 'redpoop', frame: 2 } ],
        frameRate: 20
        });

        this.anims.create({
        key: 'redright',
        frames: [ { key: 'redpoop', frame: 1 } ],
        frameRate: 20
        });

        this.anims.create({
        key: 'redstill',
        frames: [ { key: 'redpoop', frame: 0 } ],
        frameRate: 20
    });
        //blue
        this.anims.create({
        key: 'blueleft',
        frames: [ { key: 'bluepoop', frame: 2 } ],
        frameRate: 20
        });

        this.anims.create({
        key: 'blueright',
        frames: [ { key: 'bluepoop', frame: 1 } ],
        frameRate: 20
        });

        this.anims.create({
        key: 'bluestill',
        frames: [ { key: 'bluepoop', frame: 0 } ],
        frameRate: 20
    });
        //yellow
        this.anims.create({
        key: 'yellowleft',
        frames: [ { key: 'yellowpoop', frame: 2 } ],
        frameRate: 20
        });

        this.anims.create({
        key: 'yellowright',
        frames: [ { key: 'yellowpoop', frame: 1 } ],
        frameRate: 20
        });

        this.anims.create({
        key: 'yellowstill',
        frames: [ { key: 'yellowpoop', frame: 0 } ],
        frameRate: 20
    });
    }



    splashscreen.update = function(){
        if (isLoaded) {
            this.scene.start("titlescreen");
        }
    }

//titlescreen

    titlescreen.create = function(){
        this.sound.add('uipopsound');
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

        //show shopping button or closet
        if (totalcoins > 0) {
        let shoppingButton = this.add.rectangle(100, (screenCenterY / 10), 150, 50, 0xaaffaa);
        this.add.text(100, screenCenterY / 10, 'Spend Coins', { fontSize: '20px', fill: '#000' }).setOrigin(0.5);
        shoppingButton.setInteractive();
        shoppingButton.on('pointerdown', function (pointer)
            {
                yesShowShopping = true;
            });

        }
        



    }

    titlescreen.update = function(){
        if (NowStartGame) {
            this.sound.play("uipopsound");
            NowStartGame = false;
            this.scene.start("maingame");
        }
        if (NowShowCredits) {
            this.sound.play("uipopsound");
            NowShowCredits = false;
            this.scene.start("creditsscreen");

        }
        if (yesShowShopping) {
            this.sound.play("uipopsound");
            yesShowShopping = false;
            this.scene.start("shoppingscreen");

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
        this.sound.add('enemyhitsound');
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


        //change depending on which sprite color is selected
        if (poopColor === "default") {
            player = this.physics.add.sprite(750, 0, 'defaultpoop');
        }
        else if (poopColor === "red") {
            player = this.physics.add.sprite(750, 0, 'redpoop');
        }
        else if (poopColor === "yellow") {
            player = this.physics.add.sprite(750, 0, 'yellowpoop');
        }
        else if (poopColor === "blue") {
            player = this.physics.add.sprite(750, 0, 'bluepoop');
        }
        else{
            player = this.physics.add.sprite(750, 0, 'defaultpoop');
        }

        player.setBounce(.5);
        player.setCollideWorldBounds(true);


        coins = this.physics.add.group({
        key: 'coin',
        repeat: 5,
        setXY: { x: Phaser.Math.FloatBetween(0, 1000), y: 0, stepX: Phaser.Math.FloatBetween(50, 100)}
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


        

    }

    maingame.update = function(){
    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    if (player.body.velocity.y > 700) {

        player.setVelocityY(700);
    }
    
            if (cursors.left.isDown)
            {
                player.setVelocityX(-200);
                if (poopColor === "default") {
                    player.anims.play('defaultleft');
                }
                else if (poopColor === "red") {
                    player.anims.play('redleft');
                }
                else if (poopColor === "yellow") {
                    player.anims.play('yellowleft');
                }
                else if (poopColor === "blue") {
                    player.anims.play('blueleft');
                }
                else{
                    player.anims.play('defaultleft');
                }

            }
            else if (cursors.right.isDown)
            {
                player.setVelocityX(200);

                if (poopColor === "default") {
                    player.anims.play('defaultright');
                }
                else if (poopColor === "red") {
                    player.anims.play('redright');
                }
                else if (poopColor === "yellow") {
                    player.anims.play('yellowright');
                }
                else if (poopColor === "blue") {
                    player.anims.play('blueright');
                }
                else{
                    player.anims.play('defaultright');
                }
            }
            else
            {
                player.setVelocityX(0);
                if (poopColor === "default") {
                player.anims.play('defaultstill');
                }
                else if (poopColor === "red") {
                     player.anims.play('redstill');
                }
                else if (poopColor === "yellow") {
                    player.anims.play('yellowstill');
                }
                else if (poopColor === "blue") {
                    player.anims.play('bluestill');
                }
                else{
                    player.anims.play('defaultstill');
                }
            }

    if ((cursors.up.isDown || cursors.space.isDown) && (player.body.onFloor() || player.body.touching.down))
    {
        player.setVelocityY(-700);
    }
    }



    function soapHit(player, soap){
        this.physics.pause();
        this.backgroundmusic.stop();
        this.sound.play('enemyhitsound');
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
            setXY: { x: Phaser.Math.Between(0, 1000), y: 0, stepX: Phaser.Math.Between(50, 100)}
        });
        coins.children.iterate(function (child) {
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

        this.sound.add('uipopsound');

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

        let shoppingButton = this.add.rectangle(100, (screenCenterY / 10), 150, 50, 0xaaffaa);
        this.add.text(100, screenCenterY / 10, 'Spend Coins', { fontSize: '20px', fill: '#000' }).setOrigin(0.5);
        shoppingButton.setInteractive();
        shoppingButton.on('pointerdown', function (pointer)
        {

            yesShowShopping = true;
        });

    }

    gameover.update = function(){
        if (reStartgame) {
            this.sound.play("uipopsound");
            reStartgame = false;
            score = 0;
            this.scene.start("maingame");
        }
        if (NowShowCredits) {
            this.sound.play("uipopsound");
            NowShowCredits = false;
            score = 0;
            this.scene.start("creditsscreen");

        }
        if (yesShowShopping) {
            this.sound.play("uipopsound");
            yesShowShopping = false;
            score = 0;
            this.scene.start("shoppingscreen");
        }
    }


    shoppingscreen.create = function(){

        let popSound = this.sound.add('uipopsound');

        endText = this.add.text(screenCenterX, 30, 'Unlock Poop', { fontSize: '30px', fill: '#ffffff' }).setOrigin(0.5);
        endTotalMoney = this.add.text(screenCenterX, 55, '0', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        endTotalMoney.setText("Total Coins Collected: " + totalcoins + "pc");

        //temp capslue machine
        let easycapsulemachine = this.add.rectangle(screenCenterX, screenCenterY - screenCenterY / 4, 150, 200, 0xaaffaa);
        let pooppic = this.add.image(screenCenterX, screenCenterY, 'defaultpoop');
        if (poopColor === "red") {
            pooppic.setTexture("redpoop",[0]);
        }
        else if (poopColor === "yellow") {
            pooppic.setTexture("yellowpoop",[0]);
        }
        else if (poopColor === "blue") {
            pooppic.setTexture("bluepoop",[0]);
        }
        let easycapsulemachinetext1 = this.add.text(screenCenterX, screenCenterY - screenCenterY / 4, 'Buy capsule', { fontSize: '20px', fill: '#000' }).setOrigin(0.5);
        let easycapsulemachinetext2 = this.add.text(screenCenterX, screenCenterY - screenCenterY / 4 + 25, '(50 coins)', { fontSize: '20px', fill: '#000' }).setOrigin(0.5);
        easycapsulemachine.setInteractive();
        easycapsulemachine.on('pointerdown', function (pointer)
        {
            
            yesbuyEasyCapsule = true;
            if (totalcoins >= 50) {
                popSound.play();
                totalcoins = totalcoins - 50;
                endTotalMoney.setText("Total Coins Collected: " + totalcoins + "pc");
                easycapsulemachine.destroy();
                easycapsulemachinetext2.destroy();
                var pickNum1 = Phaser.Math.Between(1, 10);
                var pickNum2 = Phaser.Math.Between(1, 10);
                var pickNum3 = Phaser.Math.Between(1, 10);
                var whichResultNum = Math.min(pickNum1, pickNum2, pickNum3);

                if (whichResultNum <= 5) {
                    poopColor = "yellow";
                    pooppic.setTexture("yellowpoop",[0]);
                    easycapsulemachinetext1.setText("You unlocked Yellow (common)" + whichResultNum);
                }
                else if (whichResultNum <= 8) {
                    poopColor = "red";
                    pooppic.setTexture("redpoop",[0]);
                    easycapsulemachinetext1.setText("You unlocked Red (uncommon)" + whichResultNum);
                }
                else if (whichResultNum <= 10) {
                    poopColor = "blue";
                    pooppic.setTexture("bluepoop",[0]);
                    easycapsulemachinetext1.setText("You unlocked Blue (rare)" + whichResultNum);
                }


            }
            
        });




        let returntoMenuButton = this.add.rectangle(screenCenterX, screenCenterY + 200, 200, 100, 0xaaffaa);
        returntoMenuButton.setInteractive();
        returntoMenuText = this.add.text(screenCenterX, screenCenterY + 200, 'Return to Menu', { fontSize: '20px', fill: '#000' }).setOrigin(0.5);
        returntoMenuButton.on('pointerdown', function (pointer)
        {

            returntoMenu = true;
        });


    }

    shoppingscreen.update = function(){
        if (returntoMenu) {
            returntoMenu = false;
            this.sound.play("uipopsound");
            this.scene.start("titlescreen");
        }
        if (yesbuyEasyCapsule) {
            yesbuyEasyCapsule = false;
        }
    }





    creditsscreen.create = function(){
        
        poopColor = "red";

        this.add.text(screenCenterX, screenCenterY + (screenCenterY/2), 'Click to return to menu', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY - (screenCenterY/2) - 100, 'Collect coins, avoid soap', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
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
        scene: [splashscreen, titlescreen, maingame, gameover, creditsscreen, shoppingscreen, closetscreen],
        parent:"game-con",
    };

var game = new Phaser.Game(config);