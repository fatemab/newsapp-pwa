var myApp = angular.module("newsApp", ["ngRoute","ngTouch","angular-click-outside"]);

//Routes to different pages
myApp.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "components/IntroPage/introView.html",
            controller : "introCntrl",
            resolve: {
                "check": function ($location) {
                    //If intro pages are visited once move to newspaper page;
                    if (localStorage.getItem("introSkip") !==undefined && localStorage.getItem("introSkip") === "true") {
                        $location.path('/newsPaper');
                    }
                }
            }
        })
        .when("/landing/:paperName", {
            templateUrl : "components/LandingPage/landingView.html",
            controller : "landingCntrl"
        })
        .when("/newsPaper", {
            templateUrl : "components/NewsPaper/newsPaperView.html",
            controller: "newsPaperCntrl"
        })
        .when("/detailNews/:newsTitle", {
            templateUrl : "components/DetailPage/detailNewsView.html",
            controller: "detailNewsCntrl"
        })
        .when("/about", {
            templateUrl : "components/About/aboutView.html",
            controller: "aboutCntrl"
        })
        .otherwise({
            templateUrl : "components/NewsPaper/newsPaperView.html",
            controller : "newsPaperCntrl"
        });
});

//Back Button of header menu
myApp.directive('backButton', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', goBack);

            function goBack() {
                history.back();
                scope.$apply();
            }
        }
    }
});

myApp.run(function($rootScope, $location){
        //service worker
        if('serviceWorker' in navigator){
                        navigator.serviceWorker.register('sw.js')
                                .then(function(){
                                        console.log("registered");
                                })
        }
    //Handles device back button (android)
    document.addEventListener("backbutton", function (e) {
        if($location.path() === "/newsPaper" || $location.path() === "/"){
                navigator.app.exitApp();
        }else{
                history.back();
        }
    });
});

