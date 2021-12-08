import {state}from"../../state"
 export function results(parametros:any){
    const div = document.createElement("div");
    const empate = require("url:../../../img/estrella amarilla.png");
    const perdiste = require("url:../../../img/estrella roja.png");
    const ganaste = require("url:../../../img/estrella verde.png");
    const data= state.getCurrentGame();
    const dataEntera= state.getState()
    
    let juego =state.whoWins(data.computerMove,data.userMove)
    
   
    
    console.log(juego);
    
    
     state.pushWins(juego)
    
    
    
    
    let user = dataEntera.history.userWins;
    let computer= dataEntera.history.computerWins;
    let empatejugada= dataEntera.history.empate;
    
 
 
    //console.log(juego,data);
    let tipoImg;
    let tipoColor;
    if(juego=="gano la compu"){
     tipoImg=perdiste;
     tipoColor="page-results-perdistee"
    
     
    }
    if(juego== "gano el usuario"){
      tipoImg=ganaste
      tipoColor="page-results-ganaste"
      
     }
     if(juego=="empate"){
      tipoImg=empate;
      tipoColor="page-results-empate"
      
     }
     
  //console.log(tipoColor);
  state.restartGame()
    div.innerHTML=`
    <div class="${tipoColor}">
    <div class="container__results">
      <div class="img-results">
       <img src="${tipoImg}" >
      </div>
      <div class="results-jugadas">
      <h2 class="score">Score</h2>
      <h4 class="puntajeVos">${user}</h4>
      <h4 class="puntajeMaquina">${computer}</h4>
      <h4 class="puntajeEmpate">${empatejugada}</h4>
      </div>
      <button-el class="button">Volver a jugar</button-el>
      </div>
     
   </div>
  </div>
    `

    
     div.addEventListener("click",(r)=>{
        parametros.goTo("/desafio-final-dwf-5/instrucciones")
     
       
     })
 
   

    return div
    
     
 }
