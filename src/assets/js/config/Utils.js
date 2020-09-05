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
    
    return{
        style,
        centerScene,
        scaleBackground
        
    }
    }

    export default Utils
    