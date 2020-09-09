import Phaser from 'phaser';
import Util from '../config/Utils';

class Life extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'life');
    this.scene.add.existing(this);
    this.depth = 100;
    this.setScale(Util().setScale(1));
  }

  removeLife() {
    this.setVisible(false);
  }
}

export default Life;