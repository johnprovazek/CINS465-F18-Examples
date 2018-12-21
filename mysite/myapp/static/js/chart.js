window.onload = start;

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
};

function start() {
  setup();
}

function setup() {
  var banner = document.getElementById('CONFBANNER');
  // console.log(banner.textContent);
  if(banner.textContent == " Western Conference ")  {
    banner.setAttribute("style", "background:#E72151;");
  }
  else {
    banner.setAttribute("style", "background:#0067AC;");
  }
}

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawLineStyles);

var data; // the datatable
var johndata;

function getMax() {
  var max = 5;
  for (i = 1; i < 16; i++) {
    if(johndata.getColumnRange(i).max > max) {
      max = johndata.getColumnRange(i).max;
    }
  }
  return max + 1;
}

function getMin() {
  var min = -5;
  for (i = 1; i < 16; i++) {
    if(johndata.getColumnRange(i).min < min) {
      min = johndata.getColumnRange(i).min;
    }
  }
  return min - 1;
}

var chart;

function drawLineStyles() {
  johndata = new google.visualization.DataTable();
  johndata.addColumn({id:'GAMES', label:'LETSSEEWHATHAPPENS', type: 'number'});
  var form_data = $('<textarea />').html(STANDINGSDATA).text();  // Getting rid of HTML entity value
  var form_data_doub = form_data.replace(/'/g, '"');  // Changing single quotes to double quotes.
  console.log(form_data_doub);
  var obj = JSON.parse(form_data_doub); //Parsing JSON
  var max_length = 0;
  for(var index in obj) {
    johndata.addColumn({id:index, label:names_dict[index], type: 'number'});
    if(obj[index].length > max_length) {
      max_length = obj[index].length;
    }
  }
  johndata.addRows(max_length+1);

  for(var i = 0; i < 16; i++)
  {
    johndata.setCell(0, i, 0);
  }
  for(var i = 1; i < max_length+1; i++)
  {
    johndata.setCell(i, 0, i);
    var j = 1;
    for(var index in obj)
    {
      // console.log(i, j, obj[index][i])
      johndata.setCell(i, j, obj[index][i]);
      j++;
    }
  }

  // console.log("me:")
  // console.log(johndata.toJSON())






  var input = {
    cols: [{id: 'GAMES', label: 'LETSSEEWHATHAPPENS', type: 'number'},             // 0
           {id: '1610612742', label: 'Mavericks', type: 'number'},      // 1
           {id: '1610612743', label: 'Nuggets', type: 'number'},          // 2
           {id: '1610612744', label: 'Warriors', type: 'number'},       // 3
           {id: '1610612745', label: 'Rockets', type: 'number'},  // 4
           {id: '1610612746', label: 'Clippers', type: 'number'},      // 5
           {id: '1610612747', label: 'Lakers', type: 'number'},          // 6
           {id: '1610612763', label: 'Grizzlies', type: 'number'},         // 7
           {id: '1610612750', label: 'Timberwolves', type: 'number'},  // 8
           {id: '1610612740', label: 'Pelicans', type: 'number'},     // 9
           {id: '1610612760', label: 'Thunder', type: 'number'},       // 10
           {id: '1610612756', label: 'Suns', type: 'number'},      // 11
           {id: '1610612757', label: 'TrailBlazers', type: 'number'},        // 12
           {id: '1610612758', label: 'Kings', type: 'number'},       // 13
           {id: '1610612759', label: 'Spurs', type: 'number'},     // 14
           {id: '1610612762', label: 'Jazz', type: 'number'}],         // 15

           // old: first: 0 -1 0 1 0 -1 -2 -3 -4
           // old: second 0 1 2 3 4 3 4 5

    rows: [    {c:[{v: 0}, {v:  0}, {v: 0}, {v: 0}, {v: 0}, {v: 0}, {v: 0}, {v: 0}, {v: 0}, {v: 0}, {v: 0}, {v: 0}, {v: 0}, {v: 0}, {v: 0}, {v: 0}]},
               {c:[{v: 1}, {v: null}, {v: 1}, {v: 1}, {v:-1}, {v:-1}, {v:-1}, {v:-1}, {v:-1}, {v: 1}, {v:-1}, {v: 1}, {v: 1}, {v:-1}, {v: 1}, {v: 1}]},
               {c:[{v: 2}, {v:  0}, {v: 2}, {v: 2}, {v: 0}, {v: 0}, {v:-2}, {v: null}, {v: 0}, {v: 2}, {v:-2}, {v: 0}, {v: 2}, {v:-2}, {v: 0}, {v: 0}]},
               {c:[{v: 3}, {v:  1}, {v: 3}, {v: 1}, {v:null}, {v: 1}, {v:-3}, {v: 1}, {v:-1}, {v: 3}, {v:-3}, {v:-1}, {v: 1}, {v:-1}, {v: 1}, {v:-1}]},
               {c:[{v: 4}, {v:  0}, {v: 4}, {v: 2}, {v:-2}, {v: 0}, {v:-2}, {v: 0}, {v: 0}, {v: 4}, {v:-4}, {v:-2}, {v: 2}, {v:-2}, {v: 0}, {v: 0}]},
               {c:[{v: 5}, {v: -1}, {v: 3}, {v: 3}, {v:-3}, {v: 1}, {v:-1}, {v: 1}, {v:-1}, {v: 3}, {v:-3}, {v:-3}, {v: 1}, {v:-1}, {v: 1}, {v: 1}]},
               {c:[{v: 6}, {v: null}, {v: 4}, {v: 4}, {v:-4}, {v: null}, {v:-2}, {v: 2}, {v:null}, {v: 2}, {v:-2}, {v:-4}, {v: 2}, {v: 0}, {v: 2}, {v: 2}]},
               {c:[{v: 7}, {v: -3}, {v: null}, {v: 5},       , {v: 1}, {v:-3},       , {v:-1}, {v: 1},       , {v:-5}, {v: 3}, {v: 1}, {v: 3}, {v: 1}]},
               {c:[{v: 8}, {v: -4},       , {v: null},       ,       , {v:-2},       , {v: 0},       ,       ,       ,       , {v: 2},       ,       ]},
               {c:[{v: 9},        ,       , {v: 7},       ,       ,       ,       ,       ,       ,       ,       ,       ,       ,       ,       ]}
    ]

  }

  // dataMine = new google.visualization.DataTable(json);
  // console.log("mine:")
  // console.log(dataMine.toJSON())

  var options = {
    // allowHtml: true,
    height: $(window).height()*0.70,
    width: $(window).width()*0.80,
    hAxis: {
      title: 'Game Number',
      format:'#',
      min:-10,
      max:10,
    },
    vAxis: {
      viewWindow: {
        min: getMax(),
        max: getMin()
        // min: data.getColumnRange(1).min,
        // max: data.getColumnRange(1).max
        // min: -5,
        // max: 7
      },
      title: 'Wins - Losses',
      format:'#'
    },
    // colors: ['#B49759', /* Pelicans */  '#E55F1F', /* Suns */
    //          '#FFC627', /* Nuggests */  '#E03A3E', /* TrailBlazers */
    //          '#FEC42F', /* Warriors */  '#0B223E', /* Jazz */
    //          '#787A7B', /* Spurs */     '#004F83', /* Timberwolves */
    //          '#5D76A9', /* Grizzlies */ '#0070B9', /* Thunder */
    //          '#C8102E', /* Clippers */  '#542582', /* Lakers */
    //          '#C21F32', /* Rockets */   '#007DC5', /* Mavericks */
    //          '#5A2C81', /* Kings */],
    lineWidth: 4,
    // legend: {position: 'none'},
  };

  chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(johndata, options);
  // chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  // chart.draw(data, options);

}

window.onresize = function(event) {
  drawLineStyles();
};


// {"1610612742": [0, -1, 0, 1, 0, -1, -2, -3, -4], "1610612743": [0, 1, 2, 3, 4, 3, 4, 5], "1610612744": [0, 1, 2, 1, 2, 3, 4, 5, 6, 7], "1610612745": [0, -1, 0, -1, -2, -3, -4], "1610612746": [0, -1, 0, 1, 0, 1, 2, 1], "1610612747": [0, -1, -2, -3, -2, -1, -2, -3, -2], "1610612763": [0, -1, 0, 1, 0, 1, 2], "1610612750": [0, -1, 0, -1, 0, -1, -2, -1, 0], "1610612740": [0, 1, 2, 3, 4, 3, 2, 1], "1610612760": [0, -1, -2, -3, -4, -3, -2], "1610612756": [0, 1, 0, -1, -2, -3, -4, -5], "1610612757": [0, 1, 2, 1, 2, 1, 2, 3], "1610612758": [0, -1, -2, -1, -2, -1, 0, 1, 2], "1610612759": [0, 1, 0, 1, 0, 1, 2, 3], "1610612762": [0, 1, 0, -1, 0, 1, 2, 1]}
