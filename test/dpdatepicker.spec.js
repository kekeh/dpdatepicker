describe('dpdatepicker', function () {
    var elm, scope;

    beforeEach(module('dpdatepicker'));

    beforeEach(inject(function ($rootScope, $compile) {

        scope = $rootScope;

        function onDateSelect(year, month, day, formatted) {
            console.log('PARENT - onDateSelect(): year: ', year, ' - month: ', month, ' - day: ', day, ' - formatted: ', formatted);
        }


        // Configuration of the dpdatepicker
        scope.opt = {
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
            sunHighlight: true,
            currDayHighlight: true,
            closeOnSelect: false,
            todayBtnText: 'Today',
            footer: {
                visible: true,
                closeBtnText: 'Close'
            },
            dateSelectCb: onDateSelect
        };

        elm = angular.element('<dpdatepicker options="opt"></dpdatepicker>');

        $compile(elm)(scope);
        scope.$digest();

    }));

    it('is vsselectiongroup', function () {
        expect(elm[0].querySelectorAll('.dpselectiongroup').length).toBe(1);
    });

    it('is dpselection', function () {
        expect(elm[0].querySelectorAll('.dpselection').length).toBe(1);
    });

    it('is dpbtnpicker', function () {
        expect(elm[0].querySelectorAll('.dpbtnpicker').length).toBe(1);
    });

    it('is icon-calendar', function () {
        expect(elm[0].querySelectorAll('.icon-calendar').length).toBe(1);
    });


});