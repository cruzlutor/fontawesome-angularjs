import angular from 'angular'
import './node_modules/angular-sanitize'
import fontawesome from '@fortawesome/fontawesome'
import '@fortawesome/fontawesome-free-solid'

fontawesome.noAuto();

class IconController {

	constructor($element) {
		'ngInject';
		this.$element = $element;
	}

	$onInit() {
	}

	$onChanges() {
		const classOpts = {
			icon: null,
			spin: this.spin,
			pulse: this.pulse,
			fixedWidth: this.fixedWidth,
			border: this.border,
			listItem: this.listItem,
			flip: this.flip,
			size: this.size || null,
			rotate: this.rotate || null,
			pull: this.pull || null
		};

		const classes = this.objectWithKey('classes', [...this.classList(classOpts), ...(this.$element[0].className || '').split(' ')]);
		const transform = objectWithKey('transform', (typeof this.transform === 'string') ?
			parse.transform(this.transform) : this.transform);
		const iconSpec = fontawesome.findIconDefinition({
			iconName: this.icon
		});
		const renderedIcon = fontawesome.icon(iconSpec, {
			...classes,
			...transform
		});

		if (renderedIcon) {
			this.renderedIconHTML = renderedIcon.html[0];
		}
	}

	classList(props) {
		const classes = {
			'fa-spin': props.spin,
			'fa-pulse': props.pulse,
			'fa-fw': props.fixedWidth,
			'fa-border': props.border,
			'fa-li': props.listItem,
			'fa-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
			'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both',
			[`fa-${props.size}`]: props.size !== null,
			[`fa-rotate-${props.rotate}`]: props.rotate !== null,
			[`fa-pull-${props.pull}`]: props.pull !== null
		};

		return Object.keys(classes)
			.map(key => classes[key] ? key : null)
			.filter(key => key);
	}

	objectWithKey(key, value) {
		return ((Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value)) ? {
			[key]: value
		} : {};
	}
}


angular.module('fontawesome', ['ngSanitize'])

	.component('fontIcon', {
		bindings: {
			icon: '<',
			//mask: '<',
			spin: '<',
			pulse: '<',
			border: '<',
			fixedWidth: '<',
			listItem: '<',
			flip: '<',
			size: '<',
			pull: '<',
			rotate: '<',
			transform: '<',
			//symbol: '<'
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
			index = (index === $scope.iconList.length - 1) ? 0 : index + 1
			$scope.icon = $scope.iconList[index]
		}
	})

	.filter('trust', ['$sce', function ($sce) {
		return $sce.trustAsHtml;
	}]);