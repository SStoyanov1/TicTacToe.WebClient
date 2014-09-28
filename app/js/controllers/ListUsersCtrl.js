/**
 * Created by Stoyan on 9/28/2014.
 */

'use strict';

app.controller('ListUsersCtrl',
    function ListUsersController($scope, users, baseServiceUrl) {
        users
            .getUsers()
            .then(function (data) {
                $scope.users = data;
            });
    }
);