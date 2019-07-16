<template>
    <div class="col-md-6 mx-auto">
        <b-tabs content-class="mt-3">
          <b-tab title="Login" active>
               <Login/>
          </b-tab>

          <b-tab title="Register" active>
              <Register/>
          </b-tab>
         </b-tabs>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Component from 'vue-class-component';
@Component({
    components: {
        Login,
        Register,
    },
})
export default class SignUpSignIn extends Vue {
}
</script>
