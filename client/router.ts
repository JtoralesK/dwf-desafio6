import{home} from"./pages/home/home";
import { instru } from "./pages/instrucciones/instru";
import { play } from "./pages/play/play";
import { move } from "./pages/move/move";
import { results } from "./pages/results/results";

    const routes=[
        {
            path:/\/desafio-final-dwf-5/,
            page: home
        },
         {
            path:/\/desafio-final-dwf-5\/instrucciones/,
            page: instru
        },
        {
            path:/\/desafio-final-dwf-5\/play/,
            page: play
        },
        {
            path:/\/desafio-final-dwf-5\/move/,
            page: move
        },
        {
            path:/\/desafio-final-dwf-5\/results/,
            page: results
        }
        
    ]
    
    
    
export function initRouter(container:Element){    
     function goTo(path){
        history.pushState({}, "", path);
        handleRoute(path)
    }
    function handleRoute(route){
        for (const itera of routes) {
           if( itera.path.test(route)){
               const el = itera.page({goTo:goTo})
               
              if(container.firstChild){
                  container.firstChild.remove()
              }
               container.appendChild(el)
           }
        }
        

    }
    if(location.host.includes("github.io")){
        goTo("/desafio-final-dwf-5")
        console.log("hola");
        
    }
     if(location.pathname=="/"){
        goTo("/desafio-final-dwf-5")
        console.log("hola");
        
    }
   
   else{
        handleRoute(location.pathname)
    }
    window.onpopstate = function () {
        handleRoute(location.pathname);
      };
}
