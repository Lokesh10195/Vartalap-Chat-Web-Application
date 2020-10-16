const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const chatbox = document.querySelector(".chatbox");


var tone=new Audio('messagetone.mp3');


const append = (message, position) => {
    const positionElement = document.createElement('div');
    positionElement.classList.add(position);
    chatbox.append(positionElement);

    const messageElement = document.createElement('div');

    messageElement.innerText = message;
    messageElement.classList.add('message');
    positionElement.append(messageElement);

    if(position!='right'){
        tone.play();
    }

}



const name = prompt("Enter Your Name to Join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name}  joined the chat`, 'center');
});


socket.on('receive',data=>{
    append(`${data.name} \n ${data.message}`,'left');
});

socket.on('leave',name=>{
    append(`${name}  left the chat`, 'center');
});

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
});


