import Phaser from 'phaser';
import Laser from './Laser';

class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.createMultiple({
      classType: Laser,
      frameQuantity: 30,
      active: false,
      visible: false,
      key: 'laser',
    });
  }

  fireLaser(x, y,scale) {
    const laser = this.getFirstDead(false);
    if (laser) {
      laser.fire(x, y,scale);
    }
  }
}

export default LaserGroup;