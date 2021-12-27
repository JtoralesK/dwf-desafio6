import {Router} from"@vaadin/router"
import {state} from"../../state"

class Signup extends HTMLElement{
    connectedCallback(){
    this.render()
    const buttonComenzar = document.querySelector(".form_signup")
    const button = document.querySelector(".button__home")
    const circle:HTMLElement = document.querySelector(".circle")
    
    buttonComenzar.addEventListener('submit', function(e) {
      circle.style.display="initial"
      e.preventDefault();
      const target:any = e.target
      const name = target.name.value
      const cs = state.getState()
      state.setName(name)
      if(cs.roomId==""){
        state.signUp(()=>{
          if(cs.error.usuario=="no existe"){
            state.createRoom(()=>{
              state.connectRtdb(()=>{
                state.IdentificadorPlater("local",()=>{
                  state.setPlayer2Online("online")
                  Router.go("/room")
                })
              })})
            
          }else if(cs.error.usuario=="ya existe"){
            const nombre:HTMLElement = document.querySelector(".name_home")
            const error_name:HTMLElement = document.querySelector(".error")
            error_name.style.display="inherit"


            circle.style.display="none"
            nombre.style.color="red"
            console.log("no paso");
            state.setError()
            
          }
         
          
        })
      
      }else{
           state.verificarRoom(()=>{

            if(cs.error.datosErroneos==true){
              const roomErroneo:HTMLElement = document.querySelector(".salaError")
              roomErroneo.style.display="inherit"
              circle.style.display="none"

              console.error("datos erroneos")
              state.setErrorRoom(()=>{
                setTimeout(() => {
                  Router.go("/")
                 }, 2000);
              })
             
            }else{
                if(cs.error.sala=="vacia"){
                  state.signUp(()=>{
                    console.log(cs.error.usuario);
                    if(cs.error.usuario=="no existe"){
                      state.comunicarFirabaseP2(()=>{
                        state.connectRtdb(()=>{
                          state.IdentificadorPlater("online",()=>{
                            state.setPlayer2Local("local")
                            Router.go("/room")
                          }) })
                      
                      })
         
                      
                    }else if(cs.error.usuario=="ya existe"){
                      const nombre:HTMLElement = document.querySelector(".name_home")
                      const error_name:HTMLElement = document.querySelector(".error")
                      error_name.style.display="inherit"
          
          
                      circle.style.display="none"
                      nombre.style.color="red"
                      console.log("no paso");
                      state.setError()
                      
                    }
                   
                  })

                 
                }else{
                  const form:HTMLElement = document.querySelector(".form_signup")
                  const div:HTMLElement = document.querySelector(".salaCompleta")
                  circle.style.display="none"

                  form.style.display="none"
                  div.style.display="initial"
                  console.error("paso algo")
                  setTimeout(() => {
                    Router.go("/")
                   }, 2000);
                }
              

             

            }  
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
     <div class="div_home">
     <div class="circle">
    <div class="loader"></div>
     </div>  
     <div class="salaCompleta">
     <p class="salaCompletaP parpadea text">¡La partida ya ha comenzado!</p>

     </div>
     <form class="form_signup">
     <label >
         <p class="name_home">Tu nombre</p>
         <input class="input_form" type="text" name="name" required  maxlength="8"> 
     </label>
     <button class="buttonRegistro">Comenzar</button>
     </form >
     <p class="error">Ya hay registrado un usuario con ese nombre </p>
    <div class="salaError">
    <p class="salaErrorP parpadea text" >¡ROOM ERRONEO!</p>
    </div>
     </div>
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
     height: 100vh;
   }
   .container__content__home {
     width: 325px;
     margin: 0 auto;
   }
   .title__home {
     margin: 0;
     text-align: left;
     padding: 10px 0 0 10px;
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
       height:80px;
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
     height:80px;
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
  .circle{
    display: none;
    text-align: right;
  }
    .loader {
        border: 16px solid #f3f3f3; 
        border-top: 16px solid rgb(189, 0, 0);; 
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 2s linear infinite;

      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
     
      .error{
        color:red;
        font-size:16px;
        text-align:center;
        background-color:yellow;
        display:none;
      }
      .salaCompleta{
        display:none;

      }
      .salaCompletaP{
        margin-top:100px;
        font-weight:700;
        color:red;
        text-align:center;
      }
      
      .salaError{
        display:none;

      }
      .salaErrorP{
        font-size:24px;
        text-align:center;
      }
    

      .text {
        font-size:28px;
        font-family:helvetica;
        font-weight:bold;
        color:red;
        text-transform:uppercase;
      }
      .parpadea {
        
        animation-name: parpadeo;
        animation-duration: 0.4s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      
        -webkit-animation-name:parpadeo;
        -webkit-animation-duration: 1s;
        -webkit-animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
      }
      
      @-moz-keyframes parpadeo{  
        0% { opacity: 1.0; }
        50% { opacity: 0.0; }
        100% { opacity: 1.0; }
      }
      
      @-webkit-keyframes parpadeo {  
        0% { opacity: 1.0; }
        50% { opacity: 0.0; }
         100% { opacity: 1.0; }
      }
      
      @keyframes parpadeo {  
        0% { opacity: 1.0; }
         50% { opacity: 0.0; }
        100% { opacity: 1.0; }
      }
   
    `
   
    this.appendChild(style)
   }
  
}
customElements.define("signup-el",Signup)
