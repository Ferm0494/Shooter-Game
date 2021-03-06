
import Phaser from 'phaser';
import space from '../../img/space3.png';
import Utils from '../config/Utils';

class Menu extends Phaser.Scene {
  constructor() {
    super({
      key: 'Menu',
      active: false,
    });
    this.utils = Utils(this);
  }

  init() {
    this.name = localStorage.getItem('user') || 'Fernando';
  }

  preload() {
    this.load.image('space', space);
  }

  create() {
    this.background = this.utils.scaleBackground();
    this.container = this.createMenu();
  }

  createMenu() {
    const { centerX, centerY } = this.utils.centerScene();
    const intro = this.add.text(75, 0, `Welcome : ${this.name} `, this.utils.style);
    const play = this.add.text(75, 75, 'Start Game', this.utils.style);
    play.setInteractive().on('pointerdown', () => {
      this.scene.start('Game');
    });
    const scores = this.add.text(75, 125, 'Highscores', this.utils.style);
    scores.setInteractive().on('pointerdown', () => {
      this.scene.start('Scores');
    });

    const exit = this.add.text(75, 175, 'Exit', this.utils.style);
    exit.setInteractive().on('pointerdown', () => {
      window.location.reload();
    });
    const container = this.add.container(centerX - 150, centerY, [intro, play, scores, exit]);
    return container;
  }

  update() {
    this.background.tilePositionY -= 0.5;
  }
}

export default Menu;