class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'laser')
    }
    fire(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(-1200)
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta)
        if (this.y <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    explote() {

        this.setActive(false);
        this.setVisible(false);
        // console.log("Calling laser2!", this.visible);
    }
}

export default Laser;