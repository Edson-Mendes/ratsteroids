class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.scoreText = 0;
    this.score = 0;
    this.GAME_BUTTONS = {};
    this.ROTATION = Object.freeze({
      right: 0,
      bottomRight: Math.PI * 0.25,
      bottom: Math.PI * 0.5,
      bottomLeft: Math.PI * 0.75,
      left: Math.PI,
      topLeft: Math.PI * 1.25,
      top: Math.PI * 1.5,
      topRight: Math.PI * 1.75,
    });
    this.CAT_SPEED = 200;
    this.PROJECTILE_SPEED = 600;
    this.ENEMY_SPAWN_LOCATION = [
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

    this.catProjectiles = undefined;
    this.cockroachs = undefined;
    this.rats = undefined;
    this.enemyGroups = [];
    this.enemiesInfo = [
      {
        key: "cockroach",
        sizeX: 30,
        sizeY: 30,
        speed: 300,
      },
      {
        key: "rat",
        sizeX: 48,
        sizeY: 20,
        speed: 300,
      },
    ];

    this.timeProjectile = 0;
    this.projectileCooldown = 30;
    this.enemySpawnTime = 0;
    this.enemySpawnCooldown = 50;

    this.enemyAmount = 0;
    this.maxEnemyAmount = 100;
    this.catLife = 7;
    this.catLifeText = undefined;
    this.hitTime = 0;
    this.isHited = false;

    this.cat = undefined;
  }

  init(date) {
    console.log("CHAMANDO INIT...");
    
    this.scoreText = 0;
    this.score = 0;
    this.GAME_BUTTONS = {};
    this.ROTATION = Object.freeze({
      right: 0,
      bottomRight: Math.PI * 0.25,
      bottom: Math.PI * 0.5,
      bottomLeft: Math.PI * 0.75,
      left: Math.PI,
      topLeft: Math.PI * 1.25,
      top: Math.PI * 1.5,
      topRight: Math.PI * 1.75,
    });
    this.CAT_SPEED = 200;
    this.PROJECTILE_SPEED = 600;
    this.ENEMY_SPAWN_LOCATION = [
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

    this.catProjectiles = undefined;
    this.cockroachs = undefined;
    this.rats = undefined;
    this.enemyGroups = [];
    this.enemiesInfo = [
      {
        key: "cockroach",
        sizeX: 30,
        sizeY: 30,
        speed: 300,
      },
      {
        key: "rat",
        sizeX: 48,
        sizeY: 20,
        speed: 300,
      },
    ];

    this.timeProjectile = 0;
    this.projectileCooldown = 30;
    this.enemySpawnTime = 0;
    this.enemySpawnCooldown = 50;

    this.enemyAmount = 0;
    this.maxEnemyAmount = 100;
    this.catLife = 7;
    this.catLifeText = undefined;
    this.hitTime = 0;
    this.isHited = false;

    this.cat = undefined;
  }

  preload() {
    this.load.image("cat", "assets/cat002.png");
    this.load.image("cat_projectile", "assets/blue_projectile03.png");
    this.load.image("cockroach", "assets/cockroach001.png");
    this.load.image("rat", "assets/rat001.png");
    this.load.image("grass", "assets/background004.jpg");
  }

  create() {
    console.log("CHAMANDO CREATE...");

    // background
    let grass = this.physics.add.image(500, 300, "grass");
    grass.depth = -5;

    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "24px",
      fill: "#fff",
    });
    this.catLifeText = this.add.text(16, 48, "Life: " + this.catLife, {
      fontSize: "24px",
      fill: "#fff",
    });

    // Criação do personagem Cat
    this.cat = this.physics.add.image(400, 300, "cat");
    this.cat.setDisplaySize(85, 30);
    this.cat.setCollideWorldBounds(true);

    // Criação de grupos de objetos comuns
    this.catProjectiles = this.physics.add.group();
    this.cockroachs = this.physics.add.group();
    this.rats = this.physics.add.group();
    this.enemyGroups.push(this.cockroachs);
    this.enemyGroups.push(this.rats);

    // Definindo botões do game.
    this.GAME_BUTTONS.keyF = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.F,
    );
    this.GAME_BUTTONS.keyUp = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP,
    );
    this.GAME_BUTTONS.keyDown = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN,
    );
    this.GAME_BUTTONS.keyLeft = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT,
    );
    this.GAME_BUTTONS.keyRight = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT,
    );

    this.physics.add.overlap(
      this.catProjectiles,
      this.cockroachs,
      this.hitEnemy,
      null,
      this,
    );
    this.physics.add.overlap(
      this.catProjectiles,
      this.rats,
      this.hitEnemy,
      null,
      this,
    );
    this.physics.add.overlap(
      this.cockroachs,
      this.cat,
      this.catDamage,
      null,
      this,
    );
    this.physics.add.overlap(this.rats, this.cat, this.catDamage, null, this);
  }

  update() {
    if (this.isHited && this.hitTime-- == 0) {
      this.isHited = false;
      this.cat.setTint(0xffffff);
    }
    if (
      this.GAME_BUTTONS.keyF.isDown &&
      this.timeProjectile++ === this.projectileCooldown
    ) {
      // ATIRAR
      this.timeProjectile = 0;

      let catProjectile = this.catProjectiles.create(
        this.cat.x,
        this.cat.y,
        "cat_projectile",
      );
      catProjectile.depth = -1;
      catProjectile.setDisplaySize(48, 17);
      catProjectile.setRotation(this.cat._rotation);
      this.physics.velocityFromRotation(
        catProjectile._rotation,
        this.PROJECTILE_SPEED,
        catProjectile.body.velocity,
      );
    }
    if (this.GAME_BUTTONS.keyUp.isDown && this.GAME_BUTTONS.keyLeft.isDown) {
      // CIMA ESQUERDA
      this.cat.setRotation(this.ROTATION.topLeft);
      this.physics.velocityFromRotation(
        this.cat._rotation,
        this.CAT_SPEED,
        this.cat.body.velocity,
      );
    } else if (
      this.GAME_BUTTONS.keyUp.isDown &&
      this.GAME_BUTTONS.keyRight.isDown
    ) {
      // CIMA DIREITA
      this.cat.setRotation(this.ROTATION.topRight);
      this.physics.velocityFromRotation(
        this.cat._rotation,
        this.CAT_SPEED,
        this.cat.body.velocity,
      );
    } else if (
      this.GAME_BUTTONS.keyDown.isDown &&
      this.GAME_BUTTONS.keyLeft.isDown
    ) {
      // BAIXO ESQUERDA
      this.cat.setRotation(this.ROTATION.bottomLeft);
      this.physics.velocityFromRotation(
        this.cat._rotation,
        this.CAT_SPEED,
        this.cat.body.velocity,
      );
    } else if (
      this.GAME_BUTTONS.keyDown.isDown &&
      this.GAME_BUTTONS.keyRight.isDown
    ) {
      // BAIXO DIREITA
      this.cat.setRotation(this.ROTATION.bottomRight);
      this.physics.velocityFromRotation(
        this.cat._rotation,
        this.CAT_SPEED,
        this.cat.body.velocity,
      );
    } else if (this.GAME_BUTTONS.keyUp.isDown) {
      // CIMA
      this.cat.setRotation(this.ROTATION.top);
      this.physics.velocityFromRotation(
        this.cat._rotation,
        this.CAT_SPEED,
        this.cat.body.velocity,
      );
    } else if (this.GAME_BUTTONS.keyDown.isDown) {
      // BAIXO
      this.cat.setRotation(this.ROTATION.bottom);
      this.physics.velocityFromRotation(
        this.cat._rotation,
        this.CAT_SPEED,
        this.cat.body.velocity,
      );
    } else if (this.GAME_BUTTONS.keyLeft.isDown) {
      // ESQUERDA
      this.cat.setRotation(this.ROTATION.left);
      this.physics.velocityFromRotation(
        this.cat._rotation,
        this.CAT_SPEED,
        this.cat.body.velocity,
      );
    } else if (this.GAME_BUTTONS.keyRight.isDown) {
      // DIREITA
      this.cat.setRotation(this.ROTATION.right);
      this.physics.velocityFromRotation(
        this.cat._rotation,
        this.CAT_SPEED,
        this.cat.body.velocity,
      );
    } else {
      // PARADO
      this.cat.setVelocityX(0);
      this.cat.setVelocityY(0);
    }
    if (this.enemySpawnTime++ === this.enemySpawnCooldown) {
      this.enemySpawnTime = 0;
      if (this.enemyAmount < this.maxEnemyAmount) {
        this.enemyAmount++;
        const enemyLocation =
          this.ENEMY_SPAWN_LOCATION[
            Phaser.Math.Between(0, this.ENEMY_SPAWN_LOCATION.length - 1)
          ];
        const index = Phaser.Math.Between(0, this.enemyGroups.length - 1);
        const enemyGroup = this.enemyGroups[index];
        const enemyInfo = this.enemiesInfo[index];

        this.spawnEnemy(enemyGroup, enemyInfo, enemyLocation, this.physics);
      }
    }
  }

  // Funções auxiliares
  hitEnemy(projectile, enemy) {
    enemy.setTint(0xff0000);
    enemy.destroy();
    projectile.destroy();
    this.incrementScore(10);
  }

  catDamage(cat, enemy) {
    enemy.destroy();
    cat.setTint(0xff0000);
    this.hitTime = 30;
    this.isHited = true;
    this.catLife--;
    this.catLifeText.setText("Life: " + this.catLife);
    this.incrementScore(10);
    if (this.catLife == 0) {
      this.physics.pause();
      this.scene.start("GameOverScene", { score: this.score });
    }
  }

  spawnEnemy(enemyGroup, enemyInfo, enemyLocation, physics) {
    let angle = Phaser.Math.Between(
      enemyLocation.angleRange[0],
      enemyLocation.angleRange[1],
    );
    const enemy = enemyGroup.create(
      enemyLocation.x,
      enemyLocation.y,
      enemyInfo.key,
    );
    enemy.setDisplaySize(enemyInfo.sizeX, enemyInfo.sizeY);
    enemy.setRotation(Phaser.Math.DegToRad(angle));
    physics.velocityFromRotation(
      enemy._rotation,
      enemyInfo.speed,
      enemy.body.velocity,
    );
  }

  incrementScore(increment) {
    this.score += increment;
    this.scoreText.setText("Score: " + this.score);
  }
}
