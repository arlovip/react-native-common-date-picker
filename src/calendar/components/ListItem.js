import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import * as Constants from "../../contants";
import {listItemStyles} from "../style";
import WeekBar from "./WeekBar";
import ListItemHeader from "./ListItemHeader";

const CENTER_STYLES = {justifyContent: 'center', alignItems: 'center'};
const PADDING = 12;
const f1 = (Constants.SCREEN_WIDTH - PADDING) / 7;
const f2 = f1.toString();
const f3 = f2.substring(0, f2.indexOf('.') >= 0 ? (f2.indexOf('.') + 3) : 3);
const text_width = parseFloat(f3);

class ListItem extends React.Component {

    _selectDate = (date, index) => {
        const {selectDate} = this.props;
        selectDate && typeof selectDate === 'function' && selectDate(date, index);
    };

    _needSelectedRangeBgColor = (startDate, endDate, currentDate) => {
        if (!startDate || !endDate) return false;
        return !!(Constants.greaterThan(currentDate, startDate) && Constants.greaterThan(endDate, currentDate));
    };

    _getMarkTypeStyles = (currentDate, days) => {

        const {
            listItemStyle,
            startDate,
            endDate,
            selectedDateMarkType,
            selectedDateMarkColor,
            selectedDateMarkRangeColor,
        } = this.props;

        const hasSelected = startDate === currentDate || endDate === currentDate;

        let markBorderRadius = 0;
        if (listItemStyle.day && typeof listItemStyle.day === 'object' && listItemStyle.day.borderRadius) {
            markBorderRadius = listItemStyle.day.borderRadius;
        }

        const selectedDateStyle = {backgroundColor: 'transparent'};
        const selectedDateRangeStyle = {width: text_width, marginTop: 5, backgroundColor: 'transparent'};

        // Dot
        if (selectedDateMarkType === Constants.DEFAULT_DATE_MARK_TYPE.DOT && hasSelected) {
            selectedDateStyle.backgroundColor = selectedDateMarkColor;
        }

        // Circle
        if (selectedDateMarkType === Constants.DEFAULT_DATE_MARK_TYPE.CIRCLE) {
            selectedDateRangeStyle.width = 30;
            selectedDateRangeStyle.height = 30;
            selectedDateRangeStyle.borderRadius = markBorderRadius || 999;
            selectedDateRangeStyle.justifyContent = 'center';
            selectedDateRangeStyle.alignItems = 'center';
            if (hasSelected) {
                selectedDateStyle.borderRadius = markBorderRadius || 999;
                selectedDateRangeStyle.backgroundColor = selectedDateMarkColor;
            }
        }

        // Ellipse or Semiellipse
        if (selectedDateMarkType === Constants.DEFAULT_DATE_MARK_TYPE.ELLIPSE || selectedDateMarkType === Constants.DEFAULT_DATE_MARK_TYPE.SEMIELLIPSE) {
            if (hasSelected) {
                selectedDateStyle.borderRadius = markBorderRadius || 999;
                selectedDateStyle.backgroundColor = selectedDateMarkColor;
                selectedDateRangeStyle.backgroundColor = selectedDateMarkType === Constants.DEFAULT_DATE_MARK_TYPE.ELLIPSE ? selectedDateMarkRangeColor : selectedDateMarkColor;
                if (startDate && endDate) {
                    if (startDate === currentDate) {
                        selectedDateRangeStyle.borderTopLeftRadius = markBorderRadius || 999;
                        selectedDateRangeStyle.borderBottomLeftRadius = markBorderRadius || 999;
                    }
                    if (endDate === currentDate) {
                        selectedDateRangeStyle.borderTopRightRadius = markBorderRadius || 999;
                        selectedDateRangeStyle.borderBottomRightRadius = markBorderRadius || 999;
                    }
                } else {
                    selectedDateRangeStyle.borderRadius = markBorderRadius || 999;
                }
            }
        }

        // Rectangle
        if (selectedDateMarkType === Constants.DEFAULT_DATE_MARK_TYPE.RECTANGLE) {
            selectedDateStyle.borderRadius = markBorderRadius;
            selectedDateRangeStyle.borderRadius = markBorderRadius;
            if (hasSelected) {
                selectedDateStyle.backgroundColor = selectedDateMarkColor;
                selectedDateRangeStyle.backgroundColor = selectedDateMarkColor;
            }
        }

        // Square
        if (selectedDateMarkType === Constants.DEFAULT_DATE_MARK_TYPE.SQUARE) {
            selectedDateRangeStyle.width = 30;
            selectedDateRangeStyle.height = 30;
            selectedDateStyle.borderRadius = markBorderRadius;
            selectedDateRangeStyle.borderRadius = markBorderRadius;
            selectedDateRangeStyle.justifyContent = 'center';
            selectedDateRangeStyle.alignItems = 'center';
            if (hasSelected) {
                selectedDateRangeStyle.backgroundColor = selectedDateMarkColor;
            }
        }

        if (this._needSelectedRangeBgColor(startDate, endDate, currentDate)) {
            selectedDateRangeStyle.backgroundColor = selectedDateMarkRangeColor;
        }

        return [selectedDateRangeStyle, selectedDateStyle];
    };

    _renderDot = styles => {
        return (<View style={{borderRadius: 2.5, backgroundColor: styles[0].backgroundColor}}>
            <View style={{width: 5, height: 5, borderRadius: 2.5, backgroundColor: styles[1].backgroundColor}}/>
        </View>);
    };

    _renderDays = (day, index, days) => {

        const {
            item,
            minDate,
            maxDate,
            listItemStyle,
            beyondDatesDisabled,
            beyondDatesDisabledTextColor,
            selectedDateMarkType,
        } = this.props;

        const currentDate = `${item.year}-${item.month}-${day}`;
        const markTypeStyles = this._getMarkTypeStyles(currentDate, days);

        let dayStyle = {};
        if (listItemStyle.day && typeof listItemStyle.day === 'object') {
            const temDayStyle = Object.assign({}, listItemStyle.day);
            delete temDayStyle.width;
            delete temDayStyle.height;
            dayStyle = temDayStyle;
        }

        const disabledDayStyle = {};
        let disabled = false;
        if (Constants.greaterThan(minDate, currentDate) || Constants.greaterThan(currentDate, maxDate)) {
            disabledDayStyle.color = beyondDatesDisabledTextColor;
            disabled = beyondDatesDisabled;
        }
        const isDot = selectedDateMarkType === Constants.DEFAULT_DATE_MARK_TYPE.DOT;
        return day < 0 ? <View key={index} style={{width: text_width}}/> :
            <TouchableOpacity
                key={index}
                disabled={disabled}
                onPress={() => this._selectDate(currentDate, index)}
                activeOpacity={0.6}
                style={{width: text_width, ...CENTER_STYLES}}
            >
                <View style={[isDot ? {} : markTypeStyles[0]]}>
                    <View style={[isDot ? {...CENTER_STYLES, marginTop: 5} : markTypeStyles[1]]}>
                        <Text style={[listItemStyles.day, dayStyle, disabledDayStyle]}>{day}</Text>
                        {isDot && this._renderDot(markTypeStyles)}
                    </View>
                </View>
            </TouchableOpacity>;
    };

    render() {
        const {
            item,
            listItemStyle,
            showWeeks,
            horizontal,
            weeks,
            weeksTextStyle,
            weeksStyle,
            weeksChineseType,
            firstDayOnWeeks,
            headerTitleType,
            rightArrowClick,
            leftArrowClick,
            hideArrow,
            arrowAlign,
            arrowColor,
            arrowSize,
        } = this.props;
        const _wks = weeksChineseType && weeks === Constants.DEFAULT_WEEK_EN ? Constants.DEFAULT_WEEK_ZH : weeks;
        const _weeks = Constants.getWeekDays(_wks, firstDayOnWeeks);
        return <View style={[listItemStyles.container, listItemStyle.container || {}]}>
            <ListItemHeader
                item={item}
                headerTitleType={headerTitleType}
                listItemStyle={listItemStyle}
                leftArrowClick={leftArrowClick}
                rightArrowClick={rightArrowClick}
                hideArrow={hideArrow}
                arrowColor={arrowColor}
                arrowSize={arrowSize}
                arrowAlign={arrowAlign}
                {...this.props}
            />
            {showWeeks && horizontal && <WeekBar
                weeks={_weeks}
                style={weeksStyle}
                textStyle={weeksTextStyle}
            />}
            <View style={[listItemStyles.dayContent, {paddingLeft: PADDING / 2}, listItemStyle.dayContent || {}]}>
                {item.days.map((day, index) => this._renderDays(day, index, item.days))}
            </View>
        </View>;
    }

}

ListItem.propTypes = {
    showWeeks: PropTypes.bool,
    horizontal: PropTypes.bool,
    item: PropTypes.object.isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    beyondDatesDisabled: PropTypes.bool,
    beyondDatesDisabledTextColor: PropTypes.string,
    selectDate: PropTypes.func,
    headerTitleType: PropTypes.number,
    listItemStyle: PropTypes.object,
    selectedDateMarkType: PropTypes.string,
    selectedDateMarkColor: PropTypes.string,
    selectedDateMarkRangeColor: PropTypes.string,
    leftArrowClick: PropTypes.func,
    rightArrowClick: PropTypes.func,
    hideArrow: PropTypes.bool,
    arrowColor: PropTypes.string,
    arrowSize: PropTypes.number,
    arrowAlign: PropTypes.string,
};

export default ListItem;