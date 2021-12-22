import {state}from"../../state"
import {Router} from"@vaadin/router"
import { cargarSegundo } from "../../components/temporizador/tempo";

 class Play extends HTMLElement{
     connectedCallback(){
       
     this.render()

    }
 
    render(){
      const reloj = cargarSegundo({ seConcretaJugada: seConcretaJugada})
    
    
        const style = document.createElement("style")
 
       this.innerHTML=`
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
       const container = this.querySelector(".container__content__home");
       container.appendChild(reloj)

       
    const tijera:HTMLElement = this.querySelector(".buttonTijera");
    const piedra:HTMLElement = this.querySelector(".buttonPiedra");
    const papel:HTMLElement = this.querySelector(".buttonPapel");

    const tijeraa:HTMLElement = this.querySelector(".p");
    const piedraa:HTMLElement = this.querySelector(".o");
    const papeel:HTMLElement = this.querySelector(".i");

    tijeraa.style.display="none"
    papeel.style.display="none"
    piedraa.style.display="none"
   
    const jugadas=[tijera,papel,piedra]
   const l=  jugadas.map((jugada)=>{
      jugada.addEventListener("click",(e)=>{
        let evento:any = e
        let click = evento.path[2]
       let jugada ;
        if(click==tijera){
          tijeraa.style.display="initial"
          piedra.style.display="none"
          papel.style.display="none"
          tijera.style.display="none"
          jugada="tijera"          
        }
        if(click==papel){
          papeel.style.display="initial"
          piedra.style.display="none"
          papel.style.display="none"
          tijera.style.display="none"
          jugada="papel"          

        }
        if(click==piedra){
          piedraa.style.display="initial"
          piedra.style.display="none"
          papel.style.display="none"
          tijera.style.display="none"
          jugada="piedra"          

        }
        state.setMove(jugada,()=>{
          const cs = state.getState()
          if(cs.player1.iam=="online"){
            state.pushMoveOtroJugador()
          }else if(cs.player1.iam=="local"){
            state.pushMoveCreadorPartida()
          }
        })        

   })})
     style.innerHTML=`
         
    .container__home {
      width: 100%;
      height: 80vh;
    }
    .container__content__home {
      width: 325px;
      margin: 0 auto;
    }
    
    .container__manos {
      display: flex;
      width: 100%;
      position: fixed;
      bottom: 0;
      justify-content: center;
      left: 0;
    }
    .manos {
      margin: 0 15px;
    }
     
     `
     function seConcretaJugada(params){
      if(params==1){ 
        setTimeout(()=>{
         // console.log("termino el tiempo");
        //  const cs = state.getState()
        //  console.log(cs.player1.move,cs);
         
          Router.go("/move")
        },1000)
      }
      }
     this.appendChild(style)
    }
 }
 customElements.define("play-el",Play)
