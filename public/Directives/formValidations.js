//Checking if text have at least x letters
app.directive('chrLimit', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                /*characters limit for text*/
                var chrLimit = 1;
                /*characters limit for password*/
                if(attr.type=='password'){
                    chrLimit = 5;
                }
                if (value.length>chrLimit ) {
                    mCtrl.$setValidity('chrLimit', true);
                } else {
                    mCtrl.$setValidity('chrLimit', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});

//Compering password1 and password2 to confirm
app.directive('comparePass', function() {
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: "=comparePass"
        },
        link: function(scope, element, attributes, ngModel) {
            /*Comparing pass1 and pass2*/
            ngModel.$validators.compareTo = function(modelValue) {
                if(!scope.otherModelValue)return
                return modelValue == scope.otherModelValue;
            };
            /*Changing validation for input*/
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };

});