import Utils from '../config/Utils'

class SceneC extends Phaser.Scene{
    constructor(){
        super({
            key:"SceneC",
        })
        this.utils = Utils(this)
        this.component;
        this.rendered = false;
      
    }

    preload(){
        const {centerX,centerY} = this.utils.centerScene()
        this.centerX = centerX;
        this.centerY = centerY;
    }

     create(){
        this.background = this.utils.scaleBackground(); 
        this.highScore().then(component=>{
            console.log("Component",component)
            let deltaY = this.centerY
            this.component = component.map(score=>{
                deltaY +=30
                 this.add.text(this.centerX-150,deltaY,score,this.utils.style);
            })
            
           
           
        })
    }

    async highScore(){
        let index = 0;
        let {result} = await this.utils.getHighScores();
        let sortedScores = result.sort((a,b)=>a.score - b.score)
        let scores = sortedScores.reverse().map(score =>{
            index+=1
            return `${index}.   ${score.user}    ${score.score} `
        })
        let intro = "Top 10 scores"
        let component = [intro]
        scores.forEach(s=>component.push(s))
        return component;
    }

    update(){
        // if(this.component !== undefined && !this.rendered){
            
        //     this.rendered = true 
        // } 
       
        this.background.tilePositionY -= 0.5;
    }


}

export default SceneC