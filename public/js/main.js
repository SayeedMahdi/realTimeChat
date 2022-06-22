const chatForm = document.getElementById("chat-form");
const chatMessage = document.querySelector(".chat-messages");

//Get username and room
const {username, room} = Qs.parse(location.search,{
  ignoreQueryPrefix:true
});
console.log(username, room);
const socket = io();
socket.on("message", (message) => {
  outputMessage(message);

  //scroll messages
  chatMessage.scrollTop = chatMessage.scrollHeight;
});
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = document.getElementById("msg");
  console.log(msg);
  socket.emit("new_message", msg.value);
  //clear the input value of input
  e.target.elements.msg.value ="";
  e.target.elements.msg.focus()

  
});

//Output message to Dom
function outputMessage(message){
  console.log(message);
  const div = document.createElement("div");
  div.classList.add('message');
  div.innerHTML = `<p class="meta"> ${message.user} <span> ${message.time} </span></p>
  <p class="text"> 
  ${message.message } </p> `;
  document.querySelector(".chat-messages").appendChild(div);
}
 

function toggleText(){
  var elms = document.getElementsByClassName("chat-container");
  Array.from(elms).forEach((x) => {
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  })

}