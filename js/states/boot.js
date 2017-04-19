//Boot State.

var bootState = function() {};

bootState.prototype = {
    init: function() {
        //Initialise game settings.

        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;



        //game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //game.scale.pageAlignVertically = true;
        //game.scale.pageAlignHorizontally = true;

        console.log("%c \u2605 COSMIC CODER \u2605 ",
            "background: #000066; color: white; border: 3px solid #00E5E5; border-radius: 20px; font-size:30px;");

        //Set game background colour.
        game.stage.backgroundColor = '#000';

        //Prevent game pausing when focus lost.
        game.stage.disableVisibilityChange = true;

        //Initialise web fonts.
        this.conthraxFont = this.add.text(120, 230, "Conthrax", {
            font: '1px Conthrax',
            fill: '#fff'
        });
        this.conthraxFont.alpha = 0;

        this.exoFont = this.add.text(120, 230, "ExoMedium", {
            font: '1px ExoMedium',
            fill: '#fff'
        });
        this.exoFont.alpha = 0;

        //Save data.
        game.saveData = {};

        //Level number.
        game.levelNum = 0;

        //Returning state.
        game.returning = false;
    },
    preload: function() {
        //Load image assets for loading screen.
        this.load.image('starfield', 'assets/images/starfield.png');
        this.load.image('overlay', 'assets/images/overlay.png');
        this.load.image('border_top', 'assets/images/border_top.png');
        this.load.image('border_bottom', 'assets/images/border_bottom.png');
        this.load.image('preload_frame', 'assets/images/loading_bar_frame.png');
        this.load.image('preload_bar', 'assets/images/loading_bar.png');
    },
    create: function() {
        //Start preload state.
        this.state.start('preload');
    }
};