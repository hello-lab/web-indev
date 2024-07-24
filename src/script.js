
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Handle Login Form Submission
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        try {
            const response = await fetch('login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password  }),
            });

            if (response.ok) {
                // Redirect to profile or dashboard page
               cookie=response.token
            } else {
                // Handle error
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Handle Signup Form Submission
    signupForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const institute = document.getElementById('institute').value;

        try {
            const response = await fetch('signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password,institute }),
            });

            if (response.ok) {
                // Redirect to login page after successful signup
                window.location.href = '/';
            } else {
                // Handle error
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

async function module(m){
    
    try {
        const response = await fetch(m, {
            method: 'GET'
          
          
        });

        const reader = response.body.getReader();
        const stream = new ReadableStream({
            start(controller) {
                function push() {
                    reader.read().then(({ done, value }) => {
                        if (done) {
                            controller.close();
                            return;
                        }
                        controller.enqueue(value);
                        push();
                    }).catch(error => {
                        console.error('Error reading stream:', error);
                        controller.error(error);
                    });
                }
                push();
            }
        });
        const textDecoder = new TextDecoder('utf-8');
const streamReader = stream.getReader();
let receivedText = '';

streamReader.read().then(function processText({ done, value }) {
    if (done) {
        console.log('Stream complete:', receivedText);
        document.getElementById("main").innerHTML=receivedText
        return;
    }
    receivedText += textDecoder.decode(value, { stream: true });
   
    return streamReader.read().then(processText);
});
    } catch (error) {
        console.error('Error:', error);
    }
}
function loginfrm(){
    document.getElementById('loginForm').className='hidden';
    document.getElementById('signupForm').className='';
}
function signupfrm(){
    document.getElementById('loginForm').className='';
    document.getElementById('signupForm').className='hidden'; 
}

function fixs(){
    try{
        document.getElementById("earth2").style.top=document.getElementById("earth1").style.top
    }
    catch(e){}
    try{
        document.getElementById("footer").style.bottom=0
    }
    catch(e){

    }}
function typewriter(txt,div){
    i=0
    speed=200
const l=document.getElementById(div).innerHTML.length
if(l!=0)
{ 
}    
else{
type()
}

    function type() {
        speed=50
        
        if (i < txt.length) {
          document.getElementById(div).innerHTML += txt.charAt(i);
          i+=1;
          setTimeout(type, speed);
        }
      }
      
}










let hun1=false
let hun2=false
let hun3=false
let hun4=false
let hun5=false
let hun6=false

window.addEventListener('scroll', function() {
    // Your scroll event handler code here
    
    // You can access the scroll position using window.scrollY or document.documentElement.scrollTop
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;
    console.log('Scroll Position:', scrollPosition);
    if (scrollPosition<=600 && !hun1){
          typewriter("you see this yellow line","textdiv")
          hun1=true
    }
    else if (scrollPosition<=1000 && !hun1){
        typewriter("This ")
        hun1=true
  } 
});









function newel(){


const para = document.createElement("div");
para.style.position="absolute"
para.style.top=0
para.style.border="solid"
para.style.height="1vh"
document.getElementById("river").appendChild(para);
}