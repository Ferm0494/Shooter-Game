import Life from './Life'

class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,"player")
        this.scene.add.existing(this)
        this.lifes  = []
        this.posX = 40;
        for(let i = 0 ; i < 3 ; i++){
            this.lifes.push(new Life(scene,this.posX,100))
            this.posX +=40
        }
    }

    removeLife(){
        this.lifes.pop();
        this.scene.add.existing(this)
        console.log("Lifes avaible",this.lifes.length)
    }
}

export default Player