var app = angular.module('badgeApp', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: '../template/top.html',
            controller: 'searchController'
        })
    .when('/detail', {
        templateUrl: '../template/detail.html',
        controller: 'detailController'
    /*})
    .otherwise({
        redirectTo: '/'
    */});
});

app.controller('searchController', ['$rootScope','$scope','$location','$http', function($rootScope, $scope, $location, $http){
    $scope.onClick = function(){
        var domain = "https://lit-reef-92263.herokuapp.com/api";
        var q = $scope.query;
        console.log(q);
        $http({
            method: 'GET',
            url: domain + '/getpub?q=' + q
        })
        .success(function(data, status){
            console.log(data);
            if(data.status == 200){
                console.log('success');
                $rootScope.pub = data.publicKey;
                $location.path('/detail');
            }
        })
        .error(function(data, status){
            console.log('error');
        });

    }
}]);

app.controller('detailController', ['$rootScope', '$scope','$http', function($rootScope, $scope, $http){
    var domain = 'https://bot.mizuki.co';

    //バッジごとのデータ
    var bdl = {
        "computer": [],
        "academy": [],
        "club": [],
        "other": [],
        "research": [],
        "work": []
    }

    //渡ってきたパラメーターのチェック
    if(angular.isDefined($rootScope.pub) && !!$rootScope.pub){
        var key = $rootScope.pub;
        console.log(key);

        //アカウント情報
        $http({
            method: 'GET',
            url: domain + '/account?uuid=' + sha3_256(key)
        })
        .success(function(data, status){
            console.log('success');
            console.log(data);

            //名前を保存
            $scope.alias = data.alias;

            data.badgelist.forEach(function(el){
                bdl[el.category].push(el);
            });

            console.log(bdl);

        })
        .error(function(data, status){
            console.log('error');
        });


        //ヒストリー
        $http({
            method: 'GET',
            url: domain + '/history/transaction?uuid=' + sha3_256(key)
        })
        .success(function(data, status){
            console.log('success');
            console.log(data);

            $scope.histories = data.history;
        })
        .error(function(data, status){
            console.log('error');
        });

    }else{
        console.log("No param!!");
    }


    //オーバーレイ出力判定
    $scope.isOverlay = false;

    //overlayを開く
    var openOverlay = function(){
        console.log("open");
        $scope.isOverlay = !$scope.isOverlay;
    }

    //overlayを閉じる
    $scope.closeOverlay = function(){
        $scope.isOverlay = !$scope.isOverlay;
    }

    
    $scope.detailList = [];
    $scope.onClickImg = function(c){
        $scope.detailList = bdl[c];
        console.log(c);
        console.log($scope.detailList);
        openOverlay();
    }

    $scope.onClickDetailList = function(i,e){
        console.log(i);
        e.preventDefault();
    }

    //日付変換
    $scope.transTimeStamp = function(t){
        console.log(t);
            var date = new Date(t*1000);
            console.log(date);
            var year = date.getFullYear();
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            var day = ("0" + date.getDate()).slice(-2);
            var date_format = year + "/" + month + "/" + day;
            return date_format;
    }
}]);
