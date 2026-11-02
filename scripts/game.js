const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#ffffff",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
const SPEED = 200;
let cat;
let cursors;

function preload() {
  this.load.image("cat", "assets/cat001.png");
}

function create() {
  cat = this.physics.add.image(400, 300, "cat");
  cat.setDisplaySize(34, 96);
  cat.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.up.isDown && cursors.left.isDown) {
    // CIMA ESQUERDA
    cat.setVelocityY(SPEED * -1);
    cat.setVelocityX(SPEED * -1);
    cat.setRotation(Math.PI * 0.75);
  } else if (cursors.up.isDown && cursors.right.isDown) {
    // CIMA DIREITA
    cat.setVelocityY(SPEED * -1);
    cat.setVelocityX(SPEED);
    cat.setRotation(Math.PI * 1.25);
  } else if (cursors.down.isDown && cursors.left.isDown) {
    // BAIXO ESQUERDA
    cat.setVelocityY(SPEED);
    cat.setVelocityX(SPEED * -1);
    cat.setRotation(Math.PI * 0.25);
  } else if (cursors.down.isDown && cursors.right.isDown) {
    // BAIXO DIREITA
    cat.setVelocityY(SPEED);
    cat.setVelocityX(SPEED);
    cat.setRotation(Math.PI * 1.75);
  } else if (cursors.up.isDown) {
    // CIMA
    cat.setVelocityY(SPEED * -1);
    cat.setVelocityX(0);
    cat.setRotation(Math.PI);
  } else if (cursors.down.isDown) {
    // BAIXO
    cat.setVelocityY(SPEED);
    cat.setVelocityX(0);
    cat.setRotation(0);
  } else if (cursors.left.isDown) {
    // ESQUERDA
    cat.setVelocityY(0);
    cat.setVelocityX(SPEED * -1);
    cat.setRotation(Math.PI * 0.5);
  } else if (cursors.right.isDown) {
    // DIREITA
    cat.setVelocityY(0);
    cat.setVelocityX(SPEED);
    cat.setRotation(Math.PI * 1.5);
  } else {
    // PARADO
    cat.setVelocityX(0);
    cat.setVelocityY(0);
  }
}
