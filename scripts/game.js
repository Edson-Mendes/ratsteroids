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

// Variáveis e constantes
const game = new Phaser.Game(config);
const CAT_SPEED = 200;
const PROJECTILE_SPEED = 500;
const COCKROACH_SPEED = 300;
const ROTATION = Object.freeze({
  right: 0,
  bottomRight: Math.PI * 0.25,
  bottom: Math.PI * 0.5,
  bottomLeft: Math.PI * 0.75,
  left: Math.PI,
  topLeft: Math.PI * 1.25,
  top: Math.PI * 1.5,
  topRight: Math.PI * 1.75,
});
const GAME_BUTTONS = {};
const ENEMY_SPAWN_LOCATION = [
  {
    x: 50,
    y: 50,
    angleRange: [10, 80],
  },
  {
    x: 950,
    y: 50,
    angleRange: [100, 170],
  },
  {
    x: 50,
    y: 550,
    angleRange: [280, 350],
  },
  {
    x: 950,
    y: 550,
    angleRange: [190, 260],
  },
];
const cockroachInfo = {
  key: "cockroach",
  sizeX: 30,
  sizeY: 30,
  speed: 300,
};
const ratInfo = {
  key: "rat",
  sizeX: 48,
  sizeY: 20,
  speed: 300,
};
const enemiesInfo = [cockroachInfo, ratInfo];
const enemyGroups = [];

let cat;
let catProjectile;
let timeProjectile = 0;
let enemySpawnTime = 0;
let enemy;
let rat;
let enemyAmount = 0;
let maxEnemyAmount = 100;

// Groups
let catProjectiles;
let cockroachs;
let rats;

// PRELOAD
function preload() {
  this.load.image("cat", "assets/cat002.png");
  this.load.image("cat_projectile", "assets/blue_projectile03.png");
  this.load.image("cockroach", "assets/cockroach001.png");
  this.load.image("rat", "assets/rat001.png");
  this.load.image("grass", "assets/background004.jpg");
}

// CREATE
function create() {
  // background
  let grass = this.physics.add.image(500, 300, "grass");
  grass.depth = -5;
  // Definindo botões do game.
  GAME_BUTTONS.keyF = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.F,
  );
  GAME_BUTTONS.keyUp = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.UP,
  );
  GAME_BUTTONS.keyDown = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.DOWN,
  );
  GAME_BUTTONS.keyLeft = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.LEFT,
  );
  GAME_BUTTONS.keyRight = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.RIGHT,
  );

  // Criação de grupos de objetos comuns
  catProjectiles = this.physics.add.group();
  cockroachs = this.physics.add.group();
  rats = this.physics.add.group();
  enemyGroups.push(cockroachs);
  enemyGroups.push(rats);


  cat = this.physics.add.image(400, 300, "cat");
  cat.setDisplaySize(85, 30);
  cat.setCollideWorldBounds(true);

  this.physics.add.overlap(catProjectiles, cockroachs, hitEnemy, null, this);
  this.physics.add.overlap(catProjectiles, rats, hitEnemy, null, this);
  this.physics.add.overlap(cockroachs, cat, catDamage, null, this);
  this.physics.add.overlap(rats, cat, catDamage, null, this);

}

// UPDATE
function update() {
  if (GAME_BUTTONS.keyF.isDown && timeProjectile++ === 30) {
    // ATIRAR
    timeProjectile = 0;

    catProjectile = catProjectiles.create(cat.x, cat.y, "cat_projectile");
    catProjectile.depth = -1;
    catProjectile.setDisplaySize(48, 17);
    catProjectile.setRotation(cat._rotation);
    this.physics.velocityFromRotation(
      catProjectile._rotation,
      PROJECTILE_SPEED,
      catProjectile.body.velocity,
    );
  }
  if (GAME_BUTTONS.keyUp.isDown && GAME_BUTTONS.keyLeft.isDown) {
    // CIMA ESQUERDA
    cat.setRotation(ROTATION.topLeft);
    this.physics.velocityFromRotation(
      cat._rotation,
      CAT_SPEED,
      cat.body.velocity,
    );
  } else if (GAME_BUTTONS.keyUp.isDown && GAME_BUTTONS.keyRight.isDown) {
    // CIMA DIREITA
    cat.setRotation(ROTATION.topRight);
    this.physics.velocityFromRotation(
      cat._rotation,
      CAT_SPEED,
      cat.body.velocity,
    );
  } else if (GAME_BUTTONS.keyDown.isDown && GAME_BUTTONS.keyLeft.isDown) {
    // BAIXO ESQUERDA
    cat.setRotation(ROTATION.bottomLeft);
    this.physics.velocityFromRotation(
      cat._rotation,
      CAT_SPEED,
      cat.body.velocity,
    );
  } else if (GAME_BUTTONS.keyDown.isDown && GAME_BUTTONS.keyRight.isDown) {
    // BAIXO DIREITA
    cat.setRotation(ROTATION.bottomRight);
    this.physics.velocityFromRotation(
      cat._rotation,
      CAT_SPEED,
      cat.body.velocity,
    );
  } else if (GAME_BUTTONS.keyUp.isDown) {
    // CIMA
    cat.setRotation(ROTATION.top);
    this.physics.velocityFromRotation(
      cat._rotation,
      CAT_SPEED,
      cat.body.velocity,
    );
  } else if (GAME_BUTTONS.keyDown.isDown) {
    // BAIXO
    cat.setRotation(ROTATION.bottom);
    this.physics.velocityFromRotation(
      cat._rotation,
      CAT_SPEED,
      cat.body.velocity,
    );
  } else if (GAME_BUTTONS.keyLeft.isDown) {
    // ESQUERDA
    cat.setRotation(ROTATION.left);
    this.physics.velocityFromRotation(
      cat._rotation,
      CAT_SPEED,
      cat.body.velocity,
    );
  } else if (GAME_BUTTONS.keyRight.isDown) {
    // DIREITA
    cat.setRotation(ROTATION.right);
    this.physics.velocityFromRotation(
      cat._rotation,
      CAT_SPEED,
      cat.body.velocity,
    );
  } else {
    // PARADO
    cat.setVelocityX(0);
    cat.setVelocityY(0);
  }
  if (enemySpawnTime++ === 50) {
    enemySpawnTime = 0;
    if (enemyAmount < maxEnemyAmount) {
      enemyAmount++;
      console.log("criando inimigo...");
      const enemyLocation = ENEMY_SPAWN_LOCATION[Phaser.Math.Between(0, ENEMY_SPAWN_LOCATION.length - 1)];
      const index = Phaser.Math.Between(0, enemyGroups.length - 1);
      const enemyGroup = enemyGroups[index];
      const enemyInfo = enemiesInfo[index];

      spawnEnemy(enemyGroup, enemyInfo, enemyLocation, this.physics);
    }
  }
}

// Funções auxiliares
function hitEnemy(projectile, enemy) {
  enemy.setTint(0xff0000);
  enemy.destroy();
  projectile.destroy();
}

function catDamage(cat, enemy) {
  console.log("cat atingido...");
  // this.physics.pause();

  cat.setTint(0xff0000);
}

function spawnEnemy(enemyGroup, enemyInfo, enemyLocation, physics) {
  let angle = Phaser.Math.Between(
    enemyLocation.angleRange[0],
    enemyLocation.angleRange[1],
  );
  enemy = enemyGroup.create(enemyLocation.x, enemyLocation.y, enemyInfo.key);
  enemy.setDisplaySize(enemyInfo.sizeX, enemyInfo.sizeY);
  enemy.setRotation(Phaser.Math.DegToRad(angle));
  physics.velocityFromRotation(
    enemy._rotation,
    enemyInfo.speed,
    enemy.body.velocity,
  );
}
