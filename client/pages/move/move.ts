import {state}from"../../state"
import {Router} from"@vaadin/router"

 class Move extends HTMLElement{
     connectedCallback(){
      state.subscribe(()=>{
        let data =state.getState().currentGame
       })
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
     
      
  
    function cpu(){
      const selectRandomMove= Math.ceil(Math.random() * 3);
      let moveCpu=[]
      
      
      if(selectRandomMove==1){
          tijeraa.style.display="initial";
         moveCpu.push("tijera")
      }
      if(selectRandomMove==2){
          papeel.style.display="initial";
            moveCpu.push("papel")
      }
      if(selectRandomMove==3){
         piedraa.style.display="initial";
          moveCpu.push("piedra")
      }
     
     
      state.setMove("computerMove",moveCpu[0]);
     
     
    }
  
  
     function random(){
      const selectRandomMove= Math.ceil(Math.random() * 3);
      if(selectRandomMove==1){
        tijera.style.display="initial"
        return "tijera"
      }
      if(selectRandomMove==2){
           papel.style.display="initial"
           return "papel"
      }
      if(selectRandomMove==3){
         piedra.style.display="initial"
          return "piedra"
      }
     
     }
      function elige(){
          const container:HTMLElement = this.querySelector(".hijo")
          const data=state.getCurrentGame().userMove
          let moveCpu=[]
          if("tijera"==data){
              tijera.style.display="initial"
              moveCpu.push("tijera")
          }
          if("papel"==data){
               papel.style.display="initial"
               moveCpu.push("papel")
          }
          if("piedra"==data){
              piedra.style.display="initial"
              moveCpu.push("piedra")
          }
         else if("none"==data){
          moveCpu.push(random())
          
         }
         state.setMove("userMove",moveCpu[0]);
        setTimeout(() => {
          Router.go("/") }, 2000);
         cpu()
          
         }
   
         elige()
    
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
    }
  
 }
 customElements.define("move-el",Move)
