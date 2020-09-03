import Phaser from "phaser";
import SceneB from '../scenes/SceneB'
var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
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