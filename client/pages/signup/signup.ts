import {Router} from"@vaadin/router"
import {state} from"../../state"

class Signup extends HTMLElement{
    connectedCallback(){
    this.render()
    const formm = document.querySelector(".form_signup")
    const button = document.querySelector(".button__home")
  
     formm.addEventListener('submit', function(e) {
      e.preventDefault();
      const target:any = e.target
      const name = target.name.value
      const cs = state.getState()
      state.setName(name)
      if(cs.roomId==""){
        state.signUp(()=>{
          console.log(name,"se ha registrado");
          state.createRoom(()=>{
            console.log("room creado");
            state.connectRtdb(()=>{
              "se ha conectado a la Realtime Data Base "
              state.IdentificadorPlater("local",()=>{
                Router.go("/room")
              })
            })
          })
          
        })
      
      }else{
        state.signUp(()=>{
          console.log(name,"se ha registrado");
          state.connectRtdb(()=>{
            state.IdentificadorPlater("online",()=>{
               
              Router.go("/room")
            })
            })
          
          
        })
      }
     
      
    });
    }

   render(){
   
       const style = document.createElement("style")

      this.innerHTML=`
      <div class="container__home">
      <div class="container__content__home">
      <h1 class="title__home">Piedra Papel o Tijera</h1>
      <form class="form_signup">
      <label >
          <p class="name_home">Tu nombre</p>
          <input class="input_form" type="text" name="name">
      </label>
      <button class="buttonRegistro">Comenzar</button>
      </form >
      <div class="container__manos">
      <tijera-el class="tijera__home manos" ></tijera-el>
      <piedra-el class="piedra__home manos" ></piedra-el>
      <papel-el class="papel__home manos"></papel-el>
      </div>
      </div>  
   </div>
     
      `
    style.innerHTML=`
    @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&family=Roboto:ital,wght@1,400;1,700&display=swap');
    
   .container__home {
     width: 100%;
     height: 80vh;
   }
   .container__content__home {
     width: 325px;
     margin: 0 auto;
   }
   .title__home {
     margin: 0;
     text-align: left;
     padding-top: 40px;
     font-size: 65px;
     color: #009048;
     padding-right: 0px;
     font-family: "Arvo", serif;
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
   .input_form{
       width:100%;
       height:84px;
       border: 10px solid blue;
       border-radius: 10px;

   }
   .name_home{
       font-size:45px;
       text-align:center;
       font-family: 'Odibee Sans', cursive;
       margin:0;
   }
   .buttonRegistro{
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
   
    
    `
   
    this.appendChild(style)
   }
  
}
customElements.define("signup-el",Signup)
