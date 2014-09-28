/**
 * Created by Stoyan on 9/27/2014.
 */

'use strict';

app.factory('games', ['$http', '$q', 'identity', 'authorization', 'baseServiceUrl', function($http, $q, identity, authorization, baseServiceUrl) {
    var usersApi = baseServiceUrl + '/api/users';

    return {
        playGame: function (gameId, row, col) {
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
            $http.post(baseServiceUrl + '/api/Games/Play', {
                    GameId: gameId,
                    Row: row,
                    Col: col
                },
                {
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    headers: headers
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        },

        getCurrentGame: function(id) {
            var deferred = $q.defer();
            var currentGame = { GameId: id };
            var headers = authorization.getAuthorizationHeader();

            $http.post(baseServiceUrl + '/api/games/status', currentGame,
                {
                    headers: headers })
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject();
                });

            return deferred.promise;
        },
        joinGame: function(id) {
            var deferred = $q.defer();
            var gameToJoin = { GameId: id };
            var headers = authorization.getAuthorizationHeader();

            $http.post(baseServiceUrl + '/api/games/join', gameToJoin,
                {
                    headers: headers })
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject();
                });

            return deferred.promise;
        },
        createGame: function(game) {
            var deferred = $q.defer();
            var game = { Name: game.Name };
            var headers = authorization.getAuthorizationHeader();
            $http.post(baseServiceUrl + '/api/games/create', game,
                {
                    headers: headers })
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject();
                });

            return deferred.promise;
        },
        getAvailableGames : function() {
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            $http.get(baseServiceUrl + '/api/games/availablegames',
                {
                    headers: headers })
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject();
                });

            return deferred.promise;
        },
        getMyGames : function() {
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            $http.get(baseServiceUrl + '/api/games/mygames',
                {
                    headers: headers })
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject();
                });

            return deferred.promise;
        },
        getJoinedGames : function() {
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            $http.get(baseServiceUrl + '/api/games/joinedgames',
                {
                    headers: headers })
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject();
                });

            return deferred.promise;
        }
    }
}])