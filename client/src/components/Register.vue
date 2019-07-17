<template>
        <div class="card card-body">
            <img src="../assets/logo.png" class="logo">
            <h3 class="text-center">Account Register</h3>
            <form @submit="checkForm" method="POST" action="">
                <p>{{registrationCompleted}}</p>
                <div v-if="errors.length>0">
                    <b>Please correct the following error(s):</b>
                    <ul>
                        <li v-for="error in errors" :key='error.text'>{{error.text}}</li>
                    </ul>
                </div> 
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="name" class="form-control" required name="name" v-model="newUser.name"> 
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" required name="email" v-model="newUser.email"> 
                </div>
                <div class="form-group">
                    <label for="age">Age</label>
                    <input type="number" class="form-control" required name="age" v-model="newUser.age" min="18"> 
                </div>
                   
                <PasswordField labelText="Password" passwordFieldName="password" passwordChangedEventName="passwordchanged" @passwordchanged="passwordChanged"/>

                <PasswordField labelText="Confirm Password" passwordFieldName="confirmationPassword" passwordChangedEventName="confirmationpasswordchanged" @confirmationpasswordchanged="confirmationPasswordChanged"/>

                <div class="form-group">
                    <input type="checkbox" id="agreement" class="rounded" v-model="checked">
                    <label for="agreement">I understand this is not a real sign up.</label>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
</template>

<script lang="ts">
import UserAccessApi from '../services/UserAccessApi';
import { User } from '../services/UserAccessApi';
import Vue from 'vue';
import Component from 'vue-class-component';
import PasswordField from '@/components/PasswordField.vue'; // @ is an alias to /src

declare interface Error {
    text: string;
}

@Component({
    components: {
        PasswordField,
    },
})

export default class Registration extends Vue {
    private errors: Error[];
    private newUser: User;
    private confirmPassword: string;
    private registrationCompleted: string;
    private checked: boolean;

    constructor() {
        super();
        this.errors = [];
        this.newUser = {
            name: '',
            email: '',
            age: 18,
            password: '',
        };
        this.confirmPassword = '';
        this.registrationCompleted = '';
        this.checked = false;
    }

    public confirmationPasswordChanged(confirmationPasswordValue: string) {
        this.confirmPassword = confirmationPasswordValue;
    }

    public passwordChanged(passwordValue: string) {
        this.newUser.password = passwordValue;
    }
    public checkForm(event: Event) {
        this.errors = [];

        if (this.confirmPassword !== this.newUser.password) {
            this.errors.push({text: 'Password don\'t match'});
        } else if (this.newUser.password.length < 4) {
            this.errors.push({text: 'Password must be at least 4'});
        } else if (!this.checked) {
            this.errors.push({text: 'Please, agree to give your soul to the:\n' +
            '\'Amici della mappa interattiva Company\''});
        } else {
            // Chiamata al server per verificare se l'inserimento e' avvenuto con successo!
            const response = UserAccessApi.postRegister(this.newUser);

            response.then((r) => {
                        // TODO: Registrazione effettuata con successo? Decidere cosa fare
                        this.registrationCompleted = 'Registration completed successfully!';
                        setTimeout(() => this.registrationCompleted = '', 1500);
                    })
                    .catch((error) => {
                        error.response.data.errors.forEach((element: string) => {
                            this.errors.push({text: element});
                        });
                    });
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
</style>