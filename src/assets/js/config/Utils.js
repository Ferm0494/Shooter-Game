import _ from 'lodash'
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

    const verifyHighscore=async(userScore)=>{
            let result = false;
            let getScores = await getHighScores();
            getScores.push(userScore)
            let sortedScores  = getScores.sort((a,b)=> a.score - b.score);
            sortedScores.forEach(score=>{
                if(_.isEqual(userScore,score)){
                    result = true
                }
            })

            return result;


    }
    
    const getHighScores=async()=>{
        let response  = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BCP3BG1LkxkQV778JD1o/scores`)
        let json = await response.json();
        return json;
       
    }
    return{
        style,
        centerScene,
        scaleBackground,
        getHighScores,
        verifyHighscore
        
    }
    }

    export default Utils
    