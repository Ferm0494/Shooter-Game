
import Alien from './Alien'
class AlienGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene,quantity) {
        super(scene.physics.world, scene)
        this.createMultiple({
            classType: Alien,
            frameQuantity:quantity,
            active:false,
            visible:false,
            key: 'alien1'
        })
    }

    dropAlien(x,y,scale,velocittY){
        const alien = this.getFirstDead(false);
        if(alien){
            alien.setScale(scale)
            alien.drop(x,y) 
            return this;
        }
    }
}

export default AlienGroup;