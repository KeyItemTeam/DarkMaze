game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv')

game.state.add('boot', DarkMaze.bootState);
game.state.add('preload', DarkMaze.preloadState);
game.state.add('menuequipos', DarkMaze.menuequiposState);
game.state.add('menupj', DarkMaze.menupjState);
game.state.add('menuppal', DarkMaze.menuppalState);
game.state.add('partida', DarkMaze.partidaState);

game.state.start('boot')