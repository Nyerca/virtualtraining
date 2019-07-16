<template>
    <div>
        <a href="#" @click.prevent="logout">Logout</a>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UserAccessApi from '../services/UserAccessApi';
import Component from 'vue-class-component';

@Component
export default class Logout extends Vue {
    constructor() {
        super();
    }
    private logout() {
        this.$cookies.remove('userIsLogged');
        setTimeout(() => this.$router.push('/user-access'), 1500);

    }
}
</script>
