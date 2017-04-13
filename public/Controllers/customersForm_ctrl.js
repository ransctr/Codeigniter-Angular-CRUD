app.controller("customersForm_ctrl",['$scope','$rootScope','userServices', '$state',function($scope,$rootScope,userServices, $state){
    $scope.formMsg="";


    //Get values from rootscope to local var
    var cust = $rootScope.selectedCostumer;

    function init() {
        if($state.current.name ==="edit"){
            //if no selected customer - get back to customers page
            if(!cust){
                $state.go("customers");
                return
            }
            getCustomerValues();
        } else{
            resetCustomerForm()
        }
    }

    //Get selected customer data and set values
    getCustomerValues = function(){
        $scope.formInput = {};
        $scope.formInput.name = cust.name;
        $scope.formInput.email = cust.email;
        $scope.formInput.phone = cust.phone;
        $scope.formInput.age = cust.age;
        $scope.formInput.gender = cust.gender;
        $scope.citySelect = $scope.citiesData[cust.city_id];
    }

    //Clear all Values
    resetCustomerForm = function(){
        $scope.formInput = {};
        $scope.formInput.name = "";
        $scope.formInput.email = " ";
        $scope.formInput.phone = "";
        $scope.formInput.age = "";
        $scope.formInput.gender = "female";

    }


    //Find Selected city for Options
    $scope.selectedCity = function(num, x){
        if(num==x){return true} else{return false}
    };


    //Update Customer
    $scope.updateCustomer = function(valid){
        //Check if form is not valid
        if(!valid){
            $scope.formMsg = "Invalid Form Please check fields";
            return
        }
        $scope.formInput.id = cust.id;
        $scope.formInput.city_id = parseInt($scope.citySelect.id)-1;
        //console.log($scope.formInput)
        var req = userServices.UpdateCustomer($scope.formInput);
        req.then(function(res){
            $state.go("customers");
        })
    }

    //Add Customer
    $scope.addCustomer = function(valid){
        if(!valid){
            $scope.formMsg = "Invalid Form Please check fields";
            return
        }
        $scope.formInput.city_id = parseInt($scope.citySelect.id)-1;
        $scope.formInput.user_id = $rootScope.userLogged.id;
        //console.log($scope.formInput)
        var req = userServices.AddCustomer($scope.formInput);
        req.then(function(res){
            $state.go("customers");
        })
    }

    init()

}])