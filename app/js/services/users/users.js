/**
 * Created by Stoyan on 9/28/2014.
 */

app.factory('users', function ($resource, $http, $q, baseServiceUrl) {
    return {
        getUsers: function () {
            var deferred = $q.defer();

            $http.get(baseServiceUrl + '/api/Users/All')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }
    }
});
