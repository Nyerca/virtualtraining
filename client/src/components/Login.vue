<template>
    <div class="card card-body">
        <img src="../assets/logo.png" class="logo">
        <h3 class="text-center">Account Login</h3>
        <p>{{loginError}}</p>
        <form method="POST" action='' @submit="checkForm">
            <div class="form-group">
                <label for="email" class="control-label">Email</label>
                <input type="email" class="form-control" name="email" placeholder="Email" required v-model="email"> 
            </div>

            <PasswordField labelText="Password" passwordFieldName="password" passwordChangedEventName="passwordchanged" @passwordchanged="passwordChanged"/>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script lang="ts">
import UserAccessApi from '../services/UserAccessApi';
import Vue from 'vue';
import Component from 'vue-class-component';
import PasswordField from '@/components/PasswordField.vue'; // @ is an alias to /src

@Component({
    components: {
        PasswordField,
    },
})

export default class Login extends Vue {
    private email: string;
    private password: string;
    private loginError: string;

    constructor() {
        super();
        this.email = '';
        this.password = '';
        this.loginError = '';
    }

    public passwordChanged(passwordValue: string) {
        this.password = passwordValue;
    }
    private checkForm(event: Event) {
        const response = UserAccessApi.postLogin(this.email, this.password);

        response.then((r) => {
                // TODO: Login effettuato con successo? Decidere cosa fare
                this.loginError = r.data.msg;
                // TODO: Farsi passare dal server l'username dell'utente!
                Vue.cookies.set('userIsLogged', 'Yeah');
                setTimeout(() => this.$router.push('/'), 1500);
            })
            .catch((error) => {
                this.loginError = error.response.data.msg;
            });
        event.preventDefault();
    }
}
</script>