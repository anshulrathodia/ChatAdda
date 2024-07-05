const express=require('express')
const app=express()
const http=require('http')
app.use(express.static('../public'))
const socketio=require('socket.io')
const server=http.createServer(app)

function getUniqueElements(users_all) {
    return users_all.filter((value, index, self) => self.indexOf(value) === index);
}

// Example usage:


let users_all=[]
const io=socketio(server)
io.on('connection',(socket)=>{
    let user_name=''
    const format=require('../utils/messages.js')
    console.log('connection success')
    socket.on('user-name',(username)=>{  
        users_all.push(username);
        user_name=username;
    })
    socket.on('ok',msg=>{
        console.log(user_name)
        const uniqueUsers = getUniqueElements(users_all);
        console.log(uniqueUsers)
        io.emit('show-all-users',uniqueUsers)
        io.emit('show-msg',format(user_name,msg))
    })
    user_name=''
    socket.on('disconnected',msg=>{
        io.emit('show-msg',format('Bot',msg))
    })

})
server.listen(5000)
