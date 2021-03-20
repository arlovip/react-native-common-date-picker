import React, {Component} from 'react';
import {View} from 'react-native';
import DatePickerList from './DatePickerList';
import PropTypes from 'prop-types';
import styles from './style';
import ToolBar from '../components/ToolBar';
import * as Constants from '../contants';

class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = Constants.getDatePickerInitialData(props);
    }

    _onValueChange = (key, selectedIndex) => {
        const {years, months, days} = this.state;
        const _getSelectedIndex = dates => selectedIndex < 0 ? 0 : Math.min(selectedIndex, dates.length - 1);

        switch (key) {
            case Constants.DATE_KEY_TYPE.YEAR:
                const yearIndex = _getSelectedIndex(years);
                this.setState({
                    selectedYear: years[yearIndex].date,
                    months: Constants.selectDatePickerData(yearIndex, years),
                }, this._onValueChangeCallBack);
                break;
            case Constants.DATE_KEY_TYPE.MONTH:
                const monthIndex = _getSelectedIndex(months);
                this.setState({
                    selectedMonth: months[monthIndex].date,
                    days: Constants.selectDatePickerData(monthIndex, months),
                }, this._onValueChangeCallBack);
                break;
            case Constants.DATE_KEY_TYPE.DAY:
                const dayIndex = _getSelectedIndex(days);
                this.setState({selectedDay: days[dayIndex].date}, this._onValueChangeCallBack);
                break;
            default:
                break;
        }
    };

    _onValueChangeCallBack = () => {
        const {onValueChange, monthDisplayMode} = this.props;
        const {selectedYear, selectedMonth, selectedDay} = this.state;
        const _selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
        const selectedDate = Constants.toStandardStringWith(_selectedDate, monthDisplayMode);
        onValueChange && typeof onValueChange === 'function' && onValueChange(selectedDate);
    };

    render() {

        const {
            type,
            backgroundColor,
            width,
            rows,
            rowHeight,
            selectedRowBackgroundColor,
            unselectedRowBackgroundColor,
            selectedBorderLineColor,
            selectedBorderLineWidth,
            selectedBorderLineMarginHorizontal,
            selectedTextFontSize,
            selectedTextColor,
            unselectedTextColor,
            textMarginHorizontal,

            showToolBar,
            toolBarPosition,
            toolBarStyle,
            toolBarCancelStyle,
            toolBarConfirmStyle,
            titleStyle,
            titleText,
            cancelText,
            confirmText,
            cancel,
            confirm,
            cancelDisabled,
            confirmDisabled,

            monthDisplayMode,
            yearSuffix,
            monthSuffix,
            daySuffix,

        } = this.props;

        const {
            years,
            months,
            days,
            selectedYear,
            selectedMonth,
            selectedDay,
            defaultYearIndex,
            defaultMonthIndex,
            defaultDayIndex,
        } = this.state;

        const dataSource = Constants.getDatePickerData(type, years, months, days);

        const _toolBar = (<ToolBar
            style={[{backgroundColor}, toolBarStyle]}
            cancelStyle={toolBarCancelStyle}
            confirmStyle={toolBarConfirmStyle}
            titleStyle={titleStyle}
            titleText={titleText}
            cancelText={cancelText}
            cancel={() => cancel && typeof cancel === 'function' && cancel()}
            confirm={() => {
                const _selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
                const selectedDate = Constants.toStandardStringWith(_selectedDate, monthDisplayMode);
                confirm && typeof confirm === 'function' && confirm(selectedDate);
            }}
            confirmText={confirmText}
            cancelDisabled={cancelDisabled}
            confirmDisabled={confirmDisabled}
        />);

        return (
            <>
                {showToolBar && toolBarPosition === Constants.DEFAULT_TOOL_BAR_POSITION.TOP && _toolBar}
                <View style={[styles.datePickerContainer, {backgroundColor}]}>
                    {
                        dataSource.map((item, index) => {
                            const {key, data} = item;
                            const initialScrollIndex = key === Constants.DATE_KEY_TYPE.YEAR ? defaultYearIndex : (key === Constants.DATE_KEY_TYPE.MONTH ? defaultMonthIndex : defaultDayIndex);
                            return (<DatePickerList
                                key={index}
                                data={data}
                                dataIndex={index}
                                keyType={key}
                                rows={rows}
                                rowHeight={rowHeight}
                                dataLength={dataSource.length}
                                initialScrollIndex={initialScrollIndex}
                                width={Constants.datePickerListWidth(type, width)}
                                onValueChange={selectedIndex => this._onValueChange(key, selectedIndex)}
                                selectedRowBackgroundColor={selectedRowBackgroundColor || backgroundColor}
                                unselectedRowBackgroundColor={unselectedRowBackgroundColor || backgroundColor}
                                selectedBorderLineColor={selectedBorderLineColor}
                                selectedBorderLineWidth={selectedBorderLineWidth}
                                selectedBorderLineMarginHorizontal={selectedBorderLineMarginHorizontal}
                                selectedTextFontSize={selectedTextFontSize}
                                selectedTextColor={selectedTextColor}
                                unselectedTextColor={unselectedTextColor}
                                textMarginHorizontal={textMarginHorizontal}
                                yearSuffix={yearSuffix}
                                monthSuffix={monthSuffix}
                                daySuffix={daySuffix}
                            />);
                        })
                    }
                </View>
                {showToolBar && toolBarPosition === Constants.DEFAULT_TOOL_BAR_POSITION.BOTTOM && _toolBar}
            </>
        );
    }

}

DatePicker.propTypes = {

    /**
     * Container background color. Default is 'white'.
     */
    backgroundColor: PropTypes.string,

    /**
     * Date type in order. Default is 'YYYY-MM-DD'. WOW! All kinds of date type order are supported. Awesome!
     * NOTE: for 'MM-DD'、'DD-MM'、'MM', the same year for minDate and maxDate is required. E.g: minDate={'2020-03-10'}, maxDate={'2020-06-25'}.
     * For 'DD', the year and the month for minDate and maxDate must be the same. E.g: minDate={'2020-03-06'}, maxDate={'2020-03-25'}.
     */
    type: PropTypes.oneOf([
        'YYYY-MM-DD',
        'MM-DD-YYYY',
        'DD-MM-YYYY',
        'YYYY-MM',
        'MM-YYYY',
        'MM-DD',
        'DD-MM',
        'YYYY',
        'MM',
        'DD',
    ]),

    /**
     * The min date. Default is '2000-1-1'. Other supported formats: '2000-01-01'、'2000-1-01'、'2000-01-1'、
     * '2000/01/01'、'2000/1/1'. A string type or Date type are supported.
     */
    minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),

    /**
     * The min date. Default is today. Other supported formats are the same as minDate. A string type or Date type are
     * also supported. E.g: new Date().
     */
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),

    /**
     * The default date. Default is equal to maxDate. Other supported formats are the same as minDate and maxDate.
     * A string type or Date type are also supported. E.g: new Date().
     */
    defaultDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),

    /**
     * Whether to show tool bar, default is true. If false, hide tool bar on top.
     */
    showToolBar: PropTypes.bool,

    /**
     * The position of tool bar, default is 'top' that is at the top of screen. So far, just both 'top' and 'bottom'
     * are supported.
     */
    toolBarPosition: PropTypes.oneOf(['top', 'bottom']),

    /**
     * Tool bar view styles, passed like {backgroundColor: 'red'} as you like.
     */
    toolBarStyle: PropTypes.object,

    /**
     * Tool bar cancel button text styles, passed like {color: 'red', fontSize: 15} as you like.
     * Note that you can control the active opacity of the button through {activeOpacity: 1}.
     */
    toolBarCancelStyle: PropTypes.object,

    /**
     * Tool bar confirm button text styles, passed like {color: 'red', fontSize: 15} as you like.
     * Note that you can control the active opacity of the button through {activeOpacity: 1}.
     */
    toolBarConfirmStyle: PropTypes.object,

    /**
     * Tool bar title text style.
     */
    titleStyle: PropTypes.object,

    /**
     * Tool bar title text, default is "".
     */
    titleText: PropTypes.string,

    /**
     * Tool bar cancel button text, default is "Cancel".
     */
    cancelText: PropTypes.string,

    /**
     * Tool bar confirm button text, default is "Confirm".
     */
    confirmText: PropTypes.string,

    /**
     * On date value change callback in real time. Once you has selected the date each time, you'll get the date you selected.
     * For example, you can set like this to get the selected date:
     * ......
     * onValueChange={selectedDate => console.warn(selectedDate)}
     * ......
     */
    onValueChange: PropTypes.func,

    /**
     * Tool bar cancel button callback.
     */
    cancel: PropTypes.func,

    /**
     * Tool bar confirm button callback with a date string like "2020-06-10".
     */
    confirm: PropTypes.func,

    /**
     * Whether to disable the cancel button. Default is false.
     */
    cancelDisabled: PropTypes.bool,

    /**
     * Whether to disable the confirm button. Default is false.
     */
    confirmDisabled: PropTypes.bool,

    /**
     * Width for date picker. Default is screen width. Note that the height for date picker relied on the rowHeight and the rows below.
     */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Row number for date picker. Default is 5. Note that Only one of [5, 7] is supported up to now. E.g: rows={5} or rows={7}.
     */
    rows: PropTypes.oneOf([5, 7]),

    /**
     * Height for each row. Default is 35.
     */
    rowHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Background color for the selected row. Default is 'white'.
     */
    selectedRowBackgroundColor: PropTypes.string,

    /**
     * Background color for the unselected row. Default is 'white'.
     */
    unselectedRowBackgroundColor: PropTypes.string,

    /**
     * Border line color for the selected row. Default is '#d3d3d3'.
     */
    selectedBorderLineColor: PropTypes.string,

    /**
     * Border line width for the selected row. Default is 0.5. string and number type are supported. E.g: selectedBorderLineWidth={20} or selectedBorderLineWidth={'20'}.
     */
    selectedBorderLineWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Border line margin horizontal. Default is 0.
     */
    selectedBorderLineMarginHorizontal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Font size for the selected row text. Default is 22. string and number type are supported. E.g: selectedTextFontSize={20} or selectedTextFontSize={'20'}.
     */
    selectedTextFontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Text color for the selected row text. Default is 'black'.
     */
    selectedTextColor: PropTypes.string,

    /**
     * Text color for the unselected row text. Default is '#9d9d9d'.
     */
    unselectedTextColor: PropTypes.string,

    /**
     * Text margin horizontal distance to left and right. Default is 0.
     */
    textMarginHorizontal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The display of the month. Default is 'digit', namely "1, 2, 3, ..., 12". If monthDisplayMode={'en-short'}, "Jan, Feb, ...,
     * Nov, Dec" will be displayed. If monthDisplayMode={'en-long'}, similarly, "January, February, ..., November, December" will be displayed.
     */
    monthDisplayMode: PropTypes.oneOf([
        'digit',
        'en-short',
        'en-long',
    ]),

    /**
     * Year suffix string to display for each row. E.g: if yearSuffix={'年'}, the year column will follow a '年' suffix like 2020年.
     */
    yearSuffix: PropTypes.string,

    /**
     * Month suffix string to display for each row. E.g: if monthSuffix={'月'}, the month column will follow a '月' suffix like 6月.
     */
    monthSuffix: PropTypes.string,

    /**
     * Day suffix string to display for each row. E.g: if daySuffix={'日'}, the year column will follow a '日' suffix like 10日.
     */
    daySuffix: PropTypes.string,
};

DatePicker.defaultProps = {
    backgroundColor: 'white',
    type: 'YYYY-MM-DD',
    minDate: Constants.DEFAULT_MIN_DATE,
    maxDate: Constants.DEFAULT_MAX_DATE,
    width: Constants.SCREEN_WIDTH,
    rows: Constants.DATE_PICKER_ROWS,
    rowHeight: Constants.DATE_PICKER_ROW_HEIGHT,
    selectedRowBackgroundColor: '',
    unselectedRowBackgroundColor: '',
    selectedBorderLineColor: '#d3d3d3',
    selectedBorderLineWidth: 0.5,
    selectedBorderLineMarginHorizontal: 0,
    selectedTextFontSize: 22,
    selectedTextColor: 'black',
    unselectedTextColor: '#9d9d9d',
    textMarginHorizontal: 0,
    showToolBar: true,
    toolBarPosition: Constants.DEFAULT_TOOL_BAR_POSITION.TOP,
    cancelText: Constants.DEFAULT_CANCEL_TEXT,
    confirmText: Constants.DEFAULT_CONFIRM_TEXT,
    cancel: () => {
    },
    confirm: () => {
    },
    cancelDisabled: false,
    confirmDisabled: false,
    monthDisplayMode: Constants.MONTH_DISPLAY_MODE.DIGIT,
    yearSuffix: '',
    monthSuffix: '',
    daySuffix: '',
};

export default DatePicker;
