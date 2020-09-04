import Life from './Life'

class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,"player")
        this.lifeCount = 3;
        this.scene.add.existing(this)
        this.lifes  = []
        this.posX = 40;
        for(let i = 0 ; i < this.lifeCount ; i++){
            this.lifes.push(new Life(scene,this.posX,100))
            this.posX +=40
        }
    }

    removeLife(){
        this.lifes[this.lifeCount-1].removeLife()
        this.lifeCount -=1;
        
        
    }
}

export default Player