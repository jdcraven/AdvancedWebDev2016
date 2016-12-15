// Creating the Angular App module adding ngRoute to use later
// function wrapper serves as a way not to create global variable within JavaScript code
(function() {
    'use strict';
    angular
        .module('app', ['ngRoute'])
        .config(config);
    config.$inject = ['$routeProvider'];
    
    function config($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'js/phone-list.template.html',
                controller: 'PhoneListController',
                controllerAs: 'vm'
            }).
            when('/phones/:phoneId', {
                templateUrl: 'js/phone-detail.template.html',
                controller: 'PhoneDetailController',
                controllerAs: 'vm'
            }).
            otherwise({
                redirectTo:'/'
            });
    }
})();

