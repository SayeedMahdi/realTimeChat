const chatForm = document.getElementById("chat-form");
const chatMessage = document.querySelector(".chat-messages");


const socket = io();
socket.on("message", (message) => {
  outputMessage(message);

  //scroll messages
  chatMessage.scrollTop = chatMessage.scrollHeight;
});
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = document.getElementById("msg");
  console.log(msg.value);
  socket.emit("new_message", msg.value);
  
});

//Output message to Dom
function outputMessage(message){
  const div = document.createElement("div");
  div.classList.add('message');
  div.innerHTML = `<p class="meta"> Mahdi <span> 9:12pm </span></p>
  <p class="text"> 
  ${message} </p> `;
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