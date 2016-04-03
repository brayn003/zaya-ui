var app = angular.module('zaya', ['ui.bootstrap', 'ui.router','ngAnimate','dndLists']);
app.config(function($stateProvider, $urlRouterProvider){
	// For any unmatched url, send to /route1
	$urlRouterProvider.otherwise("/create")

	$stateProvider
	.state('create', {
		url: "/create",
        views: {
            "view-c-container": {
				templateUrl: "create.html",
            },
            "view-c-lesson@create": {
				templateUrl: "create.lesson.html",
				controller: "ControllerCLesson"
            },
            "view-c-course@create": {
				templateUrl: "create.course.html",
				controller: "ControllerCTopic"
            }
        }
	})
	.state('dash', {
		url: "/dash",
		templateUrl: "dash.html"
	})
	.state('reports', {
		url: "/reports",
		templateUrl: "reports.html"
	})
})
app.controller('HomeController', function ($scope) {
	$scope.name = 'Superman';
	$scope.isCollapsed = true;
}).controller('ControllerCLesson', function ($scope, $http){
	// $scope.hello = "boobs";
	$scope.lessons = [];
	$http({
        method : "POST",
        url : "data/lessons.json"
    }).then(function mySucces(response) {
    	// alert(JSON.stringify(response));
        $scope.lessons = response.data;
    }, function myError(response) {
        alert("Can't do it");
    });

    $scope.lessons.selected = null;

}).controller('ControllerCTopic', function ($scope){
	$scope.courses = [];
	$scope.courses.push({"id" : 1, "name" : "", "lessons" : []});

	$scope.addCourse = function(){
		$scope.courses.push({"id" : $scope.courses[$scope.courses.length-1].id+1, "name" : "", "lessons" : []});
	}

	$scope.checkDuplicate = function(param,paramarr){
		if(paramarr.indexOf(param) != -1){
			return false;
		}else{
			return true;
		}
	};
	// $scope.checkEmpty = function(){
	// 	$scope.courses.splice($index, 1);
	// };
});