import { cargarSegundo } from "../../components/temporizador/tempo";
import {state}from"../../state"

 export function instru(params){
    const div = document.createElement("div");
 
    div.innerHTML=`
    <div class="container__home">
      <div class="container__content__home">
      <text-component class="text" >Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</text-component>
      <button-el class="button__jugar">Jugar</button-el>
      <div class="container__manos">
      <tijera-el class="manos buttonTijera" ></tijera-el>
      <piedra-el class="manos buttonPiedra"></piedra-el>
      <papel-el class="manos buttonPapel"></papel-el>
     </div>
      </div>  
     </div>
    `
    const button = div.querySelector(".button__jugar");
    button.addEventListener("click",(ev)=>{
      
      params.goTo("/desafio-final-dwf-5/play")
     
      
      
    })
    
    
   
   return div;
 }

 
