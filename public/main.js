const socket=io();
let data=''
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
});

socket.emit('user-name',username)
const chatmsg=document.querySelector('.chat-messages')
document.getElementById('chat-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    //console.log('event trigger')
     data=document.getElementById("msg").value
     socket.emit('ok',data);
     //Clearing the input
     document.getElementById("msg").value=''
     document.getElementById("msg").focus()
})
function getUniqueElements(users_all) {
    return users_all.filter((value, index, self) => self.indexOf(value) === index);
}
let i=0;
const users_all=[]
socket.on('show-all-users',users=>{
    users_all.push(...users);
    const uniqueUsers = getUniqueElements(users_all);
    const user_list = document.getElementById('users');
    user_list.innerHTML = uniqueUsers.map(user => `<li>${user}</li>`).join('');
})
    
socket.on('show-msg',msg=>{
    if(msg.username){
    document.querySelector('.chat-messages').innerHTML=
    document.querySelector('.chat-messages').innerHTML+`<div style="display: flex; flex-direction: column; background-color: #4a4a4a; color: #ffffff; padding: 8px; border-radius: 5px; margin: 10px 0; z-index: auto;">
    <p style="font-size: 9px; margin: 0 0 3px;color: #ffcc00;">${msg.username}</p>
    <p style="margin: 0 0 3px;font-size: 13px;">${msg.text}</p>
    <p style="font-size: 8px; margin: 0; text-align: right;">${msg.time}</p></div>`;
    }
    chatmsg.scrollTop=chatmsg.scrollHeight;
})

document.querySelector('.btn').addEventListener('click',()=>{
    socket.emit('disconnected', `${username} has disconnected!`);
users_all = users_all.filter(el => el !== username);
})
