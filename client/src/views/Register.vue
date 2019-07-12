<template>
    <div class="row">
        <div class="col-md-4 mx-auto">
            <div class="card card-body">
                <img src="../assets/logo.png" class="logo">
                <h3 class="text-center">Account Register</h3>
                <form id="loginForm" @submit="checkForm" method="POST" action="">
                    <div v-if="errors.length>0">
                        <b>Please correct the following error(s):</b>
                        <ul>
                            <li v-for="error in errors" :key='error.text'>{{error.text}}</li>
                        </ul>
                    </div> 
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="name" class="form-control" required name="name" v-model="name"> 
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" required name="email" v-model="email"> 
                    </div>
                    <div class="form-group">
                        <label for="age">Age</label>
                        <input type="number" class="form-control" required name="age" v-model="age" min="18"> 
                    </div>
                    <div class="form-group">

                        <label for="password">Password</label>
                        <div class="input-group">
                            <input :type="passwordFieldType" class="form-control" required name="password" v-model="password">
                            <button type="password" @click="switchPasswordVisibility">
                                <span :class="showHideClassPassword"></span>
                            </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password2">Confirm Password</label>
                        <div class="input-group">
                            <input :type="confirmPasswordFieldType" class="form-control" required name="password2" v-model="confirmPassword">
                            <button type="password" @click="switchConfirmPasswordVisibility">
                                <span :class="showHideClassConfirmPassword"></span>
                            </button>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

declare interface Error {
    text: string;
}

@Component
export default class Registration extends Vue {
    private errors: Error[];
    private name: string;
    private email: string;
    private age: number;
    private password: string;
    private confirmPassword: string;

    private passwordFieldType: string;
    private showHideClassPassword: string;

    private confirmPasswordFieldType: string;
    private showHideClassConfirmPassword: string;

    constructor() {
        super();
        this.errors = [];
        this.name = '';
        this.email = '';
        this.age = 18;
        this.password = '';
        this.confirmPassword = '';
        this.passwordFieldType = 'password';
        this.showHideClassPassword = 'fas fa-eye';
        this.confirmPasswordFieldType = 'password';
        this.showHideClassConfirmPassword = 'fas fa-eye';
    }
    public checkForm(event: Event) {
        this.errors = [];

        if (this.confirmPassword !== this.password) {
            this.errors.push({text: 'Password don\'t match'});
        }

        if (this.password.length < 4) {
            this.errors.push({text: 'Password must be at least 4'});
        }

        // Chiamata al server per verificare se l'inserimento e' avvenuto con successo!

        event.preventDefault();
    }
    public switchPasswordVisibility(event: Event) {
        if (this.passwordFieldType === 'password') {
            this.passwordFieldType = 'text';
            this.showHideClassPassword = 'fas fa-eye-slash';
        } else {
            this.passwordFieldType = 'password';
            this.showHideClassPassword = 'fas fa-eye';
        }
        event.preventDefault();
    }
    public switchConfirmPasswordVisibility(event: Event) {
        if (this.confirmPasswordFieldType === 'password') {
            this.confirmPasswordFieldType = 'text';
            this.showHideClassConfirmPassword = 'fas fa-eye-slash';
        } else {
            this.confirmPasswordFieldType = 'password';
            this.showHideClassConfirmPassword = 'fas fa-eye';
        }
        event.preventDefault();
    }
}
</script>


<style lang="scss">
    .logo {
        width: 120px;
        margin:auto;
    }
    input, button {
        height:inherit;
    }
</style>