type Move = "piedra" | "papel" | "tijera";
type Player = "userMove" | "computerMove";
type Wins = "userWins" |"computerWins"|"empate"

const state = {
    data: {
      currentGame: {
        computerMove: "none",
        userMove: "none",
      },
      history: {
        userWins: 0,
        computerWins: 0,
        empate:0,
        ultimajugada:"none"
      },
  
    },
    listeners: [],
    getState() {
      return this.data;
    },
  
    setState(newState) {
      this.data = newState;
     
      for (const cb of this.listeners) {
        cb();
      }
      localStorage.setItem("game", JSON.stringify(newState));
    
     
      
    },
  
   init(){
     let data = this.getState()
     console.log(data,localStorage.game);
     
    if(!localStorage.game){
      this.setState(data)
    }else{
      const localData = JSON.parse(localStorage.getItem("game"))
    
      this.setState({...data,localData}) 
    }
   
   },
  
    subscribe(cb: (any) => any) {
      this.listeners.push(cb);
    },
    restartGame() {
      const currentState = this.getState() ;
  
      currentState.currentGame.computerMove = "none";
      currentState.currentGame.userMove = "none";
  
      this.setState(currentState);
    },
  
    setMove(player: Player, move: Move) {
      const currentState = this.getState();
      currentState["currentGame"][player] = move;
     
      this.setState(currentState);
    },
    whoWins(computerMove:Move, userMove: Move){
    
      
      const data = this.getState();
     const computerWins = [
      computerMove==="piedra" && userMove==="tijera",
      computerMove==="papel" && userMove==="piedra",
      computerMove==="tijera" && userMove==="papel"
      ].includes(true);
      const userWins = [
        userMove==="piedra" && computerMove==="tijera",
        userMove==="papel" && computerMove==="piedra",
        userMove==="tijera" && computerMove==="papel"
        ].includes(true);
        const empate = [
          userMove==="piedra" && computerMove==="piedra",
          userMove==="papel" && computerMove==="papel",
          userMove==="tijera" && computerMove==="tijera"
          ].includes(true)
     
        if(computerWins){
          return "gano la compu"
        
          
        } if(userWins){
          return "gano el usuario"
       
          
        }  if(empate){
          return "empate"
      
          
        } 
        this.setState(data)
        
        
        
       
    },
    pushWins(who){
     
      

      let data = this.getState()
     
      if(who=="gano la compu"){
       data.history.computerWins+=1
       data.history.ultimajugada="gano la compu"
  
     }
      if(who=="gano el usuario"){
      data.history.userWins+=1
      data.history.ultimajugada="gano el usuario"
    
    }
      if(who=="empate"){
      data.history.empate+=1
      data.history.ultimajugada="empate"
     
    }
    
     
    
    
    this.setState(data)
    },
   
    
    getCurrentGame() {
      const currentState = this.getState();
      return currentState.currentGame
    },
  
  
  };
  
  export { state, Move };