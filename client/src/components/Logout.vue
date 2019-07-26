<template>
    <b-nav-item class="nav-link">
        <a href="#" @click.prevent="logout">Logout</a>
        <b-alert v-model="showDismissibleAlert" :variant="alertType" dismissible>
            {{logOutError}}
        </b-alert>
    </b-nav-item> 
</template>

<script lang="ts">
import Vue from 'vue';
import UserAccessApi from '../services/UserAccessApi';
import Component from 'vue-class-component';

@Component
export default class Logout extends Vue {
    private logOutError: string;
    private showDismissibleAlert: boolean;
    private alertType: string;
    constructor() {
        super();
        this.logOutError = '';
        this.showDismissibleAlert = false;
        this.alertType = '';
    }
    private logout() {
        const response = UserAccessApi.getLogout();
        response.then((r) => {
                // TODO: Login effettuato con successo? Decidere cosa fare
                this.alertType = 'success';
                this.logOutError = r.data.status;
                this.showDismissibleAlert = true;
                this.$cookies.remove('userIsLogged');
                setTimeout(() => this.$router.push('/user-access'), 1500);
            })
            .catch((error) => {
                this.alertType = 'danger';
                this.logOutError = error.response.data;
                this.showDismissibleAlert = true;
            });
    }
}
</script>
