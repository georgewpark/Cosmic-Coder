//Main Menu State.

var menuState = function(){};

menuState.prototype = {
    create: function() {
        //Create menu screen.

        //Play main theme.
        game.mainTheme = this.add.audio('theme');
        game.mainTheme.play();
        game.mainTheme.loopFull();
        game.mainTheme.volume = 0.2;

        //Add button pressed sound.
        game.btnSound = this.add.audio('btn_press');

        //Display starfield background.
        this.space = this.add.tileSprite(0, 0, 800, 600, 'starfield');

        //Display transparent overlay.
        this.overlay = this.add.sprite(0, 0, 'overlay');

        //Display borders.
        this.borderTop = this.add.sprite(game.world.centerX, 0, 'border_top');
        this.borderTop.anchor.setTo(0.5, 0);
        this.borderBottom = this.add.sprite(game.world.centerX, 571, 'border_bottom');
        this.borderBottom.anchor.setTo(0.5, 0);

        //Check returning state.
        if (game.returning == false) {
            //Create initial menu.

            game.returning = true;

            //Display title highlight.
            this.highlight = this.add.sprite(game.world.centerX, 140, 'large_highlight');
            this.highlight.anchor.setTo(0.5);

            //Display game title.
            this.gameTitle = this.add.text(game.world.centerX, 140, 'COSMIC CODER', {
                font: '65px Conthrax',
                fill: '#fff'
            });
            this.gameTitle.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
            this.gameTitle.anchor.setTo(0.5);
            this.gameTitle.alpha = 0;

            //New game button.
            this.newGameButton = this.add.button(game.world.centerX, 330, 'large_btn', this.newGame, this, 1, 0, 0, 0);
            this.newGameButton.anchor.setTo(0.5);
            this.newGameButton.inputEnabled = false;
            this.newGameText = this.add.text(game.world.centerX, 330, 'New Game', {
                font: '30px Conthrax',
                fill: '#fff'
            });
            this.newGameText.anchor.setTo(0.5);

            //Load game button.
            this.loadGameButton = this.add.button(game.world.centerX, 442, 'large_btn', this.loadGame, this, 1, 0, 0, 0);
            this.loadGameButton.anchor.setTo(0.5);
            this.loadGameButton.inputEnabled = false;
            this.loadGameText = this.add.text(game.world.centerX, 442, 'Load Game', {
                font: '30px Conthrax',
                fill: '#fff'
            });
            this.loadGameText.anchor.setTo(0.5);

            //Animate game title.
            this.add.tween(this.highlight).to( { y: 162, alpha: 1 }, 600, Phaser.Easing.Linear.Out, true);
            this.titleTween = this.add.tween(this.gameTitle).to( { y: 180, alpha: 1 }, 600, Phaser.Easing.Linear.Out, true);

            this.titleTween.onComplete.add(function () {
                //Enable button input.
                this.newGameButton.inputEnabled = true;
                this.loadGameButton.inputEnabled = true;
            }, this);
        } else {
            //Create main menu.

            //Display title highlight.
            this.highlight = this.add.sprite(game.world.centerX, 162, 'large_highlight');
            this.highlight.anchor.setTo(0.5);

            this.createMenu();
        }
    },
    update: function() {
        //Update background.
        this.space.tilePosition.x -= 1;
    },
    createMenu: function() {
        //Create main menu.

        //Game title.
        this.gameTitle = this.add.text(game.world.centerX, 180, 'COSMIC CODER', {
            font: '65px Conthrax',
            fill: '#fff'
        });
        this.gameTitle.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.gameTitle.anchor.setTo(0.5);

        //Show button dependent on levels completed.
        if (game.saveData.levelsComp < 1){
            //Start game button.
            this.startButton = this.add.button(game.world.centerX, 330, 'large_btn', this.startGame, this, 1, 0, 0, 0);
            this.startButton.anchor.setTo(0.5);
            this.startText = this.add.text(game.world.centerX, 330, 'Start Game', {
                font: '30px Conthrax',
                fill: '#fff'
            });
            this.startText.anchor.setTo(0.5);

        } else {
            //Continue button.
            this.continueButton = this.add.button(game.world.centerX, 330, 'large_btn', this.contGame, this, 1, 0, 0, 0);
            this.continueButton.anchor.setTo(0.5);
            this.continueText = this.add.text(game.world.centerX, 330, 'Continue', {
                font: '30px Conthrax',
                fill: '#fff'
            });
            this.continueText.anchor.setTo(0.5);
        }

        //Level select button.
        this.lvlSelectButton = this.add.button(game.world.centerX, 442, 'large_btn', this.lvlSelect, this, 1, 0, 0, 0);
        this.lvlSelectButton.anchor.setTo(0.5);
        this.lvlSelectText = this.add.text(game.world.centerX, 442, 'Level Select', {
            font: '30px Conthrax',
            fill: '#fff'
        });
        this.lvlSelectText.anchor.setTo(0.5);
    },
    //selectLanguage: function() {
        //Select programming language.

        //Remove new/load game buttons.
        //this.newGameButton.destroy();
        //this.newGameText.destroy();
        //this.loadGameButton.destroy();
        //this.loadGameText.destroy();

        //JavaScript Button.
        //this.jsButton = this.add.button(game.world.centerX, 310, 'large_btn', this.newGame, this, 1, 0, 0, 0);
        //this.jsButton.anchor.setTo(0.5);
        //this.jsText = this.add.text(game.world.centerX, 310, 'JavaScript', {
            //font: '30px Conthrax',
            //fill: '#fff'
        //});
        //this.jsText.anchor.setTo(0.5);

        //C++ Button.
        //this.cppButton = this.add.button(game.world.centerX, 440, 'large_btn', this.loadGame, this, 1, 0, 0, 0);
        //this.cppButton.anchor.setTo(0.5);
        //this.cppText = this.add.text(game.world.centerX, 440, 'C++', {
            //font: '30px Conthrax',
            //fill: '#fff'
        //});
        //this.cppText.anchor.setTo(0.5);
    //},
    newGame: function() {
        //Create new save data.
        console.log("%cCreating new save data...", "background: BlueViolet; color: white;");
        game.saveData = {"levelsComp": 0};
        localStorage.CosmicCoder = JSON.stringify(game.saveData);
        console.log(game.saveData);

        //Remove buttons.
        this.newGameButton.destroy();
        this.newGameText.destroy();
        this.loadGameButton.destroy();
        this.loadGameText.destroy();

        //Select programming language.
        //this.selectLanguage();

        //Play button pressed sound.
        game.btnSound.play();

        //Start main menu state.
        this.createMenu();
    },
    loadGame: function() {
        //Load previous save game.

        //Play button pressed sound effect.
        game.btnSound.play();

        //Check for previous save.
        if(localStorage.CosmicCoder !== undefined){
            //Previous save exists.
            console.log("Save file found.");

            //Load save data.
            console.log("%cLoading save file...", "background: BlueViolet; color: white;");
            game.saveData = JSON.parse(localStorage.CosmicCoder);
            console.log(game.saveData);

            //Remove buttons.
            this.newGameButton.destroy();
            this.newGameText.destroy();
            this.loadGameButton.destroy();
            this.loadGameText.destroy();

            //Start main menu state
            this.createMenu();
        } else {
            //Previous save not found.
            console.log("%cNo previous save found.", "background: darkred; color: white");

            //Disable buttons.
            this.newGameButton.inputEnabled = false;
            this.loadGameButton.inputEnabled = false;

            //Display black background.
            this.blackBg = this.add.sprite(game.world.centerX, game.world.centerY, 'black_bg');
            this.blackBg.anchor.setTo(0.5);

            //Display modal background.
            this.modal = this.add.sprite(game.world.centerX, game.world.centerY, 'modal_small');
            this.modal.anchor.setTo(0.5);

            //Display title.
            this.failTitle = this.add.text(game.world.centerX, 265, "Save Not Found", {
                font: '30px Conthrax',
                fill: '#fff'
            });
            this.failTitle.anchor.setTo(0.5);

            //Display ok button.
            this.okButton = this.add.button(game.world.centerX, 340, 'small_btn', this.close, this, 1, 0, 0, 0);
            this.okButton.anchor.setTo(0.5);
            this.okText = this.add.text(game.world.centerX, 340, 'OK', {
                font: '24px Conthrax',
                fill: '#fff'
            });
            this.okText.anchor.setTo(0.5);
        }
    },
    close: function() {
        //Close pop-up.

        //Play button pressed sound.
        game.btnSound.play();

        //Remove elements.
        this.blackBg.destroy();
        this.modal.destroy();
        this.failTitle.destroy();
        this.okButton.destroy();
        this.okText.destroy();

        //Enable buttons.
        this.newGameButton.inputEnabled = true;
        this.loadGameButton.inputEnabled = true;
    },
    startGame: function() {
        //Start new game.

        //Set game level.
        game.levelNum = 1;
        console.log("%cLoading Level: " + game.levelNum, "background: dodgerBlue; color: white;");

        //Play button pressed sound.
        game.btnSound.play();

        //Fade out menu music.
        game.mainTheme.pause();

        //Play level background music.
        game.levelMusic = this.add.audio('level_bg');
        game.levelMusic.play();
        game.levelMusic.loopFull();
        game.levelMusic.volume = 0.1;

        //Start game state.
        this.state.start('game');
    },
    contGame: function() {
        //Continue previous save game.

        //Set game level.
        if (game.saveData.levelsComp === 7) {
            //All levels completed
            game.levelNum = game.saveData.levelsComp
        } else {
            //Set next level.
            game.levelNum = game.saveData.levelsComp + 1;
        }

        //Play button pressed sound.
        game.btnSound.play();

        //Fade out menu music.
        game.mainTheme.pause();

        //Play level background music.
        game.levelMusic = this.add.audio('level_bg');
        game.levelMusic.play();
        game.levelMusic.loopFull();
        game.levelMusic.volume = 0.1;

        //Start game state.
        console.log("%cLoading Level: " + game.levelNum, "background: dodgerBlue; color: white;");
        this.state.start('game');
    },
    lvlSelect: function() {
        //Play button pressed sound.
        game.btnSound.play();

        //Start level selection state.
        this.state.start('levels');
    }
};