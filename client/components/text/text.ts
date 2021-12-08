export function initText(){
    customElements.define("text-component" , class extends HTMLElement {
        shadow:ShadowRoot
        constructor(parameters) {
            super()
            this.shadow= this.attachShadow({mode: 'open'});
            
        }
        connectedCallback(){
            this.render()
        }
        render(){
            const h1 = document.createElement("h1");
            const title = this.getAttribute("title")|| "negro";
            h1.className=title
            const style = document.createElement("style")
            style.innerHTML=`
            .verde{
                margin:0;
                text-align:left;
                margin-top:80px;
                font-size:80px;
                color:#009048;
                padding-right:0px;
                font-family: 'Arvo', serif;
              }
              .negro{
                margin:0;
                text-align:center;
                margin-top:40px;
                font-size:40px;
                color:black;
                padding-right:0px;
                font-family: 'Oswald', sans-serif;
              }
            `
            h1.textContent=this.textContent
            this.shadow.appendChild(h1)
            this.shadow.appendChild(style)
        }

    })
}