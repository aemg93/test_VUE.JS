import Vue from 'vue'
import VueRouter from 'vue-router'
import characterInformation from "@/views/CharacterList.vue";
import CharacterDetails from '@/views/CharacterDetails.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'character information',
    component: characterInformation
  },
  {
    path: '/CharacterList.vue',
    name: 'characterList',
    component: () => import('../views/CharacterList.vue')
  },
  {
    path: '/character/:id',
    name: 'characterDetails',
    component: CharacterDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
