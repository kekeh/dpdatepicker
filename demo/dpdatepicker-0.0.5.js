/* 
 *  Name: dpdatepicker
 *  Description: Datepicker - AngularJS reusable UI component
 *  Version: 0.0.5
 *  Author: kekeh
 *  Homepage: http://kekeh.github.io/dpdatepicker
 *  License: MIT
 *  Date: 2015-07-18
 */
angular.module('template-dpdatepicker-0.0.5.html', ['templates/dpdatepicker.html']);

angular.module("templates/dpdatepicker.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("templates/dpdatepicker.html",
        "<div class=\"dpdatepicker\">\n" +
        "    <div class=\"dpselectiongroup\" ng-click=\"picker($event)\">\n" +
        "        <span class=\"dpselection\" ng-style=\"{'line-height': elemHeight + 'px'}\" ng-click=\"picker($event)\" tooltip-window>{{selectionDayTxt}}</span>\n" +
        "        <span class=\"dpselbtngroup\" ng-style=\"{'height': elemHeight + 'px'}\">\n" +
        "            <button class=\"dpbtnclear\" ng-show=\"selectionDayTxt.length > 0\" ng-click=\"clearSelection($event)\" ng-mouseenter=\"$event.stopPropagation()\">\n" +
        "                <span class=\"icon icon-cross\"></span>\n" +
        "            </button>\n" +
        "            <button class=\"dpbtnpicker\" ng-click=\"picker($event)\" ng-mouseenter=\"$event.stopPropagation()\">\n" +
        "                <span class=\"icon icon-calendar\"></span>\n" +
        "            </button>\n" +
        "        </span>\n" +
        "    </div>\n" +
        "\n" +
        "    <div class=\"dpselector\" ng-if=\"showSelector\">\n" +
        "        <table class=\"dpheader\">                  \n" +
        "            <tr> \n" +
        "                <td>\n" +
        "                    <div style=\"float:left\">\n" +
        "                        <div class=\"dpheaderbtn\" ng-click=\"prevMonth()\"><span class=\"icon icon-left\"></span></div>\n" +
        "                        <div class=\"dpheadermonthtxt\" ng-bind=\"visibleMonth.monthTxt\"></div>\n" +
        "                        <div class=\"dpheaderbtn\" ng-click=\"nextMonth()\"><span class=\"icon icon-right\"></span></div>\n" +
        "                    </div>\n" +
        "                </td>\n" +
        "                <td>\n" +
        "                    <button class=\"dpheadertodaybtn\" ng-click=\"today()\">{{options.todayBtnText}}</button>\n" +
        "                </td>\n" +
        "                <td>\n" +
        "                    <div style=\"float:right\">\n" +
        "                        <div class=\"dpheaderbtn\" ng-click=\"prevYear()\"><span class=\"icon icon-left\"></span></div>\n" +
        "                        <div class=\"dpheaderyeartxt\" ng-bind=\"visibleMonth.year\"></div>\n" +
        "                        <div class=\"dpheaderbtn\" ng-click=\"nextYear()\"><span class=\"icon icon-right\"></span></div>\n" +
        "                    </div>\n" +
        "                </td>\n" +
        "            </tr>\n" +
        "        </table>     \n" +
        "\n" +
        "        <table class=\"dptable\">                  \n" +
        "            <thead><tr><th ng-repeat=\"d in weekDays track by $index\" ng-bind=\"d\"></th></tr></thead>\n" +
        "            <tbody>\n" +
        "                <tr ng-repeat=\"w in dates track by $index\">\n" +
        "                    <td ng-repeat=\"d in w track by $index\" \n" +
        "                        ng-class=\"{'dpcurrmonth':d.cmo===config.CURR_MONTH, \n" +
        "                                   'dpcurrday':d.currDay && options.currentDayHighlight,\n" +
        "                                   'dpselectedday':selectedDate.day===d.day && selectedDate.month===d.month && selectedDate.year===d.year && d.cmo===config.CURR_MONTH}\"\n" +
        "                        ng-click=\"cellClicked(d)\">\n" +
        "                        <span style=\"background-color:inherit\" \n" +
        "                              ng-class=\"{'dpprevmonth':d.cmo===config.PREV_MONTH,'dpcurrmonth':d.cmo===config.CURR_MONTH,'dpnextmonth':d.cmo===config.NEXT_MONTH,\n" +
        "                                         'dpsunday':d.sun && d.cmo===config.CURR_MONTH && options.sundayHighlight}\" ng-bind=\"d.day\"></span>\n" +
        "                    </td>\n" +
        "                </tr>\n" +
        "            </tbody>\n" +
        "        </table>\n" +
        "\n" +
        "        <div class=\"dpfooterarea\" ng-if=\"options.footer !== undefined && options.footer.visible\">\n" +
        "            <button class=\"dpfooterbtn\" ng-class=\"{'dpbtndisable': selectedDate.day===0}\" ng-disabled=\"selectedDate.day===0\" ng-click=\"accept()\">{{options.footer.okBtnText}}</button>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "\n" +
        "\n" +
        "    <script type=\"text/ng-template\" id=\"datepickertooltip.html\">\n" +
        "        <div class=\"vstooltip\" ng-click=\"closeTooltip($event)\">\n" +
        "            <span class=\"vstooltiptext\">{{selectionDayTxt}}</span>\n" +
        "        </div>\n" +
        "    </script>\n" +
        "\n" +
        "</div> \n" +
        "");
}]);

angular.module('dpdatepicker', ["template-dpdatepicker-0.0.5.html"])

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
        NEXT_MONTH: 3,
        TOOLTIP_SHOW_DELAY: 600
    })

/**
 * @ngdoc object
 * @name dpdatepickerService
 * @description dpdatepickerService contain common code of the dpdatepicker.
 */
    .service('dpdatepickerService', ['$http', '$templateCache', function ($http, $templateCache) {
        this.getTemplate = function (name) {
            var promise = $http.get(name, {cache: $templateCache}).success(function (response) {
                return response.data;
            });
            return promise;
        };
    }])

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
                        if (scope.options.closeOnSelect) {
                            formatDate(cell);
                            scope.showSelector = false;
                        }
                        if (scope.options.closeOnSelect && scope.options.dateSelectCb) {
                            scope.options.dateSelectCb(cell.year, cell.month, cell.day, scope.selectionDayTxt);
                        }
                    }
                    else if (cell.cmo === scope.config.NEXT_MONTH) {
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
                        scope.visibleMonth = {monthTxt: scope.options.monthLabels[m], monthNbr: m, year: y};

                        // Create current month
                        createMonth(m, y);
                    }
                };

                scope.clearSelection = function (event) {
                    // Clear selected range
                    event.stopPropagation();
                    scope.selectionDayTxt = '';
                    scope.selectedDate = {day: 0, month: 0, year: 0};
                    notifyParent();
                };

                scope.accept = function () {
                    // OK button clicked
                    formatDate(scope.selectedDate);
                    notifyParent();
                    scope.showSelector = false;
                };

                scope.$watch('visibleMonth', function (newVal, oldVal) {
                    // Listens the month and the year changes
                    if (newVal !== oldVal) {
                        createMonth(newVal.monthNbr, newVal.year);
                    }
                }, true);

                function notifyParent() {
                    if (scope.options.dateSelectCb) {
                        scope.options.dateSelectCb(scope.selectedDate.year, scope.selectedDate.month, scope.selectedDate.day, scope.selectionDayTxt);
                    }
                }

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
    }])

/**
 * @ngdoc object
 * @name tooltipWindow
 * @description tooltipWindow directive implements the tooltip window.
 */
    .directive('tooltipWindow', ['$compile', '$timeout', 'dpdatepickerService', function ($compile, $timeout, dpdatepickerService) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                var pElem = null;
                var tooltip = null;
                var timer = null;

                scope.closeTooltip = function (event) {
                    event.stopPropagation();
                    onMouseLeave();
                };

                function onMouseEnter() {
                    if (element[0].scrollWidth > element[0].offsetWidth) {
                        timer = $timeout(function () {
                            dpdatepickerService.getTemplate('datepickertooltip.html').then(function (tpl) {
                                tooltip = angular.element(tpl.data);
                                pElem.prepend($compile(tooltip)(scope));
                            });
                        }, scope.config.TOOLTIP_SHOW_DELAY);
                    }
                }

                function onMouseLeave() {
                    cancelTimer();
                    if (tooltip !== null) {
                        tooltip.remove();
                        tooltip = null;
                    }
                }

                function cancelTimer() {
                    $timeout.cancel(timer);
                    timer = null;
                }

                scope.$on('$destroy', function () {
                    pElem.off('mouseenter', onMouseEnter);
                    pElem.off('mouseleave', onMouseLeave);
                });

                function init() {
                    pElem = element.parent();
                    pElem.on('mouseenter', onMouseEnter);
                    pElem.on('mouseleave', onMouseLeave);
                }

                init();
            }
        };
    }]);



