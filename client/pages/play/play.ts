import { cargarSegundo } from "../../components/temporizador/tempo";
import {state}from"../../state"
import { move } from "../move/move";

 export function play(parametros:any){
   
    const div = document.createElement("div");
    var reloj = cargarSegundo({ seConcretaJugada: seConcretaJugada})
  
    div.innerHTML=`
    <div class="container__home">
      <div class="container__content__home">
      <div class="container__manos container__play">
      <div class="hijo">
      <tijera-el variante="movimiento" class="manos buttonTijera" ></tijera-el>
      <piedra-el variante="movimiento" class="manos buttonPiedra"></piedra-el>
      <papel-el variante="movimiento" class="manos buttonPapel"></papel-el>
      <tijera-el  variante="ultimaJugada"  class="p" ></tijera-el>
      <piedra-el variante="ultimaJugada" class="o"></piedra-el>
      <papel-el variante="ultimaJugada" class="i "></papel-el></div>
      </div>
     </div>
      </div>  
     </div>
    `
    const container = div.querySelector(".container__content__home");
    container.appendChild(reloj)
   
    const tijera:HTMLElement = div.querySelector(".buttonTijera");
    const piedra:HTMLElement = div.querySelector(".buttonPiedra");
    const papel:HTMLElement = div.querySelector(".buttonPapel");

    const tijeraa:HTMLElement = div.querySelector(".p");
    const piedraa:HTMLElement = div.querySelector(".o");
    const papeel:HTMLElement = div.querySelector(".i");

    tijeraa.style.display="none"
    papeel.style.display="none"
    piedraa.style.display="none"
   
    const jugadas=[tijera,papel,piedra]
   const l=  jugadas.map((jugada)=>{
      jugada.addEventListener("click",(e)=>{
        let evento:any = e
        let click = evento.path[2]
       
        let moveCpu=[]
    
        if(click==tijera){
          tijeraa.style.display="initial"
          piedra.style.display="none"
          papel.style.display="none"
          tijera.style.display="none"
           moveCpu.push("tijera")
        }
        if(click==papel){
          papeel.style.display="initial"
          piedra.style.display="none"
          papel.style.display="none"
          tijera.style.display="none"
              moveCpu.push("papel")
        }
        if(click==piedra){
          piedraa.style.display="initial"
          piedra.style.display="none"
          papel.style.display="none"
          tijera.style.display="none"
            moveCpu.push("piedra")
        }
        state.setMove("userMove",moveCpu[0]);
   })})
  
    function seConcretaJugada(params){
      if(params==1){
       const container:HTMLElement = div.querySelector(".hijo")
        
      
        
        setTimeout(()=>{
          parametros.goTo("/desafio-final-dwf-5/move")
        },1000)
        
      }
      }
   return div;
 }

   
