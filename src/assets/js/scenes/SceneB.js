import space from '../../img/space.jpg'
import spaceShip from '../../img/player.PNG'
import alien from '../../img/alien1.png'
import laser from '../../img/beam1.png'
import Phaser from 'phaser'
import LaserGroup from '../gameObjects/LaserGroup'
import AlienGroup from '../gameObjects/AlienGroup'




class SceneB extends Phaser.Scene {
    constructor() {
        super({
            key: "SceneB",
            active: true
        })
        this.player;
        this.laserGroup;
        this.alienGroup;
        this.score = 0;
        this.enemies = 1;
    }
    preload() {
        this.load.image("alien1", alien);
        this.load.image("space", space);
        this.load.image("laser", laser)
        this.load.image("player", spaceShip)

    }

    create() {
        this.add.image(window.innerWidth/2, window.innerHeight/2 , "space")
        this.alienGroup = new AlienGroup(this,this.enemies)
        this.laserGroup = new LaserGroup(this);
        this.player = this.physics.add.image(window.innerWidth / 2, 450, "player");
        this.player.setScale(0.6);
        this.player.setCollideWorldBounds(true)
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.physics.add.overlap(this.alienGroup,this.laserGroup,this.collisionHandler,null,this)
    }

    movePlayer() {  

        if (this.left.isDown) {
            this.player.body.setVelocityX(-300)
        } else if (this.right.isDown) {
            this.player.body.setVelocityX(300)
        } else {
            this.player.body.setVelocityX(0)
        }
    }
    checkShoot() {
        if (this.space.isDown) {
            this.laserGroup.fireLaser(this.player.x, this.player.y - 20);
        }
    }

    collisionHandler(alien,laser){
      if(this.player.body.onFloor()){
        this.score+=1;
        laser.explote();
        alien.kill();
         
      }
    }

    update(time,delta) {
    let num = Phaser.Math.Between(0,this.sys.canvas.width);
    
    
      if(this.player.body.onFloor()){ 
          this.alienGroup.dropAlien(num,0,0.2);
          
      }
        this.checkShoot();
        this.movePlayer();

    }

}

export default SceneB