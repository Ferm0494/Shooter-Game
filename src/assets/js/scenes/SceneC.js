import Utils from '../config/Utils'

class SceneC extends Phaser.Scene{
    constructor(){
        super({
            key:"SceneC",
        })
        this.utils = Utils(this)
    }

    preload(){

    }

    create(){
        this.background = this.utils.scaleBackground();
        this.container = this.highScore();
    }

    highScore(){
        const {centerX,centerY}= this.utils.centerScene();
        let intro = this.add.text(0,0,'Top 10 scores',this.utils.style);
        let container = this.add.container(centerX-150,centerY,[intro])
        // MAKE API CALL...
        return container;
    }

    update(){
        this.background.tilePositionY -= 0.5;
    }


}

export default SceneC