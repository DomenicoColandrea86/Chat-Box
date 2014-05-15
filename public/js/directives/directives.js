'use strict';

var appDirectives = appDirectives || angular.module('appDirectives', []);

appDirectives.directive('onFocus', function() {
  return {
    restrict: 'A',
    link: function(scope, el, attrs) {
      el.bind('focus', function() {
        scope.$apply(attrs.onFocus);
      });
    }
  };
});

appDirectives.directive('onBlur', function() {
  return {
    restrict: 'A',
    link: function(scope, el, attrs) {
      el.bind('blur', function() {
        scope.$apply(attrs.onBlur);
      });
    }
  };
});