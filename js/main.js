var app = angular.module('zaya', ['ui.bootstrap', 'ui.router','ngAnimate']);
app.config(function($stateProvider, $urlRouterProvider){
	// For any unmatched url, send to /route1
	$urlRouterProvider.otherwise("/create")

	$stateProvider
	// .state('home', {
	// 	url: "/",
	// 	templateUrl: "home.html"
	// })
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
            }
        }
	})
	// .state('create.topic', {
	// 	url: "/topic",
	// 	templateUrl: "create.topic.html"
	// })
	// .state('create.course', {
	// 	url: "/course",
	// 	templateUrl: "create.course.html"
	// })
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
	$scope.hello = "boobs";
	$http({
        method : "POST",
        url : "data/lessons.json"
    }).then(function mySucces(response) {
    	// alert(JSON.stringify(response));
        $scope.lessons = response.data;
    }, function myError(response) {
        alert("Can't do it");
    });
});