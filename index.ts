import *as express from "express"

const app = express()

app.use(express.static("dist"))

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
  res.send({
    enviromtent:process.env.NODE_ENV
  })
})
app.get('/home', (req, res) => {
    
    res.send({
      enviromtent:process.env.NODE_ENV
    })
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})