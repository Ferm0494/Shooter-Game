import Phaser from 'phaser';

class Life extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'life');
    this.scene.add.existing(this);
    this.depth = 100;
  }

  removeLife() {
    this.setVisible(false);
  }
}

export default Life;