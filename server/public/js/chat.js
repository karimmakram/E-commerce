const socket =io()
const m = document.querySelector('#message')
const formMessage = document.querySelector('#form')
const sendMessage = document.querySelector('#send-message')
const shereLocation = document.querySelector('#shere-location')
const messages = document.querySelector('#messages')


// template
// const template = document.querySelector('#message-template').innerHTML

//get data from url
// if install qs libs
// const {username,room} =Qs.parse(location.serach,{ignoreQueryPrefix:true})
const queryString = location.href.split('?')
const obj = queryString[1].split('&')
const username = obj[0].split('=')[1]
const room = obj[1].split('=')[1]
console.log(`${username} && ${room}`);

const autoScrol = ()=>{
    const newMessage = messages.lastElementChild
    const newMessageHeight = newMessage.clientHeight + 16
    const visableHeight = messages.clientHeight
    const contenerHeight =messages.scrollHeight
    const scrolloffset = messages.scrollTop + visableHeight

    if(contenerHeight - newMessageHeight<= scrolloffset){
        messages.scrollTop = messages.scrollHeight
    }
}

socket.emit('join',{username,room},(ErrorMessage)=>{
    if(ErrorMessage){
        alert(ErrorMessage)
        location.href ='/'
    }
})
socket.on('welcome',(message)=>{
    messages.insertAdjacentHTML('beforeend',`<div style="border: dotted #777;text-align:center;">
    <p>${message.text}</p>
    </div>`)
})
socket.on('message',(message)=>{
    console.log(message);
    // if install mustache libs 
    // const html =Mushache.render(template,{message})
    if(message.username === username || message.username ==='Admin'){
        messages.insertAdjacentHTML('beforeend',`
    <div class="message">
        <p>
            <span class="message__name">${message.username}</span>
            <span class="message__meta">${message.createAt}</span>
        </p>
        <p style="border: solid #777;border-radius: 40px;padding: 10px;color: #000;">${message.text}</p>
    </div>
    `)
    autoScrol()
    }else{
        messages.insertAdjacentHTML('beforeend',`
    <div style="background:#333;padding:5px;text-align: right;margin-top:5px; color:#fff">
        <p>
            <span class="message__name" >${message.username}</span>
            <span class="message__meta" >${message.createAt}</span>
        </p>
        <p style="border: solid #777;border-radius: 40px;padding:10px;">${message.text}</p>
    </div>
    `)
    autoScrol()
    }
    
})

socket.on('locationMessage',(url)=>{
    console.log(url.text);
    messages.insertAdjacentHTML('beforeend',
    `<div class="message>
    <p>
        <span class="message__name">${url.username}</span>
        <span class="message__meta">${url.createAt}</span>
    </p>
    <a href=${url.text} target="_blank">Location</a>
    </div>`)
    autoScrol()
})

socket.on('roomData',({room,users})=>{
    console.log(users);
    let s = ''
    users.forEach(user => {
        s = s+`<li>${user.username}</li>`
    });
    document.querySelector('#sidebar').textContent =''
    document.querySelector('#sidebar').insertAdjacentHTML('beforeend',`<h2>${room}</h2>
    <h4>Users</h4>
    <ul class="users">
            ${s}
    </ul>`)
})

formMessage.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(m.value == '')
        return console.log(`can't send empty message`);
    else {
        sendMessage.setAttribute('disabled','disabled')    
        socket.emit('sendMessage',m.value,(error)=>{
            sendMessage.removeAttribute('disabled')
            m.value = ''
            m.focus()
            if(error){
                console.log(error);
            }
            else{
                console.log('Message Delived');    
            }
        })
        
    }
})


shereLocation.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('browser not support geoLocation')
    }
    shereLocation.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
        const location = {
            longitude :position.coords.longitude,
            latitude : position.coords.latitude
        }
        socket.emit('SendLocation',location,()=>{
            shereLocation.removeAttribute('disabled')
            console.log('shere Location Done!');
        })
    })
})