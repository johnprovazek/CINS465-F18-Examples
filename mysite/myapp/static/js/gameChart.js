window.onload = start;

function start() {
  setup();
}

window.onresize = function(event) {
  drawMultSeries();
};

var names_dict = {
  1610612737: "Hawks",  //Atlanta
  1610612738: "Celtics",  //Boston
  1610612739: "Cavaliers",  //Cleveland
  1610612740: "Pelicans",  //NOLA
  1610612741: "Bulls",  //Chicago
  1610612742: "Mavericks",  //Dallas
  1610612743: "Nuggets",  //Denver
  1610612744: "Warriors",  //Golden State
  1610612745: "Rockets",  //Houston
  1610612746: "Clippers",  //LA Clippers
  1610612747: "Lakers",  //LA Lakers
  1610612748: "Heat",  //Miami
  1610612749: "Bucks",  //Milwaukee
  1610612750: "Timberwolves",  //Minnesota
  1610612751: "Nets",  //Brooklyn
  1610612752: "Knicks",  //NY KNICKS
  1610612753: "Magic",  //Orlando
  1610612754: "Pacers",  //Indiana
  1610612755: "76ers",  //Philly
  1610612756: "Suns",  //Phoenix
  1610612757: "Trailblazers",  //Portland
  1610612758: "Kings",  //Sacremento
  1610612759: "Spurs",  //San Antonio
  1610612760: "Thunder",  //OKC
  1610612761: "Raptors",  //Toronto
  1610612762: "Jazz",  //Utah
  1610612763: "Grizzlies",  //Memphis
  1610612764: "Wizards",  //Washington
  1610612765: "Pistons",  //Detroit
  1610612766: "Hornets",  //Charlotte
}


function setup() {

  var form_data = $('<textarea />').html(DATA).text();  // Getting rid of HTML entity value
  var form_data_doub = form_data.replace(/'/g, '"');    // Changing single quotes to double quotes.
  var obj = JSON.parse(form_data_doub);                 // Parsing JSON
  var game_title = document.getElementById("game_title");
  var game_score = document.getElementById("game_score");
  var game_start = document.getElementById("game_start");
  var home_pts = obj[0].home_pts;
  var away_pts = obj[0].away_pts;
  if(home_pts == "")
  {
    home_pts = "0";
  }
  if(away_pts == "")
  {
    away_pts = "0";
  }

  game_title.innerHTML = names_dict[obj[0].away_team_id] + " vs " + names_dict[obj[0].home_team_id];
  game_score.innerHTML = away_pts + " - " + home_pts;

  if(obj[0].game_active == 'False' && (Number(obj[0].home_pts) > 0 || Number(obj[0].away_pts) > 0)) {
    game_start.innerHTML = "Game over"
  }
  else {
    var localDate = new Date(obj[0].start_time);
    var hour = localDate.getHours()%12;
    var min = localDate.getMinutes();
    var time_day = "AM";
    if(localDate.getHours() > 12)
    {
      time_day = "PM";
    }
    if(min < 10)
    {
      min = "0" + min;
    }
    game_start.innerHTML = hour + ":" + min + " " + time_day;
  }

}






google.charts.load('current', {packages: ['corechart','bar']});
google.charts.setOnLoadCallback(drawMultSeries);

function drawMultSeries() {

  // Hardcoded data based on what would be really gathered from an API.
  var data = google.visualization.arrayToDataTable([
     ['Time', 'Score', {role:'style'}],
     ["12:00", 0, 'red'],
     ["11:45", 2, 'red'],
     ["11:19", 0, 'red'],
     ["09:57", 3, 'red'],
     ["09:34", 1, 'red'],
     ["09:14", 2, 'red'],
     ["09:14", 3, 'red'],
     ["08:58", 2, 'red'],
     ["08:58", 1, 'red'],
     ["08:15", 4, 'red'],
     ["07:33", 6, 'red'],
     ["06:24", 4, 'red'],
     ["06:01", 2, 'red'],
     ["05:28", 0, 'red'],
     ["04:23", -2, 'blue'],
     ["03:42", -5, 'blue'],
     ["03:17", -7, 'blue'],
     ["02:35", -9, 'blue'],
     ["01:33", -7, 'blue'],
     ["01:15", -5, 'blue'],
     ["00:39", -6, 'blue'],
     ["00:39", -7, 'blue'],
     ["00:30", -5, 'blue'],
     ["00:30", -4, 'blue'],
     ["00:02", -2, 'blue'],
     ["00:00", -2, 'blue'],
  ]);

  var options = {
    legend: {position: 'none'},
    height: $(window).height()*0.70,
    width: $(window).width()*0.80,
    hAxis: {
      title: 'Time',
      viewWindow: {
        // min: [7, 30, 0],
        // max: [17, 30, 0]
      }
    },
    vAxis: {
      viewWindow: {
        min: data.getColumnRange(1).min,
        max: data.getColumnRange(1).max
      },
      title: 'Points'
    },
    bar: {groupWidth: "100%"},
  };

  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
