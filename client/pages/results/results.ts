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
  player1Ready:boolean
  player2Ready:boolean

  result:""

   connectedCallback(){
    this.render()
    this.ready()
     state.subscribe(()=>{
       const cs =state.getState()   
       if(cs.player2.iam=="local"){
        this.player1Ready=cs.player2.ready

      } if(cs.player2.iam=="online"){
        this.player2Ready=cs.player2.ready


      }
       
      this.ready()
     })
    
     
    const button = document.querySelector(".button")
    button.addEventListener("click",()=>{
      state.setPlay(()=>{
        const cs= state.getState()
        const loader:HTMLElement = document.querySelector(".loader")
        loader.style.display="grid"
        state.eleminarRtdbDataPlayers()
        if(cs.player1.iam=="local"){
          state.user1ready()
          this.player1Ready=cs.player1.ready

        } if(cs.player1.iam=="online"){
          state.user2ready()
          this.player2Ready=cs.player1.ready


        }
        
       })

    })

    }
    ready(){
      const cs= state.getState()
      const ready1= cs.player1.ready
      const ready2= cs.player2.ready

      console.log(cs.player1.ready,"player1",cs.player2.ready,"player2");
      if(ready1==true && ready2==true){
        console.log("sin bugg");
        
        Router.go("/")
      }
    }
    render(){
      const cs= state.getState()

       const style = document.createElement("style")
      const empate = require("url:../../../img/estrella amarilla.png");
      const perdiste = require("url:../../../img/estrella roja.png");
      const ganaste = require("url:../../../img/estrella verde.png");

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
      console.log(juego);
      state.pushWhoWins(juego)
    
    
      
      

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
        <div class="loader">
        <div id="preloader_3"></div>
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

       .loader{
         margin-top:20px;
         margin-right:25px;
         display:none;
         justify-content: center;
        align-items: center;
       }



       #preloader_3{
        position:relative;
    }
    #preloader_3:before{
        width:20px;
        height:20px;
        border-radius:20px;
        background:green;
        content:'';
        position:absolute;
        background:#9b59b6;
        animation: preloader_3_before 1.5s infinite ease-in-out;
    }
     
    #preloader_3:after{
        width:20px;
        height:20px;
        border-radius:20px;
        background:blue;
        content:'';
        position:absolute;
        background:#2ecc71;
        left:22px;
        animation: preloader_3_after 1.5s infinite ease-in-out;
    }
     
    @keyframes preloader_3_before {
        0% {transform: translateX(0px) rotate(0deg)}
        50% {transform: translateX(50px) scale(1.2) rotate(260deg); background:#2ecc71;border-radius:0px;}
          100% {transform: translateX(0px) rotate(0deg)}
    }
    @keyframes preloader_3_after {
        0% {transform: translateX(0px)}
        50% {transform: translateX(-50px) scale(1.2) rotate(-260deg);background:#9b59b6;border-radius:0px;}
        100% {transform: translateX(0px)}
    }
       
      `
      
      
      this.appendChild(style)

    }
 }
 customElements.define("results-el",Results)
