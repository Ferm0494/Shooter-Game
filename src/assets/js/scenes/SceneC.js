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
      component.forEach(score => {
        deltaY += 30;
        this.add.text(this.centerX - 150, deltaY, score, this.utils.style);
      });
    });
  }

  async highScore() {
    let index = 0;
    const { result } = await this.utils.getHighScores();
    const sortedScores = result.sort((a, b) => a.score - b.score);
    const scores = sortedScores.reverse().map(score => {
      index += 1;
      return `${index}.   ${score.user}    ${parseFloat(score.score)} `;
    });
    const intro = 'Top 10 scores';
    const component = [intro];
    scores.forEach(s => component.push(s));
    return component;
  }

  update() {
    // if(this.component !== undefined && !this.rendered){

    //     this.rendered = true
    // }

    this.background.tilePositionY -= 0.5;
  }
}

export default SceneC;