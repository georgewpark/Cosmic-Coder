//Level Select State.

var lvlSelectState = function(){};

lvlSelectState.prototype = {
    init: function() {
        //Load level data.
        this.levelData = JSON.parse(game.cache.getText('levels'));

        //Set level index.
        this.levelIndex = 0;

        //Set unlocked/playable levels.
        this.unlockedLevels = game.saveData.levelsComp + 1;
    },
    create: function() {
        //Create level selection screen.

        //Display starfield background.
        this.starfield = this.add.tileSprite(0, 0, 800, 600, 'starfield');

        //Display transparent overlay.
        this.overlay = this.add.sprite(0, 0, 'overlay');

        //Display borders.
        this.borderTop = this.add.sprite(game.world.centerX, 0, 'border_top');
        this.borderTop.anchor.setTo(0.5, 0);
        this.borderBottom = this.add.sprite(game.world.centerX, 571, 'border_bottom');
        this.borderBottom.anchor.setTo(0.5, 0);

        //Display level background section.
        this.levelSection = this.add.sprite(game.world.centerX, 345, 'level_section');
        this.levelSection.anchor.setTo(0.5);

        //Display level select title.
        this.lvlSelectTitle = this.add.text(game.world.centerX, 83, 'Level Select', {
            font: '50px Conthrax',
            fill: '#fff'
        });
        this.lvlSelectTitle.anchor.setTo(0.5);
        this.lvlSelectTitle.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        //Display level name highlight.
        this.levelHighlight = this.add.sprite(game.world.centerX, 345, 'small_highlight');
        this.levelHighlight.anchor.setTo(0.5);

        //Level name.
        this.levelName = this.add.text(game.world.centerX, 175, this.levelData.level[this.levelIndex].title, {
            font: '32px Conthrax',
            fill: '#fff'
        });
        this.levelName.anchor.setTo(0.5);
        this.levelName.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        //Display level image background.
        this.levelImageBg = this.add.sprite(game.world.centerX, 305, 'ident_bg');
        this.levelImageBg.anchor.setTo(0.5);

        //Display level image.
        this.levelImage = this.add.sprite(game.world.centerX, 305, 'ident_' + (this.levelIndex + 1));
        this.levelImage.anchor.setTo(0.5);

        //Display level summary.
        this.levelSummary = this.add.text(game.world.centerX, 435, this.levelData.level[this.levelIndex].summary, {
            font: '18px ExoMedium',
            fill: '#fff',
            align: 'center'
        });
        this.levelSummary.anchor.setTo(0.5);

        //Display next arrow button.
        this.nextButton = this.add.button(685, 335, 'arrow_btn', this.nextLevel, this, 1, 0, 0, 0);
        this.nextButton.anchor.setTo(0.5);
        this.nextButton.scale.setTo(2.1);

        //Display play button.
        this.playButton = this.add.button(game.world.centerX, 505, 'small_btn', function(){this.loadLevel(this.levelIndex + 1)}, this, 1, 0, 0, 0);
        this.playButton.anchor.setTo(0.5);
        this.playText = this.add.text(game.world.centerX, 505, 'Play', {
            font: '22px Conthrax',
            fill: '#fff'
        });
        this.playText.anchor.setTo(0.5);

        //Menu button.
        //this.menuButton = this.add.button(80, 80, 'small_btn', this.menu, this, 1, 0, 0, 0);
        //this.menuButton.anchor.setTo(0.5);
        //this.menuButton.scale.setTo(0.6);
        //this.menuText = this.add.text(80, 81, 'Menu', {
            //font: '18px Conthrax',
            //fill: '#fff'
        //});
        //this.menuText.anchor.setTo(0.5);
    },
    update: function() {
        this.starfield.tilePosition.x -= 1;
    },
    nextLevel: function(){
        //Show next level.

        //Play button pressed sound.
        game.btnSound.play();

        //Check level index.
        if (this.levelIndex < 6) {

            //Increment level index.
            this.levelIndex++;

            //Display level name.
            this.levelName.setText(this.levelData.level[this.levelIndex].title);

            //Display level image.
            this.levelImage.destroy();
            this.levelImage = this.add.sprite(game.world.centerX, 305, 'ident_' + (this.levelIndex + 1));
            this.levelImage.anchor.setTo(0.5);

            //Display level summary.
            this.levelSummary.setText(this.levelData.level[this.levelIndex].summary);

            switch(this.levelIndex) {
                case 1:
                    //Display previous button.
                    this.prevButton = this.add.button(120, 335, 'arrow_btn', this.prevLevel, this, 1, 0, 0, 0);
                    this.prevButton.anchor.setTo(0.5);
                    this.prevButton.scale.setTo(-2.1, 2.1);
                    break;
                case 6:
                    //Destroy next button.
                    this.nextButton.destroy();
                    break;
                default:
                    break;
            }
        }
    },
    prevLevel: function(){
        //Show previous level.

        //Play button pressed sound.
        game.btnSound.play();

        //Check level index.
        if (this.levelIndex > 0) {

            //Decrease level index
            this.levelIndex--;

            //Display level title.
            this.levelName.setText(this.levelData.level[this.levelIndex].title);

            //Display level image.
            this.levelImage.destroy();
            this.levelImage = this.add.sprite(game.world.centerX, 305, 'ident_' + (this.levelIndex + 1));
            this.levelImage.anchor.setTo(0.5);

            //Display level summary.
            this.levelSummary.setText(this.levelData.level[this.levelIndex].summary);

            switch(this.levelIndex) {
                case 0:
                    //Destroy previous button.
                    this.prevButton.destroy();
                    break;
                case 5:
                    //Display next button.
                    this.nextButton = this.add.button(685, 335, 'arrow_btn', this.nextLevel, this, 1, 0, 0, 0);
                    this.nextButton.anchor.setTo(0.5);
                    this.nextButton.scale.setTo(2.1);
                    break;
                default:
                    break;
            }
        }
    },
    loadLevel: function(levelChoice) {
        //Load selected level.

        //Play button pressed sound.
        game.btnSound.play();

        //Check if level is unlocked.
        if (this.unlockedLevels >= levelChoice) {
            //Level unlocked.

            //Fade out menu music.
            game.mainTheme.pause();

            //Play level background music.
            game.levelMusic = this.add.audio('level_bg');
            game.levelMusic.play();
            game.levelMusic.loopFull();
            game.levelMusic.volume = 0.1;

            //Load level.
            game.levelNum = levelChoice;
            console.log("%cLoading Level: " + game.levelNum, "background: dodgerBlue; color: white;");

            //Start level
            this.state.start('game');
        } else {
            //Level Locked.

            //Display black background.
            this.blackBg = this.add.sprite(game.world.centerX, game.world.centerY, 'black_bg');
            this.blackBg.anchor.setTo(0.5);

            //Display modal background.
            this.modal = this.add.sprite(game.world.centerX, game.world.centerY, 'modal_small');
            this.modal.anchor.setTo(0.5);

            //Display message.
            this.lockedText = this.add.text(game.world.centerX, 265, "Level Locked", {
                font: '32px Conthrax',
                fill: '#fff'
            });
            this.lockedText.anchor.setTo(0.5);

            //Display ok button.
            this.okButton = this.add.button(game.world.centerX, 340, 'small_btn', this.close, this, 1, 0, 0, 0);
            this.okButton.anchor.setTo(0.5);
            this.okText = this.add.text(game.world.centerX, 340, 'OK', {
                font: '21px Conthrax',
                fill: '#fff'
            });
            this.okText.anchor.setTo(0.5);
        }
    },
    close: function() {
        //Play button pressed sound.
        game.btnSound.play();

        //Close modal.
        this.blackBg.destroy();
        this.modal.destroy();
        this.lockedText.destroy();
        this.okButton.destroy();
        this.okText.destroy();
    },
    menu: function() {
        //Start main menu state.
        this.state.start('menu');
    }
};