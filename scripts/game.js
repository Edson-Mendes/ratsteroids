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
const ROTATION = Object.freeze({
  cimaEsquerda: Math.PI * 0.75,
  cimaDireita: Math.PI * 1.25,
  baixoEsquerda: Math.PI * 0.25,
  baixoDireita: Math.PI * 1.75,
  cima: Math.PI,
  baixo: 0,
  esquerda: Math.PI * 0.5,
  direita: Math.PI * 1.5
});
let cat;
let catProjectile;
let cursors;

function preload() {
  this.load.image("cat", "assets/cat001.png");
  this.load.image("cat_projectile", "assets/blue_projectile01.png");
}

function create() {
  cat = this.physics.add.image(400, 300, "cat");
  cat.setDisplaySize(34, 96);
  cat.setCollideWorldBounds(true);

  // catProjectile = this.physics.add.image(600, 200, "cat_projectile");
  // catProjectile.setDisplaySize(48, 17);
  // catProjectile.setVelocityY(SPEED * -1.5);
  // catProjectile.setVelocityX(SPEED * -1.5);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.up.isDown && cursors.left.isDown) {
    // CIMA ESQUERDA
    cat.setVelocityY(SPEED * -1);
    cat.setVelocityX(SPEED * -1);
    cat.setRotation(ROTATION.cimaEsquerda);
  } else if (cursors.up.isDown && cursors.right.isDown) {
    // CIMA DIREITA
    cat.setVelocityY(SPEED * -1);
    cat.setVelocityX(SPEED);
    cat.setRotation(ROTATION.cimaDireita);
  } else if (cursors.down.isDown && cursors.left.isDown) {
    // BAIXO ESQUERDA
    cat.setVelocityY(SPEED);
    cat.setVelocityX(SPEED * -1);
    cat.setRotation(ROTATION.baixoEsquerda);
  } else if (cursors.down.isDown && cursors.right.isDown) {
    // BAIXO DIREITA
    cat.setVelocityY(SPEED);
    cat.setVelocityX(SPEED);
    cat.setRotation(ROTATION.baixoDireita);
  } else if (cursors.up.isDown) {
    // CIMA
    cat.setVelocityY(SPEED * -1);
    cat.setVelocityX(0);
    cat.setRotation(ROTATION.cima);
  } else if (cursors.down.isDown) {
    // BAIXO
    cat.setVelocityY(SPEED);
    cat.setVelocityX(0);
    cat.setRotation(ROTATION.baixo);
  } else if (cursors.left.isDown) {
    // ESQUERDA
    cat.setVelocityY(0);
    cat.setVelocityX(SPEED * -1);
    cat.setRotation(ROTATION.esquerda);
  } else if (cursors.right.isDown) {
    // DIREITA
    cat.setVelocityY(0);
    cat.setVelocityX(SPEED);
    cat.setRotation(ROTATION.direita);
  } else {
    // PARADO
    cat.setVelocityX(0);
    cat.setVelocityY(0);
  }
}
