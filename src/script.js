
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
    speed=30
const l=document.getElementById(div).innerHTML.length
if(l!=0)
{ 
}    
else{
type()
}

    function type() {
        speed=30
        
        if (i < txt.length) {
          document.getElementById(div).innerHTML += txt.charAt(i);
          i+=1;
          setTimeout(type, speed);
        }
      }
      
}


function red(k){
    location.href='/'
    module('getinvolved')
}







let hun1=false
let hun2=false
let hun3=false
let hun4=false
let hun5=false
let hun6=false

window.addEventListener('scroll', function() {
    // Your scroll event handler code here
    let o= document.querySelector("#main > div > div.px-10.w-xl > img").offsetTop
    // You can access the scroll position using window.scrollY or document.documentElement.scrollTop
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;
    console.log('Scroll Position:', scrollPosition);
    if (scrollPosition>=1 && scrollPosition<=600 && !hun1){
        hun1=true  
        typewriter("Did you know around 189 million people in India are undernourished.","textdiv1")
          
    }
    else if (scrollPosition<800 && scrollPosition>=700 && !hun2){
        hun2=true
        typewriter("The Food and Agriculture Organization (FAO) reports that food insecurity affects millions of people in India, with many struggling to access sufficient and nutritious food.","textdiv2")
        
  } 
  else if (scrollPosition<=2000 && scrollPosition>=1900 && !hun3){
    console.log('kys')
    hun3=true
    typewriter("The World Bank estimates that around 21% of India's population lives below the national poverty line, which significantly impacts their access to food.","textdiv3")
   
}
else if (scrollPosition<=3000 && scrollPosition>=2900 && !hun4){
    hun4=true
    typewriter("India has one of the highest rates of child malnutrition in the world, with around 38% of children under five being stunted due to inadequate nutrition.","textdiv4")
    
}  
else if (scrollPosition<=4200 && scrollPosition>=4100 && !hun5){
    hun5=true
    typewriter("Approximately 40% of food produced in India is wasted due to inefficiencies in the supply chain, which could otherwise be redirected to help those in need.","textdiv5")
    hun6=true
}  
else if (scrollPosition+100>o && scrollPosition-100<o){
    location.href+="home1";
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