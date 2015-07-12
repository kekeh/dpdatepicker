# dpdatepicker v. 0.0.1

**Datepicker - AngularJS reusable UI component**

## Description
Simple AngularJS directive which implements the date picker. Depends on only the AngularJS.

## Usage

* include the **dpdatepicker-0.0.1.min.js** and the **dpdatepicker-0.0.1.min.css** files into your project. See the **Build project** and the **Installation** chapters below.
```html
<script src="dpdatepicker-0.0.1.min.js"></script>
<link href="dpdatepicker-0.0.1.min.css" rel="stylesheet" type="text/css">
```
* inject the **dpdatepicker** module into your application module.
```js
angular.module('sampleapp', ['dpdatepicker']);
```
* add **dpdatepicker** HTML tag into your HTML file. See the **HTML example** chapter below.
* add needed Javascript code. See the **Javascript example** chapter below.

### HTML example
```html
<div ng-app="sampleapp" ng-controller="sampleappctrl">
    <dpdatepicker options="opt"</dpdatepicker>
</div>
```

### Tags
| Tag  | Description | Mandatory | 
| :------------ |:---------------|:---------------:|
| dpdatepicker | dpdatepicker tag | yes | 


### Attributes
| Attribute | Description | Mandatory | 
| :------------ |:---------------|:---------------:|
| options | dpdatepicker configuration object. See below. | yes |


### Options data (an options attribute in the dpdatepicker directive)

| Attribute | Description | Values | Mandatory |
| :------------ |:---------------|:---------------|:---------------|
| **initSelectorMonth** | Initial selector month. When the selector is opened this month is shown. If not defined the current month is shown. See example below. | object | no |
| **initSelectedDate** | Initial selected date. When the component is loaded this date is shown. If not defined no selection. See example below. | object | yes |
| **dateFormat** | Date format. The day and the month are always two digits and the year is always four digits. For example: 'yyyy-mm-dd' | string | yes |
| **monthLabels** | Object which contain month names. Shown in selector. | strings | yes |
| **dayLabels** | Object which contain weekday names. Shown in selector. | strings | yes |
| **sunRedColor** | Is sundays color red or not. | true or false | yes |
| **closeOnSelect** | Is selector closed on date click or not. | true or false | yes |
| **todayBtnText** | Today button text. | text | yes |
| **dateSelectCb** | Date select callback function. See below. | function | no |


### Javascript example
```js
var sampleapp = angular.module('sampleapp', ['dpdatepicker']);
sampleapp.controller('sampleappctrl', function ($scope) {

    // Watch the user selections - invoked when the user select the date
    function onDateSelect(year, month, day, formatted) {
        console.log('PARENT - onDateSelect(): year: ', year, ' - month: ', month, ' - day: ', day, 
                                    ' - formatted: ', formatted);
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
```

#### initSelectorMonth

Example of the value. See description of the properties below the example.

```js
    initSelectorMonth: {year: 1980, month: 8}
```

##### Properties
* year - year of the visible month
* month - month of the visible month


#### initSelectedDate

Example of the value. See description of the properties below the example.

```js
    initSelectedDate: {year: 2013, month: 9, day: 16}
```

##### Properties
* year - year of the visible date
* month - month of the visible date
* day - day of the visible date


#### dateSelectCb

Example of the function. See description of the parameters below the example.

```js
    function onDateSelect(year, month, day, formatted) {
        console.log('PARENT - onDateSelect(): year: ', year, ' - month: ', month, ' - day: ', day, ' - formatted: ', formatted);
    }
```

| Function | Parameters | Description | 
| :------------ |:---------------|:---------------|
| onDateSelect | year, month, day and formatted date | Called when the user selects the date from the UI. |

##### Parameters
* year - year of the selected date
* month - month of the selected date
* day - day of the selected date
* formatted - formatted date. See the **Options data** chapter above


## Demo
In the **examples** folder of this project has the sample application and the online demo is [here](http://kekeh.github.io/dpdatepicker)

## Dependencies
Depends on AngularJS. Implemented using the AngularJS version 1.3.16.

## Build project
* Build can be done by executing the **grunt** command. It creates the **dist/debug** and the **dist/min** folders and put files to these folders.
```js
grunt
```

## Installation
* Installation can be done using the **bower**. It installs files from the **dist/debug** and the **dist/min** folders. Needed CSS and javascript files are located in these folders.
```js
bower install vsdropdown
```

## Compatibility (tested with)
* IE 9+
* Firefox 36
* Google Chrome 41
* Opera 28.0
* Mobile Safari 8

## Licence
* License: MIT

## Author
* Author: kekeh