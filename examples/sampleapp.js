/**
 * @ngdoc object
 * @name sampleapp
 * @description sampleapp is module of sampleapp. It injects dpdatepicker.
 */
var sampleapp = angular.module('sampleapp', ['dpdatepicker']);

/**
 * @ngdoc object
 * @name samplectrl1
 * @description samplectrl1 is sampleapp 1.
 */
sampleapp.controller('samplectrl1', function ($scope, dpdatepickerConfig) {
    
    // Callback - called when the user selects/deselects the date from the UI
    function onDateSelect(year, month, day, formatted) {
        console.log('PARENT 1 - onDateSelect(): year: ', year, ' - month: ', month, ' - day: ', day, ' - formatted: ', formatted);
    }

    // Configuration of the dpdatepicker
    $scope.opt = {
        firstDayOfWeek: 'mo',
        dateFormat: 'dd.mm.yyyy',
        closeOnSelect: true,
        footer: {
            visible: false
        },
        dateSelectCb: onDateSelect
    };
});

/**
 * @ngdoc object
 * @name samplectrl2
 * @description samplectrl2 is sampleapp 2.
 */
sampleapp.controller('samplectrl2', function ($scope) {

    $scope.selectedDate = undefined;

    // Watch - called when the user selects/deselects the date from the UI
    $scope.$watch('selectedDate', function(value) {
        if(value !== undefined) {
            console.log('PARENT 2: watch - Date changed: ', value);
        }
    });

    // Configuration of the dpdatepicker
    $scope.opt = {
        initSelectorMonth: {
            year: 2011,
            month: 8
        },
        initSelectedDate: {
            year: 2013,
            month: 9,
            day: 16
        },
        closeOnSelect: false,
        footer: {
            visible: true,
            okBtnText: 'OK'
        }
    };
});



