
app.service("userServices", ["$http", "$rootScope", function ($http, $rootScope) {

    var service = this;

    //-----
    //USERS
    //-----

    //REGISTERING USER - ADDING TO DB
    service.RegUser = function(userInfo){
        JSON.stringify(userInfo);
        return $http({
            method: 'POST',
            url: 'http://localhost/ezt/index.php/api/users/userReg',
            data: userInfo,
            body: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
    }

    //LOGIN USER - Checking server for username and password
    service.LoginUser = function(userInfo){
        return $http({
            method: 'POST',
            url: 'http://localhost/ezt/index.php/api/users/userLogin',
            data: userInfo,
            body: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
    }

    //----------
    //COSTUMERS
    //----------

    //GETING ALL USER COSTUMERS
    service.GetAllCustomers = function(id){
        return $http.get("http://localhost/ezt/index.php/api/customers/customers/id/"+ id);
    }

    //ADD CUSTOMER TO DB
    service.AddCustomer = function(customerData){
        return $http({
            method: 'POST',
            url: 'http://localhost/ezt/index.php/api/customers/customerAdd',
            data: customerData,
            body: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
    }

    //UPDATE CUSTOMER IN DB
    service.UpdateCustomer = function(customerData){
        return $http({
            method: 'POST',
            url: 'http://localhost/ezt/index.php/api/customers/customerUpdate',
            data: customerData,
            body: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
    }

    //DELETE CUSTOMER FROM DB
    service.DeleteCustomer = function(customerId){
        return $http.delete('http://localhost/ezt/index.php/api/customers/customer/id/'+customerId);
    }

    //GET CITIES FROM SERVER
    service.GetCities = function(){
        return $http.get("http://localhost/ezt/index.php/api/customers/cities");
    }


    return service;
}])
