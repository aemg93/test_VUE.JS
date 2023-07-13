import Vue from 'vue';
import VueRouter from 'vue-router';
import CharacterList from '@/views/CharacterList.vue';
import CharacterDetails from '@/views/CharacterDetails.vue';
import MiHome from "@/views/MiHome.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MiHome',
    component: MiHome
  },
  {
    path: '/characterList',
    name: 'characterList',
    component: CharacterList
  },
  {
    path: '/characterDetails',
    name: 'characterDetails',
    component: CharacterDetails
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
