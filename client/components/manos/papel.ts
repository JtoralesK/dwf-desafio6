export function initPapel(){
     
    class Button extends HTMLElement {
        shadow:ShadowRoot
        constructor() {
            super()
            this.shadow= this.attachShadow({mode: 'open'});
            this.render()
        }
        render(){
            const papel = require("url:../../../img/papel.png");
            const variante = this.getAttribute("variante") || "jugada"
            const img = document.createElement("img");
            img.setAttribute("src", papel);
            img.className=variante;



            const style = document.createElement("style");
           
            
           style.innerHTML=`
          .jugada{
            width:56px;
            height:100px;
         
          }
          @media (min-width: 678px) {
            .jugada{
             height:180px;
             width:80px;
            }
           }
          .movimiento {
            width: 72px;
            height: 216px;
            opacity: 0.5;
          }
          .movimiento:hover {
            opacity: 1;
            width: 82px;
            height: 236px;
          }
          .ultimaJugada {
            opacity: 1;
            width: 82px;
            height: 236px;
          }
          
           .elegida{
            width:170px;
            height:325px;
            opacity: 1;
          }
          .variantePc{
            width:170px;
            height:325px;
            opacity: 1;
            transform: rotate(180deg);
          }
          .button{
              border:0px;
              background-color: transparent;
              margin:0 15px 0;
          }
           `
            img.innerHTML=`
            <button  class="button  "><img class="jugada" src="${papel}"</button>  
            `
            const button:HTMLSelectElement = img.querySelector(".button");
           
            this.shadow.appendChild(img);
            this.shadow.appendChild(style);
        }
        
    }
    customElements.define("papel-el",Button);
}