app.controller("customers_ctrl",['$scope','$rootScope','userServices', '$state',function($scope,$rootScope,userServices, $state){

    //all customers
    $scope.customers = [];

    //selected customer
    $rootScope.selectedCostumer = {};

    //Mode (bool): true=edit false=new
    $rootScope.edit = false;

    //Get all customers Function
    var getAllCustomers = function(){
        var req = userServices.GetAllCustomers($rootScope.userLogged.id);
        req.then(function(res){
            //console.log(res.data);
            if(res.data){
                $scope.customers = res.data.data;
                //Request cities
                //getCities();
            } else{
                console.log("no data");
            }
        },function(err){
            console.log(err);
        })
    }

    //Delete Costumer by ID
    $scope.deleteCustomer = function(id){
        var req = userServices.DeleteCustomer(id);
        req.then(function(res){
            getAllCustomers();
        },function(err){
            console.log(err);
        })
    }

    //Set selected Customer to rootScope for edit
    $scope.editCustomer = function(id){
        var cust = $scope.customers;
        var index;
        //find at customer index by id
        for (var i = 0; i < cust.length; i++) {
            if(cust[i].id == id){
                index = i;
            }
        }
        //set selectedCustomer
        $rootScope.selectedCostumer = $scope.customers[index];
        //go to edit page
        $rootScope.edit = true;
        $state.go("edit");
    }


    //Set Gender value in Options
    $scope.selectedGender = function(string){if(string == "female"){return true;}
    }

    //Get city name from city_id
    $scope.getCityById = function(id){
        if($scope.citiesData <1)return
        return $scope.citiesData[id].city_name;
    }

    //Filter
    $scope.filterCustomers = function (customer , value) {
        return $scope.customers.name == 'search'
    }

    //Get all Customers on page load
    getAllCustomers();

}])