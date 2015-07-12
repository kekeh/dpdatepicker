var sampleapp = angular.module('sampleapp', ['dpdatepicker']);
sampleapp.controller('samplectrl', function ($scope) {


    function onDateSelect(year, month, day, formatted) {
        console.log('PARENT - onDateSelect(): year: ', year, ' - month: ', month, ' - day: ', day, ' - formatted: ', formatted);
    }


    // Configuration of the dpdatepicker
    $scope.opt = {
        initSelectorMonth: {year: 1980, month: 8},
        initSelectedDate: {year: 2013, month: 9, day: 16},
        dateFormat: 'dd.mm.yyyy',
        monthLabels: {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'},
        dayLabels: {su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat'},
        sunRedColor: true,
        closeOnSelect: false,
        todayBtnText: 'Today',
        dateSelectCb: onDateSelect
    };


});




