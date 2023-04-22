import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Trainers from './views/Trainers.vue';
import SignUnSignIn from './views/SignUpSignIn.vue';
import UserRequest from './views/UserRequest.vue';
import UserPlan from './views/UserPlan.vue';
import UserPlanExecution from './views/UserPlanExecution.vue';
import UserProfile from './views/UserProfile.vue';
import User from './views/User.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/trainers',
      name: 'trainers',
      component: Trainers,
    },
    {
      path: '/user-access',
      name: 'user-access',
      component: SignUnSignIn,
    },
	{
      path: '/userRequest',
      name: 'userRequest',
      component: UserRequest,
    },
	{
      path: '/userPlan',
      name: 'userPlan',
      component: UserPlan,
    },
	{
      path: '/userPlanExecution',
      name: 'userPlanExecution',
      component: UserPlanExecution,
    },
	{
      path: '/userProfile',
      name: 'userProfile',
      component: UserProfile,
    },
	{
      path: '/user',
      name: 'user',
      component: User,
    },
  ],
});
