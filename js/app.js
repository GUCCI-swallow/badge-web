var app = angular.module('badgeApp', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: '../template/top.html',
            controller: 'searchController'
        })
    .when('/detail/:id', {
        templateUrl: '../template/detail.html',
        controller: 'detailController'
    })
    .otherwise({
        redirectTo: '/'
    });
});

app.controller('searchController', ['$scope','$location', function($scope, $location){
    $scope.onClick = function(){
        if(!$scope.query)console.log('Not param!');return false;
        $location.path('/detail/' + $scope.query);
    }
}]);

app.controller('detailController', ['$scope','$http','$routeParams', function($scope, $routeParams, $http){
    console.log(!!$routeParams.id);
    if(angular.isDefined($routeParams.id) && !!$routeParams.id){
        var id = $routeParams.id;
        console.log(id);

        $http({
            method: '',
            url: '',
            params: {
            }
        })
        .success(function(data, status){

        })
        .error(function(data, status){

        });



    }
}]);
