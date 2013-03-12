'use strict';
/* http://docs.angularjs.org/#!angular.service */

// Declare app level module which depends on filters, and services
angular.module('myApp', [ 'myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/departamentos', {template: 'partials/depto-list.html',   controller: DeptoListCtrl});
    $routeProvider.when('/departamentos/:dep_id/cursos/:_id',  {template: 'partials/materia-curso-list.html', controller: DeptoNewCtrl});
    $routeProvider.when('/departamentos/aggregation',  {template: 'partials/phone-aggre.html', controller: DeptoAggreCtrl});
    $routeProvider.when('/departamentos/:_id', {template: 'partials/cursos-list.html', controller: DeptoDetailCtrl});
    $routeProvider.when('/departamentos/curso/inscribir:ins_id', {template: 'partials/materia-curso-list.html', controller: DeptoEditCtrl});
    $routeProvider.otherwise({redirectTo: '/departamentos'});

    //$locationProvider.html5Mode(true);

    /*$rootScope.$on('$afterRouteChange', function(){
      $window.scrollTo(0,0);
    });*/
  }]);


