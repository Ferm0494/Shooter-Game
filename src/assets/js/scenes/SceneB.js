import space from '../../img/space.jpg'
import spaceShip from '../../img/player.PNG'
import alien from '../../img/alien1.png'
import laser from '../../img/beam1.png'
import Phaser from 'phaser'
import LaserGroup from '../../js/gameObjects/LaserGroup'



class SceneB extends Phaser.Scene {
    constructor() {
        super({
            key: "SceneB",
            active: true
        })
        this.player;
        this.laserGroup;
    }
    preload() {
        this.load.image("alien1", alien);
        this.load.image("space", space);
        this.load.image("laser", laser)
        this.load.image("player", spaceShip)

    }

    create() {
        this.laserGroup = new LaserGroup(this);
        this.player = this.physics.add.sprite(window.innerWidth / 2, 450, "player");
        this.player.setScale(0.6);
        this.player.setCollideWorldBounds(true)
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

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

    update() {
        this.checkShoot();
        this.movePlayer();

    }

}

export default SceneB