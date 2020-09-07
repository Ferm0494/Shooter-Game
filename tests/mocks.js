

const result = [{user: "Fernando",score:40},{user: "Fernando2",score:50},{user: "Fernando3",score:10},{user: "Fernando4",score:5},{user:"Maria",score:"200"}]


const getHighScores= async(url)=>{
    return new Promise((resolve,reject)=>{
        if(url === 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BCP3BG1LkxkQV778JD1o/scores' ){
            resolve(result)
        }else{
            reject("No Game found")
        }
    })
}

export {
    getHighScores
}