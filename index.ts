import *as express from "express"
import {firestore,rtdb} from"./db"
import *as cors from"cors"
import { nanoid } from "nanoid"

const app = express()
console.log("hola",process.env.NODE_ENV);

app.use(cors())
app.use(express.json())
app.use(express.static("dist"))

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
app.post("/auth",(req,res)=>{
 
  const nombre = req.body.nombre
  
  userCollection.where("nombre","==",nombre).get().then((resName)=>{
    if(resName.empty){
      res.status(404).json({
        message:"user not found"
      })
    }else{
      res.json({
        Id:resName.docs[0].id
      })
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
        move:""

      },
      player2:{
        name:"",
        connection:"",
        move:""


      }
    }).then(respuesta=>{
     const lognId=roomRef.key
   const shortID = Math.floor(10000+Math.random() * 9999)
   roomsCollection.doc(shortID.toString()).set({
       rtdbID:lognId
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
      console.log(data);
      
      res.json(data)
    })
    }else{
      res.status(401).json({
        message:"no existis "
      })
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