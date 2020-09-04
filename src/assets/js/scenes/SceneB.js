import space from '../../img/space3.png'
import spaceShip from '../../img/player.PNG'
import alien from '../../img/alien1.png'
import laser from '../../img/beam2.png'
import coin from '../../img/gold.png'
import life from '../../img/life.png'
import explosion from '../../img/explosion.png'
import Phaser from 'phaser'
import LaserGroup from '../gameObjects/LaserGroup'
import AlienGroup from '../gameObjects/AlienGroup'
import particleConfig from '../config/particleConfig'
import Player from '../gameObjects/Player'




class SceneB extends Phaser.Scene {
    constructor() {
        super({
            key: "SceneB",
            active: true
        })
        this.test = 0;
        this.player;
        this.laserGroup;
        this.alienGroup;
        this.score = 0;
        this.scoreText;
        this.milestone = 5;
        this.playerVelocity = 600
    
    }
    preload() {
        this.load.image("explosion",explosion);
        this.load.image("alien1", alien)
        this.load.image("space", space);
        this.load.image("laser", laser)
        this.load.image("player", spaceShip)
        this.load.image("life",life)

    }


    create() {
        this.scaleBackground()
        this.setScore()
        this.alienGroup = new AlienGroup(this)
        this.laserGroup = new LaserGroup(this);
        this.player = this.physics.add.existing(new Player(this,window.innerWidth / 2,450))
        this.player.setScale(0.6);
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.alienGroup, this.laserGroup, this.collisionHandler, null, this)
        this.createActions()
        this.createParticles();
    }

    setScore(){
        this.scoreText = this.add.text(16,16,`SCORE: ${this.score}`,{fontSize:'32px',fill:'#ffff'})
        this.scoreText.depth = 100;
    }

    createActions(){
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    scaleBackground(){
         this.background = this.add.tileSprite(0, 0,window.innerWidth,window.innerHeight,"space", "player");
        this.background.setOrigin(0);
        let scaleX = this.cameras.main.width / this.background.width
        let scaleY = this.cameras.main.height / this.background.height
        let scale = Math.max(scaleX, scaleY)
        this.background.setScale(scale).setScrollFactor(0)
       
    
    }

    createParticles(){
        this.particles = this.add.particles("explosion");
        this.emitter = this.particles.createEmitter(particleConfig)
    }


    movePlayer() {

        if (this.left.isDown) {
            this.player.body.setVelocityX(-this.playerVelocity)
        } else if (this.right.isDown) {
            this.player.body.setVelocityX(this.playerVelocity)
        } else {
            this.player.body.setVelocityX(0)
        }
    }
    checkShoot() {
        if (this.space.isDown) {
            this.laserGroup.fireLaser(this.player.x, this.player.y - 20);
        }
    }

    collisionHandler(alien, laser) {

        if (this.player.body.onFloor() && alien.visible) {
            this.score += 1;
            this.scoreText.setText(`SCORE: ${this.score}`);
            laser.explote();
            alien.kill();
            this.particles.emitParticleAt(alien.x,alien.y,50)
         this.createParticles();
        }
    }

    changeLevel() {
        if (this.score > this.milestone) {
            this.playerVelocity += 100
            this.milestone += 25;
            this.alienGroup.increaseEnemies();
        }
    }

    checkCollisionAlien(time){ 
        this.alienGroup.getChildren().forEach(alien=>{
            if(alien.body.y + alien.body.height> this.sys.canvas.height && !alien.getData("passed")){
                alien.setData("passed",true)
                this.player.removeLife()
            }
        })
        
    }

    update(time, delta) {
        let num = Phaser.Math.Between(0, this.sys.canvas.width);
        this.background.tilePositionY -= 1;

        if (this.player.body.onFloor()) {
            this.alienGroup.dropAlien(num, 0, 0.4)
            this.checkShoot();
            this.movePlayer();
            this.changeLevel();
            this.checkCollisionAlien(time)
        }

    }

}

export default SceneB