
import space from '../../img/space3.png'
import player from '../../img/player.png'
import Utils from '../config/Utils'
class SceneA extends Phaser.Scene{
    constructor(){
       
        super({
            key: "SceneA",
            active:true,
        })
        this.utils = Utils(this)
        this.background;
    }

    init(data){
        this.name  = localStorage.getItem("user") || "Fernando"
    }

    preload(){
        this.load.image("space", space);
        this.load.image("player", player)

    }

    create(){
        this.background=this.utils.scaleBackground();
        this.container = this.createMenu();

    }

    createMenu(){
        const {centerX,centerY}= this.utils.centerScene();
        let intro = this.add.text(0,0,`Welcome : ${this.name} `, this.utils.style)
        let play = this.add.text(75,75,`Start Game`,this.utils.style)
        play.setInteractive().on('pointerdown',()=>{
            this.scene.start("SceneB",{name: this.name})
        })
        let scores = this.add.text(75,125,"Highscores",this.utils.style)
        scores.setInteractive().on('pointerdown',()=>{
            this.scene.start("SceneC")
        })
        let container = this.add.container(centerX-150,centerY,[intro,play,scores])
        return container;

    }

    update(time,delta){
        this.background.tilePositionY -= 0.5;

    }
}

export default SceneA