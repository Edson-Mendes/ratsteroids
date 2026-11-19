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
const SPEED = 100;
const PROJECTILE_SPEED = 500;
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
const ROTATION_LABEL = Object.freeze({
  cimaEsquerda: "cimaEsquerda",
  cimaDireita: "cimaDireita",
  baixoEsquerda: "baixoEsquerda",
  baixoDireita: "baixoDireita",
  cima: "cima",
  baixo: "baixo",
  esquerda: "esquerda",
  direita: "direita"
});
let cat;
let catProjectile;
let cursors;
let timeProjectile = 0;

function preload() {
  this.load.image("cat", "assets/cat002.png");
  this.load.image("cat_projectile", "assets/blue_projectile03.png");
}

function create() {
  cat = this.physics.add.image(400, 300, "cat");
  cat.setDisplaySize(30, 85);
  cat.setCollideWorldBounds(true);
  cat.rotationLabel = ROTATION_LABEL.baixo;
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.shift.isDown && timeProjectile++ === 30) {
    // ATIRAR
    timeProjectile = 0;
    catProjectile = this.physics.add.image(cat.x, cat.y, "cat_projectile");
    catProjectile.depth = -1;
    catProjectile.setDisplaySize(17, 48);
    catProjectile.setRotation(cat._rotation);
    catProjectile.rotationLabel = cat.rotationLabel;
    setVelocity(catProjectile, PROJECTILE_SPEED);
  }
  if (cursors.up.isDown && cursors.left.isDown) {
    // CIMA ESQUERDA
    cat.setVelocityY(SPEED * -1);
    cat.setVelocityX(SPEED * -1);
    cat.setRotation(ROTATION.cimaEsquerda);
    cat.rotationLabel = ROTATION_LABEL.cimaEsquerda;
  } else if (cursors.up.isDown && cursors.right.isDown) {
    // CIMA DIREITA
    cat.setVelocityY(SPEED * -1);
    cat.setVelocityX(SPEED);
    cat.setRotation(ROTATION.cimaDireita);
    cat.rotationLabel = ROTATION_LABEL.cimaDireita;
  } else if (cursors.down.isDown && cursors.left.isDown) {
    // BAIXO ESQUERDA
    cat.setVelocityY(SPEED);
    cat.setVelocityX(SPEED * -1);
    cat.setRotation(ROTATION.baixoEsquerda);
    cat.rotationLabel = ROTATION_LABEL.baixoEsquerda;
  } else if (cursors.down.isDown && cursors.right.isDown) {
    // BAIXO DIREITA
    cat.setVelocityY(SPEED);
    cat.setVelocityX(SPEED);
    cat.setRotation(ROTATION.baixoDireita);
    cat.rotationLabel = ROTATION_LABEL.baixoDireita;
  } else if (cursors.up.isDown) {
    // CIMA
    cat.setVelocityY(SPEED * -1);
    cat.setVelocityX(0);
    cat.setRotation(ROTATION.cima);
    cat.rotationLabel = ROTATION_LABEL.cima;
  } else if (cursors.down.isDown) {
    // BAIXO
    cat.setVelocityY(SPEED);
    cat.setVelocityX(0);
    cat.setRotation(ROTATION.baixo);
    cat.rotationLabel = ROTATION_LABEL.baixo;
  } else if (cursors.left.isDown) {
    // ESQUERDA
    cat.setVelocityY(0);
    cat.setVelocityX(SPEED * -1);
    cat.setRotation(ROTATION.esquerda);
    cat.rotationLabel = ROTATION_LABEL.esquerda;
  } else if (cursors.right.isDown) {
    // DIREITA
    cat.setVelocityY(0);
    cat.setVelocityX(SPEED);
    cat.setRotation(ROTATION.direita);
    cat.rotationLabel = ROTATION_LABEL.direita;
  } else {
    // PARADO
    cat.setVelocityX(0);
    cat.setVelocityY(0);
  }
}

function setVelocity(object, speed) {
  switch (object.rotationLabel) {
    case ROTATION_LABEL.cimaEsquerda:
      object.setVelocityY(speed * -1);
      object.setVelocityX(speed * -1);
      break;
    case ROTATION_LABEL.cimaDireita:
      object.setVelocityY(speed * -1);
      object.setVelocityX(speed);
      break;
    case ROTATION_LABEL.baixoDireita:
      object.setVelocityY(speed);
      object.setVelocityX(speed);
      break;
    case ROTATION_LABEL.baixoEsquerda:
      object.setVelocityY(speed);
      object.setVelocityX(speed * -1);
      break;
    case ROTATION_LABEL.cima:
      object.setVelocityY(speed * -1);
      object.setVelocityX(0);
      break;
    case ROTATION_LABEL.baixo:
      object.setVelocityY(speed);
      object.setVelocityX(0);
      break;
    case ROTATION_LABEL.esquerda:
      object.setVelocityY(0);
      object.setVelocityX(speed * -1);
      break;
    case ROTATION_LABEL.direita:
      object.setVelocityY(0);
      object.setVelocityX(speed);
      break;
    default:
      break;
  }
}
