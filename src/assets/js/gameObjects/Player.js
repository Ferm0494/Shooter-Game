import Phaser from 'phaser';
import Life from './Life';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, name) {
    super(scene, x, y, 'player');
    this.setData('name', name);
    this.lifeCount = 3;
    this.scene.add.existing(this);
    this.lifes = [];
    this.posX = 40;
    for (let i = 0; i < this.lifeCount; i += 1) {
      this.lifes.push(new Life(scene, this.posX, 100));
      this.posX += 40;
    }
  }

  removeLife() {
    this.lifes[this.lifeCount - 1].removeLife();
    this.lifeCount -= 1;
    return this.lifeCount;
  }

  alive() {
    console.log("LifeCount",this.lifeCount)
    return this.lifeCount !== 1;
  }
}

export default Player;