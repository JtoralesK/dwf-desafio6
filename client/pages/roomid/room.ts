import {Router} from"@vaadin/router"
import {state} from"../../state"
type Rooms = string 
type Names =string

class Room extends HTMLElement{
  room:Rooms=""
  player1:Names[]=[]
  player2:Names[]=[] 

    connectedCallback(){
    this.render()
     const cs =state.getState()
     const room = cs.roomId
     const firstName = cs.player1.name
     const secondName = cs.player2.name
     this.player2=secondName
     this.player1=firstName
     
     this.room=room   
     this.render()
     state.subscribe(()=>{
      const cs =state.getState()
      const secondName = cs.player2.name
      this.player2=secondName
      this.render()

     })
    }
   render(){
   
       const style = document.createElement("style")

      this.innerHTML=`
      <div class="container__home">
         <div class="container__content__home">
             
         <div class="header">
        <div class="marcador">
        <p class="userLocal p-header">${this.player1}:0</p>
        <p class="userOnline  p-header">${this.player2}:0</p>

        </div>
         <div class="sala">
         <p class="sala  p-header">Sala</>
         <p class="codigo  p-header">${this.room}</>

         </div>
         </div>

         <section>
         <div class="content">
         <h2 class="title-One_content">Comparti el codigo:</h2>
         <h1 class="codigo-sala">${this.room}</h1>
         <h2 class="title-two_content">con tu contricante</h2>
         <button class="ready">rEady!</button>
         </div>

         </section>
        
         
        

         <div class="container__manos">
         <tijera-el class="tijera__home manos" ></tijera-el>
         <piedra-el class="piedra__home manos" ></piedra-el>
         <papel-el class="papel__home manos"></papel-el>
         </div>

       </div>  
    </div>
     
      `
    
    style.innerHTML=`
    @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
    
   .container__home {
     width: 100%;
     height: 80vh;
   }
   .container__content__home {
     width: 325px;
     margin: 0 auto;
   }
   .header{
     margin-top:10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Architects Daughter', cursive;
    font-size:22px;
  }
  .content{
    text-align: center;
    margin-top:140px;
    font-family: 'Architects Daughter', cursive;
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
  .userOnline{
    color:red;
  }
  .title-One_content,
  .title-two_content{
  font-size:32px;
  margin:0;
  }
  .codigo-sala{
    font-size:65px;
    margin:10px;
  }
  .p-header{
    margin:0;
  }
  .ready{
    width:140px;
    height:35px;
    margin-top:20px;
    font-size:20px;
    border:1px;
    border-radius: 4px;
    background-color:rgba(125, 175, 216, 0.658);

  }
  .ready:hover{
    background-color: rgb(125, 175, 216);
  }
    `
    const button = document.querySelector(".ready")

    button.addEventListener("click",(res)=>{
      Router.go("/instrucciones")
      
   })
   
    this.appendChild(style)
   }
  
}
customElements.define("room-el",Room)
