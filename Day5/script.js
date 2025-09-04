const button=document.querySelector('#theme');
const body=document.querySelector('body');

button.addEventListener("click",function(){
    body.classList.toggle('dark-mode');
})
