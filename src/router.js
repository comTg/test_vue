import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Regist from "./views/Regist.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: Home
    },{
      path: "/home",
      name: "home",
      component: Home
    },{
      path: "/register",
      name: "register",
      component: Regist
    },{
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});
