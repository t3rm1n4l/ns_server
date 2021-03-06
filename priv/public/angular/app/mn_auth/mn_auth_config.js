angular.module('mnAuth').config( function ($stateProvider, $httpProvider, $urlRouterProvider) {
  $httpProvider.responseInterceptors.push(['$q', '$injector', logsOutUserOn401]);

  $urlRouterProvider.when('', '/auth');
  $urlRouterProvider.when('/', '/auth');

  function logsOutUserOn401($q, $injector) {
    return function (promise) {
      return promise.then(success, error);
    };
    function success(response) {
      return response;
    };
    function error(response) {
      if (response.status === 401) {
        var mnAuthService = $injector.get('mnAuthService');
        mnAuthService.manualLogout();
      }
      return $q.reject(response);
    };
  }

  $stateProvider.state('auth', {
    url: '/auth',
    templateUrl: 'mn_auth/mn_auth.html',
    controller: 'mnAuthController',
    authenticate: false
  });
});