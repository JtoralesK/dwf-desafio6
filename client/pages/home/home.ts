import "./home.css"

 export function home(params){
    const div = document.createElement("div");
    div.classList.add("page-home")
    
    div.innerHTML=`
    <div class="container__home">
    <div class="container__content__home">
    <h1 class="title__home">Piedra Papel o Tijera</h1>
   <div class="div__home">
   <button-el class="button__home">Empezar</button-el>
   </div>
    <div class="container__manos">
    <tijera-el class="tijera__home manos" ></tijera-el>
    <piedra-el class="piedra__home manos" ></piedra-el>
    <papel-el class="papel__home manos"></papel-el>
    </div>
    </div>  
    </div>
   
    `
    const button = div.querySelector(".button__home");
    button.addEventListener("click",()=>{
      params.goTo("/desafio-final-dwf-5/instrucciones")
  
    })
    
 
   return div;
 }

 


