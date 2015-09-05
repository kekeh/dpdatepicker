/* 
*  Name: dpdatepicker 
*  Description: Date picker - AngularJS reusable UI component 
*  Version: 0.1.4 
*  Author: kekeh 
*  Homepage: http://kekeh.github.io/dpdatepicker 
*  License: MIT 
*  Date: 2015-09-05 
*/ 
angular.module('template-dpdatepicker-0.1.4.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("templates/dpdatepicker.html",
    "<div class=dpdatepicker ng-style=\"{'width':width}\"><div class=vstooltip ng-show=showTooltip ng-mouseleave=\"showTooltip=false\"><span class=vstooltiptext>{{selectionDayTxt}}</span></div><div class=dpselectiongroup ng-click=picker($event)><span class=dpselection ng-style=\"{'line-height': height}\" ng-click=picker($event) tooltip-window>{{selectionDayTxt}}</span> <span class=dpselbtngroup ng-style=\"{'height': height}\"><button class=dpbtnclear ng-show=\"selectionDayTxt.length > 0\" ng-click=clearSelection($event) ng-mouseenter=$event.stopPropagation()><span class=\"icon icon-cross\"></span></button> <button class=dpbtnpicker ng-click=picker($event) ng-mouseenter=$event.stopPropagation()><span class=\"icon icon-calendar\"></span></button></span></div><div class=dpselector ng-if=showSelector><table class=dpheader><tr><td><div style=float:left><div class=dpheaderbtn ng-click=prevMonth()><span class=\"icon icon-left\"></span></div><div class=dpheadermonthtxt ng-bind=visibleMonth.monthTxt></div><div class=dpheaderbtn ng-click=nextMonth()><span class=\"icon icon-right\"></span></div></div></td><td><button class=dpheadertodaybtn ng-click=today()>{{options.todayBtnText!==undefined?options.todayBtnText:cf.todayBtnText}}</button></td><td><div style=float:right><div class=dpheaderbtn ng-click=prevYear()><span class=\"icon icon-left\"></span></div><div class=dpheaderyeartxt ng-bind=visibleMonth.year></div><div class=dpheaderbtn ng-click=nextYear()><span class=\"icon icon-right\"></span></div></div></td></tr></table><table class=dptable><thead><tr><th ng-class=\"{'dpnogrid': !showGrid}\" ng-repeat=\"d in weekDays track by $index\" ng-bind=d></th></tr></thead><tbody><tr ng-repeat=\"w in dates track by $index\"><td ng-repeat=\"d in w track by $index\" ng-class=\"{'dpnogrid': !showGrid, 'dpcurrmonth':d.cmo===cf.CURR_MONTH, 'dpcurrday':d.currDay && (options.currDayHighlight!==undefined?options.currDayHighlight:cf.currDayHighlight),'dpselectedday':selectedDate.day===d.day && selectedDate.month===d.month && selectedDate.year===d.year && d.cmo===cf.CURR_MONTH}\" ng-click=cellClicked(d)><span style=background-color:inherit ng-class=\"{'dpprevmonth':d.cmo===cf.PREV_MONTH,'dpcurrmonth':d.cmo===cf.CURR_MONTH,'dpnextmonth':d.cmo===cf.NEXT_MONTH,'dpsunday':d.sun && d.cmo===cf.CURR_MONTH && (options.sunHighlight!==undefined?options.sunHighlight:cf.sunHighlight)}\" ng-bind=d.day></span></td></tr></tbody></table><div class=dpfooterarea ng-if=\"options.footer!==undefined && options.footer.visible!==undefined?options.footer.visible:cf.footer.visible\"><button class=dpfooterbtn ng-class=\"{'dpbtndisable': selectedDate.day===0}\" ng-disabled=\"selectedDate.day===0\" ng-click=accept()>{{options.footer.okBtnText!==undefined?options.footer.okBtnText:cf.footer.okBtnText}}</button></div></div></div>");
}]);

angular.module('dpdatepicker', ["template-dpdatepicker-0.1.4.html"])

/**
 * @ngdoc object
 * @name dpdatepickerConfig
 * @description dpdatepickerConfig constants and default values of the configuration of the date picker.
 */
    .constant('dpdatepickerConfig', {
        dateFormat: 'yyyy-mm-dd',
        monthLabels: {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'},
        dayLabels: {su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat'},
        firstDayOfWeek: 'su',
        showGrid: true,
        todayBtnText: 'Today',
        sunHighlight: true,
        currDayHighlight: true,
        closeOnSelect: false,
        footer: {visible: true, okBtnText: 'OK'},
        YEAR_CONST: 'yyyy',
        MONTH_CONST: 'mm',
        DATE_CONST: 'dd',
        PREV_MONTH: 1,
        CURR_MONTH: 2,
        NEXT_MONTH: 3,
        TOOLTIP_SHOW_DELAY: 600,
        HEIGHT: '30px',
        WIDTH: '140px'
    })

/**
 * @ngdoc object
 * @name dpdatepicker
 * @description dpdatepicker is main directive of the component and it implements the date picker.
 */
    .directive('dpdatepicker', ['$timeout', '$document', function ($timeout, $document) {
        return {
            restrict: 'EA',
            templateUrl: 'templates/dpdatepicker.html',
            scope: {
                ngModel: '=?',
                options: '='
            },
            controller: ['$scope', 'dpdatepickerConfig', function ($scope, dpdatepickerConfig) {
                $scope.cf = dpdatepickerConfig;
                $scope.showTooltip = false;
            }],
            link: function (scope, element, attrs) {
                scope.weekDays = [], scope.dates = [];
                scope.selectionDayTxt = '';
                scope.selectedDate = {day: 0, month: 0, year: 0};
                scope.visibleMonth = {monthTxt: '', monthNbr: 0, year: 0};
                scope.showSelector = false;
                scope.width = scope.cf.WIDTH, scope.height = scope.cf.HEIGHT;

                var dayIdx = 0;
                var today = new Date();

                scope.prevMonth = function () {
                    // Previous month selected
                    var m = scope.visibleMonth.monthNbr;
                    var y = scope.visibleMonth.year;
                    if (m === 1) {
                        m = 12;
                        y--;
                    }
                    else {
                        m--;
                    }
                    scope.visibleMonth = {monthTxt: monthText(m), monthNbr: m, year: y};
                };

                scope.nextMonth = function () {
                    // Next month selected
                    var m = scope.visibleMonth.monthNbr;
                    var y = scope.visibleMonth.year;
                    if (m === 12) {
                        m = 1;
                        y++;
                    }
                    else {
                        m++;
                    }
                    scope.visibleMonth = {monthTxt: monthText(m), monthNbr: m, year: y};
                };

                scope.prevYear = function () {
                    // Previous year selected
                    scope.visibleMonth.year = scope.visibleMonth.year - 1;
                };

                scope.nextYear = function () {
                    // Next year selected
                    scope.visibleMonth.year = scope.visibleMonth.year + 1;
                };

                scope.today = function () {
                    // Today selected
                    var m = today.getMonth() + 1;
                    scope.visibleMonth = {monthTxt: monthText(m), monthNbr: m, year: today.getFullYear()};
                };

                scope.cellClicked = function (cell) {
                    // Cell clicked in the selector
                    if (cell.cmo === scope.cf.PREV_MONTH) {
                        // Previous month of day
                        scope.prevMonth();
                    }
                    else if (cell.cmo === scope.cf.CURR_MONTH) {
                        // Current month of day
                        scope.selectedDate = {day: cell.day, month: cell.month, year: cell.year};
                        var closeOnSel = !angular.isUndefined(scope.options.closeOnSelect) ? scope.options.closeOnSelect : scope.cf.closeOnSelect;
                        if (closeOnSel) {
                            formatDate(cell);
                            notifyParent(cell);
                            scope.showSelector = false;
                        }
                    }
                    else if (cell.cmo === scope.cf.NEXT_MONTH) {
                        // Next month of day
                        scope.nextMonth();
                    }
                };

                scope.picker = function (event) {
                    // Show or hide selector
                    event.stopPropagation();
                    scope.showSelector = !scope.showSelector;
                    if (scope.showSelector) {
                        var y = 0;
                        var m = 0;
                        // Initial selector month
                        if (scope.options.initSelectorMonth === undefined) {
                            y = today.getFullYear();
                            m = today.getMonth() + 1;
                        }
                        else {
                            y = scope.options.initSelectorMonth.year;
                            m = scope.options.initSelectorMonth.month;
                        }

                        // Set current month
                        scope.visibleMonth = {monthTxt: getMonthLabels()[m], monthNbr: m, year: y};

                        // Create current month
                        createMonth(m, y);
                    }
                };

                scope.clearSelection = function (event) {
                    // Clear selected range
                    event.stopPropagation();
                    scope.selectionDayTxt = '';
                    scope.selectedDate = {day: 0, month: 0, year: 0};
                    notifyParent(scope.selectedDate);
                };

                scope.accept = function () {
                    // OK button clicked
                    formatDate(scope.selectedDate);
                    notifyParent(scope.selectedDate);
                    scope.showSelector = false;
                };

                scope.$watch('visibleMonth', function (newVal, oldVal) {
                    // Listens the month and the year changes
                    if (newVal !== oldVal) {
                        createMonth(newVal.monthNbr, newVal.year);
                    }
                }, true);

                scope.$watch('ngModel', function (newVal, oldVal) {
                    // Listens the ngModel changes
                    if (newVal !== oldVal && newVal === '') {
                        scope.selectionDayTxt = newVal;
                    }
                });

                scope.$on('$destroy', function () {
                    $document.off("click", onOutClick);
                });

                function notifyParent(date) {
                    if (scope.options.dateSelectCb) {
                        scope.options.dateSelectCb(date.year, date.month, date.day, scope.selectionDayTxt);
                    }
                    scope.ngModel = scope.selectionDayTxt;
                }

                function formatDate(val) {
                    var fmt = angular.copy(!angular.isUndefined(scope.options.dateFormat) ? scope.options.dateFormat : scope.cf.dateFormat);
                    scope.selectionDayTxt = fmt.replace(scope.cf.YEAR_CONST, val.year).replace(scope.cf.MONTH_CONST, preZero(val.month)).replace(scope.cf.DATE_CONST, preZero(val.day));
                }

                function preZero(val) {
                    // Prepend zero if smaller than 10
                    return val < 10 ? '0' + val : val;
                }

                function monthText(m) {
                    // Returns mont as a text
                    return getMonthLabels()[m];
                }

                function monthStartIdx(y, m) {
                    // Month start index
                    var d = new Date();
                    d.setDate(1);
                    d.setMonth(m - 1);
                    d.setYear(y);
                    var idx = d.getDay() + sundayIdx();
                    return idx >= 7 ? idx - 7 : idx;
                }

                function sundayIdx() {
                    // Index of Sunday day
                    return dayIdx > 0 ? 7 - dayIdx : 0;
                }

                function daysInMonth(m, y) {
                    // Return number of days of current month
                    return new Date(y, m, 0).getDate();
                }

                function daysInPrevMonth(m, y) {
                    // Return number of days of the previous month
                    if (m === 1) {
                        m = 12;
                        y--;
                    }
                    else {
                        m--;
                    }
                    return daysInMonth(m, y);
                }

                function isCurrDay(d, m, y, cmo) {
                    // Check is a given date the current date
                    return d === today.getDate() && m === today.getMonth() + 1 && y === today.getFullYear() && cmo === 2;
                }

                function createMonth(m, y) {
                    scope.dates.length = 0;
                    var monthStart = monthStartIdx(y, m);
                    var dInThisM = daysInMonth(m, y);
                    var dInPrevM = daysInPrevMonth(m, y);
                    var sunIdx = sundayIdx();

                    var dayNbr = 1;
                    var cmo = scope.cf.PREV_MONTH;
                    for (var i = 1; i < 7; i++) {
                        var week = [];
                        if (i === 1) {
                            // First week
                            var pm = dInPrevM - monthStart + 1;
                            // Previous month
                            for (var j = pm; j <= dInPrevM; j++) {
                                week.push({
                                    day: j, month: m, year: y, cmo: cmo, currDay: isCurrDay(j, m, y, cmo), sun: week.length === sunIdx
                                });
                            }
                            cmo = scope.cf.CURR_MONTH;
                            // Current month
                            var daysLeft = 7 - week.length;
                            for (var j = 0; j < daysLeft; j++) {
                                week.push({
                                    day: dayNbr, month: m, year: y, cmo: cmo, currDay: isCurrDay(dayNbr, m, y, cmo), sun: week.length === sunIdx
                                });
                                dayNbr++;
                            }
                        }
                        else {
                            // Rest of the weeks
                            for (var j = 1; j < 8; j++) {
                                if (dayNbr > dInThisM) {
                                    // Next month
                                    dayNbr = 1;
                                    cmo = scope.cf.NEXT_MONTH;
                                }
                                week.push({
                                    day: dayNbr, month: m, year: y, cmo: cmo, currDay: isCurrDay(dayNbr, m, y, cmo), sun: week.length === sunIdx
                                });
                                dayNbr++;
                            }
                        }
                        scope.dates.push(week);
                    }
                }

                function onOutClick(event) {
                    if (!element[0].contains(event.target) && event.which === 1) {
                        // Clicked outside of the element - close selector
                        if (scope.showSelector) {
                            scope.showSelector = false;
                        }
                        scope.$apply();
                    }
                }

                function getMonthLabels() {
                    // Returns object of month labels
                    return !angular.isUndefined(scope.options.monthLabels) ? scope.options.monthLabels : scope.cf.monthLabels;
                }

                function getDayLabels() {
                    // Returns object of day of week labels
                    return !angular.isUndefined(scope.options.dayLabels) ? scope.options.dayLabels : scope.cf.dayLabels;
                }

                function init() {
                    // Show grid value
                    scope.showGrid = !angular.isUndefined(scope.options.showGrid) ? scope.options.showGrid : scope.cf.showGrid;

                    // Selection element height/width
                    scope.height = !angular.isUndefined(attrs.height) ? attrs.height : scope.height;
                    scope.width = !angular.isUndefined(attrs.width) ? attrs.width : scope.width;

                    // Weekdays to calendar
                    var days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
                    dayIdx = days.indexOf(!angular.isUndefined(scope.options.firstDayOfWeek) ? scope.options.firstDayOfWeek : scope.cf.firstDayOfWeek);
                    if(dayIdx !== -1) {
                        var idx = dayIdx;
                        for(var i = 0; i < days.length; i++) {
                            scope.weekDays.push(getDayLabels()[days[idx]]);
                            idx = days[idx] === 'sa' ? 0 : idx + 1;
                        }
                    }

                    // Initial selected date
                    if (scope.options.initSelectedDate !== undefined) {
                        formatDate(scope.options.initSelectedDate);
                        scope.selectedDate = angular.copy(scope.options.initSelectedDate);
                    }

                    // Register outside of element click event
                    $document.on("click", onOutClick);
                }

                $timeout(init);
            }
        };
    }])

/**
 * @ngdoc object
 * @name tooltipWindow
 * @description tooltipWindow directive implements the tooltip window.
 */
    .directive('tooltipWindow', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                function onMouseEnter() {
                    if (element[0].scrollWidth > element[0].offsetWidth) {
                        $timeout(function () {
                            scope.showTooltip = true;
                        }, scope.cf.TOOLTIP_SHOW_DELAY);
                    }
                }

                scope.$on('$destroy', function () {
                    element.off('mouseenter', onMouseEnter);
                });

                function init() {
                    element.on('mouseenter', onMouseEnter);
                }

                init();
            }
        };
    }]);



