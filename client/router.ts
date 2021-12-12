import {Router} from '@vaadin/router';

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  {path: '/', component: 'home-el'},
  {path: '/instrucciones', component: 'instrucciones-el'},
  {path: '/play', component: 'play-el'},
  {path: '/move', component: 'move-el'},
  {path: '/signup', component: 'signup-el'},
  {path: '/room', component: 'room-el'},
  {path: '/wait', component: 'wait-el'}

]);