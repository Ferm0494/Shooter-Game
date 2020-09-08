import Coin from '../gameObjects/Coin'
import Phaser from 'phaser'
class CoinGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world,scene);
        this.increaseCoins();
    }
    increaseCoins(){
        this.createMultiple({
            classType: Coin,
            frameQuantity:1,
            active:false,
            visible:false,
            key:'coin'
        })
    }
    
    dropCoin(x,y,scale){
        const coin = this.getFirstDead(false);
        if(coin){
            coin.setScale(scale);
            coin.drop(x,y);
        }

        return coin
    }
}

export default CoinGroup