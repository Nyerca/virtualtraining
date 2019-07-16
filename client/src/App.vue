<template>
  <div id="app">
    <div id="nav" class="navbar navbar-expand-sm navbar-dark mb-3">
      <div class="container">
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/about">About</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/trainers">Trainers</router-link>
                </li>
                <li class="nav-item" v-if="this.$cookies.isKey('userIsLogged') == false">
                    <router-link class="nav-link" to="/user-access">Accedi a sto sistema</router-link>
                </li>
                <li class="nav-item" v-else>
                    <Logout class="nav-link"/>
                </li>
            </ul>
        </div>
      </div>
    </div>
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
