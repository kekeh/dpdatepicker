angular.module('dpdatepicker', [])

/**
 * @ngdoc object
 * @name dpdatepickerConfig
 * @description dpdatepickerConfig constants of the date picker.
 */
    .constant('dpdatepickerConfig', {
        YEAR_CONST: 'yyyy',
        MONTH_CONST: 'mm',
        DATE_CONST: 'dd',
        PREV_MONTH: 1,
        CURR_MONTH: 2,
        NEXT_MONTH: 3
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
                options: '='
            },
            controller: ['$scope', 'dpdatepickerConfig', function ($scope, dpdatepickerConfig) {
                $scope.config = dpdatepickerConfig;
            }],
            link: function (scope, element, attrs) {
                scope.weekDays = [];
                scope.selectionDayTxt = '';
                scope.selectedDate = {day: 0, month: 0, year: 0};
                scope.visibleMonth = {monthTxt: '', monthNbr: 0, year: 0};
                scope.dates = [];
                scope.showSelector = false;

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
                    if (cell.cmo === scope.config.PREV_MONTH) {
                        // Previous month of day
                        scope.prevMonth();
                    }
                    else if (cell.cmo === scope.config.CURR_MONTH) {
                        // Current month of day
                        scope.selectedDate = {day: cell.day, month: cell.month, year: cell.year};
                        formatDate(cell);
                        if (scope.options.closeOnSelect) {
                            scope.showSelector = false;
                        }
                        if (scope.options.dateSelectCb) {
                            scope.options.dateSelectCb(cell.year, cell.month, cell.day, scope.selectionDayTxt);
                        }
                    }
                    else if (cell.cmo === scope.config.NEXT_MONTH) {
                        // Next month of day
                        scope.nextMonth();
                    }
                };

                scope.picker = function () {
                    // Show or hide selector
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
                        scope.visibleMonth = {monthTxt: scope.options.monthLabels[m], monthNbr: m, year: y};

                        // Create current month
                        createMonth(m, y);
                    }
                };

                scope.$watch('visibleMonth', function (newVal, oldVal) {
                    // Listens the month and the year changes
                    if (newVal !== oldVal) {
                        createMonth(newVal.monthNbr, newVal.year);
                    }
                }, true);


                function formatDate(val) {
                    var fmt = angular.copy(scope.options.dateFormat);
                    scope.selectionDayTxt = fmt.replace(scope.config.YEAR_CONST, val.year)
                        .replace(scope.config.MONTH_CONST, preZero(val.month))
                        .replace(scope.config.DATE_CONST, preZero(val.day));
                }

                function preZero(val) {
                    // Prepend zero if smaller than 10
                    return val < 10 ? '0' + val : val;
                }

                function monthText(m) {
                    // Returns mont as a text
                    return scope.options.monthLabels[m];
                }

                function monthStartIdx(y, m) {
                    // Month start index
                    var d = new Date();
                    d.setDate(1);
                    d.setMonth(m - 1);
                    d.setYear(y);
                    return d.getDay();
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

                    var dayNbr = 1;
                    var cmo = scope.config.PREV_MONTH;
                    for (var i = 1; i < 7; i++) {
                        var week = [];
                        if (i === 1) {
                            // First week
                            var pm = dInPrevM - monthStart + 1;
                            // Previous month
                            for (var j = pm; j <= dInPrevM; j++) {
                                week.push({
                                    day: j,
                                    month: m,
                                    year: y,
                                    cmo: cmo,
                                    currDay: isCurrDay(j, m, y, cmo),
                                    sun: week.length === 0
                                });
                            }
                            cmo = scope.config.CURR_MONTH;
                            // Current month
                            var daysLeft = 7 - week.length;
                            for (var j = 0; j < daysLeft; j++) {
                                week.push({
                                    day: dayNbr,
                                    month: m,
                                    year: y,
                                    cmo: cmo,
                                    currDay: isCurrDay(dayNbr, m, y, cmo),
                                    sun: week.length === 0
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
                                    cmo = scope.config.NEXT_MONTH;
                                }
                                week.push({
                                    day: dayNbr,
                                    month: m,
                                    year: y,
                                    cmo: cmo,
                                    currDay: isCurrDay(dayNbr, m, y, cmo),
                                    sun: week.length === 0
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

                scope.$on('$destroy', function () {
                    $document.off("click", onOutClick);
                });

                function init() {
                    // Selection element height
                    scope.elemHeight = element.children().prop('offsetHeight') - 2;

                    // Weekdays to calendar - check is sunday first day in configuration
                    var days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
                    for (var i in days) {
                        scope.weekDays.push(scope.options.dayLabels[days[i]]);
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
    }]);



