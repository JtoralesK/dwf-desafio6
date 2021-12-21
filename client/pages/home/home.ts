 import {Router} from"@vaadin/router"
 import {state} from"../../state"

 class Home extends HTMLElement{
     connectedCallback(){
     this.render()

     const button1:HTMLElement = document.querySelector(".button_home_newGame")
     const button2:HTMLElement = document.querySelector(".button_home_ingresoSala")
     const button3:HTMLElement = document.querySelector(".button_home_ingreso")
     const input:HTMLElement = document.querySelector(".input_codigo_room")
     const Retomarbutton4:HTMLElement = document.querySelector(".retomarPartida")

     const form = document.querySelector(".form")


     button1.addEventListener("click",(res)=>{
         Router.go("/signup")
        
     })
     button2.addEventListener("click",()=>{
       button1.style.display="none"
       button2.style.display="none"
       button3.style.display="initial"
       input.style.display="initial"

     })
     form.addEventListener("submit",(e)=>{
       e.preventDefault()
       const target:any = e.target  
       const name = target.room.value
       state.setRoom(name)
       Router.go("/signup")
     })
    const cs = state.getState()

    if(cs.player1.name && cs.player2.name){
       Router.go("/instrucciones")
      

    }
    if(cs.localData.sesion=="activada"){
      const localData =cs.localData
      Retomarbutton4.style.display="grid"
      Retomarbutton4.addEventListener("click",()=>{
        state.setState(localData)
        state.setPlay(()=>{
          state.eleminarRtdbDataPlayers()
          Router.go("/instrucciones")
  
  })})

  }

    }
    
 
 
    render(){
    
        const style = document.createElement("style")
 
       this.innerHTML=`
       <div class="container_home">
    <div class="container_content_home">
    <h1 class="title_home">Piedra Papel o Tijera</h1>
   <div class="div_home">
   <button-el class="button_home_newGame">Nuevo juego</button-el>
   <button-el class="button_home_ingresoSala">Ingresar a una sala</button-el>
  <form class="form">
  <input type="text" class="input_codigo_room" name="room" placeholder="CODIGO" required>
  <button class="button_home_ingreso">Ingresar</button>
  </form>
  <div class="retomarPartida">
  <button class="retomar_button">Continuar Partida</button>
  </div>
   </div>
    <div class="container_manos">
    <tijera-el class="tijera_home manos" ></tijera-el>
    <piedra-el class="piedra_home manos" ></piedra-el>
    <papel-el class="papel_home manos"></papel-el>
    </div>
    </div>  
    </div>
   
      
       `
     style.innerHTML=`
     @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');

    .container_home {
      width: 100%;
      height: 80vh;
    }
    .container_content_home {
      width: 325px;
      margin: 0 auto;
    }
    .title_home {
      margin: 0;
      text-align: left;
      padding: 10px;
      font-size: 65px;
      color: #009048;
      padding-right: 0px;
      font-family: "Arvo", serif;
    }
    .container_manos {
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
    
    .button_home_ingreso,.input_codigo_room{
      display: none;
    }
    .input_codigo_room{
      width:100%;
      height:84px;
      border: 10px solid blue;
      border-radius: 10px;
      text-align:center;
      font-size:32px;

    }
    .button_home_ingreso{
      margin-top:20px;
      width: 100%;
       height:87px;
       background-color:#006CFC;
       border:solid 10px #043472;
       color:white;
       font-size:32px;
       border-radius: 10px;
       font-family: 'Odibee Sans', cursive;
    }
    .div_home{
      width:93%;
      margin:0 auto;
    }
    .retomarPartida{
      justify-content: center;
      align-items: center;
      display:none;
    }
    .retomar_button{
      width:100%;
      background:yellow;
      border:1px solid black;
      margin-top:20px;
      border-radius: 2px;
      color:red;
      text-align:center;

    }
     `
    
     this.appendChild(style)
    }
   
 }
 customElements.define("home-el",Home)
