class Coin extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'coin')
        this.velocity =75;
    }
    drop(x,y){
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(this.velocity);
    }

    preUpdate(time,delta){
        super.preUpdate(time,delta)
        if(this.y >= window.innerHeight){
            this.setActive(false);
            this.setVisible(false);
            this.setData('passedCoin',false);
            this.velocity+=5;
            this.setVelocityY(this.velocity)
        }
    }

    popUp(){
        this.setVisible(false);
        this.setActive(false);
    }
}

export default Coin