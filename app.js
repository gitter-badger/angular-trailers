angular.module('TrailersApp', ['ngRoute', 'ngAnimate'])

  /*
    var today = new Date();
    var then = new Date(today);
    then.setTime(today.getTime() + (60 * 60 * 24) * 180);
  */

  .constant('API_URL', 'http://api.themoviedb.org/3PATH?callback=JSON_CALLBACK&api_key=c080d71535dcb0c169a0bcb1a566ba1b&_=1405692862594&QUERY')

  .config(function($routeProvider) {
    $routeProvider.when('/', {
      controller: "ListCtrl as list",
      templateUrl : 'templates/list.html'
    });
  })

  //trailersRequest('/movie/latest', 'page=1'); => api.themovedb.org/movie/latest?page=1
  .factory('trailersRequest', function($http, API_URL, $interpolate) {
    return function(path, params) {
      var url = API_URL
        .replace('PATH', path)
        .replace('QUERY', params);
      return $http.jsonp(url);
    }
  })

  .controller('ListCtrl', function(trailersRequest) {
    var list = this;

    trailersRequest('/movie/upcoming').success(function(movies) {
      list.movies = movies.results;
    });
  })

  .run(function($rootScope) {
    $rootScope.movieImage = function(path) {
      if(path == null) {
        path = '/qopaQWTvFOBxK7wm6XRRdBLHgoI.jpg';
      }
      return 'http://image.tmdb.org/t/p/w500' + path;
    }
  })
