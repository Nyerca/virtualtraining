<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="nav-link" to="/">Home</b-nav-item>
          <b-nav-item class="nav-link" to="/about">About</b-nav-item>
          <b-nav-item class="nav-link" to="/trainers">Trainers</b-nav-item>
		  <b-nav-item class="nav-link" to="/userRequest">UserRequest</b-nav-item>
		  <b-nav-item class="nav-link" to="/userPlan">UserPlan</b-nav-item>
		  <b-nav-item class="nav-link" to="/userPlanExecution">UserPlanExecution</b-nav-item>
		  <b-nav-item class="nav-link" to="/userProfile">UserProfile</b-nav-item>
		  <b-nav-item class="nav-link" to="/user">User</b-nav-item>
          <b-nav-item class="nav-link" v-if="this.$cookies.isKey('userIsLogged') == false" to="/user-access">User access</b-nav-item>
          <Logout v-else/>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>


<script lang='ts'>
    import { Component, Vue } from 'vue-property-decorator';
    import Logout from '@/components/Logout.vue';

    @Component({
      components: {
        Logout,
      },
    })
    export default class App extends Vue {}
   </script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
