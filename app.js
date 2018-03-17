import angular from 'angular'
import './node_modules/angular-sanitize'
import fontawesome from '@fortawesome/fontawesome'
import '@fortawesome/fontawesome-free-solid'

fontawesome.noAuto();


// function IconController($sce) {
function IconController() {

	this.$onChanges = function () {
		console.log(this);
		const icon = fontawesome.findIconDefinition({ iconName: this.icon });
		if (icon) {
			this.renderedIconHTML = fontawesome.icon(icon).html[0];
		}
	}
}

angular.module('fontawesome', ['ngSanitize'])

	.component('fontIcon', {
		bindings: {
			icon: '<'
		},
		controller: IconController,
		template: '<span ng-click="$ctrl.changeIcon()" ng-bind-html="$ctrl.renderedIconHTML | trust"></span>'
	})

	.controller('main', function ($scope) {
		$scope.iconList = [
			'coffee',
			'user',
			'camera'
		]

		$scope.icon = $scope.iconList[0]

		$scope.changeIcon = function () {
			let index = $scope.iconList.indexOf($scope.icon)
			index = (index === $scope.iconList.length - 1 ) ? 0 : index + 1
			$scope.icon = $scope.iconList[index]
		}
	})

	.filter('trust', ['$sce', function ($sce) {
		return $sce.trustAsHtml;
	}]);
