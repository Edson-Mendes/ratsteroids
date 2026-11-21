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
  topLeft: Math.PI * 0.75,
  topRight: Math.PI * 1.25,
  bottomLeft: Math.PI * 0.25,
  bottomRight: Math.PI * 1.75,
  top: Math.PI,
  bottom: 0,
  left: Math.PI * 0.5,
  right: Math.PI * 1.5,
});
const ROTATION_LABEL = Object.freeze({
  topLeft: "topLeft",
  topRight: "topRight",
  bottomLeft: "bottomLeft",
  bottomRight: "bottomRight",
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
});
const GAME_BUTTONS = {};

let cat;
let catProjectile;
let timeProjectile = 0;


function preload() {
  this.load.image("cat", "assets/cat002.png");
  this.load.image("cat_projectile", "assets/blue_projectile03.png");
}

function create() {
  cat = this.physics.add.image(400, 300, "cat");
  cat.setDisplaySize(30, 85);
  cat.setCollideWorldBounds(true);
  cat.rotationLabel = ROTATION_LABEL.bottom;
  
  GAME_BUTTONS.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
  GAME_BUTTONS.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  GAME_BUTTONS.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  GAME_BUTTONS.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  GAME_BUTTONS.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
}

function update() {
  if (GAME_BUTTONS.keyF.isDown && timeProjectile++ === 30) {
    // ATIRAR
    timeProjectile = 0;
    catProjectile = this.physics.add.image(cat.x, cat.y, "cat_projectile");
    catProjectile.depth = -1;
    catProjectile.setDisplaySize(17, 48);
    catProjectile.setRotation(cat._rotation);
    catProjectile.rotationLabel = cat.rotationLabel;
    setVelocity(catProjectile, PROJECTILE_SPEED);
  }
  if (GAME_BUTTONS.keyUp.isDown && GAME_BUTTONS.keyLeft.isDown) {
    // CIMA ESQUERDA
    cat.setVelocityY(SPEED * -1);
    cat.setVelocityX(SPEED * -1);
    cat.setRotation(ROTATION.topLeft);
    cat.rotationLabel = ROTATION_LABEL.topLeft;
  } else if (GAME_BUTTONS.keyUp.isDown && GAME_BUTTONS.keyRight.isDown) {
    // CIMA DIREITA
    cat.setVelocityY(SPEED * -1);
    cat.setVelocityX(SPEED);
    cat.setRotation(ROTATION.topRight);
    cat.rotationLabel = ROTATION_LABEL.topRight;
  } else if (GAME_BUTTONS.keyDown.isDown && GAME_BUTTONS.keyLeft.isDown) {
    // BAIXO ESQUERDA
    cat.setVelocityY(SPEED);
    cat.setVelocityX(SPEED * -1);
    cat.setRotation(ROTATION.bottomLeft);
    cat.rotationLabel = ROTATION_LABEL.bottomLeft;
  } else if (GAME_BUTTONS.keyDown.isDown && GAME_BUTTONS.keyRight.isDown) {
    // BAIXO DIREITA
    cat.setVelocityY(SPEED);
    cat.setVelocityX(SPEED);
    cat.setRotation(ROTATION.bottomRight);
    cat.rotationLabel = ROTATION_LABEL.bottomRight;
  } else if (GAME_BUTTONS.keyUp.isDown) {
    // CIMA
    cat.setVelocityY(SPEED * -1);
    cat.setVelocityX(0);
    cat.setRotation(ROTATION.top);
    cat.rotationLabel = ROTATION_LABEL.top;
  } else if (GAME_BUTTONS.keyDown.isDown) {
    // BAIXO
    cat.setVelocityY(SPEED);
    cat.setVelocityX(0);
    cat.setRotation(ROTATION.bottom);
    cat.rotationLabel = ROTATION_LABEL.bottom;
  } else if (GAME_BUTTONS.keyLeft.isDown) {
    // ESQUERDA
    cat.setVelocityY(0);
    cat.setVelocityX(SPEED * -1);
    cat.setRotation(ROTATION.left);
    cat.rotationLabel = ROTATION_LABEL.left;
  } else if (GAME_BUTTONS.keyRight.isDown) {
    // DIREITA
    cat.setVelocityY(0);
    cat.setVelocityX(SPEED);
    cat.setRotation(ROTATION.right);
    cat.rotationLabel = ROTATION_LABEL.right;
  } else {
    // PARADO
    cat.setVelocityX(0);
    cat.setVelocityY(0);
  }
}

function setVelocity(object, speed) {
  switch (object.rotationLabel) {
    case ROTATION_LABEL.topLeft:
      object.setVelocityY(speed * -1);
      object.setVelocityX(speed * -1);
      break;
    case ROTATION_LABEL.topRight:
      object.setVelocityY(speed * -1);
      object.setVelocityX(speed);
      break;
    case ROTATION_LABEL.bottomRight:
      object.setVelocityY(speed);
      object.setVelocityX(speed);
      break;
    case ROTATION_LABEL.bottomLeft:
      object.setVelocityY(speed);
      object.setVelocityX(speed * -1);
      break;
    case ROTATION_LABEL.top:
      object.setVelocityY(speed * -1);
      object.setVelocityX(0);
      break;
    case ROTATION_LABEL.bottom:
      object.setVelocityY(speed);
      object.setVelocityX(0);
      break;
    case ROTATION_LABEL.left:
      object.setVelocityY(0);
      object.setVelocityX(speed * -1);
      break;
    case ROTATION_LABEL.right:
      object.setVelocityY(0);
      object.setVelocityX(speed);
      break;
    default:
      break;
  }
}
