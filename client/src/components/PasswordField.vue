<template>
    <div class="form-group">
        <label :for="passwordFieldName">{{labelText}}</label>
        <div class="input-group">
            <input :type="passwordFieldType" class="form-control" required :name="passwordFieldName" v-model="password" v-on:keyup="notifyParent">
            <button type="password" @click="switchPasswordVisibility">
                <span :class="showHideClassPassword"></span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, PropSync } from 'vue-property-decorator';

@Component({
  props: {
    labelText: String,
    passwordFieldName: String,
  },
})
export default class PasswordField extends Vue {
    // Necessario definirla qui o non riesco ad accederci
    @Prop(String) private readonly passwordChangedEventName!: string;
    private passwordFieldType: string;
    private showHideClassPassword: string;
    private password: string;
    constructor() {
        super();
        this.password = '';
        this.passwordFieldType = 'password';
        this.showHideClassPassword = 'fas fa-eye';
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
    public notifyParent() {
        this.$emit(this.passwordChangedEventName, this.password);
    }
}
</script>