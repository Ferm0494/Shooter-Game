class Alien extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'alien1');
        this.velocity = 25
    }

    drop(x, y) {
        this.body.reset(x, y)
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(this.velocity)
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta)
        if (this.y >= window.innerHeight) {
            this.setActive(false);
            this.setVisible(false);
            this.velocity += 1
            this.setVelocityY(this.setVelocityY);
        }
    }

    kill() {
            this.setActive(false)
            this.setVisible(false)
    }


}

export default Alien