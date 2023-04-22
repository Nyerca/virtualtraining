<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
<template>

      <div id="muscoli-app" class="container-fluid">
	<div class="row">

			<muscolo inline-template v-for="muscolo in muscoli" :muscolo="muscolo" @update-muscolo="check">
<div class="col-md-3">
						<div class="card-body">
							<input v-bind:id="'musc' + muscolo.id" type="checkbox" @change="testMe(muscolo.id)">
							<label v-bind:for="'musc' + muscolo.id"><h5 class="card-title">{{ muscolo.name }}</h5></label>
						</div>
					</div>


			</muscolo>

	</div>



	<hr>
	<h3>Test</h3>


			<allenatore inline-template v-for="allenatore in allenatori" v-if="itemsContains(allenatore.muscles_id)" :allenatore="allenatore" @update-allenatore="selectAllenatore">
			 <div class="col-md-3">
						<div class="card-body">
							<button v-bind:id="'allenatore' + allenatore.id" @click.prevent="selectMe(allenatore.id)">{{ allenatore.name }}</button>
						</div>
					</div>
			</allenatore>


	<div>
		<div class="row">
			Disponibilità ore singolo allenamento: <input v-model="timeReq" type="time" id="appt" name="appt" min="00:30" max="03:00" value="00:30" required>
		</div>
		<div class="row">
			Prezzo: 20
		</div>
		<div class="row">
			<textarea v-model="new_request.description" rows="4" cols="50" name="richieste">Richieste riguardo l'allenamento.</textarea>
		</div>
		<button @click="setRequest()" >Invia</button>
	</div>

</div>


</template>

<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import PasswordField from '@/components/PasswordField.vue'; // @ is an alias to /src
import axios from 'axios';
import UserRequestApi from '../services/UserRequestApi';


Vue.component('muscolo', {
	props: ['muscolo'],
	methods: {
		testMe: function(id:number) {

			this.$emit('update-muscolo', id);
			console.log(id);
		}
	}

});


Vue.component('allenatore', {
	props: ['allenatore'],
	methods: {
		selectMe: function(id:number) {
			this.$emit('update-allenatore', id);
		}
	}

});


interface Muscle {
	id: number;
  name: string;
}
interface Trainer {
	id: number;
  name: string;
  muscles_id:number[];
}
interface New_Request {
	username: string;
  muscles_id:number[];
  hour:string;
  minute: string;
  description : string;
}

@Component
export default class UserRequest extends Vue {

	private muscoli :Muscle[];

  private allenatori:Trainer[];
	private allenatore: number;
	private muscoli_selezionati: number[];
	private new_request:New_Request;
	private timeReq: string;

    constructor() {
		super();
        this.allenatore = -1;
		this.muscoli = [];
		this.allenatori = [];
		this.timeReq = "";
		this.muscoli_selezionati = [];
		this.new_request = {
		username : "fakeUser",
		muscles_id : [],
		hour : "",
		minute : "",
		description : "",
		};

    }


        private mounted() {
          this.listTrainers();
            this.listMuscoli();
        }

        public listTrainers() {
          const resp = UserRequestApi.getTrainers();
          resp.then((r) => {
                  this.allenatori = r.data;
                  console.log(this.allenatori);
              })
              .catch((error) => {
                  console.log(error);
              });
        }

        public listMuscoli() {
          const response = UserRequestApi.getMuscles();
          response.then((r) => {
                  this.muscoli = r.data;
              })
              .catch((error) => {
                  console.log(error);
              });

          }

    public setRequest() {
				console.log(this.new_request.description);

				//console.log(document!.getElementById("appt").value.substring(0, 2));
				this.new_request.hour = this.timeReq.substring(0, 2);


				//console.log(document!.getElementById("appt").value.substring(3, 5))
				this.new_request.minute = this.timeReq.substring(3, 5);

				this.new_request.muscles_id = this.muscoli_selezionati;

        const response = UserRequestApi.postRequests(this.new_request);
    }
	public deleteEvent(array: number[], id:number) {
       array.splice(array.indexOf(id), 1);
    }
	public selectAllenatore(id:number) {
      this.allenatore = id;
		console.log(this.allenatore);
    }
	public check(id:number) {
      console.log("CHECK" + id);

			if(this.muscoli_selezionati.indexOf(id) >= 0) {
				this.deleteEvent(this.muscoli_selezionati, id);
			} else {
			this.muscoli_selezionati.push(id);
			}

			//this.muscoli_selezionati[id] = ! this.muscoli_selezionati[id]
			console.log(this.muscoli_selezionati);
    }
	public itemsContains(array: number[]) {
      for (let i = 0; i < this.muscoli_selezionati.length; i++) {
				console.log("PUSH");
				if(array.indexOf(this.muscoli_selezionati[i]) < 0) return false
				//this.muscoli_selezionati.push(false);
			}
			return this.muscoli_selezionati.length > 0
    }
}

</script>
