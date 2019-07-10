<template>
    <Trainer/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Trainer from '@/components/Trainer.vue'; // @ is an alias to /src

@Component({
  components: {
    Trainer,
  },
})
export default class Trainers extends Vue {}
</script>
