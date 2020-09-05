import Phaser from "phaser";
import SceneB from '../scenes/SceneB'
import SceneA from '../scenes/SceneA'
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

    scene: [SceneA,SceneB]

}


export default config