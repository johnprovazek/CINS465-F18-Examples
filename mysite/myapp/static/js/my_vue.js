// Built based on code found here: https://codepen.io/gau/pen/LjQwGp

// document.body.onload = addElement;
// //document.body.onload = getJSON;
//
// function addElement () {
//   console.log("added")
//   var x = document.getElementById("cur_games");
//   x.innerHTML = {{ data }};
//   console.log(x)
// }
// <div id="cur_games">{{ data }}</div>



// ----receive function----v
// function get_json(url, callback) {
//     http.get(url, function(res) {
//         var body = '';
//         res.on('data', function(chunk) {
//             body += chunk;
//         });
//
//         res.on('end', function() {
//             var response = JSON.parse(body);
// // call function ----v
//             callback(response);
//         });
//     });
// }
//
//          // -----------the url---v         ------------the callback---v
// var mydata = get_json("http://data.nba.net/data/10s/prod/v1/20181105/scoreboard.json", function (resp) {
//     console.log(resp);
// });




// var clock = new Vue({
//     el: '#clock',
//     data: {
//         countdown: '',
//         curtime: '',
//     }
// });
//
// var end_month = 1;
// var end_day = 1;
// var end_hour = 0;
// var end_minute = 0;
// var end_second = 0;
//
// // var end_month = 10;
// // var end_day = 15;
// // var end_hour = 11;
// // var end_minute = 0;
// // var end_second = 0;
//
// var days_in_month = [null,31,28,31,30,31,30,31,31,30,31,30,31]
// var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
// var timerID = setInterval(updateTime, 1000);
// updateTime();
// function updateTime() {
//
//     var cd = new Date();
//     var month = zeroPadding(cd.getMonth()+1, 2);
//     var day = zeroPadding(cd.getDate(), 2);
//     var hour = zeroPadding(cd.getHours(), 2);
//     var minute = zeroPadding(cd.getMinutes(), 2);
//     var second = zeroPadding(cd.getSeconds(), 2);
//
//     var isLastDay = (month == end_month) && (day == end_day);
//     var isLastHour = isLastDay && (hour == end_hour);
//     var isLastMinute = isLastHour && (minute == end_minute);
//
//     var final_days = daysLeft(month, day, hour) + " days, ";
//     var final_hours = hoursLeft(hour, isLastDay) + " hours, ";
//     var final_minutes = minutesLeft(minute, isLastHour) + " minutes, ";
//     var final_seconds = secondsLeft(second, isLastMinute) + " seconds.";
//
//     clock.countdown = final_days + final_hours + final_minutes + final_seconds;
//     clock.curtime = "Current time: " + month + "/" + day + " " + hour + ":" + minute + ":" + second;
// };
//
// function daysLeft(month, day, hour) {
//   // Not perfect here, will show false days left on last day
//   if(month == end_month)
//   {
//     if(day == end_day)
//     {
//       return 0;
//     }
//     else
//     {
//       return end_day - day;
//     }
//   }
//   else
//   {
//     var days_left = days_in_month[month] - day;
//     month = month%12 + 1;
//     while(month != end_month)
//     {
//       days_left += days_in_month[month];
//       month = month%12 + 1;
//     }
//     //assert(month == end_month)
//     days_left += end_day - 1;
//     return days_left;
//   }
// }
//
// function hoursLeft(hour, isLastDay) {
//   if (isLastDay) {
//     return 0
//   }
//   else {
//     return 24 - hour;
//   }
// }
//
// function minutesLeft(minute, isLastHour)
// {
//   if (isLastHour) {
//     return 0
//   }
//   else {
//     return 60 - minute - 1;
//   }
// }
//
// function secondsLeft(second, isLastMinute)
// {
//   if (isLastMinute) {
//     return 0
//   }
//   else {
//     return 60 - second;
//   }
// }
//
// function zeroPadding(num, digit) {
//     var zero = '';
//     for(var i = 0; i < digit; i++) {
//         zero += '0';
//     }
//     return (zero + num).slice(-digit);
// }

// var app = new Vue({
//   el: '#app',
//   data: {
//     message: new Date().toLocaleString()
//   }
// })
//
//
// var app2 = new Vue({
//   el: '#app-2',
//   data: {
//     message: 'You loaded this page on ' + new Date().toLocaleString()
//   }
// })
