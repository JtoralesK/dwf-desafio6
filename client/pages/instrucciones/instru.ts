import { cargarSegundo } from "../../components/temporizador/tempo";
import {Router} from"@vaadin/router"
import {state}from"../../state"

 class Instru extends HTMLElement{
     connectedCallback(){
       
     this.render()
     const button = document.querySelector(".button__jugar")
     button.addEventListener("click",(res)=>{
        const cs = state.getState()        
        if(cs.player1.iam=="online" && cs.player2.iam=="local" ){

          const date = new Date()
          const hora = date.toString().slice(16,18)
          state.setPlayersOnline(hora,()=>{      
      
            state.pushDataOtroJugador(()=>{
              
             Router.go("/wait")

            })
          
            
          })

        } if(cs.player1.iam=="local"){
          
          const date = new Date()
          const hora = date.toString().slice(16,18)
          state.setPlayersOnline(hora,()=>{

            state.pushDataCreadorPartida(()=>{

             Router.go("/wait")


            })
          })

        }
        
     })
     
     
    }
 
 
    render(){
    
        const style = document.createElement("style")
 
       this.innerHTML=`
       <div class="container__home">
       <div class="container__content__home">
       <text-component class="text" >Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</text-component>
       <button-el class="button__jugar">Jugar</button-el>
       <div class="container__manos">
       <tijera-el class="manos " ></tijera-el>
       <piedra-el class="manos "></piedra-el>
       <papel-el class="manos "></papel-el>
      </div>
       </div>  
      </div>
      
       `
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
    
     this.appendChild(style)
    }
   
 }
 customElements.define("instrucciones-el",Instru)
