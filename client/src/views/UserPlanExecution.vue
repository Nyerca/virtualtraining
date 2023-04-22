<template>

      <div class="container-fluid">
	<div class="row">

			<div v-for="card in cards" v-if="card.id==id">
			<exercise inline-template v-for="exercise in card.exercises" :exercise="exercise">
						<div>{{exercise.name}} x {{exercise.times}}  <button>Done</button> </div>
			</exercise>
			</div>

	</div>



	<hr>
	<h3>User Plan Execution</h3>




  <section class="dashboard" id="main-column">
    <div id="sensorValues">
      <div class="sensor-values">
        <div class="volts">12.0</div>
        <label>CANARIN 1</label>
      </div>
      <div class="sensor-values">
        <div class="amps">0.7</div>
        <label>CANARIN 2</label>
      </div>
      <div class="sensor-values">
        <div class="moisture">1</div>
        <label>CANARIN 3</label>
      </div>
    </div>
    <div id="sensorData"></div>
  </section>

<div id="main" style="width:100%;height:100%"></div>

<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>

</div>





</template>



<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import UserPlanApi from '../services/UserPlanApi';
import Highcharts from 'highcharts';

Vue.component('exercise', {
	props: ['exercise']

});
import { test1 } from './test';

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
export default class UserPlanExecution extends Vue {
	id: number;
	private cards: Card[];

    constructor() {
		super();
    test1();
		this.id = 1;
		this.cards = [];

		this.listCards();

    }

    mounted(){
    Highcharts.chart('container', {
        chart: {
            type: 'scatter',
            margin: [70, 50, 60, 80],
            events: {
                click: function (e) {
                    // find the clicked values and the series
                    var x = Math.round(33),
                        y = Math.round(22),
                        series = this.series[0];

                    // Add it
                    series.addPoint([x, y]);

                }
            }
        },
        title: {
            text: 'User supplied data'
        },
        subtitle: {
            text: 'Click the plot area to add a point. Click a point to remove it.'
        },
        xAxis: {
            gridLineWidth: 1,
            minPadding: 0.2,
            maxPadding: 0.2,
            maxZoom: 60
        },
        yAxis: {
            title: {
                text: 'Value'
            },
            minPadding: 0.2,
            maxPadding: 0.2,
            maxZoom: 60,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            series: {
                lineWidth: 1
            }
        },
        series: [{
        type: 'column',
            data: [[20, 20], [80, 80]]
        }]
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

}

</script>
