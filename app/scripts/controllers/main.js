'use strict';

/**
 * @ngdoc function
 * @name angularMailGrabberApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularMailGrabberApp
 */
angular.module('angularMailGrabberApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope) {
        var holder = 'please type either text or url to extract emails from';
        $scope.emailsExtracted = [];
        $scope.holder = holder;
        $scope.changeHolderState = function(bool) {
            if(bool) {
                $scope.holder = '';
            } else if((typeof $scope.area === 'undefined') ||
                (typeof $scope.area.text === 'undefined') ||
                ($scope.area.text.length === 0)) {
                $scope.holder = holder;
            }
        };
        $scope.extractMails = function(string, bool) {
            var mailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/gi;
            if(bool) {
                $.ajaxSetup({
                    scriptCharset: "utf-8",
                    contentType: "application/json; charset=utf-8"
                });

                $.getJSON('http://whateverorigin.org/get?url=' +
                        encodeURIComponent(string) +
                        '&callback=?',
                    function(data) {
                        $scope.emailsExtracted = _.uniq(data.contents.match(mailRegex));
                        $scope.$apply();
                        alert('how did i get there?');
                    })
                    .error(function() {
                        alert('sorry man');
                    });
            } else {
                $scope.emailsExtracted = _.uniq(string.match(mailRegex));
            }
        };
  }]);
