import "./assets/stylesheets/index.scss";
import config from './assets/js/config/config'
import {submitBtn,textField,container} from './assets/js/components/inputs'

// const game = new Phaser.Game(config)

const init = ()=>{
    

    submitBtn.addEventListener('click',(e)=>{
     
        e.preventDefault()
        if(textField.value.length === 0 ){
            textField.setCustomValidity("Cant be empty!")
            textField.reportValidity()
        }else{
            container.classList.add("d-none")
            container.classList.remove("d-flex");
             const game = new Phaser.Game(config);
            localStorage.setItem("user",textField.value)
             
             
        }
        
        
    })
}

init()