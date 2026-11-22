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
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
const CAT_SPEED = 100;
const PROJECTILE_SPEED = 500;
const ROTATION = Object.freeze({
  right: 0,
  topRight: Math.PI * 1.75,
  top: Math.PI * 1.5,
  topLeft: Math.PI * 1.25,
  left: Math.PI,
  bottomLeft: Math.PI * 0.75,
  bottom: Math.PI * 0.5,
  bottomRight: Math.PI * 0.25,
});
const GAME_BUTTONS = {};

let cat;
let catProjectile;
let timeProjectile = 0;
let cockroach;
let rat;

// Groups
let catProjectiles;
let cockroachs;
let rats;


function preload() {
  this.load.image("cat", "assets/cat002.png");
  this.load.image("cat_projectile", "assets/blue_projectile03.png");
  this.load.image("cockroach", "assets/cockroach001.png");
  this.load.image("rat", "assets/rat001.png");
}

function create() {
  // Definindo botões do game.
  GAME_BUTTONS.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
  GAME_BUTTONS.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  GAME_BUTTONS.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  GAME_BUTTONS.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  GAME_BUTTONS.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  
  // Criação de grupos de objetos comuns
  catProjectiles = this.physics.add.group();
  cockroachs = this.physics.add.group();
  rats = this.physics.add.group();

  cat = this.physics.add.image(400, 300, "cat");
  cat.setDisplaySize(85, 30);
  cat.setCollideWorldBounds(true);
  console.log(cat._rotation);

  cockroach = cockroachs.create(600, 400, "cockroach");
  cockroach.setDisplaySize(30, 30);

  rat = rats.create(200, 100, "rat");
  rat.setDisplaySize(24, 57);

  this.physics.add.overlap(catProjectiles, cockroachs, hitEnemy, null, this);
  this.physics.add.overlap(catProjectiles, rats, hitEnemy, null, this);
  this.physics.add.overlap(cockroachs, cat, catDamage, null, this);
}

function update() {
  if (GAME_BUTTONS.keyF.isDown && timeProjectile++ === 30) {
    // ATIRAR
    timeProjectile = 0;

    catProjectile = catProjectiles.create(cat.x, cat.y, "cat_projectile");
    catProjectile.depth = -1;
    catProjectile.setDisplaySize(48, 17);
    catProjectile.setRotation(cat._rotation);
    this.physics.velocityFromRotation(catProjectile._rotation, PROJECTILE_SPEED, catProjectile.body.velocity);
  }
  if (GAME_BUTTONS.keyUp.isDown && GAME_BUTTONS.keyLeft.isDown) {
    // CIMA ESQUERDA
    cat.setRotation(ROTATION.topLeft);
    this.physics.velocityFromRotation(cat._rotation, CAT_SPEED, cat.body.velocity);
  } else if (GAME_BUTTONS.keyUp.isDown && GAME_BUTTONS.keyRight.isDown) {
    // CIMA DIREITA
    cat.setRotation(ROTATION.topRight);
    this.physics.velocityFromRotation(cat._rotation, CAT_SPEED, cat.body.velocity);
  } else if (GAME_BUTTONS.keyDown.isDown && GAME_BUTTONS.keyLeft.isDown) {
    // BAIXO ESQUERDA
    cat.setRotation(ROTATION.bottomLeft);
    this.physics.velocityFromRotation(cat._rotation, CAT_SPEED, cat.body.velocity);
  } else if (GAME_BUTTONS.keyDown.isDown && GAME_BUTTONS.keyRight.isDown) {
    // BAIXO DIREITA
    cat.setRotation(ROTATION.bottomRight);
    this.physics.velocityFromRotation(cat._rotation, CAT_SPEED, cat.body.velocity);
  } else if (GAME_BUTTONS.keyUp.isDown) {
    // CIMA
    cat.setRotation(ROTATION.top);
    this.physics.velocityFromRotation(cat._rotation, CAT_SPEED, cat.body.velocity);
  } else if (GAME_BUTTONS.keyDown.isDown) {
    // BAIXO
    cat.setRotation(ROTATION.bottom);
    this.physics.velocityFromRotation(cat._rotation, CAT_SPEED, cat.body.velocity);
  } else if (GAME_BUTTONS.keyLeft.isDown) {
    // ESQUERDA
    cat.setRotation(ROTATION.left);
    this.physics.velocityFromRotation(cat._rotation, CAT_SPEED, cat.body.velocity);
  } else if (GAME_BUTTONS.keyRight.isDown) {
    // DIREITA
    cat.setRotation(ROTATION.right);
    this.physics.velocityFromRotation(cat._rotation, CAT_SPEED, cat.body.velocity);
  } else {
    // PARADO
    cat.setVelocityX(0);
    cat.setVelocityY(0);
  }
}

function hitEnemy(projectile, cockroach) {
  cockroach.setTint(0xff0000);
  cockroach.destroy();
  projectile.destroy();
}

function catDamage(enemy, cat) {
  console.log("cat atingido...");
  // this.physics.pause();

  // player.setTint(0xff0000);
}