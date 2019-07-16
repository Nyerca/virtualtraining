<template>
    <div>
        <a href="#" @click.prevent="logout">Logout</a>
        <br>
        <p>{{debugVar}}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UserAccessApi from '../services/UserAccessApi';
import Component from 'vue-class-component';

@Component
export default class Logout extends Vue {
    private debugVar: string;
    constructor() {
        super();
        this.debugVar = '';
    }
    private logout() {
        this.debugVar = 'Richiesta di logout!';
    }
}
</script>
