
var data = [], totalPoints = 510;
var updateInterval = 1000;
var realtime = 'on';

$(function () {
    //Real time ==========================================================================================
    var plot = $.plot('#real_time_chart', [getRandomData()], {
        series: {
            shadowSize: 0,
            color: 'rgb(0, 188, 212)'
        },
        grid: {
            borderColor: '#f3f3f3',
            borderWidth: 1,
            tickColor: '#f3f3f3'
        },
        lines: {
            fill: true
        },
        yaxis: {
            min: 0,
            max: 200
        },
        xaxis: {
            min: 0,
            max: 500
        }
    });

    function updateRealTime() {
        plot.setData([getRandomData()]);
        plot.draw();

        var timeout;
        if (realtime === 'on') {
            timeout = setTimeout(updateRealTime, updateInterval);
        } else {
            clearTimeout(timeout);
        }
    }

    updateRealTime();

    $('#realtime').on('change', function () {
        realtime = this.checked ? 'on' : 'off';
        updateRealTime();
    });
    //====================================================================================================

});

function getRandomData() {
  // db.ref('/users/' + user.uid).once('value').then(function(snapshot) { // load 1x
  db.ref('/hasil').on('value', function(snapshot) { // load realtime
   var userData = snapshot.val();
   if (data.length > 0) data = data.slice(1);

   while (data.length < totalPoints) {
       var prev = data.length > 0 ? data[data.length - 1] : 50;

       var y = userData.watt;
       $("#dayaTxt").text(userData.watt + " Watt");
       $("#arusTxt").text(userData.ampere + " A");

       data.push(y);
       console.log("Akses Server ");
   }


 });

 var res = [];
 for (var i = 0; i < data.length; ++i) {
     res.push([i, data[i]])
 }

 return res;

}
