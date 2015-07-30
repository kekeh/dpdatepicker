# dpdatepicker v. 0.1.0

**Datepicker - AngularJS reusable UI component**

## Description
Simple AngularJS directive which implements the date picker. Depends on only the AngularJS.

## Usage

* include the **dpdatepicker-0.1.0.min.js** and the **dpdatepicker-0.1.0.min.css** files into your project. See the **Build project** and the **Installation** chapters below.
```html
<script src="dpdatepicker-0.1.0.min.js"></script>
<link href="dpdatepicker-0.1.0.min.css" rel="stylesheet" type="text/css">
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
    <dpdatepicker options="opt" width="30%" height="28px"></dpdatepicker>
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
| ng-model | model object - selected date in a string format | no | 
| width | width of the component (no selector). Can be pixels or percent for example: **width="20%"** or **width="250px"**. The default value is **180px**. | no | 
| height | height of the component (no selector). Can be pixels or percen for example: **height="100%"** or **height="30px"**. The default value is **30px**. | no | 

### Options data (an options attribute in the dpdatepicker directive)

* The following configuration values except **initSelectorMonth**, **initSelectedDate** and **dateSelectCb** can be configured also using the **dpdatepickerConfig** object by injecting it. See the **Javascript example** below. By using the **dpdatepickerConfig** does the configuration in the application level. 

| Attribute | Description | Values | Default value | Mandatory |
| :------------ |:---------------|:---------------|:---------------|
| **initSelectorMonth** | Initial selector month. When the selector is opened this month is shown. If not defined the current month is shown. See example below. | object | - | no |
| **initSelectedDate** | Initial selected date. When the component is loaded this date is shown. If not defined no selection. See example below. | object | - | no |
| **dateFormat** | Date format. The day and the month are always two digits and the year is always four digits. For example: 'yyyy-mm-dd' | string | 'yyyy-mm-dd' | no |
| **monthLabels** | Object which contain month names. Shown in selector. | strings | Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec | no |
| **dayLabels** | Object which contain weekday names. Shown in selector. | strings | Sun, Mon, Tue, Wed, Thu, Fri, Sat | no | |
| **currDayHighlight** | Is current day highlighted. | true or false | true | no |
| **sunHighlight** | Is sundays highlighted or not. | true or false | true | no |
| **closeOnSelect** | Is selector closed on date click or not. | true or false | false | no |
| **todayBtnText** | Today button text. | text | 'Today' | no |
| **footer** | Object which contain the sub properties. | See below | - | no |
| footer.**visible** | Is footer visible or not. | true or false | true | no |
| footer.**okBtnText** | OK button text. | text | 'OK' | no |
| **dateSelectCb** | Date select or clear selection callback function. See below. | function | no |


### Javascript example
```js
var sampleapp = angular.module('sampleapp', ['dpdatepicker']);
sampleapp.controller('sampleappctrl', function ($scope, dpdatepickerConfig) {

    // Application level configuration
    dpdatepickerConfig.sunHighlight = false;
    dpdatepickerConfig.currDayHighlight = false;

    // Watch the user selections - invoked when the user select the date or clear the selection
    function onDateSelect(year, month, day, formatted) {
        console.log('onDateSelect(): year: ', year, ' - month: ', month, ' - day: ', day, ' - formatted: ', formatted);
    }

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
        /*
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
        todayBtnText: 'Today',
        sunHighlight: true,
        currDayHighlight: true,
        closeOnSelect: false,
        footer: {
            visible: true,
            okBtnText: 'OK'
        },
        */
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
| onDateSelect | year, month, day and formatted date | Called when the user selects the date from the UI or clear the selection. |

##### Parameters
* year - year of the selected date or zero in case of clear selection
* month - month of the selected date or zero in case of clear selection
* day - day of the selected date or zero in case of clear selection
* formatted - formatted date or empty string in case of clear selection. See the **Options data** chapter above


## Demo
In the **examples** folder of this project has the sample application and the online demo is [here](http://kekeh.github.io/dpdatepicker)

## Dependencies
Depends on AngularJS. Implemented using the AngularJS version 1.3.17.

## Build project
* Build can be done by executing the **grunt** command. It creates the **dist/debug** and the **dist/min** folders and put files to these folders.
```js
grunt
```

## Installation
* Installation can be done using the **bower**. It installs files from the **dist/debug** and the **dist/min** folders. Needed CSS and javascript files are located in these folders.
```js
bower install dpdatepicker
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