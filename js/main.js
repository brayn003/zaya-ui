var app = angular.module('zaya', ['ui.bootstrap', 'ui.router','ngAnimate','angular.filter','dndLists','ui.select']);
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
	$scope.lessons = {
		"data" : [],
		"selected" : null
	};
	$scope.filters = {
		"subjects" : [],
		"grades" : [],
		"search" : null
	};
	$scope.options = {
		"subjects" : [],
		"grades" : []
	};

	$http({
        method : "POST",
        url : "data/lessons.json"
    }).then(function mySucces(response) {
        $scope.lessons.data = response.data;
        for (var i = 0; i < $scope.lessons.data.length; i++) {
        	if($scope.options.grades.indexOf($scope.lessons.data[i].grade) == -1)
				$scope.options.grades.push($scope.lessons.data[i].grade);
		}
        for (var i = 0; i < $scope.lessons.data.length; i++) {
        	if($scope.options.subjects.indexOf($scope.lessons.data[i].subject) == -1)
				$scope.options.subjects.push($scope.lessons.data[i].subject);
		}

    }, function myError(response) {
        alert("Can't do it");
    });

    $scope.gradeFilter = function(elem){
    	if ($scope.filters.grades.length == 0)
    		return true;
    	return $scope.filters.grades.indexOf(elem.grade) != -1;
    };
    $scope.subjectFilter = function(elem){
    	if ($scope.filters.subjects.length == 0)
    		return true;
    	return $scope.filters.subjects.indexOf(elem.subject) != -1;
    };
    // $scope.filters.grades.push(1);
    // alert($scope.gradeFilter());

    // $scope.lessons.selected = null;

	// 
	// }

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