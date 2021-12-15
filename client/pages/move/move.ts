import {state}from"../../state"
import {Router} from"@vaadin/router"

 class Move extends HTMLElement{
     connectedCallback(){
     this.render()
     
    }
 
 
    render(){
      this.innerHTML=`
      <div class="container__home">
     <div class="container__content__home">
     <div class="pc">
     <tijera-el  variante="variantePc"  class="p" ></tijera-el>
     <piedra-el variante="variantePc" class="o"></piedra-el>
     <papel-el variante="variantePc" class="i "></papel-el></div>
     <div class="container__manos >
     <div class="hijo">
     <tijera-el  variante="elegida"  class="manos buttonTijera" ></tijera-el>
     <piedra-el variante="elegida" class="manos buttonPiedra"></piedra-el>
     <papel-el variante="elegida" class="manos buttonPapel"></papel-el>
     </div>
    </div>
     </div>  
    </div>
     
      `
      const pc= this.querySelector(".pc");
    
      const tijera:HTMLElement = this.querySelector(".buttonTijera");
      const piedra:HTMLElement = this.querySelector(".buttonPiedra");
      const papel:HTMLElement = this.querySelector(".buttonPapel");
     
      tijera.style.display="none"
      papel.style.display="none"
      piedra.style.display="none"
  
      const tijeraa:HTMLElement = this.querySelector(".p");
      const piedraa:HTMLElement = this.querySelector(".o");
      const papeel:HTMLElement = this.querySelector(".i");
     
      tijeraa.style.display="none"
      papeel.style.display="none"
      piedraa.style.display="none"
     
      
  
    function movePlater2(){
      
      const cs = state.getState()
      const move = cs.player2.move      
      if(move=="tijera"){
          tijeraa.style.display="initial";
      }
      if(move=="papel"){
          papeel.style.display="initial";
      }
      if(move=="piedra"){
         piedraa.style.display="initial";
      }
     
     
     
     
    }
     
      function movePlater1(){
          const data=state.getState().player1.move
          if("tijera"==data){
              tijera.style.display="initial"
          }
          if("papel"==data){
               papel.style.display="initial"
          }
          if("piedra"==data){
              piedra.style.display="initial"
          }
       
         
          
         }
   
         movePlater1()
         movePlater2()
    
    const style = document.createElement("style")

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
     function main(){
      setTimeout(() => {
        Router.go("/results")
       }, 2000);
     }
     main()
    }
  
 }
 customElements.define("move-el",Move)
