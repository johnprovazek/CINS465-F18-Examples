window.onload = start;

function start() {
  resize();
  setGames();
  setPeople();
  addBlur();
}

var colors_dict = {
  1610612737: "#E03A3E",  //Atlanta
  1610612738: "#008248",  //Boston
  1610612739: "#6F2633",  //Cleveland
  1610612740: "#B4975A",  //NOLA
  1610612741: "#CE1141",  //Chicago
  1610612742: "#007DC5",  //Dallas
  1610612743: "#FFC627",  //Denver
  1610612744: "#FDB927",  //Golden State
  1610612745: "#ff8080",  //Houston
  1610612746: "#5571A7",  //LA Clippers
  1610612747: "#552583",  //LA Lakers
  1610612748: "#ff471a",  //Miami
  1610612749: "#00471B",  //Milwaukee
  1610612750: "#78BE20",  //Minnesota
  1610612751: "#A0A0A3",  //Brooklyn
  1610612752: "#F58426",  //NY KNICKS
  1610612753: "#0B77BD",  //Orlando
  1610612754: "#002D62",  //Indiana
  1610612755: "#ED174C",  //Philly
  1610612756: "#F9A01B",  //Phoenix
  1610612757: "#B70927",  //Portland
  1610612758: "#5B2B82",  //Sacremento
  1610612759: "#C4CED4",  //San Antonio
  1610612760: "#007AC1",  //OKC
  1610612761: "#A0A0A3",  //Toronto
  1610612762: "#FFA400",  //Utah
  1610612763: "#002D62",  //Memphis
  1610612764: "#C4CED4",  //Washington
  1610612765: "#C8102E",  //Detroit
  1610612766: "#00788C",  //Charlotte

  ATL: "#E03A3E",  //Atlanta
  BOS: "#008248",  //Boston
  CLE: "#6F2633",  //Cleveland
  NOP: "#B4975A",  //NOLA
  CHI: "#CE1141",  //Chicago
  DAL: "#007DC5",  //Dallas
  DEN: "#FFC627",  //Denver
  GSW: "#FDB927",  //Golden State
  HOU: "#ff8080",  //Houston
  LAC: "#5571A7",  //LA Clippers
  LAL: "#552583",  //LA Lakers
  MIA: "#ff471a",  //Miami
  MIL: "#00471B",  //Milwaukee
  MIN: "#78BE20",  //Minnesota
  BKN: "#A0A0A3",  //Brooklyn
  NYK: "#F58426",  //NY KNICKS
  ORL: "#0B77BD",  //Orlando
  IND: "#002D62",  //Indiana
  PHI: "#ED174C",  //Philly
  PHX: "#F9A01B",  //Phoenix
  POR: "#B70927",  //Portland
  SAC: "#5B2B82",  //Sacremento
  SAS: "#C4CED4",  //San Antonio
  OKC: "#007AC1",  //OKC
  TOR: "#A0A0A3",  //Toronto
  UTA: "#FFA400",  //Utah
  MEM: "#002D62",  //Memphis
  WAS: "#C4CED4",  //Washington
  DET: "#C8102E",  //Detroit
  CHA: "#00788C",  //Charlotte
};


function bigImg(x) {
  var home = x.getAttribute("home_team_id");
  var away = x.getAttribute("away_team_id");
  x.children[0].style.backgroundImage = "linear-gradient(100deg, "+colors_dict[home]+" 20%, "+colors_dict[away]+" 34%)"
}

function normalImg(x) {
  var home = x.getAttribute("home_team_id");
  var away = x.getAttribute("away_team_id");
  x.children[0].style.backgroundImage = "linear-gradient(100deg, "+colors_dict[away]+" 20%, "+colors_dict[home]+" 34%)"
}



window.onresize = function(event) {
  resize();
};

function resize() {
  // TITLE FONT SCALING
  var baseTitle = document.getElementById("baseTitle");
  var relBaseTitleFontSize = baseTitle.offsetWidth*0.06;
  var titleDivs = document.getElementsByClassName("title");
  for(var i = 0; i < titleDivs.length; i++) {
      titleDivs[i].style.fontSize = relBaseTitleFontSize +'px';
  }
  // GENERIC FONT SCALING
  var fontDivs = document.getElementsByClassName("flexFont");
  for(var i = 0; i < fontDivs.length; i++) {
      var relFontSize = fontDivs[i].offsetWidth * fontDivs[i].getAttribute("text-size");
      fontDivs[i].style.fontSize = relFontSize+'px';
  }
}

function addBlur() {
  var divsfix = document.getElementsByClassName("blur");
  for(var i = 0; i < divsfix.length; i++) {
      divsfix[i].style.boxShadow ="0 0 3px 3px white inset";
  }
}

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
}

function mergePics(pic1, pic2, input_img) {
  var c = document.createElement("CANVAS");
  var ctx = c.getContext("2d");
  c.width=2860;
  c.height=1224;
  var imageObj1 = new Image();
  var imageObj2 = new Image();
  imageObj1.src = "/static/pictures/large_logos/" + pic1 + ".png" //away team
  imageObj1.onload = function() {
     ctx.drawImage(imageObj1, 100, 100);
     imageObj2.src = "/static/pictures/large_logos/" + pic2 + ".png";  //home team
     imageObj2.onload = function() {
        ctx.drawImage(imageObj2, 1480, 100);
        var merged_img = c.toDataURL("image/png");
        input_img.src = merged_img;
     }
  };
}

function setGames() {
  var form_data = $('<textarea />').html(DATA).text();  // Getting rid of HTML entity value
  var form_data_doub = form_data.replace(/'/g, '"');  // Changing single quotes to double quotes.
  // console.log(form_data_doub);
  var obj = JSON.parse(form_data_doub); //Parsing JSON
  var gamesList = document.getElementById("gamesList");

  for(var i = 0; i < obj.length; i++) {
    var div = document.createElement('div');
    var game = obj[i];
    var away_pts = game.away_pts;
    if(away_pts == ""){
      away_pts = "0";
    }
    var home_pts = game.home_pts;
    if(home_pts == ""){
      home_pts = "0";
    }
    // TODO: test if this works in other time zones
    var date = new Date(game.utc);
    var hour = (date.getHours() + 11)%12 + 1;
    var min = date.getMinutes();
    var time_day = "AM";
    if(date.getHours() >= 12)
    {
      time_day = "PM";
    }
    if(min < 10)
    {
      min = "0" + min;
    }
    var game_local_time = hour + ":" + min + " " + time_day;

    var titleOne = "Period:"
    var contentOne = game.cur_period;
    var titleTwo = "Time:"
    var contentTwo = game.clock;
    if(game.clock == "")
    {
      contentTwo = "Break"
    }
    if(game.game_active == 'False'){
      if(Number(game.home_pts) <= 0 || Number(game.away_pts) <= 0){ // Game hasn't started
        titleOne = "Start time:"
        contentOne = game_local_time;
        titleTwo = ""
        contentTwo = ""
      }
      else { // Game is over
        titleOne = "Game over"
        // console.log(game.home_pts + " " + game.away_pts)
        if(Number(game.home_pts) > Number(game.away_pts)) {
          contentOne = game.home_team + " wins!";
        }
        else {
          contentOne = game.away_team + " wins!";
        }
        titleTwo = ""
        contentTwo = ""
      }
    }



    div.innerHTML =
    '    <a href="/games/'+ game.id +'/" onmouseenter="bigImg(this)" onmouseleave="normalImg(this)" home_team_id='+ game.home_team_id +' away_team_id='+ game.away_team_id +' id=g'+ game.id +' >'+
    '      <div class="grid-x blur", style="background-image:linear-gradient(100deg, '+ colors_dict[game.away_team_id] +' 20%, '+ colors_dict[game.home_team_id] +' 34%);">'+
    '        <div class="small-7 medium-7 large-7 cell TEAMS">'+
    '          <img class="teamsImage">'+
    '          <div class="grid-x grid-padding-x small-up-2">'+
    '            <div class="cell flexFont", text-size="0.25", style="text-align:center;">'+
    '              <span>'+ away_pts +'</span>'+
    '            </div>'+
    '            <div class="cell flexFont", text-size="0.25", style="text-align:center;">'+
    '              <span>'+ home_pts +'</span>'+
    '            </div>'+
    '          </div>'+
    '        </div>'+
    '        <div class="small-5 medium-5 large-5 cell INFO">'+
    '          <div class="grid-y", style="height: 100%;">'+
    '            <div class="cell auto flexFont", text-size="0.15", style="text-align:center;">'+
    '              <span>'+ titleOne +'</span>'+
    '            </div>'+
    '            <div class="cell auto flexFont", text-size="0.15", style="text-align:center;">'+
    '              <span>'+ contentOne +'</span>'+
    '            </div>'+
    '            <div class="cell auto flexFont Padding", text-size="0.15", style="text-align:center;">'+
    '              <span>'+ titleTwo +'</span>'+
    '            </div>'+
    '            <div class="cell auto flexFont Padding", text-size="0.15", style="text-align:center;">'+
    '              <span>'+ contentTwo +'</span>'+
    '            </div>'+
    '          </div>'+
    '        </div>'+
    '      </div>'+
    '    </a>';
    while (div.children.length > 0) {
      gamesList.appendChild(div.children[0]);
    }
    var gameImage = document.getElementById('g' + game.id).getElementsByClassName('teamsImage')[0];
    mergePics(game.away_team_id, game.home_team_id, gameImage);
  }
  resize();
  addBlur();
}

// TODO: can clean this up, need to add % symbol in parsing the field goal Percentage
function setPeople() {
  var form_data = $('<textarea />').html(PLAYERS).text();  // Getting rid of HTML entity value
  var form_data_doub = form_data.replace(/'/g, '"');  // Changing single quotes to double quotes.
  // console.log(form_data_doub);
  var obj = JSON.parse(form_data_doub); //Parsing JSON
  var seasonPoints = document.getElementById("seasonPoints");
  var fieldPercentage = document.getElementById("fieldPercentage");
  var threesMade = document.getElementById("threesMade");

  for(var i = 0; i < 5; i++) {


    // Total Season Points
    full_name1 = obj[0][i]["name"].split(' '),
    first_name1 = full_name1[0],
    last_name1 = full_name1[full_name1.length - 1];
    first_initial1 = first_name1.charAt(0)
    var div1 = document.createElement('div');
    div1.setAttribute("class", "cell flexFont blur");
    div1.setAttribute("text-size", "0.15");
    div1.setAttribute("style", "background:"+ colors_dict[obj[0][i]["team"]] +";text-align:center;");
    div1.innerHTML =
    '  <div>'+ first_initial1 + '. ' + last_name1 + '</div>'+
    '  <div>'+ obj[0][i]["total_points"] +'</div>'+
    '  <img src="http://nba-players.herokuapp.com/players/'+last_name1+'/'+first_name1+'", style="padding: 5px;">';
    seasonPoints.appendChild(div1);

    // Field Goal Percentage
    full_name2 = obj[1][i]["name"].split(' ');
    first_name2 = full_name2[0];
    last_name2 = full_name2[full_name2.length - 1];
    first_initial2 = first_name2.charAt(0);
    // percentage_formatted = (obj[1][i]["field_percentage"]*100).toFixed(2) + '%';
    percentage_formatted = obj[1][i]["field_percentage"];
    var div2 = document.createElement('div');
    div2.setAttribute("class", "cell flexFont blur");
    div2.setAttribute("text-size", "0.15");
    div2.setAttribute("style", "background:"+ colors_dict[obj[1][i]["team"]] +";text-align:center;");
    div2.innerHTML =
    '  <div>'+ first_initial2 + '. ' + last_name2 +'</div>'+
    '  <div>'+ percentage_formatted +'</div>'+
    '  <img src="http://nba-players.herokuapp.com/players/'+last_name2+'/'+first_name2+'", style="padding: 5px;">';
    fieldPercentage.appendChild(div2);

    // Three-Pointers made
    full_name3 = obj[2][i]["name"].split(' '),
    first_name3 = full_name3[0];
    last_name3 = full_name3[1];
    extra = full_name3[full_name3.length - 1];
    last_name3_formatted = last_name3;
    if(extra != last_name3)
    {
      last_name3_formatted = last_name3 + "_" + extra.substring(0, extra.length-1);
    }
    first_initial3 = first_name3.charAt(0)
    var div3 = document.createElement('div');
    div3.setAttribute("class", "cell flexFont blur");
    div3.setAttribute("text-size", "0.15");
    div3.setAttribute("style", "background:"+ colors_dict[obj[2][i]["team"]] +";text-align:center;");
    console.log(last_name3_formatted);
    div3.innerHTML =
    '  <div>'+ first_initial3 + '. ' + last_name3 +'</div>'+
    '  <div>'+ obj[2][i]["threes_made"] +'</div>'+
    '  <img src="http://nba-players.herokuapp.com/players/'+last_name3_formatted+'/'+first_name3+'", style="padding: 5px;">';
    threesMade.appendChild(div3);
  }
}

// 1610612737 Atlanta
// 1610612738 Boston
// 1610612739 Cleveland
// 1610612740 NOLA
// 1610612741 Chicago
// 1610612742 Dallas
// 1610612743 Denver
// 1610612744 Golden State
// 1610612745 Houston
// 1610612746 LA Clippers
// 1610612747 LA Lakers
// 1610612748 Miami
// 1610612749 Milwaukee
// 1610612750 Minnesota
// 1610612751 Brooklyn
// 1610612752 NY KNICKS
// 1610612753 Orlando
// 1610612754 Indiana
// 1610612755 Philly
// 1610612756 Phoenix
// 1610612757 Portland
// 1610612758 Sacramento
// 1610612759 San Antonio
// 1610612760 OKC
// 1610612761 Toronto
// 1610612762 Utah
// 1610612763 Memphis
// 1610612764 Washington
// 1610612765 Detroit
// 1610612766 Charlotte
