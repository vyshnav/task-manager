app = angular.module('app', ['ui.router'])
.run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams ) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', '$interpolateProvider',
      function ($stateProvider,   $urlRouterProvider, $interpolateProvider) {
          $interpolateProvider.startSymbol('{{').endSymbol('}}');
      
          $urlRouterProvider
              .otherwise('/home');
          $stateProvider

              .state('home', {
		          url: '/home',
		          templateUrl: '/partials/task.html'
		        })
              .state('todo', {
                  url: '/todo/:_id',
                  templateUrl: '/partials/todo.html'
              })
           }
    ]
  );