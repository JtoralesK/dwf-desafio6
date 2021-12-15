import {state}from"../../state"
import {Router} from"@vaadin/router"

type Move = "piedra" | "papel" | "tijera";
type Wins = "gano el player1" |"gano el player2"|"empate"

 class Results extends HTMLElement{
  player1Move:""
  player2Move:""
  result:""

   connectedCallback(){
    this.render()
    const button = document.querySelector(".button")
    button.addEventListener("click",()=>{
      state.setPlay(()=>{
        state.setPlay(()=>{
          state.eleminarRtdbDataPlayer1()
          state.eleminarRtdbDataPlayer2()

          Router.go("/")

  })

})

    })
        const cs =state.getState()
        this.player1Move= cs.player1.move
        this.player2Move= cs.player2.move
    //  state.subscribe(()=>{
    //    console.log("suscribe pag results");
    //    const cs =state.getState()
    //   this.result=cs.registro.ultimaJugada
    //   this.render()
    //  })
    }
    render(){
       const style = document.createElement("style")
      const empate = require("url:../../../img/estrella amarilla.png");
      const perdiste = require("url:../../../img/estrella roja.png");
      const ganaste = require("url:../../../img/estrella verde.png");
      const cs= state.getState()
      
      const juego =state.whoWins(cs.player1.move,cs.player2.move)
      state.pushWhoWins(juego)
    console.log(cs.player1.move,cs.player2.move,juego);
    
      
      let user = cs.registro.player1Wins;
      let computer= cs.registro.player2Wins;
      let empatejugada= cs.registro.empate;

      let tipoImg;
      let tipoColor;
     if(cs.player1.iam=="local"){
       console.log("result soy local");
       
      if(juego=="gano el player1"){
        tipoImg=ganaste;
        tipoColor="page-results-ganaste"
       
       }
       if(juego== "gano el player2"){
         tipoImg=perdiste
         tipoColor="page-results-perdiste"
 
        }
        if(juego=="empate"){
         tipoImg=empate;
         tipoColor="page-results-empate"
         
        }
     }
     if(cs.player1.iam=="online"){
      console.log("result soy online");
      
     if(juego=="gano el player1"){
       tipoImg=perdiste
       tipoColor="page-results-perdiste"
      
      }
      if(juego== "gano el player2"){
        tipoImg=ganaste;
        tipoColor="page-results-ganaste"

       }
       if(juego=="empate"){
        tipoImg=empate;
        tipoColor="page-results-empate"
        
       }
    }
    
    console.log(tipoImg,tipoColor);
    
       
      this.innerHTML=`
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
         content: "Player:";
         color:black;
       }
       .puntajeMaquina::before {
         content: "Maquina:";
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
