export function test1(){
    console.log('Calling test 1 function');

    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);

var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

var script2 = document.createElement('script');
script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/4.2.1/highcharts.js';
document.getElementsByTagName('head')[0].appendChild(script2);

var script3 = document.createElement('script');
script3.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/4579/darkThemeHighCharts.js';
document.getElementsByTagName('head')[0].appendChild(script3);

var colorInc = 100 / 3;
var $ = require('jquery');
var Highcharts = require('highcharts');
var chart=null;

   $(document).ready(function() {
 var valore_server, value1 = 0, value2 = 0, value3 = 0;
/*
 var socket = io('/mySensorNamespace');

     socket.on('hi',function(data) {
    valore_server = data.split(';');
   for(var field in valore_server) {
     var line = valore_server[field].split('***');
     if(line[0] == "1") {
       value1 = line[1];
     } else if(line[0] == "2") {
       value2 = line[1];
     } else if(line[0] == "3") {
       value3 = line[1];
     }
   }

     });
*/
var $delay = 2000,
  vMin = 11.5,
  vMax = 15.5,
  cMin = .3,
  cMax = 2.5,
  mMin = 0,
  mMax = 5,
  totalPoints = 25,
  $voltageDisplay = $('div.volts'),
  $currentDisplay = $('div.amps'),
  $moistureDisplay = $('div.moisture');

function getRandomInt(min, max) {
  let reading = (Math.random() * (max - min + 1) + min);
  return (Math.round(reading * 2) / 2)
}
function getRand(min, max) {
  let reading = 16;
  return (Math.round(reading * 2) / 2)
}

function updateVoltage(value) {

  var spn = document.createElement('span');
  var str = "" + value;
  $voltageDisplay.html(str.split(".")[0]);

  var n = str.includes(".");

  if(n != false) {
spn.innerHTML = "." +  str.split(".")[1];
document.getElementsByClassName('volts')[0].appendChild(spn);
}
}

function updateCurrent(value) {

var spn = document.createElement('span');
  var str = "" + value;
  $currentDisplay.html(str.split(".")[0]);

  var n = str.includes(".");

  if(n != false) {
spn.innerHTML = "." +  str.split(".")[1];
document.getElementsByClassName('amps')[0].appendChild(spn);
}

}

function updateMoisture(value) {
  $moistureDisplay.html(value + '<span>%</span>');




  var valOrig = value;
  var val = 100 - value;

  if(valOrig == 0)
  {
    $("#percent-box").val(0);
    $(".progress .percent").text(0 + "%");
  }
  else $(".progress .percent").text(valOrig + "%");

  $(".progress").parent().removeClass();
  $(".progress .water").css("top", val + "%");

  if(valOrig < colorInc * 1)
    $(".progress").parent().addClass("red");
  else if(valOrig < colorInc * 2)
    $(".progress").parent().addClass("orange");
  else
    $(".progress").parent().addClass("green");





}

function updateSensorDisplayValues(d) {
  updateVoltage(d[0]);
  updateCurrent(d[1]);
  updateMoisture(d[2]);
}

Highcharts.setOptions({
  global: {
    useUTC: false
  },
  plotOptions: {
    series: {
      marker: {
        enabled: false
      }
    }
  },
  tooltip: {
    enabled: false
  }
});

   var chart = new Highcharts.Chart({
     chart: {
       type: 'spline',
        renderTo: 'sensorData',
        events: {
 					load: function() {
 						var voltage = this.series[0];
 						var current = this.series[1];
 						var moisture = this.series[2];
 						var x, volts, amps, mPercent;

 						// faking sensor data
 						// data will be coming from sensors on the MKR1000
 						setInterval(function() {

 							x = (new Date()).getTime(),
 								volts = getRandomInt(vMin, vMax),
 								amps = getRandomInt(cMin, cMax),
 								mPercent = getRandomInt(mMin, mMax);
 								/*
 							x = (new Date()).getTime(),
 								volts = ((value1 * 2) / 2),
 								amps = (Math.round(value2 * 2) / 2),
 								mPercent = (Math.round(value3 * 2) / 2);
*/
 							voltage.addPoint([x, volts], false, true);
 							current.addPoint([x, amps], false, true);
 							moisture.addPoint([x, mPercent], true, true);

 							updateSensorDisplayValues([volts, amps, mPercent]);


 						}, $delay);
 					}
 				}
 			},
 			title: {
 				text: 'Dati Canarin'
 			},
 			xAxis: {
 				type: 'datetime',
 				tickPixelInterval: 500
 			},
 			yAxis: [{
 				title: {
 					text: 'GRADI',
 					style: {
 						color: '#2b908f',
 						font: '13px sans-serif'
 					}
 				},
 				min: 0,
 				max: 15,
 				plotLines: [{
 					value: 0,
 					width: 1,
 					color: '#808080'
 				}]
 			}, {
 				title: {
 					text: 'UMIDITA',
 					style: {
 						color: '#90ee7e',
 						font: '13px sans-serif'
 					}
 				},
 				min: 0,
 				max: 4,
 				opposite: true,
 				plotLines: [{
 					value: 0,
 					width: 1,
 					color: '#808080'
 				}]
 			}, {
 				title: {
 					text: 'INQUINAMENTO',
 					style: {
 						color: '#f45b5b',
 						font: '13px sans-serif'
 					}
 				},
 				min: 0,
 				max: 100,
 				opposite: true,
 				plotLines: [{
 					value: 0,
 					width: 1,
 					color: '#808080'
 				}]
 			}],
 			tooltip: {
 				formatter: function() {
 					var unitOfMeasurement = this.series.name === 'GRADI' ? ' °C' : ' A';
 					return '<b>' + this.series.name + '</b><br/>' +
 						Highcharts.numberFormat(this.y, 1) + unitOfMeasurement;
 				}
 			},
 			legend: {
 				enabled: true
 			},
 			exporting: {
 				enabled: false
 			},
 			series: [{
 				name: 'TEMPERATURA',
 				yAxis: 0,
 				style: {
 					color: '#2b908f'
 				},
 				data: (function() {
 					// generate an array of random data
 					var data = [],
 						time = (new Date()).getTime(),
 						i;

 					for (i = -totalPoints; i <= 0; i += 1) {
 						data.push({
 							x: time + i * $delay,
 							y: getRandomInt(12, 12)
 						});
 					}
 					return data;
 				}())
 			}, {
 				name: 'UMIDITA',
 				yAxis: 1,
 				data: (function() {
 					// generate an array of random data
 					var data = [],
 						time = (new Date()).getTime(),
 						i;

 					for (i = -totalPoints; i <= 0; i += 1) {
 						data.push({
 							x: time + i * $delay,
 							y: getRandomInt(.7, .7)
 						});
 					}
 					return data;
 				}())
 			}, {
 				name: 'INQUINAMENTO',
 				yAxis: 2,
 				data: (function() {
 					// generate an array of random data
 					var data = [],
 						time = (new Date()).getTime(),
 						i;

 					for (i = -totalPoints; i <= 0; i += 1) {
 						data.push({
 							x: time + i * $delay,
 							y: getRandomInt(1, 1)
 						});
 					}
 					return data;
 				}())
 			}]
 		});

 });
    alert("ok");
}

var charged = false;
export function test2(){
  if(charged == false) {
    charged = true;

    alert(charged);
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    var script2 = document.createElement('script');
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/progressbar.js/1.0.1/progressbar.min.js';
    document.getElementsByTagName('head')[0].appendChild(script2);

    var $ = require('jquery');
    var Highcharts = require('highcharts');
    var chart=null;

       $(document).ready(function() {



    var Self = $('#progress-1');
      var getID = Self.attr('id');

      const QUARTER_R = Math.PI / 2;
      const otherBall = document.getElementById(getID+'-other-ball');

      const containerWidth = document.getElementById(getID).offsetWidth;
      const strokeWidth = 3;
      const strokeColor = '#7DC22B';
      const lineWidthInPixels = strokeWidth / 100 * containerWidth;
      // Radius is from circle's exact center to the middle of the line
      const radius = (containerWidth - lineWidthInPixels) / 2
      const center = (containerWidth / 2);

      var progressCount = Self.data('progress-count');

      var ProgressBar = require('progressbar.js');
      var circle=null;
      circle = new ProgressBar.Circle('#'+getID, {
          color: strokeColor,
          easing: 'easeInOut',
          duration: 1200,
          strokeWidth: strokeWidth,
          text: {
            style: null,  // manually style text
          },
          step: function(state, bar) {
            const angleR = bar.value() * 2 * Math.PI - QUARTER_R;
            const x = radius * Math.cos(angleR) + center;
            const y = radius * Math.sin(angleR) + center;
            otherBall.style.left = x + 'px';
            otherBall.style.top = y + 'px';
          }
      });

      circle.animate(progressCount);  // Number from 0.0 to 1.0
  })
  }

}




export function test3(){
  var script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js';
  document.getElementsByTagName('head')[0].appendChild(script);


  var $ = require('jquery');

$(document).ready(function() {



  window._iesKnob={att:function(e,t,n){if(e){if(!n)return e.getAttribute(t);e.setAttribute(t,n)}return!1},$$$:function(e){return"string"==typeof e&&(e=document.getElementById(e)),e},ins:function(e,t,n,i,r,o){var a;if(o)var s=document.createElementNS("http://www.w3.org/2000/svg",t);else s=document.createElement(t);if(i&&(s.innerHTML=i),e=_iesKnob.$$$(e),n)for(a=0;a<n.length;a+=2)this.att(s,n[a],n[a+1]);return e?1==r?e.insertBefore(s,e.firstChild):r?e.insertBefore(s,r):e.appendChild(s):s},init:function(e){var t=document.createElement("style");document.getElementById("circle-animation-style")?e&&(document.getElementById("circle-animation-style").innerHTML=""):(t.id="circle-animation-style",document.head.appendChild(t));for(var n=document.getElementsByClassName("iesknob"),i=0;i<n.length;i++)"true"==n[i].getAttribute("initiated")&&"force"!=e||(""==n[i].id&&(n[i].id=_iesKnob.guid()),_iesKnob.generate(n[i].id,n[i].getAttribute("data-knob-image"),n[i].getAttribute("data-knob-dotimage"),n[i].getAttribute("data-knob-percentage"),n[i].getAttribute("data-knob-timing"),n[i].getAttribute("data-knob-dotcolor"),n[i].getAttribute("data-knob-gradient1"),n[i].getAttribute("data-knob-gradient2"),n[i].getAttribute("data-knob-color")),n[i].setAttribute("initiated","true"))},guid:function(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",n=0;n<15;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e},generate:function(e,t,n,i,r,o,a,s,l){var c=document.getElementById(e);c.innerHTML="";var d=_iesKnob.guid(),u=_iesKnob.ins(c,"svg",["class","circle-chart","id",d,"height","101%","width","101%","viewbox","0 0 33.83098862 33.83098862","xmlns","http://www.w3.org/2000/svg","style","height:101%;width:101%;overflow: visible  !important;box-shadow : 0px -0px 10000px transparent;position:absolute;top:-0.5%;left:-0.5%","preserveAspectRatio","none"],!1,!1,!0),g=_iesKnob.ins(u,"defs",!1,!1,!1,!0),m=_iesKnob.guid(),b=_iesKnob.ins(g,"linearGradient",["id",m,"x1","0","y1","10","x2","30","y2","10","gradientUnits","userSpaceOnUse","gradientTransform","rotate(90)"],!1,!1,!0);a&&null!=a&&""!=a||(a="#FFD700"),s&&null!=s&&""!=s||(s="yellow"),_iesKnob.ins(b,"stop",["stop-color",a,"offset","0"],!1,!1,!0),_iesKnob.ins(b,"stop",["stop-color",s,"offset","1"],!1,!1,!0),c.style.backgroundImage="url("+t+")",c.style.backgroundSize="99%",c.style.backgroundPosition="50% 50%",c.style.backgroundRepeat="no-repeat",l&&null!=l&&""!=l||(l="#efefef"),_iesKnob.ins(u,"circle",["class","circle-chart__background","stroke",l,"stroke-width","2","fill","none","cx","16.91549431","cy","16.91549431","r","15.91549431"],!1,!1,!0),_iesKnob.ins(u,"circle",["class","circle-chart__circle","stroke","url(#"+m+")","stroke-width","2","stroke-dasharray",i+",100","stroke-linecap","round","fill","none","cx","16.91549431","cy","16.91549431","r","15.91549431"],!1,!1,!0),n?_iesKnob.ins(u,"image",["href",n,"height","6","width","6","class","star-element","x","14","y","-2"],!1,!1,!0):(o&&null!=o&&""!=o||(o="#000000"),_iesKnob.ins(u,"circle",["class","star-element","stroke",o,"r","0.9","fill","none","cx","17","cy","1.1"],!1,!1,!0)),c.innerHTML=c.innerHTML,document.getElementById(d).classList.add(d),r&&null!=r&&""!=r||(r=1);var f="@keyframes "+d+"-circle-chart-fill {to { stroke-dasharray: 0 100; }}@keyframes "+d+"-rotate-star {to { transform: rotate(0deg) }}."+d+" .circle-chart__circle {animation-timing-function: ease-out;animation: "+d+"-circle-chart-fill "+r+"s reverse;transform: rotate(-90deg);transform-origin: center}."+d+" .star-element {animation-timing-function: ease-out;animation: "+d+"-rotate-star "+r+"s reverse;transform: rotate("+360/(100/i)+"deg);transform-origin: center;}";document.getElementById("circle-animation-style").innerHTML+=f}};
_iesKnob.init("force");

  $('.progressbar').each(function(){
		var t = $(this);
		var dataperc = t.attr('data-perc'),
		datamax = t.attr('max'),
				barperc = Math.round((datamax/dataperc)*2.56);
				var v = datamax/dataperc;
		t.find('.bar').animate({width:barperc}, dataperc*25);
		t.find('.label').append('<div class="perc"></div>');

		function perc() {
			var length = t.find('.bar').css('width'),
				perc = Math.round(parseInt(length)/2.56),
				labelpos = (parseInt(length)-19);
			t.find('.label').css('left', labelpos);
			t.find('.perc').text(perc+'%');
		}
		perc();
		setInterval(perc, 0);
	});





});


}
