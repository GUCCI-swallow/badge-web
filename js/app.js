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
        $location.path('/detail/' + $scope.query);
    }
}]);

app.controller('detailController', ['$scope','$http','$routeParams', function($scope, $routeParams, $http){
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

    $scope.isOverlay = false;


    //overlayを開く
    $scope.openOverlay = function(){
        console.log("open");
        $scope.isOverlay = !$scope.isOverlay;
    }

    //overlayを閉じる
    $scope.closeOverlay = function(){
        $scope.isOverlay = !$scope.isOverlay;
    }
}]);
