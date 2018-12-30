game = new Phaser.Game(864, 640, Phaser.AUTO, 'gameDiv')

game.global = {
    debug: 1,
    player1: null,
    player2: null,
    roca: null,
    antorchas: null,
    total: 0,
    connection: null
}

game.state.add('boot', DarkMaze.bootState);
game.state.add('preload', DarkMaze.preloadState);
game.state.add('menuequipos', DarkMaze.menuequiposState);
game.state.add('menupj', DarkMaze.menupjState);
game.state.add('menuppal', DarkMaze.menuppalState);
game.state.add('matchmaking', DarkMaze.matchmakingState);
game.state.add('partida', DarkMaze.partidaState);
game.state.add('win', DarkMaze.winState);
game.state.add('ranking', DarkMaze.rankingState);
game.state.add('controles', DarkMaze.controlesState);


game.state.start('boot')
