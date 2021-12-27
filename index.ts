import *as express from "express"
import {firestore,rtdb} from"./db"
import *as cors from"cors"
import { nanoid } from "nanoid"

const app = express()
console.log("hola",process.env.NODE_ENV);

const path = require('path')
app.use(cors())
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'dist')))

const port = process.env.PORT || 3000

const userCollection = firestore.collection("users") //collection de firebase =>USERS
const roomsCollection = firestore.collection("rooms") //collection de firebase =>Rooms

app.post("/signup",(req,res)=>{
 
  const nombre = req.body.nombre
  
  userCollection.where("nombre","==",nombre).get().then((resName)=>{
    if(resName.empty){
      userCollection.add({
        nombre
      }).then((userId)=>{
        res.json({
          id:userId.id,
          new:true
        })
      })
    }else{
      res.status(404).json({new:false})
    }
  })

  
})

app.post("/rooms/player2",(req,res)=>{
  const {roomId}= req.body
const ruta = roomsCollection.doc(roomId.toString())
ruta.get().then((snap)=>{
  if(snap.exists){
    const data = snap.data()
    if(data.sala=="completa"){      
      res.json({error:false,sala:data.sala})
    }else {      
      res.json({error:false,sala:data.sala})
    }
  }else{ res.json({error:true})}
 
})
 
})
app.post("/rooms/signup",(req,res)=>{
  const {userId} = req.body 
  const {roomId}= req.body
const ruta = roomsCollection.doc(roomId.toString())
ruta.get().then((snap)=>{
    const data = snap.data()
    if(data.sala=="completa"){      
      res.json(data)
    }else if(data.sala=="vacia"){      
      ruta.update({
        player2:userId,
        sala:"completa"
      })
      res.json(data)
  
    }
 
})
 
})

app.post("/rooms", (req, res) => {
  const {userId} = req.body
 
  const roomRef=  rtdb.ref("rooms/"+ nanoid())
  userCollection.doc(userId.toString()).get().then(snap=>{
    if(snap.exists){
  
     roomRef.set({
      owner:userId,
      player1:{
        name:"",
        connection:"",
        move:"",
        ready:false

      },
      player2:{
        name:"",
        connection:"",
        move:"",
        ready:false



      }
      
    }).then(respuesta=>{
     const lognId=roomRef.key
   const shortID = Math.floor(10000+Math.random() * 9999)
   roomsCollection.doc(shortID.toString()).set({
       rtdbID:lognId,
       player1:userId,
       sala:"vacia"

     }).then(()=>{
       res.json({
         id:shortID.toString()
        })
     })
     
    })
    }else{
      res.status(401).json({
        message:"no existiss "
      })
    }
  })
   
  
 })

 app.get("/rooms/:roomId",(req,res)=>{
  const {userId}= req.query
  const {roomId}= req.params

  userCollection.doc(userId.toString()).get().then(snap=>{
    if(snap.exists){
  
    roomsCollection.doc(roomId).get().then((snapp)=>{
      const data = snapp.data()
      res.json(data)
    })
    }else{
      res.status(401).json({error:true})
    }
  })
 
})
app.post('/realtime/:id', (req, res) => {
  const {id}= req.params
  
 const roomRef = rtdb.ref("/rooms/"+id+"/player1")
 roomRef.update(req.body,function(err){
  console.log(err);
   
  res.json("okkkk")})
 
  })
  app.post('/realtime/ingreso/:id', (req, res) => {
    const {id}= req.params
    
   const roomRef = rtdb.ref("/rooms/"+id+"/player2")
   roomRef.update(req.body,function(err){
    console.log(err);
     
    res.json("okkkk")})
   
    })






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})