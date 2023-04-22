<template>

      <div id="userPlan" class="container-fluid">
	<div class="row">

			<template v-for="plan in plans" >
        Allenatore: {{plan.allenatore}}
        <div id="app">
          <button @click="showModal = true" class="button">Recensisci</button>
          <transition name="fade" appear>
            <div class="modal-overlay"
                 v-if="showModal"
                 @click="showModal = false"></div>
          </transition>
          <transition name="pop" appear>
            <div class="content_modal" role="dialog"
                 v-if="showModal"
                 >
              <h1>{{plan.allenatore}}</h1>
              STELLE
              <button class="button">Recensisci</button>
              <button @click="showModal = false" class="button">Hide Modal</button>
            </div>

          </transition>
        </div>
			</template>

			<div v-for="card in cards" v-if="cardContained(card.id)" :card="card">
				Scheda: <button>Start</button>
				<div>
					<exercise inline-template v-for="exercise in card.exercises" :exercise="exercise">
							<div>{{exercise.name}} x {{exercise.times}}</div>
					</exercise>
				</div>
			</div>


	</div>



	<hr>
	<h3>User Plan</h3>




</div>




</template>
<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import UserPlanApi from '../services/UserPlanApi';

Vue.component('card', {
	props: ['card', 'exercise']
});
Vue.component('exercise', {
	props: ['exercise']

});


interface Plan {
	id: number;
  trainer: string;
 card_id:number[];
}
interface Exercise {

  name: string;
  times: string;
  time: boolean;
}
interface Card {
	id: number;
  exercises:Exercise[];
}

@Component
export default class UserPlan extends Vue {
	private plans: Plan[];
	private cards: Card[];
 private showModal: boolean = false;

    constructor() {
		super();
		this.plans = [];
		this.cards = [];

		this.listPlans();
		this.listCards();
    }

    public listPlans() {
      const resp = UserPlanApi.getPlan();
      resp.then((r) => {
              this.plans = r.data;
          })
          .catch((error) => {
              console.log(error);
          });

    }
    public listCards() {
      const resp = UserPlanApi.getCard();
      resp.then((r) => {
              this.cards = r.data;
              console.log(this.cards);
          })
          .catch((error) => {
              console.log(error);
          });

    }
	public cardContained(id:number) {
       if(this.plans[0].card_id.indexOf(id) < 0) return false
			return true
    }

}

</script>

<style scoped lang="scss">
  html {
    height: 100%;
    background: #FFF;
    color: #000;
    font-size: 62.5%;
  }

  body {
    min-height: 100%;
    margin: 0;
    display: grid;
    place-items: center;
    font-size: 1.4rem;
  }

  .button {
    border: none;
    color: #FFF;
    background: #42b983;
    appearance: none;
    font: inherit;
    font-size: 1.8rem;
    padding: .5em 1em;
    border-radius: .3em;
    cursor: pointer;
  }

  .content_modal {
    position: absolute;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    text-align: center;
    width: fit-content;
    height: fit-content;
    max-width: 22em;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    background: #FFF;
    z-index: 999;
    transform: none;
  }
  .modal h1 {
    margin: 0 0 1rem;
  }

  .modal-overlay {
    content: '';
    position: absolute;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background: #2c3e50;
    opacity: 0.6;
    cursor: pointer;
  }

  /* ---------------------------------- */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .4s linear;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .pop-enter-active,
  .pop-leave-active {
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
  }

  .pop-enter,
  .pop-leave-to {
    opacity: 0;
    transform: scale(0.3) translateY(-50%);
  }
</style>
