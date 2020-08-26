import Phaser from "phaser";
import SceneB from '../scenes/SceneB'
var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: '99%',
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 200
            }
        }
    },

    scene: [SceneB]

}


export default config