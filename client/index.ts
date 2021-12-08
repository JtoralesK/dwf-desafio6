
import {initRouter} from"./router"
import {state} from"./state"
import  {elButton} from"./components/button/button"
import {initText} from"./components/text/text"
import { initTijera } from "./components/manos/tijera"
import { initPapel } from "./components/manos/papel";
import { initPiedra } from "./components/manos/piedra";

(function(){
 
    state.init()
    
    const container = document.querySelector(".main-container")
    initRouter(container)
    elButton()
    initText()
    initTijera()
    initPapel()
    initPiedra()
  
       
})();