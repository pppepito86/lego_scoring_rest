angular.module('livescore', [])
.controller('ResultsController', function($scope, $http, $interval, $location) {

    $scope.title = "res";
    $scope.keyMode = true;

    var matchNumber = 1;
    var splittedUrl = $location.absUrl().split("?", 2);
    if (splittedUrl.length > 1) {
        matchNumber = splittedUrl[1];
        splittedUrl = matchNumber.split("=", 2);
        if (splittedUrl.length > 1) {
            matchNumber = splittedUrl[1];
        }
    }

    $http.get("/scores/results")
        .then(function(response) {
            $scope.results = response.data;

            for(entry in $scope.results) {
                $scope.results[entry].final = 0;

                for(var roundId = 0; roundId < Math.min(3, $scope.results[entry].points.length); roundId++) {
                    $scope.results[entry].final = Math.max($scope.results[entry].points[roundId],  $scope.results[entry].final);
                }
            }
        });

    $scope.keypress = function($event) {
        var keyCode = $event.keyCode != 0 ? $event.keyCode : $event.which;
        var keyPressed = String.fromCharCode(keyCode);

        if (keyPressed === "i") {
            $scope.keyMode = !$scope.keyMode;
        }

        if($scope.keyMode) {
            if (keyPressed === "n") {
                window.location = "/livescore.html?" + (parseInt(matchNumber) + 1);
            } else if (keyPressed === "p") {
                window.location = "/livescore.html?" + (parseInt(matchNumber) - 1);
            } else if (keyPressed === "s") {
                //startTimer();
            } else if (keyPressed === "r") {
                window.location = "/livescore.html?" + parseInt(matchNumber);
            }
        }
    }
});


