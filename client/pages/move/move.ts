import {state}from"../../state"
 export function move(parametros:any){
    const div = document.createElement("div");
    function render(){
      state.subscribe(()=>{
       
       let data =state.getState().currentGame
       
       
      })
     }
     render()
     
  
  
    div.innerHTML=`
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
    
    const pc= div.querySelector(".pc");
    
    
   
    const tijera:HTMLElement = div.querySelector(".buttonTijera");
    const piedra:HTMLElement = div.querySelector(".buttonPiedra");
    const papel:HTMLElement = div.querySelector(".buttonPapel");
   
    tijera.style.display="none"
    papel.style.display="none"
    piedra.style.display="none"

    const tijeraa:HTMLElement = div.querySelector(".p");
    const piedraa:HTMLElement = div.querySelector(".o");
    const papeel:HTMLElement = div.querySelector(".i");
   
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
        const container:HTMLElement = div.querySelector(".hijo")
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
        parametros.goTo("/desafio-final-dwf-5/results")
      }, 2000);
       cpu()
        
       }
 
       elige()
   return div;
 }

 