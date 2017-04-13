var app = angular.module("eztApp", ["ui.router", "ngAnimate"]);
app.config(["$urlRouterProvider", "$stateProvider", function ($urlRouterProvider, $stateProvider) {

    //Setting view routs
    $stateProvider
     .state('index', {
            url: '/',
            templateUrl: 'public/Views/home.html',

        })
        .state('home', {
            url: '/home',
            templateUrl: 'public/Views/home.html',

        })
        .state('login', {
            url: '/login',
            templateUrl: 'public/Views/login.html',
        })
        .state('register', {
         url:'/register',
         templateUrl:'public/Views/register.html',
         })
        .state('backoffice', {
            url: '/backoffice',
            templateUrl: 'public/Views/backoffice.html',
        })
        .state('customers', {
            url: '/customers',
            templateUrl: 'public/Views/customers.html',
        })
        .state('add', {
            url: '/customers/add',
            templateUrl: 'public/Views/edit.html',
        })
        .state('edit', {
            url: '/customers/edit',
            templateUrl: 'public/Views/edit.html',
        })
        .state('upload', {
            url: '/upload',
            templateUrl: 'public/Views/upload.html',
        })


   $urlRouterProvider.otherwise('/');
}]).run(["$rootScope", "$state", 'userServices', function ($rootScope, $state, userServices) {
    //Option to check if user logged in
    //if not, navigate to login screen
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            if (!$rootScope.isLoggedIn && toState.name != "login") {
                if(toState.name == "register")return
                event.preventDefault();
                $state.go("login")
            }
        })
}])