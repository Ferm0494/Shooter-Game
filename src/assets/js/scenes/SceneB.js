import space from '../../img/space.jpg'
import spaceShip from '../../img/player.PNG'
import Phaser from 'phaser'



class SceneB extends Phaser.Scene {
    constructor() {
        super({
            key: "SceneB",
            active: true
        })
    }
    preload() {
        this.load.image("space", space);
        this.player = this.load.image("player", spaceShip)

    }

    create() {

        this.player = this.physics.add.sprite(100, 450, "player");
        this.player.setScale(0.6);
        this.player.setCollideWorldBounds(true)
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)


    }
    update() {
        if (this.left.isDown) {
            this.player.body.setVelocityX(-300)
        } else if (this.right.isDown) {
            this.player.body.setVelocityX(300)
        } else {
            this.player.body.setVelocityX(0)
        }

    }

}

export default SceneB