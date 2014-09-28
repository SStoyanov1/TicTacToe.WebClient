'use strict';

app.controller('CreateGameCtrl', ['$scope', '$location', 'notifier', '$q', 'games', function($scope, $location, notifier, $q, games) {
    $scope.createNewGame = function(game) {
        if (game.Name.length < 3 || game.Name.length > 20)
        {
            notifier.error('Game name must be between 3 and 20 symbols.');
        }
        else
        {
            games.createGame(game)
                .then(function(data) {
                    if (data){
                        notifier.success('Successfully created new game');
                        $location.path('/games');
                    }
                    else {
                        notifier.error('New game was not created');
                    }});
        };
    };
}]);