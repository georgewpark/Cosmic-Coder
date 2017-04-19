//Initialise game.
var game = new Phaser.Game(800, 600, Phaser.AUTO, "game_div");

//Create states.
game.state.add('boot', bootState);
game.state.add('preload', preloadState);
game.state.add('menu', menuState);
game.state.add('levels', lvlSelectState);
game.state.add('game', gameState);

//Start boot state.
game.state.start('boot');