//Preload State.

var preloadState = function(){};

preloadState.prototype = {
    preload: function() {
        //Load game assets.

        //Display starfield background.
        this.starfield = this.add.tileSprite(0, 0, 800, 600, 'starfield');

        //Display transparent overlay.
        this.overlay = this.add.sprite(0, 0, 'overlay');

        //Display borders.
        this.borderTop = this.add.sprite(game.world.centerX, 0, 'border_top');
        this.borderTop.anchor.setTo(0.5, 0);
        this.borderBottom = this.add.sprite(game.world.centerX, 571, 'border_bottom');
        this.borderBottom.anchor.setTo(0.5, 0);

        //Display loading bar.
        this.loadFrame = this.add.sprite(game.world.centerX, game.world.centerY, 'preload_frame');
        this.loadFrame.anchor.setTo(0.5);
        this.loadBar = this.add.sprite(game.world.centerX, game.world.centerY, 'preload_bar');
        this.loadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.loadBar);

        //Display loading percentage/progress.
        this.loadProg = this.add.text(game.world.centerX, 302, "Loading: 0%", {
            font: '13px Conthrax',
            fill: '#fff'
        });
        this.loadProg.anchor.setTo(0.5);
        this.loadProg.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        //Load JSON level data.
        this.load.text('levels', 'assets/data/level_data.json');

        //Load image assets.
        this.load.image('asteroid_1', 'assets/images/asteroid_1.png');
        this.load.image('asteroid_2', 'assets/images/asteroid_2.png');
        this.load.image('asteroid_3', 'assets/images/asteroid_3.png');
        this.load.image('asteroid_4', 'assets/images/asteroid_4.png');
        this.load.image('asteroid_5', 'assets/images/asteroid_5.png');
        this.load.image('explosion', 'assets/images/explosion.png');
        this.load.image('exhaust_slow', 'assets/images/exhaust_slow.png');
        this.load.image('exhaust_fast', 'assets/images/exhaust_fast.png');
        this.load.image('exhaust_blue', 'assets/images/exhaust_blue.png');
        this.load.image('exhaust_orange', 'assets/images/exhaust_orange.png');
        this.load.image('exhaust_purple', 'assets/images/exhaust_purple.png');
        this.load.image('exhaust_enemy', 'assets/images/exhaust_enemy.png');
        this.load.image('black_bg', 'assets/images/bg_black.png');
        this.load.image('info_section', 'assets/images/section_info.png');
        this.load.image('game_section', 'assets/images/section_game.png');
        this.load.image('code_section', 'assets/images/section_code.png');
        this.load.image('level_section', 'assets/images/section_level.png');
        this.load.image('ident_bg', 'assets/images/ident_bg.png');
        this.load.image('large_highlight', 'assets/images/highlight_large.png');
        this.load.image('small_highlight', 'assets/images/highlight_small.png');
        this.load.image('console_output', 'assets/images/console_output.png');
        this.load.image('modal_small', 'assets/images/modal_small.png');
        this.load.image('modal_large', 'assets/images/modal_large.png');
        this.load.image('orange_ship', 'assets/images/ship_orange.png');
        this.load.image('orange_ship_grey', 'assets/images/ship_orange_grey.png');
        this.load.image('player', 'assets/images/ship_green.png');
        this.load.image('player_grey', 'assets/images/ship_green_grey.png');
        this.load.image('blue_ship', 'assets/images/ship_blue.png');
        this.load.image('blue_ship_grey', 'assets/images/ship_blue_grey.png');
        this.load.image('mothership', 'assets/images/mothership.png');
        this.load.image('enemy', 'assets/images/ship_enemy.png');
        this.load.image('shield', 'assets/images/shield.png');
        this.load.image('speed_trail', 'assets/images/speed_trail.png');
        this.load.image('laser_green', 'assets/images/laser_green.png');
        this.load.image('laser_red', 'assets/images/laser_red.png');
        this.load.image('green_flash', 'assets/images/green_flash.png');
        this.load.image('red_flash', 'assets/images/red_flash.png');
        this.load.image('ship_damage', 'assets/images/ship_damage.png');
        this.load.image('space_small', 'assets/images/tile_space_small.png');
        this.load.image('space', 'assets/images/tile_space.png');
        this.load.image('ground', 'assets/images/tile_ground.png');
        this.load.image('planet', 'assets/images/planet.png');
        this.load.image('ident_1', 'assets/images/ident_level_1.png');
        this.load.image('ident_2', 'assets/images/ident_level_2.png');
        this.load.image('ident_3', 'assets/images/ident_level_3.png');
        this.load.image('ident_4', 'assets/images/ident_level_4.png');
        this.load.image('ident_5', 'assets/images/ident_level_5.png');
        this.load.image('ident_6', 'assets/images/ident_level_6.png');
        this.load.image('ident_7', 'assets/images/ident_level_7.png');

        //Load spritesheet assets.
        this.load.spritesheet('arrow_btn', 'assets/images/btn_arrow.png', 35, 49);
        this.load.spritesheet('large_btn', 'assets/images/btn_large.png', 348, 75);
        this.load.spritesheet('small_btn', 'assets/images/btn_small.png', 232, 50);
        this.load.spritesheet('smoke', 'assets/images/smoke.png', 128, 128);

        //Load audio assets.
        this.load.audio('asteroid_hit', ['assets/audio/asteroid_hit.ogg', 'assets/audio/asteroid_hit.mp3']);
        this.load.audio('btn_press', ['assets/audio/button_press.ogg', 'assets/audio/button_press.mp3']);
        this.load.audio('enemy_laser_fire', ['assets/audio/enemy_laser_fire.ogg', 'assets/audio/enemy_laser_fire.mp3']);
        this.load.audio('enemy_laser_hit', ['assets/audio/enemy_laser_hit.ogg', 'assets/audio/enemy_laser_hit.mp3']);
        this.load.audio('explosion', ['assets/audio/explosion.ogg', 'assets/audio/explosion.mp3']);
        this.load.audio('level_bg', ['assets/audio/level_bg.ogg', 'assets/audio/level_bg.mp3']);
        this.load.audio('ship_speed', ['assets/audio/ship_speed.ogg', 'assets/audio/ship_speed.mp3']);
        this.load.audio('ship_exhaust_short', ['assets/audio/exhaust_short.ogg', 'assets/audio/exhaust_short.mp3']);
        this.load.audio('ship_exhaust_long', ['assets/audio/exhaust_long.ogg', 'assets/audio/exhaust_long.mp3']);
        this.load.audio('ship_warp', ['assets/audio/ship_warp.ogg', 'assets/audio/ship_warp.mp3']);
        this.load.audio('player_laser_fire', ['assets/audio/player_laser_fire.ogg', 'assets/audio/player_laser_fire.mp3']);
        this.load.audio('player_laser_hit', ['assets/audio/player_laser_hit.ogg', 'assets/audio/player_laser_hit.mp3']);
        this.load.audio('theme', ['assets/audio/theme.ogg', 'assets/audio/theme.mp3']);
    },
    loadUpdate: function() {
        //Update loading percentage.
        this.loadProg.setText("Loading: " + this.load.progress + "%");
    },
    create: function() {
        //Start menu state.
        this.state.start('menu');
    }
};