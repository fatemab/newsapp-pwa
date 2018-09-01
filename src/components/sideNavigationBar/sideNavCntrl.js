/**
 * Created by Fatema on 4/5/2018
 */
myApp.controller("sideNavCntrl", function ($scope, $rootScope, $location) {

        $rootScope.sideNavOpen = false;
        $rootScope.showMenuIcon = true;

        //Open menu option chose from drawer
        $scope.openMenu = function (value) {
                $rootScope.closeSideNav();
                $location.path("/" + value);
        };

        //Open and close navigation drawer
        $rootScope.toggleSideNav = function () {
                if (!$rootScope.sideNavOpen) {
                        $rootScope.openSideNav();
                } else {
                        $rootScope.closeSideNav();
                }
        };

        //Close Navigation Drawer
        $rootScope.closeSideNav = function () {
                document.getElementById("mySidenav").style.width = "0";
                $rootScope.sideNavOpen = false;
        };

        //Open Navigation Drawer
        $rootScope.openSideNav = function () {
                console.log($location.path());
                if ($location.path() !== "/" && $location.path().indexOf("/landing") === -1  &&  $location.path().indexOf("/detailNews") === -1  ) {
                        document.getElementById("mySidenav").style.width = "250px";
                        $rootScope.sideNavOpen = true;
                }
        }

});