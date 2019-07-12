<template>
  <div class="e">
    <h1>Trainers</h1>
    <p>This file will list all the trainers.</p>

    <div v-for="trainer in trainers" :key="trainer._id">
      <p>
        <span><b>{{ trainer.name }}</b></span><br />
        <span>{{ trainer.surname }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import TrainersApi from '@/services/TrainersApi';
export default {
  name: 'trainers',
  data() {
    return {
      trainers: [],
    };
  },
  mounted() {
    this.getTrainers();
  },
  methods: {
    async getTrainers() {
      const response = await TrainersApi.getTrainers();
      this.trainers = response.data;
    },
  },
};
</script>

<!--
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Trainer extends Vue {

}
</script>
-->
