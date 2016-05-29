angular.module('livescore', [])
.filter('numberFixedLen', function () {
    return function (n, len) {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        num = ''+num;
        while (num.length < len) {
            num = '0'+num;
        }
        return num;
    };
})
.controller('LivescoreController', function($scope, $http, $interval, $location) {

    var matchNumber = "1";
    $scope.teams = [];
    $scope.points = [];
    $scope.mins = 2;
    $scope.secs = 0;

    $scope.keyMode = false;

    var timerCountdowner;



    function startTimer() {
        $scope.mins = 2;
        $scope.secs = 0;

        if(!timerCountdowner) {
            timerCountdowner = $interval(function () {
                if ($scope.secs > 0) $scope.secs--;
                else if ($scope.mins > 0) {
                    $scope.mins--;
                    $scope.secs = 59;
                }
            }, 1000);
        }
    }

    $scope.keypress = function($event) {
        var keyPressed = String.fromCharCode($event.keyCode);

        if (keyPressed === "i") {
            $scope.keyMode = !$scope.keyMode;
        }

        if($scope.keyMode) {
            if (keyPressed === "n") {
                window.location = "/livescore.html?" + (parseInt(matchNumber) + 1);
            } else if (keyPressed === "p") {
                window.location = "/livescore.html?" + (parseInt(matchNumber) - 1);
            } else if (keyPressed === "s") {
                startTimer();
            } else if (keyPressed === "r") {
                window.location = "/results.html?" + (parseInt(matchNumber));
            }
        }
    }




    var splittedUrl = $location.absUrl().split("?", 2);
    if (splittedUrl.length > 1) {
      matchNumber = splittedUrl[1];
      splittedUrl = matchNumber.split("=", 2);
      if (splittedUrl.length > 1) {
        matchNumber = splittedUrl[1];
      }
    }

    function updateTableField(missionId, teamId, newValue) {
        console.log(missionId);
      if ($scope.points[missionId].team[teamId] != newValue) {
        $scope.points[missionId].team[teamId] = newValue;
        $scope.points[missionId].updated[teamId] = true;
        setTimeout(function() {
          $scope.points[missionId].updated[teamId] = false;
        }, 3000);
      }
    }

    $http.get("/tables/match/"+matchNumber)
    		.then(function(response) {
          console.log(response);
          for(var i=0;i<response.data.length;i++){
            $scope.teams[i] = {};
            $scope.teams[i].match = response.data[i]["_id"];
            $scope.teams[i].name = response.data[i].team.name;
            $scope.teams[i].total = 0;
          }
          console.log($scope.teams)
	      });

    $http.get("/missions")
    		.then(function(response) {
          console.log(response);
          //$scope.missions = response.data;

          for(var i =0 ; i < response.data.length; i++) {
            $scope.points[i] = {};
            $scope.points[i].name = response.data[i].name;
            $scope.points[i].team = [0, 0];
            $scope.points[i].updated=[];
          }
	      });


    function updatePoints(index) {
			$http.get("/scores/match/" + $scope.teams[index].match)
    		.then(function(response) {
        	var results = response.data.detailed;
          for(var i = 0; i < results.length; i++) {
            var id = results[i].mission.id-1;
            updateTableField(id, index, results[i].points);
          }

          $scope.teams[index].total = response.data.total;
          console.log(response.data);
	    });
    };
    setInterval(function() {
      updatePoints(0);
      updatePoints(1);
    }, 1000);


  });


