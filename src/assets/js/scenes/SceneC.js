import Phaser from 'phaser';
import Utils from '../config/Utils';

class SceneC extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneC',
    });
    this.utils = Utils(this);
    this.rendered = false;
  }

  preload() {
    const { centerX, centerY } = this.utils.centerScene();
    this.centerX = centerX;
    this.centerY = centerY;
  }

  create() {
    this.background = this.utils.scaleBackground();
    this.highScore().then(component => {
      let deltaY = 0;
      component.forEach((score, index) => {
        deltaY += 40;
        this.loop = this.add.text(this.centerX - 150, deltaY, score, this.utils.style);
        if (index === 1) {
          this.loop.setInteractive().on('pointerdown', () => {
            this.scene.start('SceneB');
          });
        }
      });
    });
  }

  async highScore() {
    const { result } = await this.utils.getHighScores();
    const sortedScores = result.sort((a, b) => a.score - b.score).splice(0, 10);
    const scores = sortedScores.reverse().map((score, index) => `${index + 1}.   ${score.user}    ${parseFloat(score.score)} `);
    const intro = 'Top 10 scores';
    const intro2 = 'Play now!';
    const component = [intro, intro2];
    scores.forEach(s => component.push(s));
    return component;
  }

  update() {
    this.background.tilePositionY -= 0.5;
  }
}

export default SceneC;