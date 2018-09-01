/**
 * Created by Fatema on 4/5/2018
 */
myApp.controller("newsPaperCntrl", function ($scope, $rootScope, $http, $location) {
        $rootScope.closeSideNav();
        $rootScope.showHeader = true;
        $rootScope.showMenuIcon = true;
        $rootScope.pageHeading = "Choose NewsPaper";
        localStorage.setItem("introSkip", "true");
        history.pushState("newsPaper", "home", "");

        $scope.openNewsPaper = function (paperName) {
                console.log(paperName);
                $location.path("/landing/" + paperName);
        };

        var newsPaperIcons = {
                "CNN": "img/cnn.png",
                "The New York Times": "img/newyorkTimes.png",
                "The Washington Post": "img/washingtonPost.png",
                "Fox News": "img/foxnews.png"
        };

        var webserviceCall = function () {
                var requestUrl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=70bf750895c84d9b9a0af5f8e016d78b";
                $scope.newsPaper = [];
                $scope.newsPaperName = [];
                $http.get(requestUrl).then(function (response) {
                        var responseData = response.data;
                        if (responseData.status === "ok") {
                                responseData.articles.forEach(function (value) {
                                        var name = value.source.name;
                                        if ($scope.newsPaperName.indexOf(name) === -1) {
                                                $scope.newsPaperName.push(name);
                                                var newspaper = {};
                                                newspaper.name = name;
                                                newspaper.icon = newsPaperIcons[name] ? newsPaperIcons[name] : "img/dummy.jpeg";
                                                $scope.newsPaper.push(newspaper)
                                        }
                                })
                        }
                });
        };

        webserviceCall();
});
