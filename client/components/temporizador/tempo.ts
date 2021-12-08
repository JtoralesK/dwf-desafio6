import "./tempo.css"
import { state } from "../../state";
export {cargarSegundo}
    const div = document.createElement("div");
    div.innerHTML=`
    <div class="cont__temporizador">
    <div class="bloque">
        <div class="segundos-div">
        <h1 class="segundos"></h1>
        </div>
    </div>
    </div>`
    const divt = div.querySelector(".segundos")
    var nInte;
function cargarSegundo(paramrs){
    cargarSegundoo()
    function cargarSegundoo(){
        nInte = setInterval(pasaSegundo,1000)
        divt.innerHTML=`3`  
    }
    let segundos = 2;
    
    function pasaSegundo(){
        divt.innerHTML=`${segundos}`
       segundos--;
       
       if(segundos==0){
           clearInterval(nInte)
           paramrs.seConcretaJugada(1)
           
       }
    }
    return div
}
    
    

      
     
  
       
    
    
      
        
    
 
   
    

