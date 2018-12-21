from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
import urllib, json
import urllib.request
import time
import requests
from datetime import datetime, timedelta


from . import models
from . import forms
import datascraper

# Create your views here.


def index(request):
    list_of_players = []
    total_points_url = "http://stats.nba.com/stats/leagueleaders/?StatCategory=PTS&LeagueID=00&PerMode=Totals&Season=2018-19&SeasonType=Regular%20Season&Scope=S"
    field_percentage_url = "http://stats.nba.com/stats/leagueleaders/?StatCategory=AST&LeagueID=00&PerMode=Totals&Season=2018-19&SeasonType=Regular%20Season&Scope=S"
    threes_made_url = "http://stats.nba.com/stats/leagueleaders/?StatCategory=FG3M&LeagueID=00&PerMode=Totals&Season=2018-19&SeasonType=Regular%20Season&Scope=S"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'}

    # TOTAL POINTS
    response = requests.get(total_points_url, headers=headers)
    data = response.json()
    total_points = []
    for x in range(5):
        dict_test_players = {'name':data['resultSet']['rowSet'][x][2],
                             'total_points':data['resultSet']['rowSet'][x][23],
                             'team':data['resultSet']['rowSet'][x][3]
        }
        total_points.append(dict_test_players)
    list_of_players.append(total_points)

    # FIELD PERCENTAGE
    response = requests.get(field_percentage_url, headers=headers)
    data = response.json()
    field_percentage = []
    for x in range(5):
        dict_test_players = {'name':data['resultSet']['rowSet'][x][2],
                             'field_percentage':data['resultSet']['rowSet'][x][18],
                             'team':data['resultSet']['rowSet'][x][3]
        }
        field_percentage.append(dict_test_players)
    list_of_players.append(field_percentage)

    # THREES MADE
    response = requests.get(threes_made_url, headers=headers)
    data = response.json()
    threes_made = []
    for x in range(5):
        dict_test_players = {'name':data['resultSet']['rowSet'][x][2],
                             'threes_made':data['resultSet']['rowSet'][x][9],
                             'team':data['resultSet']['rowSet'][x][3]
        }
        threes_made.append(dict_test_players)
    list_of_players.append(threes_made)

    # TODAYS GAMES
    dictonary = {}
    list_of_games = []
    # Time is 4 hours behind pacfic time
    full_time = datetime.today() - timedelta(hours=12, minutes=0)
    date = full_time.strftime('%Y%m%d')

    # with urllib.request.urlopen("http://data.nba.net/data/10s/prod/v1/20181213/scoreboard.json") as url:
    with urllib.request.urlopen("http://data.nba.net/data/10s/prod/v1/" + date +"/scoreboard.json") as url:
        s = url.read()
    data = json.loads(s)
    for game in data['games']:
        dict_test = {'id':game['gameId'],
                     'home_team':game['hTeam']['triCode'],
                     'away_team':game['vTeam']['triCode'],
                     'home_team_id':game['hTeam']['teamId'],
                     'away_team_id':game['vTeam']['teamId'],
                     'home_pts':game['hTeam']['score'],
                     'away_pts':game['vTeam']['score'],
                     'utc':game['startTimeUTC'],
                     'clock':game['clock'],
                     'game_active':str(game['isGameActivated']),
                     'cur_period':game['period']['current']}
        list_of_games.append(dict_test)

    context = {"title":"NBA Stats",
    "class_name":"CINS465 Hello World",
    "data":list_of_games,
    "players": list_of_players
    }
    return render(request, "index.html", context=context)

def rest_suggestion(request):
    if request.method == 'GET':
        suggestions = models.SuggestionModel.objects.all()
        list_of_suggestions=[]
        for suggest in suggestions:
            list_of_suggestions+=[{
                "suggestion":suggest.suggestion,
                "id":suggest.id
            }]
        return JsonResponse({"suggestions":list_of_suggestions})
    else:
        return HttpResponse("Invalid HTTP Method")

def westernconference(request):
    # myDict = {}
    # with urllib.request.urlopen("http://data.nba.net/data/10s/prod/v1/20181015/standings_conference.json") as url:
    #     s = url.read()
    # data = json.loads(s)
    # for team in data['league']['standard']['conference']['west']:
    #     list = [0]
    #     myDict[team['teamId']] = list
    #
    #
    #
    # for x in range(16, 32):
    #     with urllib.request.urlopen("http://data.nba.net/data/10s/prod/v1/201810"+ str(x) +"/standings_conference.json") as url:
    #         s = url.read()
    #     data = json.loads(s)
    #     for team in data['league']['standard']['conference']['west']:
    #         if(myDict[team['teamId']][-1] != int(team['win'])-int(team['loss'])):
    #             myDict[team['teamId']].append(int(team['win'])-int(team['loss']))
    print(datascraper.westernJSON)
    print(datascraper.easternJSON)

    context = {"title":"Western Conference",
               "class_name":"CINS465 Hello World",
               "tester":datascraper.westernJSON,
              }
    return render(request, "conference.html", context=context)

def easternconference(request):
    context = {"title":"Eastern Conference",
               "tester":datascraper.easternJSON,
              }
    return render(request, "conference.html", context=context)

def game(request, game_id):
    dictonary = {}
    list_of_game_stats = []
    # Time is 4 hours behind pacfic time
    full_time = datetime.today() - timedelta(hours=12, minutes=0)
    date = full_time.strftime('%Y%m%d')
    time_python_utc = datetime.utcnow().isoformat()
    # with urllib.request.urlopen("http://data.nba.net/data/10s/prod/v1/20181105/0021800140_mini_boxscore.json") as url:
    with urllib.request.urlopen("http://data.nba.net/data/10s/prod/v1/" + date + "/" + game_id +"_mini_boxscore.json") as url:
        s = url.read()
    data = json.loads(s)
    dict_test = {'home_team_id':data['basicGameData']['hTeam']['teamId'],
                 'away_team_id':data['basicGameData']['vTeam']['teamId'],
                 'home_pts':data['basicGameData']['hTeam']['score'],
                 'away_pts':data['basicGameData']['vTeam']['score'],
                 'start_time':data['basicGameData']['startTimeUTC'],
                 'game_active':str(data['basicGameData']['isGameActivated']),
                 }
    list_of_game_stats.append(dict_test)
    context = {"game_id":game_id,
               "data":list_of_game_stats,
               "python_start_time":time_python_utc,
              }
    return render(request, "game.html", context=context)

def playground(request):
        list_of_players = []
        total_points_url = "http://stats.nba.com/stats/leagueleaders/?StatCategory=PTS&LeagueID=00&PerMode=Totals&Season=2018-19&SeasonType=Regular%20Season&Scope=S"
        field_percentage_url = "http://stats.nba.com/stats/leagueleaders/?StatCategory=FG_PCT&LeagueID=00&PerMode=Totals&Season=2018-19&SeasonType=Regular%20Season&Scope=S"
        threes_made_url = "http://stats.nba.com/stats/leagueleaders/?StatCategory=FG3M&LeagueID=00&PerMode=Totals&Season=2018-19&SeasonType=Regular%20Season&Scope=S"
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'}

        # TOTAL POINTS
        response = requests.get(total_points_url, headers=headers)
        data = response.json()
        total_points = []
        for x in range(5):
            dict_test_players = {'name':data['resultSet']['rowSet'][x][2],
                                 'total_points':data['resultSet']['rowSet'][x][23],
                                 'team':data['resultSet']['rowSet'][x][3]
            }
            total_points.append(dict_test_players)
        list_of_players.append(total_points)

        # FIELD PERCENTAGE
        response = requests.get(field_percentage_url, headers=headers)
        data = response.json()
        field_percentage = []
        for x in range(5):
            dict_test_players = {'name':data['resultSet']['rowSet'][x][2],
                                 'field_percentage':data['resultSet']['rowSet'][x][8],
                                 'team':data['resultSet']['rowSet'][x][3]
            }
            field_percentage.append(dict_test_players)
        list_of_players.append(field_percentage)

        # THREES MADE
        response = requests.get(threes_made_url, headers=headers)
        data = response.json()
        threes_made = []
        for x in range(5):
            dict_test_players = {'name':data['resultSet']['rowSet'][x][2],
                                 'threes_made':data['resultSet']['rowSet'][x][9],
                                 'team':data['resultSet']['rowSet'][x][3]
            }
            threes_made.append(dict_test_players)
        list_of_players.append(threes_made)

        # TODAYS GAMES
        dictonary = {}
        list_of_games = []
        # Time is 4 hours behind pacfic time
        full_time = datetime.today() - timedelta(hours=12, minutes=0)
        date = full_time.strftime('%Y%m%d')

        # with urllib.request.urlopen("http://data.nba.net/data/10s/prod/v1/20181213/scoreboard.json") as url:
        with urllib.request.urlopen("http://data.nba.net/data/10s/prod/v1/" + date +"/scoreboard.json") as url:
            s = url.read()
        data = json.loads(s)
        for game in data['games']:
            dict_test = {'id':game['gameId'],
                         'home_team':game['hTeam']['triCode'],
                         'away_team':game['vTeam']['triCode'],
                         'home_team_id':game['hTeam']['teamId'],
                         'away_team_id':game['vTeam']['teamId'],
                         'home_pts':game['hTeam']['score'],
                         'away_pts':game['vTeam']['score'],
                         'utc':game['startTimeUTC'],
                         'clock':game['clock']}
            list_of_games.append(dict_test)

        context = {"title":"Awesome",
        "class_name":"CINS465 Hello World",
        "data":list_of_games,
        "players": list_of_players
        }
        return render(request, "playground.html", context=context)
