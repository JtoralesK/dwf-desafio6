type Move = "piedra" | "papel" | "tijera";
type Player = "online" | "local";
type Wins = "userWins" |"computerWins"|"empate"

type Connection = "online"|"offline"
import { getDatabase, ref, onValue } from "firebase/database";
import map from"lodash"
import { rtdb } from "./rtdb";
const API_BASE_URL = "http://localhost:3000"

const state = {
    data: {
      roomId:"",
      playBeggining:"",
      player1:{
        name:"",
        userId:"",
        rtdbId:"",
        connection:"",
        iam:""
      },
      player2:{
        name:"",
        connection:"",
      },
      
      history: {
        userWins: 0,
        onlineUser: 0,
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
    
     console.log("el state ha cambiado",state.getState());
     
      
    },
  
   init(){
     let cs = this.getState()
    
     
    if(!localStorage.game){
      this.setState(cs)
    }else{
      const localData = JSON.parse(localStorage.getItem("game"))
    
      this.setState({...cs,localData}) 
    }
   
   },
  
    subscribe(cb: (any) => any) {
      this.listeners.push(cb);
    },
    setTime(time:string){
      const cs= this.getState()
      cs.playBeggining=time
      this.setState(cs)   
    },
   setName(name:string){
    const cs= this.getState()
     cs.player1.name=name
     this.setState(cs)    
   },
   IdentificadorPlater(iam:Player,callback){
    const cs= this.getState()
    cs.player1.iam=iam
    this.setState(cs)  
    callback()
   },
   setPlayersOnline(connection:String,callback){
    const cs= this.getState()
     cs.player1.connection=connection
     this.setState(cs)   
     callback() 
   },
   setRoom(room:string){
    const cs = this.getState()
    cs.roomId=room
    this.setState(cs)
   },


//sincronizacion con el back
   signUp(callback){
    const cs = this.getState();
   
    if(cs.player1.name){
        fetch(API_BASE_URL +"/signup",{
            method:"post",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({nombre:cs.player1.name})
        }).then((res=>{
            return res.json()
        })).then(resp=>{
          cs.player1.userId=resp.id
           this.setState(cs)
          callback()
            
        })
    }else{
        console.error("no hay un nombre en el state")
        callback(true)
    }
},
auth(callback){
  const cs = this.getState();
 
  if(cs.player1.name){
      fetch(API_BASE_URL +"/auth",{
          method:"post",
          headers:{
              "content-type":"application/json"
          },
          body:JSON.stringify({nombre:cs.player1.name})
      }).then((res=>{
          return res.json()
      })).then(resp=>{
        cs.player1.userId=resp.id
         this.setState(cs)
        callback()
          
      })
  }else{
      console.error("no hay un nombre en el state")
      callback(true)
  }
},
createRoom(callback){
  const cs = this.getState();
 
  if(cs.player1.userId){
      fetch(API_BASE_URL +"/rooms",{
          method:"post",
          headers:{
              "content-type":"application/json"
          },
          body:JSON.stringify({userId:cs.player1.userId})
      }).then((res=>{
          return res.json()
      })).then(resp=>{
        cs.roomId=resp.id
         this.setState(cs)
        callback()
          
      })
  }else{
      console.error("no hay un user id en el state")
      callback(true)
  }
},
connectRtdb(callback){
  const cs = this.getState();
 
      fetch(API_BASE_URL +"/rooms/"+cs.roomId+"?userId="+cs.player1.userId,{
         
      }).then((res=>{
          return res.json()
      })).then(resp=>{
        cs.player1.rtdbId=resp.rtdbID
         this.setState(cs)
        callback()
          
      })
  
},
listenToRoom(){ 
  const cs = this.getState()
 console.log("soy afuera ",cs.rtdbId);
 
    const referdata = ref(rtdb,"/rooms/"+cs.player1.rtdbId);
   
    onValue(referdata, (snapshot)=>{
     const dataDelServer = snapshot.val();
    console.log(dataDelServer.player1,dataDelServer.player2);
    if(cs.player1.iam=="online"){
      cs.player2.name=dataDelServer.player1.name
      cs.player2.connection=dataDelServer.player1.connection
      this.setState(cs)
    }else if(cs.player1.iam=="local"){
      cs.player2.name=dataDelServer.player2.name
      cs.player2.connection=dataDelServer.player2.connection
      this.setState(cs)

    }
})
},
pushDataCreadorPartida(){
  const cs = this.getState()
  const idRltdb =cs.player1.rtdbId
  
  fetch(API_BASE_URL+"/realtime/"+`${idRltdb}`,{
      method:"post",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify(
        {
        name:cs.player1.name,
        connection:cs.player1.connection,

      })
  }
  )
},
pushDataOtroJugador(){
  const cs = this.getState()
  const idRltdb =cs.player1.rtdbId
  
  fetch(API_BASE_URL+"/realtime/ingreso/"+`${idRltdb}`,{
      method:"post",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify({
        name:cs.player1.name,
        connection:cs.player1.connection
       
      })
  }
  )
}
  };


  
  
  export { state, Move };