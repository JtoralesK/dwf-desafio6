    class Button extends HTMLElement {
        connectedCallback(){
            this.render()
       }
        render(){
            const shadow = this.attachShadow({mode: 'open'});
            const button = document.createElement("button")
            const style = document.createElement("style")
            button.className="button__home"
            button.textContent=this.textContent
            style.innerHTML=`
            .button__home{
               margin-top:20px;
               width: 100%;
                height:82px;
                background-color:#006CFC;
                border:solid 10px #043472;
                color:white;
                font-size:30px;
                border-radius: 10px;
                font-family: 'Odibee Sans', cursive;
              }
            `
            shadow.appendChild(button)
            button.appendChild(style)
        }
        
    }
    customElements.define("button-el",Button);
