# react-native-common-date-picker

[![npm version](https://badge.fury.io/js/react-native-common-date-picker.svg)](https://badge.fury.io/js/react-native-common-date-picker) ![MIT](https://img.shields.io/npm/l/react-native-common-date-picker) ![Platform-Android&iOS](https://img.shields.io/badge/platform-Android%26iOS-41BC1D)

An awesome and cross-platform React Native date picker and calendar component for iOS and Android. 

This package is designed to integrade common date components like `calendars`, `date`, `date-time`, etc. Next, we are gonna provide more optional parameters and styles for developers who like this package. We hope to make it high-performance and high-efficiency in the future.

If you like it, just give stars ⭐️⭐️⭐️. If you come to any problems with this repository, please feel free to submit issues. Any PR is welcome.

**Date Picker Screenshots**

|   Android 1 | Android 2  | Android 3  | Android 4  |                                                                                                                          
| ----------- | ------------ | -------------- | ---- |
| ![Android 1.png](https://i.loli.net/2020/06/12/BcqVmEsYAlSdRvz.png)    | ![Android 2.png](https://i.loli.net/2020/06/12/4L86ouwz1PNrdIG.png)  | ![Android 3.png](https://i.loli.net/2020/06/12/KSGh74QTdDn9wlH.png) | ![Android 4.png](https://i.loli.net/2020/06/12/k3NbBnzmRQ65ZJS.png)

|   iOS 1 | iOS 2  | iOS 3  | iOS 4  |                                                                                                                          
| ----------- | ------------ | -------------- | ---- |
| ![iOS 1.png](https://i.loli.net/2020/06/12/nvd24jc1zGrAhLW.png)    | ![iOS 2.png](https://i.loli.net/2020/06/12/DgLFt79Uz38P2hv.png)  | ![iOS 3.png](https://i.loli.net/2020/06/12/wehKmGE3s5aoWtJ.png) | ![iOS 4.png](https://i.loli.net/2020/06/12/T5QjBLpYH7lNrUm.png)

**Calendar Screenshots**

|   Android 1 | Android 2  | Android 3  | Android 4  |                                                                                                                          
| ----------- | ------------ | -------------- | ---- |
| ![Android1.png](https://i.loli.net/2020/06/06/ldkZV3NpQivuL8z.png)    | ![Android2.png](https://i.loli.net/2020/06/06/Xhk2uwjvszreHTg.png)  | ![Android3.png](https://i.loli.net/2020/06/06/iBPDeptU4kFLjN2.png) | ![Android4.png](https://i.loli.net/2020/06/06/tyALsbHZfGVzrJw.png)

|   iOS 1 | iOS 2  | iOS 3  | iOS 4  |                                                                                                                          
| ----------- | ------------ | -------------- | ---- |
| ![iOS1.png](https://i.loli.net/2020/06/06/LwEa476VAQ8kgTC.png)    | ![iOS2.png](https://i.loli.net/2020/06/06/K6h21JlyTspo7gq.png)  | ![iOS3.png](https://i.loli.net/2020/06/06/Pw1DnIkMjtve5NC.png) | ![iOS4.png](https://i.loli.net/2020/06/06/nUuI1bSxayiTkZe.png)

|   Date Picker GIF | Calendar GIF  |                                                                                                                        
| ----------- | ------------ | 
| ![DatePicker.gif](https://i.loli.net/2020/06/15/8fyQB3WA1KMPhzt.gif) | ![CalendarList.gif](https://i.loli.net/2020/06/15/baRr4Ymh8qBKoZt.gif) |

## Contents

1. [Features](#Features)
2. [Installation](#Installation)
3. [Usage](#Usage)
4. [Parameters](#Parameters)
5. [To do](#To_do)
6. [License](#license)

## <span id="Features">Features</span>

#### Uniform style(`iOS`&`Android`)

For [DatePickerIOS](https://reactnative.dev/docs/datepickerios) and [DatePickerAndroid](https://reactnative.dev/docs/datepickerandroid) provided by the official(now Deprecated, Use [@react-native-community/datetimepicker](https://github.com/react-native-community/datetimepicker) instead) are implemented in different ways, which causes a lot of frustration among developers. For cross-platform, we all hope it to be unified on ios and Android.

#### Multiple date types

Of course, you can show only month/year、year/month、year/month/day、month/day/year via `type` parameter, etc.  It's compeltely customized by yourself.

#### Calendar list and date picker supported

Now Calendar list and date picker are supported, you can select the type according to your needs. Besides, we are gonna support more parameters and types controlled by users. So stay tuned!

#### Easy installation and usage

The installation and usage are very easy and simple due to being implemented by pure `JavaScript`. No `react-native link` is required. Many props and styles are completely under your control. It's up to you! Above all, all `React Native` versions are supported!

## <span id="Installation">Installation</span>

The installation is very easy. You just install this package via **one command**. No `react-native link` is required. 

```
npm install react-native-common-date-picker
```

## <span id="Usage">Usage</span>

#### Date Picker

```
import {DatePicker} from "react-native-common-date-picker";

<DatePicker
    confirm={date => {
        console.warn(date)
    }}
/>
```

#### Calendar

```
import {CalendarList} from "react-native-common-date-picker";

<Modal animationType={'slide'} visible={this.state.visible}>
     <CalendarList
          containerStyle={{flex: 1}}
          cancel={() => this.setState({visible: false})}
          confirm={data => {
              this.setState({
                   selectedDate1: data[0],
                   selectedDate2: data[1],
                   visible: false,
              });
          }}
     />
</Modal>
```

More examples: [example directory](https://github.com/lchenfox/react-native-common-date-picker/tree/master/src/example)

## <span id="Parameters">Parameters</span>

#### DatePicker Parameters

| Name                           | Type            | Description    |                                                                                                                           
| ------------------------------ | ---------------- | -------------- |
| backgroundColor                | string  | Container background color. Default is 'white'.
| type                 | string  | Date type in order. Default is 'YYYY-MM-DD'. WOW! All kinds of date type order are supported. Awesome! NOTE: for 'MM-DD'、'DD-MM'、'MM', the same year for minDate and maxDate is required. E.g: minDate={'2020-03-10'}, maxDate={'2020-06-25'}. For 'DD', the year and the month for minDate and maxDate must be the same. E.g: minDate={'2020-03-06'}, maxDate={'2020-03-25'}.  Supported types: 'YYYY-MM-DD', 'MM-DD-YYYY', 'DD-MM-YYYY', 'YYYY-MM', 'MM-YYYY', 'MM-DD', 'DD-MM', 'YYYY', 'MM', 'DD',
| minDate                 | string or Date  | The min date. Default is '2000-1-1'. Other supported formats: '2000-01-01'、'2000-1-01'、'2000-01-1'、'2000/01/01'、'2000/1/1'. A string type or Date type are supported.
| maxDate                 | string or Date  | The min date. Default is today. Other supported formats are the same as minDate. A string type or Date type are also supported. E.g: new Date().
| defaultDate                 | string or Date  | The default date. Default is equal to maxDate. Other supported formats are the same as minDate and maxDate. A string type or Date type are also supported. E.g: new Date().
| showToolBar                 | bool  | Whether to show tool bar, default is true. If false, hide tool bar on top.
| toolBarPosition                 | string  | The position of tool bar, default is 'top' that is at the top of screen. So far, just both 'top' and 'bottom' are supported.
| toolBarStyle                 | object  | tool bar view styles, passed like {backgroundColor: 'red'} as you like.
| toolBarCancelStyle                 | object  | Tool bar cancel button text styles, passed like {color: 'red', fontSize: 15} as you like. Note that you can control the active opacity of the button through {activeOpacity: 1}.
| toolBarConfirmStyle                 | object  | Tool bar confirm button text styles, passed like {color: 'red', fontSize: 15} as you like. Note that you can control the active opacity of the button through {activeOpacity: 1}.
| titleStyle                 | object  | Tool bar title text style.
| titleText                 | string  | Tool bar title text, default is "".
| cancelText                 | string  | Tool bar cancel button text, default is "Cancel".
| confirmText                 | string  | Tool bar confirm button text, default is "Confirm".
| onValueChange | function | On date value change callback in real time. Once you has selected the date each time, you'll get the date you selected. For example, you can set like this to get the selected date via `onValueChange={selectedDate => console.warn(selectedDate)}`
| cancel                 | function  | Tool bar cancel button callback.
| confirm                 | function  | Tool bar confirm button callback with a date string like "2020-06-10".
| cancelDisabled                 | bool  | Whether to disable the cancel button. Default is false.
| confirmDisabled                 | bool  | Whether to disable the confirm button. Default is false.
| width                 | string or number  | Width for date picker. Default is screen width. Note that the height for date picker relied on the rowHeight and the rows below.
| rows                 | number  | Row number for date picker. Default is 5. Note that Only one of [5, 7] is supported up to now. E.g: rows={7} or rows={'7'}.    
| rowHeight                 | string or number  | Height for each row. Default is 35.
| selectedRowBackgroundColor                 | string  | Background color for the selected row. Default is 'white'.
| unselectedRowBackgroundColor                 | string  | Background color for the unselected row. Default is 'white'.
| selectedBorderLineColor                 | string  | Border line color for the selected row. Default is '#d3d3d3'.
| selectedBorderLineWidth                 | string or number  | Border line width for the selected row. Default is 0.5. string and number type are supported. E.g: selectedBorderLineWidth={20} or selectedBorderLineWidth={'20'}
| selectedBorderLineMarginHorizontal                 | string or number  | Border line margin horizontal. Default is 0.
| selectedTextFontSize                 | string or number  | Font size for the selected row text. Default is 22. string and number type are supported. E.g: selectedTextFontSize={20} or selectedTextFontSize={'20'}.
| selectedTextColor                 | string  | Text color for the selected row text. Default is 'black'.
| unselectedTextColor                 | string  | Text color for the unselected row text. Default is '#9d9d9d'.
| textMarginHorizontal                 | string or number  | Text margin horizontal distance to left and right. Default is 0.
| monthDisplayMode                 | string  | The display of the month. Default is 'digit', namely "1, 2, 3, ..., 12". If monthDisplayMode={'en-short'}, "Jan, Feb, ..., Nov, Dec" will be displayed. If monthDisplayMode={'en-long'}, similarly, "January, February, ..., November, December" will be displayed. Supported values: 'digit', 'en-short', 'en-long'.
| yearSuffix                 | string  | Year suffix string to display for each row. E.g: if yearSuffix={'年'}, the year column will follow a '年' suffix like 2020年.
| monthSuffix                 | string  | Month suffix string to display for each row. E.g: if monthSuffix={'月'}, the month column will follow a '月' suffix like 6月.
| daySuffix                 | string  | Day suffix string to display for each row. E.g: if daySuffix={'日'}, the year column will follow a '日' suffix like 10日.                                                                                                                   

#### CalendarList Parameters

| Name                           | Type            | Description    |                                                                                                                           
| ------------------------------ | ---------------- | -------------- |
| containerStyle                 | object  | Styles for container, you can set it as any view prop styles such as {backgroundColor: 'red'}.                                                                                                                       
| scrollContentStyle              | object         | Styles for scroll list - FlatList, you can set it as any view prop styles such as {backgroundColor: 'red'}.                                                                                                
| showToolBar                   | bool   | Whether to show tool bar, default is true. If false, hide tool bar on top. 
| toolBarPosition                   | string   | The position of tool bar, default is 'top' that is at the top of screen. So far, just both 'top' and 'bottom' are supported.    
| toolBarStyle                   | object    | tool bar view styles, passed like {backgroundColor: 'red'} as you like.    
| toolBarCancelStyle                   | object      | tool bar cancel button text styles, passed like {color: 'red', fontSize: 15} as you like. Note that you can control the active opacity of the button through {activeOpacity: 1}.    
| toolBarConfirmStyle                   | object  | tool bar confirm button text styles, passed like {color: 'red', fontSize: 15} as you like. Note that you can control the active opacity of the button through {activeOpacity: 1}.    
| titleStyle                   | object   | tool bar title text style.   
| titleText                   | string    | tool bar title text, default is "".    
| cancelText                   | string  | tool bar cancel button text, default is "Cancel".    
| confirmText                   | string | tool bar confirm button text, default is "Confirm".    
| cancel                   | function       | tool bar cancel button callback.    
| confirm                   | function   | tool bar confirm button callback with a date array like ["2016-01-09", "2019-09-18"]. "2016-01-09" is the start date(min date) you selected. "2019-09-18" is the end date(max date) you selected. If nothing is selected, the array's elements will be empty string like ["", ""].    
| cancelDisabled                   | bool   | Whether to disable the cancel button. Default is false.    
| confirmDisabled                   | bool  | Whether to disable the confirm button. Default is false.    
| onPressDate                   | function   | A callback with a date parameter(like "2019-08-09") and row index when the user presses some date item.  
| minDate                   | string or Date | Min date to limit, default is "2000-01-01". Other supported formats: "2000-1-1", "2000/01/01", "2000/1/1".
| maxDate                   | string or Date  | Max date to limit, default is today calculated by new Date(). Other supported formats: "2015-1-1", "2015/01/01", "2015/1/1".  
| showWeeks                   | bool   | Whether to show weeks, default is true.  
| weeks                   | Array   | Week days to show, default is from Sunday to Saturday, namely ['Su','Mo','Tu','We','Th','Fr','Sa']. Note that if you want to custom "weeks", then you have to accomplish "firstDayOnWeeks" at the same time. For example, you passed "['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" to "weeks", you must pass 1 to "firstDayOnWeeks" equal to "firstDayOnWeeks={1}". What's more, 1 means Monday, 2 means Tuesday, ..., 0 Means Sunday.  
| weeksChineseType                   | bool   | Weeks type. Default is false, namely ['Su','Mo','Tu','We','Th','Fr','Sa']. If you want to use chinese, such as ['日','一','二','三','四','五','六'], just setting "weeksChineseType={true}" is okay. But the precondition is that "weeks" above uses the default value. Or it will be invalid.  
| firstDayOnWeeks                   | number   | The first day for weeks. Default is 0 equal to Sunday. If you'd like to start with Saturday, "firstDayOnWeeks={6}" will work. The value ranges from 0 to 6.  
| weeksStyle                   | object   | For week days, set the container styles like {backgroundColor: 'red'}. 
| weeksTextStyle                   |  object   | For week days, set the week day text styles like {color: 'blue', fontSize: 14}.  
| headerTitleType                   | number   | Display form of the header title. Default is 0. Take "2020-04" date as an example: 0:  "2020-04", 1:  "2020年4月", 2:  "Apr 2020", 3:  "April 2020", 4:  "2020/04", 5:  "04/2020".  
| listItemStyle                   | object   | Content styles containing header title and days content. This is a nesting object style. So if you want to set some specific style such as "headerTitle", you can set it to {headerTitle: {fontSize: 18, color: 'red'}}.  
| selectedDateMarkType                   | string  | Selected date mark type. Default is 'ellipse', other choices: 'semiellipse'、'rectangle'、'circle'、 'square'、'dot'.  
| selectedDateMarkColor                   | string   | Selected date mark background color for start date and end date. Default is 'magenta'. 
| selectedDateMarkRangeColor                   | string  | Selected date mark background color between start date and end date. Default is 'skyblue'.  
| beyondDatesDisabled                   | bool | When the date is out of minDate or maxDate, whether to disable the button. Default is true.  
| beyondDatesDisabledTextColor                   | string   | When the date is out of minDate or maxDate, the button text color. Default is '#b9b9b9'.  
| leftArrowClick                   | function   | Left arrow click callback with current date index parameter. Only when "horizontal={true}".  
| rightArrowClick                   | function   | Right arrow click callback with current date index parameter. Only when "horizontal={true}".  
| hideArrow                   | bool   | Whether to hide arrow. Default is false. Only when "horizontal={true}".  
| arrowColor                   | string   | Arrow color. Default is 'gray'. Only when "horizontal={true}".  
| arrowSize                   | number   | Arrow size. Default is 8. Only when "horizontal={true}".
| arrowAlign                   | string   | Arrow align. Default is 'left'. One of ['left', 'center', 'right']. Only when "horizontal={true}".  
| horizontal                   | bool   | Seen as FlatList component. Default is false.
| scrollEnabled                   | bool   | Seen as FlatList component. 
| pagingEnabled                   | bool   | Seen as FlatList component. Default is false.
| --                   |--   | Other FlatList's props can be Seen in FlatList docs.                                                                                                                                                                                                                                  

## <span id="To_do">To do</span>

- Modal is supported by default
- Add: datetime, time

## <span id="license">License</span>

[MIT](https://github.com/lchenfox/react-native-common-date-picker/blob/master/LICENSE)



