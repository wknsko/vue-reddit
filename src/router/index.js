import { createWebHistory, createRouter } from "vue-router";
import Random from '../views/RandomTIFU.vue';
import Top from '../views/TopStories.vue';

const routes = [
    { path: "/random", name: 'Random', component: Random },
    { path: "/top", name: 'Top', component: Top }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router