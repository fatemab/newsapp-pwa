/**
 * Created by Fatema on 4/5/2018
 */
myApp.controller("detailNewsCntrl", function ($scope, $rootScope, $http, $routeParams, $location) {
        $rootScope.closeSideNav();
        var newsTitle = $routeParams.newsTitle;
        $rootScope.showHeader = true;
        $rootScope.showMenuIcon = false;

        //Clip the title if its length is greater than 22 (as it does not fit in heading)
        $rootScope.pageHeading = newsTitle.length > 22 ? $routeParams.newsTitle.substr(0, 22) + "..." : newsTitle;
        var REGEXURL = /^http.+/;

        var requestUrl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=70bf750895c84d9b9a0af5f8e016d78b";
        $http.get(requestUrl).then(function (response) {
                var responseData = response.data;
                if (responseData.status === "ok") {
                        responseData.articles.forEach(function (value) {
                                if (value.title === newsTitle) {
                                        //If author name contains url or null then show unknown
                                        if (value.author == null || value.author.match(REGEXURL)) {
                                                value.author = "unknown";
                                        } else {
                                                //If author name has more than one value than show first
                                                value.author = value.author.split(',')[0];
                                        }
                                        value.publishedAt = new Date(value.publishedAt).toGMTString().substr(5, 11);
                                        $scope.article = value;
                                }
                        });
                }
        }, function (error) {
                console.log("Response error" + error);
        });

});
