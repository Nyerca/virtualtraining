<template>

      <div id="muscoli-app" class="container-fluid">
			<div class="cont">
			  <div class="container">
				<h2 class="title"><img src="http://findicons.com/files/icons/2799/flat_icons/256/trophy.png">
				   LEADERBOARD</h2>
				<ol id="board" class="leaderboard">
					<li id="demo" class="rank profile-item" v-for="leader in leaders"  @click.prevent="showModal(leader.points, leader.name)" data-toggle="modal">
  					<h2 class="name"> {{leader.name}} </h2>
  					<small class="pts"> {{leader.points}}</small>
					</li>
				</ol>
			  </div>
			</div>





        <div v-if="clicked==true" v-bind:id="'modal' + leader.points">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="profile">

              <div >

              <img class="icon" src="http://www.menshairstyletrends.com/wp-content/uploads/2015/01/Cool-Hairstyles-2015-David-Beckham.jpg" />
              <section class="gray-bg sec-pad-with-content-margin-30">

            <div class="container">
            <div class="row">
            <div class="col-lg-3">
              <div class="single-progress-bar text-center">
                  <div class="top-box">
                      <div class="circular-progress" id="progress-1" data-progress-count=".90">
                          <div class="other-ball" id="progress-1-other-ball"></div><!-- /.other-ball -->
                      </div><!-- /.circular-progress -->
                      <div class="text-box">90%</div><!-- /.text-box -->
                  </div><!-- /.top-box -->
                  <h3>Website Design</h3>
              </div><!-- /.single-progress-bar -->
            </div><!-- /.col-lg-3 -->
            </div><!-- /.row -->
            </div><!-- /.container -->
            </section><!-- /.gray-bg sec-pad-with-content-margin-30 -->

            </div>
                <div class="name"> {{leader.name}} </div>
                <div class="profession"> Profession: No idea </div>
                <div class="bio"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt ex voluptas voluptate neque optio tempora sunt. </div>
                <button class="close" @click.prevent="closeModal(leader.points)">Close</button>
              </div>
            </div>
          </div>
        </div>




		</div>




</template>
<script src='https://rawgit.com/kimmobrunfeldt/progressbar.js/1.0.0/dist/progressbar.js'></script>
  <script  src="./test.js">
  test1();
  </script>
<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import * as bootstrap from 'bootstrap';
import * as jquery from "jquery";
import { test2 } from './test';

Vue.component('card', {
	props: ['card', 'exercise']
});
Vue.component('exercise', {
	props: ['exercise']

});





interface Leader {
	name: string;
 points:string;
}

@Component
export default class UserProfile extends Vue {
	private leaders: Leader[];
  private leader: Leader = {
  name : "",
  points : "",
  };

  private clicked:boolean = false;
    constructor() {
		super();
		this.leaders = [
			{
			  name:"James Gun",
			  points:"124321"},
			  {
			  name:"Brandon Jackson",
			  points:"28415"},
			  {
			  name:"Johnny Okay",
			  points:"14231"},
			  {
			  name:"Gunther Lewis",
			  points:"2321"},
			  {
			  name:"Bran Jacks",
			  points:"23134"},
			  {
			  name:"Katey Wen",
			  points:"25313"}
		];
    }

	public showModal(modal:string, name:string) {
  console.log("clicked");
       //  $('#modal' + modal).modal('toggle');
       this.clicked=true;
       test2();

       this.leader = {
       name : name,
       points : modal,
       };
       console.log(modal);
       console.log(name);
       console.log(this.leader);
    }
    public closeModal(modal:number) {
       // $('#modal' + modal).modal('hide');
       console.log("unclicked");
       this.clicked=false;
    }

}





</script>






<style scoped lang="scss">
.cont {
display:flex;
}

.container{
 font-family:'helvetica';
  justify-content:center;

}
.title{
  margin:0;
  padding :20px 20px 20px 20px;
  line-height:18px;
  font-size:18px;
  padding-left:30px;
    background-color:#444;
  color: #fff;
  border-radius: 5px 5px 0px 0px
}
h2 img{
  vertical-align:bottom;
  height:25px
}
ol{list-style: none;
margin-top:0;
  margin-left:0;

}
.leaderboard{
  width:350px;
  display:flex-column;
  padding-bottom:10px;
  padding-left:0;
  border-radius:10px;
}
.rank{
  display: flex;
  background-color:#61d1d1;
  padding:10px 10px 10px 10px;
  color: #fff;
  align-items:baseline;
  justify-content:space-between;
  border:1px solid rgba(255,255,255,0.1)
}

.name{margin:0;
  padding-left:18px;
  line-height:10px;
  font-size:16px;
  text-transform:uppercase;


}
 .leaderboard li h2::before, .leaderboard li h2::after {
  content: '';
  position: absolute;
  z-index: 1;
  bottom: -11px;
  left: -9px;
  border-top: 10px solid #c24448;
  border-left: 10px solid transparent;
  -webkit-transition: all .1s ease-in-out;
  transition: all .1s ease-in-out;
  opacity: 0;
}
.leaderboard li::before {
  content: counter(leaderboard);
  position: absolute;
  z-index: 2;
  top: 15px;
  left: 15px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  color: #61d1d1;
  background: #eee;
  border-radius: 20px;
  text-align: center;
}
.leaderboard li {
  position: relative;
  z-index: 1;
  font-size: 14px;
  counter-increment: leaderboard;
  padding: 18px 10px 18px 50px;
  cursor: pointer;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  -webkit-transform: translateZ(0) scale(1, 1);
          transform: translateZ(0) scale(1, 1);
}


/**********************************************************/
.modal-content {
margin-top: 50%;
	width: 100%;
  heigth: auto;
  max-width: 320px;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  left: 40%;
  text-align: center;
}

li:hover {
  color: #4D90FE;
  cursor: pointer;
}

.background {
	width:100%;
  background-size: cover;
}

.profile .icon {
  width:40%;
  height:40%;
  background-color: rgba(249, 249, 249, 0.2);
  background-size: cover;
  background-position: 0px 0px;
  border-radius: 50%;
  border: 2px solid white;
  margin-top: -67px;
  position: relative;
  margin-bottom: 5%;
}

.profile .details {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.profile .details h6 {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 400;
}

.profile .details p {
  font-size: 12px;
  font-weight: 300;
  color: #03A9F4;
  margin-top: 5px;
}

.profile .bio p {
  color: #999;
  font-size: 12px;
  font-weight: 300;
  padding: 0px 20px;
}

.profile button {
  background: #2196F3;
  border: 0;
  border-radius: 1px;
  padding: 5px 0;
  width: 100%;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}

.profile button:focus {
  outline: none;
}

.profile button:hover {
  background: #64B5F6;
}

profile {
  display: none;
}

/************************************/


#containerBar {
  width:42%;
  height:42%;
  z-index: 7000;
  margin-top: -46%;
  margin-left:29%;
  margin-bottom:5%;
}















$base_font_size : 16; // rem processer
$thm_base_color : #7dc22b;
$thm_black      : #26263e;
$thm_gray       : #f3f5fa;
$thm_text_color : #787887;

@mixin placeholder {
    &::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        @content;
    }

    &::-moz-placeholder {
        /* Firefox 19+ */
        @content;
    }

    &:-ms-input-placeholder {
        /* IE 10+ */
        @content;
    }

    &:-moz-placeholder {
        /* Firefox 18- */
        @content;
    }
}


@function rem-calc($font-size, $base-font-size: $base_font_size) {
    @return ($font-size/$base-font-size) *1rem;
}

.sec-pad-with-content-margin-30 {
  padding-top: 120px;
  padding-bottom: 90px;
}
.circular-progress {
    width: 154px;
    height: 154px;
    position: relative;
    display: inline-block;
}

.circular-progress>svg {
    width: 100%;
    display: block;
}



.circular-progress .other-ball {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: $thm_base_color;
    position: absolute;
    z-index: 2;
    transform: translate(-50%, -50%);

    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 4px;
        height: 4px;
        background:#fff;
        transform: translate(-50%,-50%);
    }
}


.single-progress-bar {
	margin-bottom: 30px;
	.top-box {
		position: relative;
		.text-box {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 30px;
			color: $thm_black;
		}
	}
	h3 {
		margin: 0;
		font-size: 16px;
		color: $thm_text_color;
		font-weight: 500;
		margin-top: 25px;
	}
}
</style>
