/**
 * Created by Fatema on 4/5/2018
 */
myApp.controller("aboutCntrl", function ($scope, $rootScope) {
        $rootScope.closeSideNav();
        $rootScope.pageHeading = "About";
        $rootScope.showHeader = true;
        $rootScope.showMenuIcon = true;
});