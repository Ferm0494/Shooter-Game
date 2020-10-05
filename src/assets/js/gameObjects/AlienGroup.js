import Phaser from 'phaser';
import Alien from './Alien';

class AlienGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    // this.scene.add.existing(this)
    this.increaseEnemies();
  }

  increaseEnemies() {
    this.createMultiple({
      classType: Alien,
      frameQuantity: 1,
      active: false,
      visible: false,
      key: 'alien1',
    });
  }

  dropAlien(x, y, scale) {
    const alien = this.getFirstDead(false);
    if (alien) {
      alien.setScale(scale);
      alien.drop(x, y);
    }
    return alien;
  }
}

export default AlienGroup;