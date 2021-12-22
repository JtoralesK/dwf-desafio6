import {Router} from"@vaadin/router"
import {state} from"../../state"
type Rooms = string 
type Names =string
type Ready = string

class Wait extends HTMLElement{
  room:Rooms=""
  player1Name:""
  player2Name:""
  player1Connection:""
  player2Connection:""
  player1Point:number | 0
  player2Point:number | 0


    connectedCallback(){
      const cs =state.getState()      
     const firstName = cs.player1.name
     const room = cs.roomId
     this.room=room    
     this.player1Name=firstName
     if(cs.player1.iam=="local"){
      this.player1Point=cs.registro.player1Wins 
      this.player2Point=cs.registro.player2Wins 
    }else if(cs.player1.iam=="online"){
      this.player1Point=cs.registro.player2Wins 
      this.player2Point=cs.registro.player1Wins 
    }


     this.render()
      state.subscribe(()=>{
        const cs =state.getState()   
        this.player2Name=cs.player2.name || "player2" 
       
        const jugadas=[cs.player1,cs.player2]
        
        jugadas.map((r)=>{
          
          if(r.iam=="local"){
            this.player1Connection=r.connection
            
          } if(r.iam=="online"){
            this.player2Connection=r.connection
          }
        })
      
        this.render()
      })
     

    }
   render(){
     const cs = state.getState()
     

     const juegoStart= cs.playBeggining
     if(juegoStart==this.player1Connection && this.player2Connection==juegoStart && cs.partida=="sin comenzar" ){ 

     setTimeout(() => {
      Router.go("/play")
     }, 50);
   
      state.setPartida()

      
    }
   
       const style = document.createElement("style")

      this.innerHTML=`
      <div class="container__home">
         <div class="container__content__home">
             
         <div class="header">
        <div class="marcador">
        <p class="userLocal p-header">${this.player1Name}:${this.player1Point}</p>
        <p class="userOnline  p-header">${this.player2Name}:${this.player2Point}</p>

        </div>
         <div class="sala">
         <p class="sala  p-header">Sala</>
         <p class="codigo  p-header">${this.room}</>

         </div>
         </div>

         <section>
         <div class="content">
         <div class="circle">
         <div class="loader"></div>
          </div>  
         <h2 class="title-One_content">Esperando a que ${ this.player2Name} presione ¡Jugar!...</h2>

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
  .circle{
    text-align: right;
    margin-left:45%

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
    
    `
    
   
    this.appendChild(style)
   }
  
}
customElements.define("wait-el",Wait)
