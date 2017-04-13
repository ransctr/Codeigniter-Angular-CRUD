app.controller("ctrl",['$scope','$rootScope','userServices', '$state',function($scope,$rootScope,userServices, $state){


    //User logged in?
    $rootScope.isLoggedIn = false;

    //Citieis list from db
    $scope.citiesData = [];

    $scope.logout = function(){
        $rootScope.isLoggedIn = false;
        $state.go("login");
    }

    var getCities = function () {
        var req = userServices.GetCities();
        req.then(function(res) {
            if(res.data) {
                $scope.citiesData = res.data.data;
            } else{
                console.log("no data");
            }
        })
    }

    getCities();

}]);