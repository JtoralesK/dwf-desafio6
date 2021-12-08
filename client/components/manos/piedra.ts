import {state}from"../../state"
export function initPiedra(){
     
    class Button extends HTMLElement {
        shadow:ShadowRoot
        constructor() {
            super()
            this.shadow= this.attachShadow({mode: 'open'});
            this.render()
           
        }
        render(){
            const piedra = require("url:../../../img/piedra.png");
            const style = document.createElement("style");
            const variante = this.getAttribute("variante") || "jugada"
            const img = document.createElement("img");
            img.setAttribute("src", piedra);
            img.className=variante;
            if(this.shadow.firstChild){
                this.shadow.firstChild.remove()
            }
           style.innerHTML=`
          .jugada{
            width:56px;
            height:100px;
         
          }
          .ultimaJugada {
            opacity: 1;
            width: 82px;
            height: 236px;
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
          @media (min-width: 678px) {
            .jugada{
             height:180px;
             width:80px;
            }
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
            
           
            this.shadow.appendChild(img);
            this.shadow.appendChild(style);
        }
        
    }
    customElements.define("piedra-el",Button);
}