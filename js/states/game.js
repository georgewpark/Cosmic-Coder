//Game State.

var gameState = function(){};

gameState.prototype = {
    init: function() {
        //Initialise level settings.

        //Load level data.
        this.levelData = JSON.parse(game.cache.getText('levels'));

        //Level index for JSON file.
        this.levelIndex = game.levelNum - 1;

        //Level success condition.
        this.levelSuccess = false;

        //Reveal answer condition.
        this.revealAnswer = false;

        //Set page number.
        this.currentPage = 1;

        //Set total pages.
        this.totalPages = this.levelData.level[this.levelIndex].pages;
    },
    create: function() {
        //Create game elements.

        //Create game user interface.
        this.createUI();

        //Create game display.
        this.createGameDisplay();
    },
    createUI: function() {
        //Create user interface elements.

        //Display background.
        this.starfield = this.add.tileSprite(0, 0, 800, 600, 'starfield');

        //Display transparent overlay.
        this.overlay = this.add.sprite(0, 0, 'overlay');

        //Display background sections.
        this.infoSection = this.add.sprite(10, 380, 'info_section');
        this.gameSection = this.add.sprite(9, 11, 'game_section');
        this.codeSection = this.add.sprite(525, 12, 'code_section');

        //Display code output.
        this.codeText= this.add.text(540, 30, "Code Output :", {
            font: '16px Conthrax',
            fill: '#fff'
        });
        this.codeOutput = this.add.text(542, 65, this.levelData.level[this.levelIndex].output, {
            font: this.levelData.level[this.levelIndex].codeSize + ' Consolas',
            fill: '#fff'
        });

        //Create code editor.
        this.createEditor(this.levelData.level[this.levelIndex].top, this.levelData.level[this.levelIndex].rows);

        //Create try code button.
        this.tryButton = this.add.button(542, 380, 'small_btn', this.tryCode, this, 1, 0, 0, 0);
        this.tryText = this.add.text(658, 407, "Try Code", {
            font: '21px Conthrax',
            fill: '#fff'
        });
        this.tryText.anchor.setTo(0.5);

        //Create hint button.
        this.hintButton = this.add.button(542, 450, 'small_btn', this.showHint, this, 1, 0, 0, 0);
        this.hintText = this.add.text(658, 477, "Hint", {
            font: '21px Conthrax',
            fill: '#fff'
        });
        this.hintText.anchor.setTo(0.5);

        //Create quit button.
        this.quitButton = this.add.button(542, 520, 'small_btn', this.quitGame, this, 1, 0, 0, 0);
        this.quitText = this.add.text(658, 547, "Quit", {
            font: '21px Conthrax',
            fill: '#fff'
        });
        this.quitText.anchor.setTo(0.5);

        //Display level title.
        //this.levelTitle = this.add.text(260, 412, this.levelData.level[this.levelIndex].title, {
            //font: '28px Arial',
            //fill: '#fff'
        //});
        //this.levelTitle.setShadow(2, 2, 'rgba(0,0,0,0.5)', 3);
        //this.levelTitle.anchor.setTo(0.5);

        //Display page number.
        this.pageNum = this.add.text(260, 557, this.currentPage + "/" + this.totalPages, {
            font: '20px ExoMedium',
            fill: '#fff'
        });
        this.pageNum.anchor.setTo(0.5);

        //Create next button.
        this.nextButton = this.add.button(305, 555, 'arrow_btn', this.nextPage, this, 1, 0, 0, 0);
        this.nextButton.anchor.setTo(0.5);

        //Display level info.
        this.levelInfo = this.add.text(20, 408, this.levelData.level[this.levelIndex].pageData[this.currentPage - 1], {
            font: '17.3px ExoMedium',
            fill: '#fff'
        });
    },
    createGameDisplay: function() {
        //Create initial game display.

        //Display content dependent on level.
        switch (this.levelIndex){
            case 0:
                //Level 1 - Objects

                //Display planet background.
                this.ground = this.add.tileSprite(15, 16, 494, 346, 'ground');

                //Display console output.
                this.consoleOutput = this.add.sprite(250, 50, 'console_output');
                this.consoleOutput.anchor.setTo(0.5);

                //Display player ship.
                this.player = this.add.sprite(90, 220, 'player');
                this.player.anchor.setTo(0.5);
                this.player.angle = 90;

                //Set player speed.
                this.playerSpeed = 0;

                //Display player damage.
                this.playerDamage = this.add.sprite(this.player.x, this.player.y, 'ship_damage');
                this.playerDamage.anchor.setTo(0.5);
                this.playerDamage.angle = 90;

                //Display player smoke trail.
                this.playerSmoke = this.add.emitter(this.player.x - 42, this.player.y , 100);
                this.playerSmoke.width = 10;
                this.player.angle = 90;
                this.playerSmoke.makeParticles('smoke', [1,2,3,4,5]);
                this.playerSmoke.setXSpeed(8, -8);
                this.playerSmoke.setRotation(50,-50);
                this.playerSmoke.setAlpha(0.4, 0, 800);
                this.playerSmoke.setScale(0.02, 0.2, 0.02, 0.2, 1000, Phaser.Easing.Quintic.Out);
                this.playerSmoke.start(false, 800, 1);

                //Display player health.
                this.playerHealth = this.add.text(250, 52, "Health: 20", {
                    font: '25px Conthrax',
                    fill: '#fff'
                });
                this.playerHealth.setShadow(2, 2, 'rgba(0,0,0,0.5)', 3);
                this.playerHealth.anchor.setTo(0.5);

                break;
            case 1:
                //Level 2 - Conditionals

                //Display space background.
                this.space = this.add.tileSprite(15, 16, 494, 346, 'space_small');

                //Display planet.
                this.planet = this.add.sprite(15, 16, 'planet');

                //Display player ship.
                this.player = this.add.sprite(180, 200, 'player');
                this.player.anchor.setTo(0.5);
                this.player.scale.setTo(0.5);
                this.player.angle = 90;

                //Set player speed.
                this.playerSpeed = 0;

                //Set planet gravity.
                this.actingGravity = 25.0;

                //Display console output.
                this.consoleOutput = this.add.sprite(265, 55, 'console_output');
                this.consoleOutput.anchor.setTo(0.5);

                //Display gravity text.
                this.gravityText = this.add.text(233, 56, "Gravity:", {
                    font: '24px Conthrax',
                    fill: '#fff'
                });
                this.gravityText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 3);
                this.gravityText.anchor.setTo(0.5);

                this.gravityValue = this.add.text(322, 57, this.actingGravity, {
                    font: '24px Conthrax',
                    fill: '#fff'
                });
                this.gravityValue.setShadow(2, 2, 'rgba(0,0,0,0.5)', 3);
                this.gravityValue.anchor.setTo(0.5);

                break;
            case 2:
                //Level 3 - Methods

                //Display space background.
                this.space = this.add.tileSprite(15, 16, 494, 346, 'space');

                //Display console output.
                this.consoleOutput = this.add.sprite(260, 55, 'console_output');
                this.consoleOutput.anchor.setTo(0.5);

                //Display player ship.
                this.player = this.add.sprite(250, 280, 'player');
                this.player.anchor.setTo(0.5);

                //Display player ship exhaust.
                this.playerExhaust = this.add.sprite(250, this.player.y + 38, 'exhaust_slow');
                this.playerExhaust.anchor.setTo(0.5, 0);
                this.playerExhaust.alpha = 0.5;
                this.add.tween(this.playerExhaust).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true, 0, 1000, true);

                //Display shield power;
                this.shieldPower =  this.add.text(260, 57, "Shield Power: 0", {
                    font: '21px Conthrax',
                    fill: '#fff'
                });
                this.shieldPower.anchor.setTo(0.5);
                this.shieldPower.setShadow(2, 2, 'rgba(0,0,0,0.5)', 3);

                //Display asteroids.
                this.asteroid1 = this.add.sprite(80, 120, 'asteroid_1');
                this.asteroid1.anchor.setTo(0.5);
                this.asteroid2 = this.add.sprite(410, 240, 'asteroid_2');
                this.asteroid2.anchor.setTo(0.5);
                this.asteroid3 = this.add.sprite(80, 300, 'asteroid_3');
                this.asteroid3.anchor.setTo(0.5);
                this.asteroid4 = this.add.sprite(460, 130, 'asteroid_4');
                this.asteroid4.anchor.setTo(0.5);
                this.asteroid5 = this.add.sprite(130, 220, 'asteroid_4');
                this.asteroid5.anchor.setTo(0.5);
                this.asteroid6 = this.add.sprite(410, 120, 'asteroid_5');
                this.asteroid6.anchor.setTo(0.5);
                this.asteroid7 = this.add.sprite(460, 80, 'asteroid_5');
                this.asteroid7.anchor.setTo(0.5);
                this.asteroid8 = this.add.sprite(470, 320, 'asteroid_5');
                this.asteroid8.anchor.setTo(0.5);

                break;
            case 3:
                //Level 4 - Arrays

                //Display space background.
                this.space = this.add.tileSprite(15, 16, 494, 346, 'space');

                //Display player ship.
                this.player = this.add.sprite(250, 290, 'player');
                this.player.anchor.setTo(0.5);

                //Display player shield.
                this.playerShield = this.add.sprite(this.player.x, this.player.y, 'shield');
                this.playerShield.anchor.setTo(0.5);

                //Display player ship exhaust.
                this.playerExhaust = this.add.sprite(250, this.player.y + 38, 'exhaust_slow');
                this.playerExhaust.anchor.setTo(0.5, 0);
                this.playerExhaust.alpha = 0.5;
                this.add.tween(this.playerExhaust).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true, 0, 1000, true);

                //Display enemy ship.
                this.enemy = this.add.sprite(250, 83, 'enemy');
                this.enemy.anchor.setTo(0.5);

                //Display enemy ship exhaust.
                this.enemyExhaust = this.add.sprite(250, 40, 'exhaust_enemy');
                this.enemyExhaust.anchor.setTo(0.5);
                this.enemyExhaust.alpha = 0.3;
                this.add.tween(this.enemyExhaust).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

                break;
            case 4:
                //Level 5 - Loops

                //Display space background.
                this.space = this.add.tileSprite(15, 16, 494, 346, 'space');

                //Display console output.
                this.consoleOutput = this.add.sprite(260, 55, 'console_output');
                this.consoleOutput.anchor.setTo(0.5);

                //Display player ship.
                this.player = this.add.sprite(250, 200, 'player');
                this.player.anchor.setTo(0.5);

                //Display player exhaust.
                this.playerExhaust = this.add.sprite(250, this.player.y + 38, 'exhaust_slow');
                this.playerExhaust.anchor.setTo(0.5, 0);
                this.playerExhaust.alpha = 0.5;
                this.add.tween(this.playerExhaust).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true, 0, 1000, true);

                //Set player speed.
                this.playerSpeed = 2;

                //Display player speed.
                this.speedText = this.add.text(235, 56, "Speed:", {
                    font: '25px Conthrax',
                    fill: '#fff',
                    align: 'center'
                });
                this.speedText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 3);
                this.speedText.anchor.setTo(0.5);

                this.speedValue = this.add.text(320, 56, "Speed: 2.0", {
                    font: '25px Conthrax',
                    fill: '#fff',
                    align: 'center'
                });
                this.speedValue.setShadow(2, 2, 'rgba(0,0,0,0.5)', 3);
                this.speedValue.anchor.setTo(0.5);

                break;
            case 5:
                //Level 6 - Classes

                //Display space background.
                this.space = this.add.tileSprite(15, 16, 494, 346, 'space');

                //Display player ship.
                this.player = this.add.sprite(250, 120, 'player');
                this.player.anchor.setTo(0.5);

                //Display player ship exhaust.
                this.playerExhaust = this.add.sprite(250, this.player.y + 38, 'exhaust_slow');
                this.playerExhaust.anchor.setTo(0.5, 0);
                this.playerExhaust.alpha = 0.5;
                this.add.tween(this.playerExhaust).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true, 0, 1000, true);

                //Create blue ship outline.
                this.blueShipGrey = this.add.sprite(150, 250, 'blue_ship_grey');
                this.blueShipGrey.anchor.setTo(0.5);
                this.blueShipGrey.alpha = 0.1;
                this.add.tween(this.blueShipGrey).to( { alpha: 0.7 }, 1100, Phaser.Easing.Linear.None, true, 0, 1000, true);

                //Create orange ship outline.
                this.orangeShipGrey = this.add.sprite(355, 250, 'orange_ship_grey');
                this.orangeShipGrey.anchor.setTo(0.5);
                this.orangeShipGrey.alpha = 0.1;
                this.add.tween(this.orangeShipGrey).to( { alpha: 0.7 }, 1100, Phaser.Easing.Linear.None, true, 0, 1000, true);

                break;
            case 6:
                //Level 7 - Inheritance

                //Display space background.
                this.space = this.add.tileSprite(15, 16, 494, 346, 'space');

                //Display mothership.
                this.mothership = this.add.sprite(260, 110, 'mothership');
                this.mothership.anchor.setTo(0.5);

                //Display mothership exhaust.
                this.mothershipExhaust = this.add.sprite(260, this.mothership.y - 55, 'exhaust_purple');
                this.mothershipExhaust.anchor.setTo(0.5, 0);
                this.mothershipExhaust.scale.setTo(1.1);
                this.mothershipExhaust.alpha = 0.5;
                this.add.tween(this.mothershipExhaust).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true, 0, 1000, true);

                //Create green ship outline.
                this.greenShipGrey = this.add.sprite(100, 280, 'player_grey');
                this.greenShipGrey.anchor.setTo(0.5);
                this.greenShipGrey.alpha = 0.1;
                this.add.tween(this.greenShipGrey).to( { alpha: 0.7 }, 1100, Phaser.Easing.Linear.None, true, 0, 1000, true);

                //Create blue ship outline.
                this.blueShipGrey = this.add.sprite(260, 280, 'blue_ship_grey');
                this.blueShipGrey.anchor.setTo(0.5);
                this.blueShipGrey.alpha = 0.1;
                this.add.tween(this.blueShipGrey).to( { alpha: 0.7 }, 1100, Phaser.Easing.Linear.None, true, 0, 1000, true);

                //Create orange ship outline.
                this.orangeShipGrey = this.add.sprite(420, 280, 'orange_ship_grey');
                this.orangeShipGrey.anchor.setTo(0.5);
                this.orangeShipGrey.alpha = 0.1;
                this.add.tween(this.orangeShipGrey).to( { alpha: 0.7 }, 1100, Phaser.Easing.Linear.None, true, 0, 1000, true);

                break;
            default:
                //Level does not exist.
                console.log("Level does not exist.");
                break;
        }
    },
    updateDisplay: function() {
        //Update game display.

        //Level Successful.
        this.levelSuccess = true;

        //Check current level.
        switch (this.levelIndex) {
            case 0:
                //Level 1 - Objects

                //Play exhaust sound.
                this.exhaustSound = this.add.audio('ship_exhaust_short');
                this.exhaustSound.play();

                //Remove player damage.
                this.add.tween(this.playerDamage).to( { alpha: 0 }, 100, "Linear", true);
                this.add.tween(this.playerSmoke).to( { alpha: 0 }, 400, "Linear", true);

                //Create player ship exhaust.
                this.playerExhaust = this.add.sprite(this.player.x - 38, this.player.y, 'exhaust_slow');
                this.playerExhaust.anchor.setTo(0.5, 0);
                this.playerExhaust.angle = 90;
                this.add.tween(this.playerExhaust).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true, 0, 1000, true);

                //Display updated player health value.
                this.playerHealth.setText("Health: 100");

                break;
            case 1:
                //Level 2 - Conditionals

                //Play exhaust sound.
                this.exhaustSound = this.add.audio('ship_exhaust_long');
                this.exhaustSound.play();

                //Create player ship exhaust.
                this.playerExhaust = this.add.sprite(this.player.x - 18, this.player.y, 'exhaust_fast');
                this.playerExhaust.anchor.setTo(0.5, 0);
                this.playerExhaust.scale.setTo(0.5);
                this.playerExhaust.angle = 90;
                this.playerExhaust.alpha = 0.7;
                this.add.tween(this.playerExhaust).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true, 0, 1000, true);

                break;
            case 2:
                //Level 3 - Methods

                //Create player shield.
                this.playerShield = this.add.sprite(this.player.x, this.player.y, 'shield');
                this.playerShield.anchor.setTo(0.5);
                this.playerShield.alpha = 0;

                //Create incoming asteroids.
                this.asteroid9 = this.add.sprite(200, 90, 'asteroid_4');
                this.asteroid9.anchor.setTo(0.5);
                this.asteroid9.alpha = 0;

                this.asteroid10 = this.add.sprite(310, 90, 'asteroid_4');
                this.asteroid10.anchor.setTo(0.5);
                this.asteroid10.alpha = 0;

                this.asteroid11 = this.add.sprite(250, 90, 'asteroid_4');
                this.asteroid11.anchor.setTo(0.5);
                this.asteroid11.alpha = 0;

                //Display updated shield power.
                this.shieldPower.setText("Shield Power: 100");

                //Tween shield alpha value.
                this.add.tween(this.playerShield).to( { alpha: 1 }, 2000, "Linear", true);

                //Animate first incoming asteroid.
                this.add.tween(this.asteroid9).to( { alpha: 1 }, 600, "Linear", true);
                this.asteroidTween1 = this.add.tween(this.asteroid9).to( { y: 230, angle: 200 }, 2000, "Linear", true);

                this.asteroidTween1.onComplete.add(function () {

                    //Play asteroid sound.
                    this.asteroidSound = this.add.audio('asteroid_hit');
                    this.asteroidSound.play();

                    //Display updated shield power.
                    this.shieldPower.setText("Shield Power: 80");

                    //Create asteroid explosion emitter.
                    this.emitter = this.add.emitter(this.asteroid9.x, this.asteroid9.y, 100);
                    this.emitter.makeParticles('asteroid_5');
                    this.emitter.gravity = -110;
                    this.emitter.start(true, 1000, null, 20);
                    this.add.tween(this.emitter).to( { alpha: 0 }, 800, "Linear", true);

                    //Remove asteroid.
                    this.asteroid9.destroy();

                    //Animate second incoming asteroid.
                    this.add.tween(this.asteroid10).to( { alpha: 1 }, 600, "Linear", true);
                    this.asteroidTween2 = this.add.tween(this.asteroid10).to( { y: 240, angle: -140 }, 2500, "Linear", true);

                    this.asteroidTween2.onComplete.add(function () {

                        //Play asteroid sound.
                        this.asteroidSound = this.add.audio('asteroid_hit');
                        this.asteroidSound.play();

                        //Display updated shield power.
                        this.shieldPower.setText("Shield Power: 60");

                        //Create asteroid explosion emitter.
                        this.emitter = this.add.emitter(this.asteroid10.x, this.asteroid10.y, 100);
                        this.emitter.makeParticles('asteroid_5');
                        this.emitter.gravity = -110;
                        this.emitter.start(true, 1000, null, 20);
                        this.add.tween(this.emitter).to( { alpha: 0 }, 800, "Linear", true);

                        //Remove asteroid.
                        this.asteroid10.destroy();

                        //Animate third incoming asteroid.
                        this.add.tween(this.asteroid11).to( { alpha: 1 }, 600, "Linear", true);
                        this.asteroidTween3 = this.add.tween(this.asteroid11).to( { y: 215, angle: 300 }, 2500, "Linear", true);

                        this.asteroidTween3.onComplete.add(function () {

                            //Play asteroid sound.
                            this.asteroidSound = this.add.audio('asteroid_hit');
                            this.asteroidSound.play();

                            //Display updated shield power.
                            this.shieldPower.setText("Shield Power: 40");

                            //Create asteroid explosion emitter.
                            this.emitter = this.add.emitter(this.asteroid11.x, this.asteroid11.y, 100);
                            this.emitter.makeParticles('asteroid_5');
                            this.emitter.gravity = -110;
                            this.emitter.start(true, 1000, null, 20);
                            this.debrisTween = this.add.tween(this.emitter).to( { alpha: 0 }, 800, "Linear", true);

                            //Remove asteroid.
                            this.asteroid11.destroy();

                            this.debrisTween.onComplete.add(function () {
                                //Level complete.
                                this.levelComplete();
                            }, this);
                        }, this);
                    }, this);
                }, this);

                break;
            case 3:
                //Level 4 - Arrays

                //Create first player laser.
                this.playerLaser1 = this.add.sprite(220, this.player.y, 'laser_green');
                this.playerLaser1.anchor.setTo(0.5);
                this.playerLaser1.alpha = 0;

                //Create second player laser.
                this.playerLaser2 = this.add.sprite(280, this.player.y, 'laser_green');
                this.playerLaser2.anchor.setTo(0.5);
                this.playerLaser2.alpha = 0;

                //Create enemy laser.
                this.enemyLaser = this.add.sprite(250, 120, 'laser_red');
                this.enemyLaser.anchor.setTo(0.5);

                //Create enemy laser tween.
                this.enemyTween = this.add.tween(this.enemyLaser).to( { y: 220}, 500, "Linear", true);

                //Play laser fire sound.
                this.enemyLaserFire = this.add.audio('enemy_laser_fire');
                this.enemyLaserFire.play();

                //Enemy laser tween complete event.
                this.enemyTween.onComplete.add(function () {

                    //Play laser hit sound.
                    this.enemyLaserHit = this.add.audio('enemy_laser_hit');
                    this.enemyLaserHit.play();

                    //Create red laser flash.
                    this.redFlash = this.add.sprite(this.enemyLaser.x, this.enemyLaser.y + 18, 'red_flash');
                    this.redFlash.anchor.setTo(0.5);
                    this.redFlash.scale.setTo(0.2);
                    this.redFlashTween = this.add.tween(this.redFlash.scale).to( { x: 0.8, y: 0.8}, 180, "Linear", true);
                    this.add.tween(this.redFlash).to( { angle: 80}, 180, "Linear", true);

                    this.redFlashTween.onComplete.add(function () {
                        //Destroy red laser flash.
                        this.redFlash.destroy();
                    }, this);

                    //Destroy enemy laser
                    this.enemyLaser.destroy();

                    //Display first player laser.
                    this.playerLaser1.alpha = 1;

                    //Play laser fire sound.
                    this.playerLaser1Fire = this.add.audio('player_laser_fire');
                    this.playerLaser1Fire.play();

                    //Tween first player laser
                    this.playerTween1 = this.add.tween(this.playerLaser1).to( { y: 130}, 500, "Linear", true);

                    //First player laser tween complete event.
                    this.playerTween1.onComplete.add(function () {

                        //Play laser hit sound.
                        this.playerLaserHit = this.add.audio('player_laser_hit');
                        this.playerLaserHit.play();

                        //Create green laser flash.
                        this.greenFlash1 = this.add.sprite(this.playerLaser1.x, this.playerLaser1.y - 18, 'green_flash');
                        this.greenFlash1.anchor.setTo(0.5);
                        this.greenFlash1.scale.setTo(0.2);
                        this.greenFlashTween1 = this.add.tween(this.greenFlash1.scale).to( { x: 0.8, y: 0.8}, 180, "Linear", true);
                        this.add.tween(this.greenFlash1).to( { angle: 80}, 180, "Linear", true);

                        this.greenFlashTween1.onComplete.add(function () {
                            //Destroy green laser flash.
                            this.greenFlash1.destroy();
                        }, this);

                        //Destroy first player laser
                        this.playerLaser1.destroy();

                        //Display second player laser.
                        this.playerLaser2.alpha = 1;

                        //Tween second player laser.
                        this.playerTween2 = this.add.tween(this.playerLaser2).to( { y: 130}, 500, "Linear", true);

                        //Play laser fire sound.
                        this.playerLaser2Fire = this.add.audio('player_laser_fire');
                        this.playerLaser2Fire.play();

                        //Second player laser tween complete event.
                        this.playerTween2.onComplete.add(function () {

                            //Play laser hit sound.
                            this.playerLaserHit = this.add.audio('player_laser_hit');
                            this.playerLaserHit.play();

                            //Create explosion
                            this.explosion = this.add.sprite(this.enemy.x, this.enemy.y, 'explosion');
                            this.explosion.anchor.setTo(0.5);
                            this.explosion.scale.setTo(0.1);
                            this.explodeTween = this.add.tween(this.explosion.scale).to( { x:0.8, y: 0.8}, 420, "Linear", true);
                            this.add.tween(this.explosion).to( { angle: 280}, 420, "Linear", true);

                            this.explosionSound = this.add.audio('explosion');
                            this.explosionSound.play();

                            //Create green laser flash.
                            this.greenFlash2 = this.add.sprite(this.playerLaser2.x, this.playerLaser2.y - 18, 'green_flash');
                            this.greenFlash2.anchor.setTo(0.5);
                            this.greenFlash2.scale.setTo(0.2);
                            this.greenFlashTween2 = this.add.tween(this.greenFlash2.scale).to( { x: 0.8, y: 0.8}, 180, "Linear", true);
                            this.add.tween(this.greenFlash2).to( { angle: 80}, 180, "Linear", true);

                            this.greenFlashTween2.onComplete.add(function () {
                                //Destroy green laser flash.
                                this.greenFlash2.destroy();
                            }, this);

                            //Destroy second player laser.
                            this.playerLaser2.destroy();

                            //Destroy enemy ship.
                            this.enemy.destroy();
                            this.enemyExhaust.destroy();

                            this.explodeTween.onComplete.add(function () {
                                //Level complete.
                                this.levelComplete();
                            }, this);
                        }, this);
                    }, this);
                }, this);

                break;
            case 4:
                //Level 5 - Loops

                //Play speed-up sound.
                this.speedSound = this.add.audio('ship_speed');
                this.speedSound.play();

                //Change player ship exhaust.
                this.playerExhaust = this.add.sprite(250, this.player.y + 38, 'exhaust_fast');
                this.playerExhaust.anchor.setTo(0.5, 0);
                this.add.tween(this.playerExhaust).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true, 0, 1000, true);

                //Create left speed trail.
                this.speedTrail1 = this.add.sprite(198, 205, 'speed_trail');
                this.speedTrail1.anchor.setTo(0.5, 0);
                this.speedTrail1.alpha = 0;

                //Create right speed trail.
                this.speedTrail2 = this.add.sprite(302, 205, 'speed_trail');
                this.speedTrail2.anchor.setTo(0.5, 0);
                this.speedTrail2.alpha = 0;

                //Tween speed trails.
                this.add.tween(this.speedTrail1).to( { alpha: 1 }, 7000, "Linear", true);
                this.add.tween(this.speedTrail2).to( { alpha: 1 }, 7000, "Linear", true);

                break;
            case 5:
                //Level 6 - Classes

                //Play warp-in sound.
                this.warpSound = this.add.audio('ship_warp');
                this.warpSound.play();

                //Destroy ship outlines.
                this.blueShipGrey.destroy();
                this.orangeShipGrey.destroy();

                //Create blue ship.
                this.blueShip = this.add.sprite(150, 250, 'blue_ship');
                this.blueShip.anchor.setTo(0.5);
                this.blueShip.alpha = 0;
                this.add.tween(this.blueShip).to( { alpha: 1 }, 3000, "Linear", true);

                //Create blue ship exhaust.
                this.blueExhaust = this.add.sprite(this.blueShip.x, this.blueShip.y + 38, 'exhaust_blue');
                this.blueExhaust.anchor.setTo(0.5, 0);
                this.blueExhaust.alpha = 0;
                this.add.tween(this.blueExhaust).to( { alpha: 1 }, 3000, "Linear", true);

                //Create orange ship.
                this.orangeShip = this.add.sprite(355, 250, 'orange_ship');
                this.orangeShip.anchor.setTo(0.5);
                this.orangeShip.alpha = 0;
                this.shipTween = this.add.tween(this.orangeShip).to( { alpha: 1 }, 3000, "Linear", true);

                //Create orange ship exhaust.
                this.orangeExhaust = this.add.sprite(this.orangeShip.x, this.orangeShip.y + 38, 'exhaust_orange');
                this.orangeExhaust.anchor.setTo(0.5, 0);
                this.orangeExhaust.alpha = 0;
                this.add.tween(this.orangeExhaust).to( { alpha: 1 }, 3300, "Linear", true);

                this.shipTween.onComplete.add(function () {
                    //Level complete.
                    this.levelComplete();
                }, this);

                break;
            case 6:
                //Level 7 - Inheritance

                //Play warp-in sound.
                this.warpSound = this.add.audio('ship_warp');
                this.warpSound.play();

                //Destroy ship outlines.
                this.greenShipGrey.destroy();
                this.blueShipGrey.destroy();
                this.orangeShipGrey.destroy();

                //Create green ship.
                this.greenShip = this.add.sprite(100, 270, 'player');
                this.greenShip.anchor.setTo(0.5);
                this.greenShip.alpha = 0;
                this.add.tween(this.greenShip).to( { alpha: 1 }, 3000, "Linear", true);

                //Create green ship exhaust.
                this.greenExhaust = this.add.sprite(this.greenShip.x, this.greenShip.y + 38, 'exhaust_blue');
                this.greenExhaust.anchor.setTo(0.5, 0);
                this.greenExhaust.alpha = 0;
                this.add.tween(this.greenExhaust).to( { alpha: 1 }, 3000, "Linear", true);

                //Create blue ship.
                this.blueShip = this.add.sprite(260, 270, 'blue_ship');
                this.blueShip.anchor.setTo(0.5);
                this.blueShip.alpha = 0;
                this.add.tween(this.blueShip).to( { alpha: 1 }, 3000, "Linear", true);

                //Create blue ship exhaust.
                this.blueExhaust = this.add.sprite(this.blueShip.x, this.blueShip.y + 38, 'exhaust_blue');
                this.blueExhaust.anchor.setTo(0.5, 0);
                this.blueExhaust.alpha = 0;
                this.add.tween(this.blueExhaust).to( { alpha: 1 }, 3000, "Linear", true);

                //Create orange ship.
                this.orangeShip = this.add.sprite(420, 270, 'orange_ship');
                this.orangeShip.anchor.setTo(0.5);
                this.orangeShip.alpha = 0;
                this.shipTween = this.add.tween(this.orangeShip).to( { alpha: 1 }, 3000, "Linear", true);

                //Create orange ship exhaust.
                this.orangeExhaust = this.add.sprite(this.orangeShip.x, this.orangeShip.y + 38, 'exhaust_orange');
                this.orangeExhaust.anchor.setTo(0.5, 0);
                this.orangeExhaust.alpha = 0;
                this.add.tween(this.orangeExhaust).to( { alpha: 1 }, 3300, "Linear", true);

                this.shipTween.onComplete.add(function () {
                    //Level complete.
                    this.levelComplete();
                }, this);

                break;
            default:
                //Level does not exist.
                console.log("Level does not exist.");
                break;
        }
    },
    update: function() {
        //Update each frame of the game.

        //Update content dependent on level.
        switch (this.levelIndex) {
            case 0:
                //Level 1 - Objects

                if (this.levelSuccess) {
                    //Level successfully completed.
                    if(this.player.x < 460){
                        //Launch player ship.

                        //Set player speed.
                        this.playerSpeed += 0.018;

                        //Increase player y-position.
                        this.player.x += this.playerSpeed;

                        //Display player exhaust.
                        this.playerExhaust.x = this.player.x - 38;

                        this.ground.tilePosition.x -= this.playerSpeed;
                    } else {
                        //Level complete.
                        this.levelSuccess = false;
                        this.levelComplete();
                    }
                }
                break;
            case 1:
                //Level 2 - Conditionals

                //Update background.
                this.space.tilePosition.x -= 0.5;

                if (this.levelSuccess) {

                    if (this.player.x < 485) {

                        //Increase player speed.
                        this.playerSpeed += 0.008;

                        //Update player position
                        this.player.x += this.playerSpeed;
                        this.playerExhaust.x += this.playerSpeed;

                        //Decrease gravity.
                        this.actingGravity -= 0.0905;

                        //Display gravity.
                        this.gravityValue.setText(Math.floor(this.actingGravity));
                    } else {
                        //Disable player exhaust.
                        this.playerExhaust.destroy();

                        //Level complete.
                        this.levelSuccess = false;
                        this.levelComplete();
                    }
                }

                break;
            case 2:
                //Level 3 - Methods

                //Update background.
                this.space.tilePosition.y += 1;

                //Rotate asteroids.
                this.asteroid1.angle -= 0.9;
                this.asteroid2.angle += 0.4;
                this.asteroid3.angle -= 0.2;
                this.asteroid4.angle += 0.4;
                this.asteroid5.angle -= 0.8;
                this.asteroid6.angle -= 0.3;
                this.asteroid7.angle += 0.5;
                this.asteroid8.angle -= 0.7;

                break;
            case 3:
                //Level 4 - Arrays

                //Update background.
                this.space.tilePosition.y += 1;

                break;
            case 4:
                //Level 5 - Loops

                //Update background.
                this.space.tilePosition.y += this.playerSpeed;

                //Display player speed.
                this.speedValue.setText(Math.floor(this.playerSpeed));

                if (this.levelSuccess) {
                    //Level successfully completed.
                    if (this.playerSpeed < 50) {
                        //Increase player speed.
                        this.playerSpeed += 0.1;
                    } else {
                        //Level complete.
                        this.levelSuccess = false;
                        this.levelComplete();
                    }
                }

                break;
            case 5:
                //Level 6 - Classes

                //Update background.
                this.space.tilePosition.y += 2;

                break;
            case 6:
                //Level 7 - Inheritance

                //Update background.
                this.space.tilePosition.y -= 1.2;

                break;
            default:
                //Level does not exist.
                console.log("Level does not exist.");

                break;
        }
    },
    tryCode: function() {
        //Validate input code.

        //Play button pressed sound.
        game.btnSound.play();

        //Get user input from code editor.
        this.userInput = this.codeEditor.value.replace(/\s/g,"").replace("\n","");
        //.replace(/[;]/, ""));
        //.toLowerCase();

        //console.log("Editor Value: " + this.codeEditor.value);
        //console.log("Replaced Value: " + this.userInput);
        //console.log("Expected Result: " + this.levelData.level[this.levelIndex].expected);

        //Validate user input.
        if (this.userInput === this.levelData.level[this.levelIndex].expected){
            //Code correct.
            console.log("%cCode correct.", "background: green; color: white;");

            //Display correct response.
            this.showResponse("correct");

        } else {
            //Code incorrect.
            console.log("%cCode incorrect.", "background: darkred; color: white;");

            //Display incorrect response.
            this.showResponse("incorrect");
        }
    },
    createEditor: function(top, rows) {
        //Create code editor.

        //Display console text.
        this.consoleText = this.add.text(540, top - 26, "Code Editor :", {
            font: '16px Conthrax',
            fill: '#fff'
        });

        //Create code editor.
        document.getElementById("editor").innerHTML = '<textarea id="codeInput" maxlength="2000" autofocus spellcheck="false" cols="30" rows="'+
            rows + '"</textarea>';
        this.codeEditor = document.getElementById("codeInput");

        //Position code editor.
        document.getElementById("editor").style.top = top + "px";

        //Activate code editor.
        this.editorActive = true;
    },
    removeEditor: function() {
        //Remove code editor.
        this.codeEditor.parentNode.removeChild(this.codeEditor);
        this.editorActive = false;
    },
    nextPage: function() {
        //Display next page.

        //Play button pressed sound.
        game.btnSound.play();

        //Check current page.
        if (this.currentPage < this.totalPages) {

            //Increment page number.
            this.currentPage++;

            //Display page number.
            this.pageNum.setText(this.currentPage + "/" + this.totalPages);

            //Display page info.
            this.levelInfo.setText(this.levelData.level[this.levelIndex].pageData[this.currentPage - 1]);

            if (this.currentPage == this.totalPages) {
                //Remove next page button.
                this.nextButton.destroy();
            }

            if (this.currentPage == 2){
                //Create previous page button.
                this.prevButton = this.add.button(215, 555, 'arrow_btn', this.prevPage, this, 1, 0, 0, 0);
                this.prevButton.anchor.setTo(0.5);
                this.prevButton.scale.x = -1;
            }
        }
    },
    prevPage: function() {
        //Display previous page.

        //Play button pressed sound.
        game.btnSound.play();

        //Check current page.
        if (this.currentPage > 1) {
            //Decrease page number.
            this.currentPage--;

            //Display page number
            this.pageNum.setText(this.currentPage + "/" + this.totalPages);

            //Display page info.
            this.levelInfo.setText(this.levelData.level[this.levelIndex].pageData[this.currentPage - 1]);

            if (this.currentPage == 1) {
                //Remove previous page button.
                this.prevButton.destroy();
            }

            if (this.currentPage == (this.totalPages - 1)){
                //Create next page button.
                this.nextButton = this.add.button(305, 555, 'arrow_btn', this.nextPage, this, 1, 0, 0, 0);
                this.nextButton.anchor.setTo(0.5);
            }
        }
    },
    showResponse: function(response) {
        //Show code response.

        //Disable code editor.
        document.getElementById("codeInput").disabled = true;

        //Disable buttons.
        this.tryButton.inputEnabled = false;
        this.hintButton.inputEnabled = false;
        this.quitButton.inputEnabled = false;

        //Hide code editor.
        document.getElementById("editor").style.display = "none";

        //Display black background.
        this.blackBg = this.add.sprite(game.world.centerX, game.world.centerY, 'black_bg');
        this.blackBg.anchor.setTo(0.5);

        //Display modal background.
        this.modal = this.add.sprite(game.world.centerX, game.world.centerY, 'modal_small');
        this.modal.anchor.setTo(0.5);

        //Determine response.
        if (response == "correct") {
            this.responseOutput = "Code Correct!";
        } else {
            this.responseOutput = "Code Incorrect.";
        }

        //Display response.
        this.responseTitle = this.add.text(game.world.centerX, 265, this.responseOutput, {
            font: '32px Conthrax',
            fill: '#fff'
        });
        this.responseTitle.anchor.setTo(0.5);

        //Display ok button.
        this.okButton = this.add.button(game.world.centerX, 332, 'small_btn', function() {this.closeResponse(response)}, this, 1, 0, 0, 0);
        this.okButton.anchor.setTo(0.5);
        this.okText = this.add.text(game.world.centerX, 332, 'OK', {
            font: '21px Conthrax',
            fill: '#fff'
        });
        this.okText.anchor.setTo(0.5);
    },
    closeResponse: function(response) {
        //Close code response.

        //Play button pressed sound.
        game.btnSound.play();

        //Remove modal backgrounds.
        this.blackBg.destroy();
        this.modal.destroy();
        this.responseTitle.destroy();
        this.okButton.destroy();
        this.okText.destroy();

        //Show code editor.
        document.getElementById("editor").style.display = "block";

        if (response == "correct") {
            //Code correct.

            //Update game display.
            this.updateDisplay();

        } else {
            //Code Incorrect.

            //Enable code editor.
            document.getElementById("codeInput").disabled = false;

            //Enable buttons.
            this.tryButton.inputEnabled = true;
            this.hintButton.inputEnabled = true;
            this.quitButton.inputEnabled = true;
        }
    },
    showHint: function() {
        //Show level hint.

        //Play button pressed sound.
        game.btnSound.play();

        //Disable buttons.
        this.tryButton.inputEnabled = false;
        this.hintButton.inputEnabled = false;
        this.quitButton.inputEnabled = false;

        //Hide code editor.
        document.getElementById("editor").style.display = "none";

        //Display black background.
        this.blackBg = this.add.sprite(game.world.centerX, game.world.centerY, 'black_bg');
        this.blackBg.anchor.setTo(0.5);

        //Display modal background.
        this.modal = this.add.sprite(game.world.centerX, game.world.centerY, 'game_section');
        this.modal.anchor.setTo(0.5);

        //Check if answer has been previously revealed.
        if (this.revealAnswer) {
            //Answer previously revealed.

            //Display hint title.
            this.hintTitle = this.add.text(game.world.centerX, 170, "Answer", {
                font: '30px Conthrax',
                fill: '#fff'
            });
            this.hintTitle.anchor.setTo(0.5);

            //Display hint info.
            this.hintInfo = this.add.text(game.world.centerX, 290, this.levelData.level[this.levelIndex].answer, {
                font: this.levelData.level[this.levelIndex].ansSize + ' Conthrax',
                fill: '#fff'
            });
            this.hintInfo.anchor.setTo(0.5);

        } else {
            //Answer not revealed.

            //Display hint title.
            this.hintTitle = this.add.text(game.world.centerX, 170, "Hint", {
                font: '30px Conthrax',
                fill: '#fff'
            });
            this.hintTitle.anchor.setTo(0.5);

            //Display hint info.
            this.hintInfo = this.add.text(game.world.centerX, 205, this.levelData.level[this.levelIndex].hint, {
                font: '15px Conthrax',
                fill: '#fff'
            });
            this.hintInfo.anchor.setTo(0.5, 0);

            //Display answer button.
            this.answerButton = this.add.button(game.world.centerX, 350, 'small_btn', this.answer, this, 1, 0, 0, 0);
            this.answerButton.anchor.setTo(0.5);
            this.answerText = this.add.text(game.world.centerX, 350, 'Answer', {
                font: '21px Conthrax',
                fill: '#fff'
            });
            this.answerText.anchor.setTo(0.5);
        }

        //Display ok button.
        this.okButton = this.add.button(game.world.centerX, 420, 'small_btn', this.closeHint, this, 1, 0, 0, 0);
        this.okButton.anchor.setTo(0.5);

        this.okText = this.add.text(game.world.centerX, 420, 'OK', {
            font: '21px Conthrax',
            fill: '#fff'
        });
        this.okText.anchor.setTo(0.5);
    },
    answer: function() {
        //Play button pressed sound.
        game.btnSound.play();

        //Reveal answer.
        this.revealAnswer = true;
        this.hintTitle.setText("Answer");
        this.hintInfo.destroy();
        this.hintInfo = this.add.text(game.world.centerX, 290, this.levelData.level[this.levelIndex].answer, {
            font: this.levelData.level[this.levelIndex].ansSize + ' Conthrax',
            fill: '#fff'
        });
        this.hintInfo.anchor.setTo(0.5);

        //Remove answer button.
        this.answerButton.destroy();
        this.answerText.destroy();
    },
    closeHint: function() {
        //Close hint pop-up.

        //Play button pressed sound.
        game.btnSound.play();

        //Disable buttons.
        this.tryButton.inputEnabled = true;
        this.hintButton.inputEnabled = true;
        this.quitButton.inputEnabled = true;

        //Show code editor.
        document.getElementById("editor").style.display = "block";

        //Remove modal background.
        this.blackBg.destroy();
        this.modal.destroy();

        if (!this.revealAnswer) {
            this.hintTitle.destroy();
            this.hintInfo.destroy();
            this.answerButton.destroy();
            this.answerText.destroy();
        } else {
            this.hintTitle.destroy();
            this.hintInfo.destroy();
            this.hintText.setText("Answer");
        }

        this.okButton.destroy();
        this.okText.destroy();
    },
    levelComplete: function() {
        //Display level complete pop-up.

        //Remove code editor.
        this.removeEditor();

        //Display black background.
        this.blackBg = this.add.sprite(game.world.centerX, game.world.centerY, 'black_bg');
        this.blackBg.anchor.setTo(0.5);

        //Check current level.
        if (game.levelNum < 7) {
            //Next level available.

            //Display modal background.
            this.modal = this.add.sprite(game.world.centerX, game.world.centerY, 'modal_large');
            this.modal.anchor.setTo(0.5);

            //Level complete message.
            this.completeText = this.add.text(game.world.centerX, 185, "Level Complete", {
                font: '32px Conthrax',
                fill: '#fff'
            });
            this.completeText.anchor.setTo(0.5);

            //Create next level button.
            this.nxtLvlButton = this.add.button(game.world.centerX, 270, 'small_btn', this.nextLevel, this, 1, 0, 0, 0);
            this.nxtLvlButton.anchor.setTo(0.5);
            this.nxtLvlText = this.add.text(game.world.centerX, 270, "Next Level", {
                font: '21px Conthrax',
                fill: '#fff'
            });
            this.nxtLvlText.anchor.setTo(0.5);

            //Create replay button.
            this.replayButton = this.add.button(game.world.centerX, 345, 'small_btn', this.replay, this, 1, 0, 0, 0);
            this.replayButton.anchor.setTo(0.5);
            this.replayText = this.add.text(game.world.centerX, 345, "Replay", {
                font: '21px Conthrax',
                fill: '#fff'
            });
            this.replayText.anchor.setTo(0.5);

            //Create quit button.
            this.quitLvlButton = this.add.button(game.world.centerX, 420, 'small_btn', this.quitGame, this, 1, 0, 0, 0);
            this.quitLvlButton.anchor.setTo(0.5);
            this.quitLvlText = this.add.text(game.world.centerX, 420, "Quit", {
                font: '21px Conthrax',
                fill: '#fff'
            });
            this.quitLvlText.anchor.setTo(0.5);

        } else {
            //All levels completed.

            //Display modal background.
            this.modal = this.add.sprite(game.world.centerX, game.world.centerY, 'modal_small');
            this.modal.anchor.setTo(0.5);

            //Levels complete message.
            this.completeText = this.add.text(game.world.centerX, 240, "Levels Complete", {
                font: '32px Conthrax',
                fill: '#fff'
            });
            this.completeText.anchor.setTo(0.5);

            //Create replay button.
            this.replayButton = this.add.button(game.world.centerX, 305, 'small_btn', this.replay, this, 1, 0, 0, 0);
            this.replayButton.anchor.setTo(0.5);
            this.replayText = this.add.text(game.world.centerX, 305, "Replay", {
                font: '21px Conthrax',
                fill: '#fff'
            });
            this.replayText.anchor.setTo(0.5);

            //Create quit button.
            this.quitLvlButton = this.add.button(game.world.centerX, 365, 'small_btn', this.quitGame, this, 1, 0, 0, 0);
            this.quitLvlButton.anchor.setTo(0.5);
            this.quitLvlText = this.add.text(game.world.centerX, 365, "Quit", {
                font: '21px Conthrax',
                fill: '#fff'
            });
            this.quitLvlText.anchor.setTo(0.5);
        }
    },
    nextLevel: function() {
        //Start next level.

        //Play button pressed sound.
        game.btnSound.play();

        //Save game.
        this.saveGame();

        //Check current level.
        if (game.levelNum < 7) {
            //Next level available.

            //Set next level.
            game.levelNum++;
            console.log("%cLoading Level: " + game.levelNum, "background: dodgerBlue; color: white;");

            //Start next level.
            this.state.start('game');
        } else {
            //All levels completed.
            console.log("%cAll Levels Completed.", "background: darkorange; color: white;");

            //Return to main menu.
            this.state.start('menu');
        }
    },
    replay: function() {

        //Play button pressed sound.
        game.btnSound.play();

        //Save game.
        this.saveGame();

        //Restart level.
        this.state.start('game');
    },
    saveGame: function() {
        //Save game data.

        //Play button pressed sound.
        game.btnSound.play();

        //Check if level has previous save data.
        if (game.levelNum > game.saveData.levelsComp) {
            //Save level data.
            console.log("%cSaving game data...", "background: BlueViolet; color: white;");
            game.saveData.levelsComp = game.levelNum;
            localStorage.CosmicCoder = JSON.stringify({"levelsComp": game.saveData.levelsComp});
            console.log("%cLevels Completed: " + game.saveData.levelsComp, "background: OrangeRed; color: white;");
        }
    },
    quitGame: function() {
        //Quit game.

        //Play button pressed sound.
        game.btnSound.play();

        //Remove code editor.
        if (this.editorActive) {
            this.removeEditor();
        }

        game.levelMusic.destroy();

        //Return to main menu.
        this.state.start('menu');
    }
};