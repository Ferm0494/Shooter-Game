class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,"player")
        this.scene.add.existing(this)
    }
}

export default Player