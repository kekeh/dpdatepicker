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
sampleapp.controller('samplectrl1', function ($scope) {


    function onDateSelect(year, month, day, formatted) {
        console.log('PARENT 1 - onDateSelect(): year: ', year, ' - month: ', month, ' - day: ', day, ' - formatted: ', formatted);
    }

    // Configuration of the dpdatepicker
    $scope.opt = {
        dateFormat: 'dd.mm.yyyy',
        monthLabels: {
            1: 'Jan',
            2: 'Feb',
            3: 'Mar',
            4: 'Apr',
            5: 'May',
            6: 'Jun',
            7: 'Jul',
            8: 'Aug',
            9: 'Sep',
            10: 'Oct',
            11: 'Nov',
            12: 'Dec'
        },
        dayLabels: {
            su: 'Sun',
            mo: 'Mon',
            tu: 'Tue',
            we: 'Wed',
            th: 'Thu',
            fr: 'Fri',
            sa: 'Sat'
        },
        sunRedColor: true,
        closeOnSelect: true,
        todayBtnText: 'Today',
        dateSelectCb: onDateSelect
    };
});

/**
 * @ngdoc object
 * @name samplectrl2
 * @description samplectrl2 is sampleapp 2.
 */
sampleapp.controller('samplectrl2', function ($scope) {


    function onDateSelect(year, month, day, formatted) {
        console.log('PARENT 2 - onDateSelect(): year: ', year, ' - month: ', month, ' - day: ', day, ' - formatted: ', formatted);
    }


    // Configuration of the dpdatepicker
    $scope.opt = {
        initSelectorMonth: {
            year: 2010,
            month: 8
        },
        initSelectedDate: {
            year: 2013,
            month: 9,
            day: 16
        },
        dateFormat: 'yyyy-mm-dd',
        monthLabels: {
            1: 'Jan',
            2: 'Feb',
            3: 'Mar',
            4: 'Apr',
            5: 'May',
            6: 'Jun',
            7: 'Jul',
            8: 'Aug',
            9: 'Sep',
            10: 'Oct',
            11: 'Nov',
            12: 'Dec'
        },
        dayLabels: {
            su: 'Sun',
            mo: 'Mon',
            tu: 'Tue',
            we: 'Wed',
            th: 'Thu',
            fr: 'Fri',
            sa: 'Sat'
        },
        sunRedColor: true,
        closeOnSelect: false,
        todayBtnText: 'Today',
        dateSelectCb: onDateSelect
    };
});