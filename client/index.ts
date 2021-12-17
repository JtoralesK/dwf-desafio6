
import {state} from"./state"
import "./router"
import "./pages/home/home"
import "./pages/instrucciones/instru"
import "./pages/play/play"
import "./pages/move/move"
import "./pages/signup/signup"
import "./pages/roomid/room"
import "./pages/waiting/waiting"
import "./pages/results/results"
import "./components/button/button"
import {initText} from"./components/text/text"
import { initTijera } from "./components/manos/tijera"
import { initPapel } from "./components/manos/papel";
import { initPiedra } from "./components/manos/piedra";

(function(){
    const tiempo = new Date()    
    const hora = tiempo.toString().slice(16,18)
    state.init(hora)
    initText()
    initTijera()
    initPapel()
    initPiedra()
    
       
})();