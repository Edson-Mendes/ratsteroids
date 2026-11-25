class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
    this.score = 0;
  }

  init(data) {
    if (data === undefined || data.score === undefined) this.score = 1000;
    else this.score = data.score;
  }

  preload() {
    this.load.image("grass", "assets/background004.jpg");
  }

  create() {
    let grass = this.physics.add.image(500, 300, "grass");
    grass.depth = -5;

    const gameOverText = this.add.text(330, 100, "GAME OVER", {
      fontSize: "64px",
      fill: "#fff",
    });

    const scoreText = this.add.text(390, 300, "Score: " + this.score, {
      fontSize: "32px",
      fill: "#fff",
    });

    const messageText = this.add.text(320, 450, "ENTER para continuar", {
      fontSize: "32px",
      fill: "#fff",
    });

    const inputNome = document.createElement("input");
    inputNome.classList.add("input");

    inputNome.type = "text";
    inputNome.placeholder = "Digite seu nome";
    inputNome.maxLength = 10;

    document.body.appendChild(inputNome);

    this.ENTER_BUTTON = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );

    this.ENTER_BUTTON.on("down", () => {
      let name = inputNome.value;
      if (name.length === 0) name = "Anônimo";
      name = name.padEnd(10, " ");

      let gamePlayInfo = {
        name: name,
        score: this.score
      }

      let ranking = loadRanking();
      ranking.push(gamePlayInfo);
      ranking.sort((a,b) => b.score - a.score);
      ranking.pop();
      saveRanking(ranking);
      console.log(ranking);

      inputNome.remove();
      this.scene.start("StartScene");
    });
  }

  update() {}
}
