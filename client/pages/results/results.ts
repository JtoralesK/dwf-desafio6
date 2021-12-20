import {state}from"../../state"
import {Router} from"@vaadin/router"

type Move = "piedra" | "papel" | "tijera";
type Wins = "gano el player1" |"gano el player2"|"empate"

 class Results extends HTMLElement{
  player1Name:string
  player2Name:string
  player1Move:Move
  player2Move:Move
  player1Point:number
  player2Point:number

  result:""

   connectedCallback(){
    this.render()
    const button = document.querySelector(".button")
    button.addEventListener("click",()=>{
      state.setPlay(()=>{
        state.eleminarRtdbDataPlayers()
        Router.go("/")

})

    })
  
    }
    render(){
       const style = document.createElement("style")
      const empate = require("url:../../../img/estrella amarilla.png");
      const perdiste = require("url:../../../img/estrella roja.png");
      const ganaste = require("url:../../../img/estrella verde.png");
      const cs= state.getState()

        if(cs.player1.iam=="local"){
          this.player1Move=cs.player1.move
          this.player2Move=cs.player2.move
          this.player1Name=cs.player1.name
          this.player2Name=cs.player2.name

        } if(cs.player1.iam=="online"){
          this.player2Move=cs.player1.move
          this.player1Move=cs.player2.move
          this.player2Name=cs.player1.name
          this.player1Name=cs.player2.name
         
          
        }
     
      const juego =state.whoWins(this.player1Move, this.player2Move)
      
      state.pushWhoWins(juego)
    console.log(juego);
    
      
      

      let tipoImg;
      let tipoColor;
      console.log( cs.registro);
      
     if(cs.player1.iam=="local" && juego=="gano el player2" ){
      tipoImg=perdiste
      tipoColor="page-results-perdiste"
      
     } if(cs.player1.iam=="online" && juego=="gano el player1" ){
      tipoImg=perdiste
      tipoColor="page-results-perdiste"
      
     }if(cs.player1.iam=="local" && juego=="gano el player1" ){
      tipoImg=ganaste
      tipoColor="page-results-ganaste"
      
     } if(cs.player1.iam=="online" && juego=="gano el player2" ){
      tipoImg=ganaste
      tipoColor="page-results-ganaste"
      
     } if(juego=="empate"){
        tipoImg=empate;
        tipoColor="page-results-empate"
        
       }
       
      
      this.innerHTML=`
      <div class="${tipoColor}">
      <div class="container__results">
        <div class="img-results">
         <img src="${tipoImg}" >
        </div>
        <div class="results-jugadas">
        <h2 class="score">Score</h2>
        <h4 class="puntajeVos">${cs.registro.player1Wins}</h4>
        <h4 class="puntajeMaquina">${cs.registro.player2Wins}</h4>
        <h4 class="puntajeEmpate">${cs.registro.empate}</h4>
        </div>
        <button-el class="button">Volver a jugar</button-el>
        </div>
       
     </div>
    </div>
      `
      style.innerHTML=`
      .page-results-perdiste{
         background-color: rgba(128, 3, 3, 0.4);
         height: 100vh;
         padding-top: 20px;
       }
       .page-results-empate {
         background-color: rgba(251, 134, 0, 0.5);
         padding-top: 20px;
         height: 100vh;
       }
       
       .page-results-ganaste {
         background-color: rgba(187, 255, 0, 0.5);
         height: 100vh;
         padding-top: 20px;
       }
       .container__results {
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
       }
       .results-jugadas {
         width: 259px;
         height: 217px;
         border: solid 10px black;
         background-color: white;
         font-family: "Odibee Sans", cursive;
       }
       .score {
         text-align: center;
         font-size: 55px;
         margin: 0;
       }
       .puntajeVos,
       .puntajeMaquina,
       .puntajeEmpate {
         text-align: right;
         font-size: 30px;
         font-weight: bold;
         margin: 0;
         color:red
       }
       .puntajeVos::before {
         content: "${ this.player1Name}:";
         color:black;
       }
       .puntajeMaquina::before {
         content: "${ this.player2Name}:";
         color:black;
       }
       .puntajeEmpate::before {
         content: "Empate:";
         color:black;
       }
       
      `
      
      
      this.appendChild(style)

    }
 }
 customElements.define("results-el",Results)
