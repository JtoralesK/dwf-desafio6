type Move = "piedra" | "papel" | "tijera";
type Player = "online" | "local";

type Connection = "online"|"offline"
import { getDatabase, ref, onValue } from "firebase/database";
import map from"lodash"
import { rtdb } from "./rtdb";
const API_BASE_URL= process.env.DB_HOST

const state = {
    data: {
      partida:"sin comenzar",
      playBeggining:"",
      roomId:"",
      sesion:"desactivada",
      player1:{
        name:"",
        userId:"",
        rtdbId:"",
        connection:"",
        iam:"",
        move:"",
        ready:false
      },
      player2:{
        name:"",
        connection:"",
        move:"",
        iam:"",
        ready:false


      },
      
      registro: {
        player1Wins: 0,
        player2Wins: 0,
        empate:0,
        ultimaJugada:"",
      },
      error:{
        usuario:"no existe",//error cuando ya existe un usuario con el mismo nombre
        sala:"",//error cuando se quiere entrar a una sala donde ya hay dos jugadores
        datosErroneos:false
      }
  
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
  
   init(time:string){

     const cs= this.getState()
      cs.playBeggining=time
     
    if(!localStorage.game){
      this.setState(cs)
    }else{
      const localData = JSON.parse(localStorage.getItem("game"))
    
      this.setState({...cs,localData}) 
    }
   
   },
   setHora(time:string){
    const cs= this.getState()
    cs.playBeggining=time
    this.setState(cs) 
   },
  
    subscribe(cb: (any) => any) {
      this.listeners.push(cb);
    },
   setName(name:string){
    const cs= this.getState()
     cs.player1.name=name
     this.setState(cs)    
   },
   setPartida(){
    const cs= this.getState()
     cs.partida="comenzo"
     cs.sesion="activada"
     this.setState(cs)
      
   },
   setError(){
    const cs= this.getState()
     cs.error.usuario="no existe"
     this.setState(cs)
      
   },
   
   setErrorRoom(callback){
    const cs= this.getState()
     cs.error.datosErroneos=false
     cs.player1.name=""
     cs.player1.userId=""
     cs.roomId=""
     this.setState(cs)
     callback()
      
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
   setPlayer2Local(iam:string){
    const cs= this.getState()
    cs.player2.iam=iam
    this.setState(cs)   
   },
   setPlayer2Online(iam:string){
    const cs= this.getState()
    cs.player2.iam=iam
    this.setState(cs)   
   },
   setPlay(callback){
    const cs= this.getState()
     cs.player1.move=""
     cs.player2.move=""
     cs.player1.connection=""
     cs.player2.connection=""
     cs.partida="sin comenzar"
     
     this.setState(cs)   
     callback()
   },
   setRoom(room:string){
    const cs = this.getState()
    cs.roomId=room
    this.setState(cs)
   },
   setMove(move:Move,callback){
    const cs = this.getState()
    cs.player1.move=move
    this.setState(cs)
    callback()
   },
   
   whoWins(player1:Move, player2: Move){
    
   const playerlocal = [
    player1==="piedra" && player2==="tijera",
    player1==="papel" && player2==="piedra",
    player1==="tijera" && player2==="papel"
    ].includes(true);
    const playeronline = [
      player2==="piedra" && player1==="tijera",
      player2==="papel" && player1==="piedra",
      player2==="tijera" && player1==="papel"
      ].includes(true);
      const empate = [
        player1==="piedra" && player2==="piedra",
        player1==="papel" && player2==="papel",
        player1==="tijera" && player2==="tijera"
        ].includes(true)

        const cs = this.getState();

      if(playerlocal){
        cs.registro.ultimaJugada="gano el player1"
       return "gano el player1"

        
      } if(playeronline){
        cs.registro.ultimaJugada="gano el player2"
        return "gano el player2"

        
      }  if(empate){
        cs.registro.ultimaJugada="empate"
        return "empate"

      } 
      this.setState(cs)
  },
 
  pushWhoWins(who:string){
    const cs = this.getState()
    
    if(who=="gano el player1"){
      cs.registro.player1Wins+= 1
    
    } if(who=="gano el player2"){
      cs.registro.player2Wins+= 1
 
    }  if(who=="empate"){
      cs.registro.empate+= 1
    } 
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
          if(resp.new==true){
            cs.player1.userId=resp.id
            this.setState(cs)
           callback()
            
          }else if(resp.new==false){
            cs.error.usuario="ya existe"
            this.setState(cs)
            callback()

          }
          
            
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
verificarRoom(callback){
  
  const cs = this.getState();
 
      fetch(API_BASE_URL +"/rooms/player2",{
        method:"post",
          headers:{
              "content-type":"application/json"
          },
          body:JSON.stringify({
            roomId:cs.roomId
          })
      }).then((data)=>{return data.json()}).then((respuesta)=>{
        if(respuesta.error==false){
          cs.error.sala=respuesta.sala
          this.setState(cs)
          callback() 
        }else{
          cs.error.datosErroneos=respuesta.error
          this.setState(cs)
          callback() 
        }
         
        
        }
      )

  
},
comunicarFirabaseP2(callback){
  
  const cs = this.getState();
 
      fetch(API_BASE_URL +"/rooms/signup",{
        method:"post",
          headers:{
              "content-type":"application/json"
          },
          body:JSON.stringify({
            roomId:cs.roomId,
            userId:cs.player1.userId
          })
      }).then((data)=>{return data.json()}).then((respuesta)=>{
        cs.error.sala=respuesta.sala
          this.setState(cs)
          callback() 
        
        }
      )

  
},
listenToRoom(){ 
  console.log("estoy escuchando rtdb");
  
  const cs = this.getState()
 
    const referdata = ref(rtdb,"/rooms/"+cs.player1.rtdbId);
   
    onValue(referdata, (snapshot)=>{
     const dataDelServer = snapshot.val();
    if(cs.player1.iam=="online"){
      cs.player2.name=dataDelServer.player1.name
      cs.player2.connection=dataDelServer.player1.connection
      cs.player2.move=dataDelServer.player1.move
      cs.player2.ready=dataDelServer.player1.ready


      this.setState(cs)
    }else if(cs.player1.iam=="local"){
      cs.player2.name=dataDelServer.player2.name
      cs.player2.connection=dataDelServer.player2.connection
      cs.player2.move=dataDelServer.player2.move
      cs.player2.ready=dataDelServer.player2.ready


      this.setState(cs)

    }
})
},
pushDataCreadorPartida(callback){

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
  this.listenToRoom()
  callback()
},
pushDataOtroJugador(callback){

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
  this.listenToRoom()
  callback()
},

pushMoveCreadorPartida(){
  
  const cs = this.getState()
  const idRltdb =cs.player1.rtdbId
  
  fetch(API_BASE_URL+"/realtime/"+`${idRltdb}`,{
      method:"post",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify(
        {
        move:cs.player1.move,

      })
  }
  )
},
pushMoveOtroJugador(){

  const cs = this.getState()
  const idRltdb =cs.player1.rtdbId
  
  fetch(API_BASE_URL+"/realtime/ingreso/"+`${idRltdb}`,{
      method:"post",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify({
        move:cs.player1.move,
       
      })
  }
  )
},eleminarRtdbDataPlayers(){
  const cs = this.getState()
  const idRltdb =cs.player1.rtdbId
  
  fetch(API_BASE_URL+"/realtime/"+`${idRltdb}`,{
      method:"post",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify({
        connection:"",
        move:"",


       
      })
  }
  )
  fetch(API_BASE_URL+"/realtime/ingreso/"+`${idRltdb}`,{
    method:"post",
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify({
     connection:"",
      move:"",


     
    })
})
  
},
user1ready(){
  const cs = this.getState()
  const idRltdb =cs.player1.rtdbId
  
  fetch(API_BASE_URL+"/realtime/"+`${idRltdb}`,{
      method:"post",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify({
        ready:true

      })
  }
  )
 cs.player1.ready=true
this.setState(cs)


},
user2ready(){
  const cs = this.getState()
  const idRltdb =cs.player1.rtdbId
  
  fetch(API_BASE_URL+"/realtime/ingreso/"+`${idRltdb}`,{
    method:"post",
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify({
     connection:"",
      move:"",
      ready:true


     
    })
})
cs.player1.ready=true
this.setState(cs)


},eleminarRtdbDataReady(){
  const cs = this.getState()
  const idRltdb =cs.player1.rtdbId
  
  fetch(API_BASE_URL+"/realtime/"+`${idRltdb}`,{
      method:"post",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify({
        ready:false


       
      })
  }
  )
  fetch(API_BASE_URL+"/realtime/ingreso/"+`${idRltdb}`,{
    method:"post",
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify({
      ready:false

     
    })
})
cs.player1.ready=false
cs.player2.ready=false
this.setState(cs)
},

  };


  
  
  export { state, Move };