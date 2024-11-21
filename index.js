const express = require('express')

const app = express()

const http = require('http')

const path = require('path')


const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)


app.set('view engine' , "ejs")
app.use(express.static(path.join(__dirname , "public")))




server.listen(3000 , (req , res) => {
    console.log("server started at port 3000")
})

app.get('/' , (req , res) => {
    
    res.render("index")
    
    
    
})

io.on('connection' , (socket) => {
    
    socket.on("send-location" , (data) => {
        io.emit("receive-location" , { id : socket.id , ...data})
    })
    socket.on("disconnect" , () => {
        io.emit("user-disconnected"  , socket.id)
    })

    console.log("io connection in established")
})