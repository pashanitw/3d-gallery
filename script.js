// Code goes here

var app = angular.module('plunker', []);
app.directive('communicate', function () {
    return {
        restrict: 'E',
        replace:true,
        transclude:true,
        template: '<div class="carousel" ng-transclude></div>',
        controller:function($scope,$element){
            var rotationAngle=0;
            var basicAngle=18;
            var scopes=[];
            var lastOpenedScope;
            this.addscope=function(scope){
                console.log(scope);
            }
            this.closeLastOpened=function(){
             //   alert("open something");
                if(lastOpenedScope){
                    lastOpenedScope.scale(1);
                }
            }
            this.openThis=function(scp){
                if(lastOpenedScope==scp){
                    lastOpenedScope=undefined;
                    return;
                }
                var angle=-basicAngle*scp.index;
                var requiredAngle=rotationAngle+angle;
                $element.css({transform: 'translateZ( -695px ) rotateY('+(requiredAngle)+'deg )'});
                scp.scale(1.1);
                lastOpenedScope=scp;
            }
        }

    }
})

app.controller("MainCtrl", function($scope) {

    $scope.items = ["item1", "item2", "item3", "item4","item5", "item6", "item7"];
    $scope.sortableOptions = {
        'ui-floating': true,
        update: function(e, ui) {
            console.log("update");
            /*      var logEntry = tmpList.map(function(i){
             return i.value;
             }).join(', ');
             $scope.sortingLog.push('Update: ' + logEntry);*/
        },
        stop: function(e, ui) {
            console.log("stopped");
            // this callback has the changed model
            /*      var logEntry = tmpList.map(function(i){
             return i.value;
             }).join(', ');
             $scope.sortingLog.push('Stop: ' + logEntry);*/
        }
    };

})
function getTranslatePosition(panelSize,numberOfPanels){
    var tz = Math.round( ( panelSize / 2 ) /
    Math.tan( Math.PI / numberOfPanels ) );
    return tz;
}
app.directive("resourceCard", function() {
    return {
        require: '^?communicate',
        template: '<figure ng-click="handleClick()">' +
        '<div class="frame">' +
        '<span class="title">Documents</span>' +
        '<span class="duration">00:08</span>' +
        '</div>' +
        '</figure>',
        restrict: "E",
        replace: true,
        scope: {
            item: "=",
            color:"=",
            data:"=",
            index:"="
        },
        link: function(scope, element, attrs, communicationController) {
            var colors=["#ff5722","#ff9800","#ffeb3b","#9c27b0","#ffab40","#7c4dff","#673ab7"]
            var basicAngle=18;
            var rotationAngle=basicAngle*scope.index;
            element.find('.frame').css({'background-color': colors[scope.index]});
            element.css({transform: 'rotateY('+rotationAngle+'deg ) translateZ( 695px )'});
            scope.rotationAngle=rotationAngle;
            if (communicationController)
                communicationController.addscope(scope);
            scope.handleClick = function() {
                communicationController.closeLastOpened();
                communicationController.openThis(scope);

            };
            scope.scale=function(scale){
                element.find('.frame').css({transform: 'scale('+scale+')'});
            }
        }
    }
});