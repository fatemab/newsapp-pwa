/**
 * Created by Fatema on 4/5/2018
 */
myApp.controller("landingCntrl", function($scope, $rootScope, $http, $routeParams, $location) {
    $rootScope.closeSideNav();
    var paperName = $routeParams.paperName;
    $rootScope.showHeader = true;
    $rootScope.showMenuIcon = false;
    $rootScope.pageHeading = paperName;
    $scope.articles = [];

    /*Url Response - {
    "status": "ok",
    "totalResults": 20,
    "articles": [
        {
            "source": {
                "id": "business-insider",
                "name": "Business Insider"
            },
            "author": "Matthew DeBord",
            "title": "Elon Musk is acting more like a desperate man than a visionary",
            "description": "If Musk had simply copied best practices for the auto industry, he could be profitable by now. But best practices in Silicon Valley are the enemy, and a profita",
            "url": "http://www.businessinsider.com/tesla-elon-musk-is-acting-more-like-a-desperate-man-than-a-visionary-2018-5",
            "urlToImage": "https://amp.businessinsider.com/images/5a7b60ffcdab5f622c8b4709-640-320.jpg",
            "publishedAt": "2018-05-04T15:58:57Z"
        },
      ]
    }*/
    //Not using news source id in url parameters as some paper ids are null in response
    var requestUrl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=70bf750895c84d9b9a0af5f8e016d78b";
    $http.get(requestUrl).then(function(response) {
        var responseData = response.data;
        if(responseData.status==="ok") {
            responseData.articles.forEach(function (value) {
               if(value.source.name === paperName){
                   $scope.articles.push(value);
               }
            });
        }
    },function (reason) {
        console.log(reason);
    });

    //Open specific newspaper page
    $scope.openNewsDetail = function(title){
        console.log(title);
        $location.path("/detailNews/" + title);
    }

});
