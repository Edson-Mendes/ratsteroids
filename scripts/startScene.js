class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
    this.ENTER_BUTTON = undefined;
    this.ranking = [];
  }

  init(data) {
    this.ranking = loadRanking();
  }

  preload() {
    this.load.image("grass", "assets/background004.jpg");
  }

  create() {
    // background
    let grass = this.physics.add.image(500, 300, "grass");
    grass.depth = -5;

    const commandsMessage = `
      Segure F para atirar
      \u2190\u2191\u2192\u2193 para se mover
    `;

    const commandsText = this.add.text(300, 20, commandsMessage, {
      fontSize: "24px",
      fill: "#fff",
    });

    const rankingText = this.add.text(300, 150, rankingToString(this.ranking), {
      fontSize: "32px",
      fill: "#fff",
    });

    const messageText = this.add.text(330, 400, "ENTER para começar", {
      fontSize: "32px",
      fill: "#fff",
    });

    this.ENTER_BUTTON = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );

    this.ENTER_BUTTON.on("down", () => {
      this.scene.start("GameScene");
    });
  }

  update() {}

}
