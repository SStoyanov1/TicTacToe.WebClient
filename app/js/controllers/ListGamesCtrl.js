/**
 * Created by Stoyan on 9/27/2014.
 */

'use strict';

app.controller('ListGamesCtrl', ['$scope', '$location', 'notifier', '$q', 'games', 'identity', function($scope, $location, notifier, $q, games, identity) {
    $scope.playGame = function(id) {
        $location.path('/game/' + id);
    };

    $scope.joinGame = function(id) {
        games.joinGame(id)
            .then(function(data) {
                notifier.success('Successfully joined the game');
                $location.path('/games');
            });
    };

    $scope.currentPlayer = identity.getCurrentUser().userName;

    var availableGames = function getAvailableGames() {
        games.getAvailableGames()
            .then(function(data) {
                if (data){
                    $scope.availableGames = data;
                    if (data.length > 0)
                    {
                        $scope.availableGamesExist = true;
                    }
                    else {
                        $scope.availableGamesExist = false;
                    }
                }
                else {
                    notifier.error('Games could not be get');
                }});
    };

    var myGames = function getMyGames() {
        games.getMyGames()
            .then(function(data) {
                if (data){
                    $scope.myGames = data;
                    if (data.length > 0)
                    {
                        $scope.myGamesExist = true;
                    }
                    else {
                        $scope.myGamesExist = false;
                    }
                }
                else {
                    notifier.error('Games could not be get');
                }});
    };

    var joinedGames = function getJoinedGames() {
        games.getJoinedGames()
            .then(function(data) {
                if (data){
                    $scope.joinedGames = data;
                    if (data.length > 0)
                    {
                        $scope.joinedGamesExist = true;
                    }
                    else {
                        $scope.joinedGamesExist = false;
                    }
                }
                else {
                    notifier.error('Games could not be get');
                }});
    };

    availableGames();
    myGames();
    joinedGames();
}]);