import _ from 'lodash'

const API = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BCP3BG1LkxkQV778JD1o/scores`
const Utils = (scene)=>{
    const style = {fontSize:'32px',fill: '#ffff'}
    const centerScene= ()=>{
    
        const centerX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
        const centerY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
        return {
            centerX,
            centerY
        }
    }
    
    const scaleBackground=()=>{
        scene.background = scene.add.tileSprite(0, 0,window.innerWidth,window.innerHeight,"space", "player");
       scene.background.setOrigin(0);
       let scaleX = scene.cameras.main.width / scene.background.width
       let scaleY = scene.cameras.main.height / scene.background.height
       let scale = Math.max(scaleX, scaleY)
       scene.background.setScale(scale).setScrollFactor(0)
       return scene.background;
      
    
    }

    const verifyHighScore=(userScore,scores)=>{
        scores.push(userScore);
        console.log(scores)
        if(scores.length < 10){
            return scores
        }
       
        let result = false;    
        let sortedScores  = scores.sort((a,b)=> a.score - b.score);
        sortedScores.forEach(score=>{
        if(_.isEqual(userScore,score)){
                result = true
            }
            })
                    
        if(result){
                return sortedScores
        }else{
                return result;
        }
    }

    const insertHighScoreToDB=async(score)=>{
        let response  = await fetch(API,{
            method:'POST',
            body: JSON.stringify(score),
            headers:{'Content-Type': 'application/json'}
        })
        let json = await response.json();
        return json;
    }
    
    const getHighScores=async()=>{
        let response  = await fetch(API)
        let json = await response.json();
        return json;
       
    }
    return{
        style,
        centerScene,
        scaleBackground,
        getHighScores,
        verifyHighScore,
        insertHighScoreToDB
        
    }
    }

    export default Utils
    