
<!doctype html>
<html lang="en" ng-app="eztApp">
    <head>
        <meta charset="UTF-8">
        <title>EZT</title>
        <!-- CSS -->
        <link rel="stylesheet" href="public/vendors/bootstrap/dist/css/bootstrap.css">
        <link rel="stylesheet" href="public/css/style.css">
    </head>
    <body ng-controller="ctrl">
        <div class="jumbotron">
            <div class="container text-center">
                <h1 ui-sref="backoffice">EZT</h1>
            </div>
        </div>
        <div class="container">
            <div ui-view></div>
        </div>

        <!--   SCRIPTS   -->
        <!-- Vendors -->
        <script src="public/vendors/jquery/dist/jquery.js"></script>
        <script src="public/vendors/bootstrap/dist/js/bootstrap.js"></script>

        <!-- Angular external libraries for application -->
        <script src="public/js/angular/angular.js"></script>
        <script src="public/js/angular-ui-router/release/angular-ui-router.js"></script>
        <script src="public/js/angular-animate/angular-animate.js"></script>

        <!-- Angular  Application -->
        <script src="public/app.js"></script>
        <!-- Angular  Controllers -->
        <script src="public/Controllers/ctrl.js"> </script>
        <script src="public/Controllers/userForm_ctrl.js"> </script>
        <script src="public/Controllers/customers_ctrl.js"> </script>
        <script src="public/Controllers/customersForm_ctrl.js"> </script>
        <!-- Angular  Directives-->
        <script src="public/Directives/formValidations.js"> </script>
        <!-- Angular  Services -->
        <script src="public/Services/userServices.js"> </script>

        <!-- JS -->
        <script src="public/js/uploadScript.js"></script>
    </body>
</html>

