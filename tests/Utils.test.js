import Utils from '../src/assets/js/config/Utils'
import 'regenerator-runtime/runtime'
import {getHighScores} from './mocks'
const URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BCP3BG1LkxkQV778JD1o/scores'
let result = [{user: "Fernando",score:40},{user: "Fernando2",score:50},{user: "Fernando3",score:10},{user: "Fernando4",score:5},{user:"Maria",score:"200"}]
const util = Utils();

test('score should be inserted if the result is less than 10',async()=>{
    let newScores = util.verifyHighScore({user:"Test",score:"100"},result)
    expect(newScores).toEqual([{user:"Test",score:"100"},{user: "Fernando",score:40},{user: "Fernando2",score:50},{user: "Fernando3",score:10},{user: "Fernando4",score:5},{user:"Maria",score:"200"}].sort((a,b)=>{
        return a.score - b.score
    }))
})

test('score should not be inserted if it less than other scores',()=>{
    let resultAux = result;
    resultAux.push(...result)
    let newScores = util.verifyHighScore({user:"Test2",score:"1"},resultAux);
    expect(newScores).toEqual(resultAux.sort((a,b)=>{return a.score - b.score}))
})

test('score should be inserted if its bigger than at least the 10th position. ',()=>{
    let newScore = {user:"Test2",score:"500"}
    let resultAux = result;
    resultAux.push(...result);
    resultAux.unshift(newScore)
    let newScores = util.verifyHighScore(newScore,resultAux);
    expect(newScores).toEqual(resultAux.sort((a,b)=>{return a.score - b.score}))
})

test('Mock to get HighScores if url is valid',()=>{
    getHighScores(URL).then(response=>{
        expect(response).toEqual(result)
    }).catch(e=>{
        return e
    })
})

test("Mock is unvalid if url is not valid",()=>{
    getHighScores(URL+'/948d').then(x=>{
        return x;
    }).catch(e=>{
        expect(e).toEqual("No Game found")
    })
})



