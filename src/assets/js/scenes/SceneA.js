
import Phaser from 'phaser';
import space from '../../img/space3.png';
import player from '../../img/gamer.png';
import Utils from '../config/Utils';

class SceneA extends Phaser.Scene {
  constructor() {
    super({
      key: 'SceneA',
      active: true,
    });
    this.utils = Utils(this);
  }

  init() {
    this.name = localStorage.getItem('user') || 'Fernando';
  }

  preload() {
    this.load.image('space', space);
    this.load.image('player', player);
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
      this.scene.start('SceneB');
    });
    const scores = this.add.text(75, 125, 'Highscores', this.utils.style);
    scores.setInteractive().on('pointerdown', () => {
      this.scene.start('SceneC');
    });

    const exit = this.add.text(75,175,"Exit",this.utils.style)
    exit.setInteractive().on('pointerdown',()=>{
      window.location.reload();
    })
    const container = this.add.container(centerX - 150, centerY, [intro, play, scores,exit]);
    return container;
  }

  update() {
    this.background.tilePositionY -= 0.5;
  }
}

export default SceneA;