export function elButton(){
    class Button extends HTMLElement {
        shadow:ShadowRoot
        constructor(parameters) {
            super()
            this.shadow= this.attachShadow({mode: 'open'});
            this.render()
        }
        render(){
            const button = document.createElement("button");
            const style = document.createElement("style")
            button.classList.add("button__home")
            button.textContent=this.textContent
            style.innerHTML=`
            .button__home{
               margin-top:40px;
               width: 100%;
                height:87px;
                background-color:#006CFC;
                border:solid 10px #043472;
                color:white;
                font-size:45px;
                border-radius: 10px;
                font-family: 'Odibee Sans', cursive;
              }
            `
            this.shadow.appendChild(button)
            this.shadow.appendChild(style)
        }
        
    }
    customElements.define("button-el",Button);
}