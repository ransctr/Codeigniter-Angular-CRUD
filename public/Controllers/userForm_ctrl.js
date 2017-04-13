app.controller("userForm_ctrl",['$scope','$rootScope','userServices', '$state',function($scope,$rootScope,userServices, $state){

    $scope.formMsg="";

    $scope.formInput = {};
    $scope.formInput.email = " ";
    $scope.formInput.password = "";

    //Logged user data
    $rootScope.userLogged={};

    /*Register Function*/
    $scope.registerUser = function(valid){
        //Check if form is not valid
        if(!valid){
            $scope.formMsg = "Invalid Form Please check fields";
            return
        }
        //Send Register request
        var req = userServices.RegUser($scope.formInput);
        //Response
        req.then(function(res){
            if(res.data.status){
                //User Created Successfully
                $scope.formMsg ="";
                $state.go("login")
            } else{
                //Something went wrong
                $scope.formMsg=res.data.message;
            }

        },function(err){
            console.log(err);
        })
    }


    /*Login Function*/
    $scope.loginUser = function(valid){
        //Check if form is not valid
        if(!valid){
            $scope.formMsg = "Invalid Form Please check fields";
            return
        }
        //Send login request
        var req = userServices.LoginUser($scope.formInput);
        req.then(function(res){
            /*console.log(res.data.status)*/
            if(res.data.status){
                $rootScope.isLoggedIn = true;
                $rootScope.userLogged = res.data.data;
                $state.go("backoffice");

            } else{
                $scope.formMsg=res.data.message;
            }

        },function(err){
            console.log(err);
        })
    }

}])