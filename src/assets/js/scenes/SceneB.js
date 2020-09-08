
import Phaser from 'phaser';
import alien from '../../img/alien1.png';
import laser from '../../img/beam2.png';
import life from '../../img/life.png';
import coin from '../../img/gold.png'
import explosion from '../../img/explosion.png';
import LaserGroup from '../gameObjects/LaserGroup';
import AlienGroup from '../gameObjects/AlienGroup';
import particleConfig from '../config/particleConfig';
import Player from '../gameObjects/Player';
import Utils from '../config/Utils';
import CoinGroup from '../gameObjects/CoinGroup';
import coinGroup from '../gameObjects/CoinGroup'


class SceneB extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneB',
      active: false,
    });
    // INIT VALUES
    this.util = Utils(this);
    this.score = 0;
    this.milestone = 5;
    this.playerVelocity = 600;
  }

  init() {
    this.name = localStorage.getItem('user');
  }

  preload() {
    this.load.image("coin",coin);
    this.load.image('explosion', explosion);
    this.load.image('alien1', alien);
    this.load.image('laser', laser);
    this.load.image('life', life);
  }

  create() {
    this.finalScore = this.add.zone();
    this.background = this.util.scaleBackground();
    this.setScore();
    this.finalScore = this.componentScore();
    this.alienGroup = new AlienGroup(this);
    this.laserGroup = new LaserGroup(this);
    this.player = this.physics.add.existing(new Player(this, window.innerWidth
        / 2, 450, this.name));
    this.player.setScale(0.6);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.alienGroup, this.laserGroup, this.collisionHandler, null, this);
    this.createActions();
    this.createParticles();
    this.createCoins();

  }

  


  componentScore() {
    const { centerX, centerY } = this.util.centerScene();

    const score = this.add.text(0, 0, `${this.name} scored : ${this.score}`, this.util.style);
    const again = this.add.text(75, 75, 'Play Again?', this.util.style);
    const menu = this.add.text(125, 125, 'Menu', this.util.style);

    again.setInteractive().on('pointerdown', () => {
      this.scene.start('SceneB');
    });

    menu.setInteractive().on('pointerdown', () => {
      this.scene.start('SceneA');
    });

    const container = this.add.container(centerX - 150, centerY, [score, again, menu]);
    container.setVisible(false);
    return container;
  }


  setScore() {
    this.scoreText = this.add.text(16, 16, `SCORE: ${this.score}`, { fontSize: '32px', fill: '#ffff' });
    this.scoreText.depth = 100;
  }

  createActions() {
    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }


  createParticles() {
    this.particles = this.add.particles('explosion');
    this.emitter = this.particles.createEmitter(particleConfig);
  }


  movePlayer() {
    if (this.left.isDown) {
      this.player.body.setVelocityX(-this.playerVelocity);
    } else if (this.right.isDown) {
      this.player.body.setVelocityX(this.playerVelocity);
    } else {
      this.player.body.setVelocityX(0);
    }
  }

  checkShoot() {
    if (this.space.isDown) {
      this.laserGroup.fireLaser(this.player.x, this.player.y - 20);
    }
  }

  collisionHandlerCoins(player,coin){
    if(!coin.getData("passedCoin")){
        coin.setData("passedCoin",true)
        this.score +=20
        this.changeLevel(coin.getData("passedCoin"));
        this.scoreText.setText(`SCORE: ${this.score}`)
        coin.popUp()
        this.createCoins();

    }
}

createCoins(){
    this.coinGroup = new CoinGroup(this);
        this.physics.add.collider(this.coinGroup, this.player,this.collisionHandlerCoins,null,this)
        this.time.addEvent({delay:Phaser.Math.Between(5000,10000),callback:()=>{
            this.coinGroup.dropCoin(Phaser.Math.Between(50,this.sys.canvas.width-50),0,2)
        },callbackScope:this,repeat:1})
}

  collisionHandler(alien, laser) {
    if (this.player.body.onFloor() && alien.visible) {
      this.score += 1;
      this.scoreText.setText(`SCORE: ${this.score}`);
      laser.explote();
      alien.kill();
      this.particles.emitParticleAt(alien.x, alien.y, 50);
      this.createParticles();
    }
  }

  changeLevel(band=false) {
    if (this.score > this.milestone) {
      this.playerVelocity += 100;
      this.milestone = this.score + 50;
      this.alienGroup.increaseEnemies();
    }
  }

  checkCollisionAlien() {
    this.alienGroup.getChildren().forEach(alien => {
      if (alien.body.y + alien.body.height > this.sys.canvas.height && !alien.getData('passed')) {
        alien.setData('passed', true);
        if (this.player.alive()) {
          this.player.removeLife();
        } else {
          const scored = {
            user: this.name,
            score: this.score,
          };
          this.util.getHighScores().then(({ result }) => {
            const res = this.util.verifyHighScore(scored, result);
            if (!res) {
              this.finalScore.list[0].setText(`${this.name} scored :${this.score}`);
            } else {
              this.finalScore.list[0].setText(`${this.name} NEW RECORD :${this.score}`);
              this.util.insertHighScoreToDB(scored).then(x => x);
            }
            this.physics.pause();
            this.finalScore.setVisible(true);
          });
        }
      }
    });
  }

  update() {
    const num = Phaser.Math.Between(50, this.sys.canvas.width - 50);
    if (this.player.alive()) {
      this.background.tilePositionY -= 1;
    }

    if (this.player.body.onFloor()) {
      this.alienGroup.dropAlien(num, 0, 0.4);
      this.checkShoot();
      this.movePlayer();
      this.changeLevel();
      this.checkCollisionAlien();
    }
  }
}

export default SceneB;