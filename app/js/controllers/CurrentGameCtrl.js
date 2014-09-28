/**
 * Created by Stoyan on 9/27/2014.
 */

'use strict';

app.controller('CurrentGameCtrl', ['$routeParams','$scope', '$location', 'notifier', '$q', 'games', 'identity', function($routeParams, $scope, $location, notifier, $q, games, identity) {


    var getCurrentGame = function(id) {
        if ($location.path().indexOf('/game/') === -1) {
            clearInterval(timer);
            return;
        };

        games.getCurrentGame(id)
            .then(function(data) {
                $scope.board = data.Board;
                $scope.hasTwoPlayers = data.FirstPlayerName && data.SecondPlayerName;
                if ($scope.hasTwoPlayers) {
                    $scope.currentPlayer = identity.getCurrentUser().userName;
                    $scope.firstPlayer = data.FirstPlayerName;
                    $scope.secondPlayer = data.SecondPlayerName;
                }
                if (data.FirstPlayerName === identity.getCurrentUser().userName && data.State == 2 ||
                    data.FirstPlayerName !== identity.getCurrentUser().userName && data.State == 1) {
                    $scope.cursorClass = 'notAllowed';
                }
                $scope.gameStatus = data.State;
                var locationPath = '/game/' + data.Id;
                $location.path(locationPath);
                if ([0, 3, 4, 5].indexOf(data.State) !== -1) {
                    clearInterval(timer);
                    $scope.cursorClass = 'notAllowed';
                    return;
                }
            });
    };

    getCurrentGame($routeParams.id);
    var timer = setInterval(function(){getCurrentGame($routeParams.id)}, 2000);

    $scope.click = function (row, col) {
        if ($scope.board[row * 3 + col] === '-' && [0, 3, 4, 5].indexOf($scope.gameStatus) === -1) {
            games.playGame($routeParams.id, row + 1, col + 1)
                .then(function () {
                    getCurrentGame($routeParams.id);
                }, function (e) {
                    console.log(e)
                });
        }
    }
}]);