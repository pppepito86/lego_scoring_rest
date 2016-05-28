angular.module('livescore', [])
.controller('LivescoreController', function($scope, $http) {

    $scope.teams = [];
    $scope.points = [];

    function updateTableField(missionId, teamId, newValue) {

      if ($scope.points[missionId].team[teamId] != newValue) {
        $scope.points[missionId].team[teamId] = newValue;
        $scope.points[missionId].updated[teamId] = true;
        setTimeout(function() {
          $scope.points[missionId].updated[teamId] = false;
        }, 3000);
      }
    }

    $http.get("/tables/match/1")
    		.then(function(response) {
          console.log(response);
          for(var i=0;i<response.data.length;i++){
            $scope.teams[i] = {};
            $scope.teams[i].match = response.data[i]["_id"];
            $scope.teams[i].name = response.data[i].team.name;
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


