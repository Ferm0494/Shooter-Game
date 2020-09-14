import Phaser from 'phaser';
import SceneB from '../scenes/Game';
import SceneA from '../scenes/Menu';
import SceneC from '../scenes/Scores';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200,
      },
    },
  },

  scene: [SceneA, SceneB, SceneC],

};


export default config;