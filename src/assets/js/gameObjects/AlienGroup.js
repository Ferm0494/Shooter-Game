class AlienGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.world.physics, scene)
    }
}

export default AlienGroup;