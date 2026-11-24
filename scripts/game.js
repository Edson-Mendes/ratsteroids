const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  backgroundColor: "#ffffff",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [GameScene],
};

// Começar jogo
const game = new Phaser.Game(config);
