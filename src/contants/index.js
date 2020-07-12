import {Dimensions} from 'react-native';
import {getWeekDay, getDaysInMonth, getToday} from '../utils/dateFormat';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
export const DEFAULT_MIN_DATE = '2000-1-1';
export const DEFAULT_MAX_DATE = getToday();

/** Tool bar **/
export const DEFAULT_CANCEL_TEXT = 'Cancel';
export const DEFAULT_CONFIRM_TEXT = 'Confirm';
export const DEFAULT_TOOL_BAR_POSITION = {
    TOP: 'top',
    BOTTOM: 'bottom',
};

/** Only for Calendar */
export const DEFAULT_WEEK_ZH = ['日', '一', '二', '三', '四', '五', '六'];

/** Only for Calendar */
export const DEFAULT_WEEK_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const DEFAULT_MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const DEFAULT_MONTH_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** Only for Calendar */
export const DEFAULT_DATE_MARK_TYPE = {
    ELLIPSE: 'ellipse',
    SEMIELLIPSE: 'semiellipse',
    RECTANGLE: 'rectangle',
    SQUARE: 'square',
    CIRCLE: 'circle',
    DOT: 'dot',
};

/**
 * Only for Calendar
 *
 * Validate date parameter
 * @param date A string type or Date type
 * @returns {string|void | string} Returns a string like "2020-6-15"
 */
export function validateDate(date: any): string {
    if (!date) {
        const errorMsg = 'minDate or maxDate are used but no value set';
        __DEV__ && console.error(errorMsg);
        return getToday();
    }
    if (date instanceof Date) return date.toISOString().slice(0, 10);
    return date.replace(/\//g, '-');
}

/**
 * Only for Calendar
 *
 * @param weeks
 * @param firstDay
 * @returns {[]} Returns a week array according to the first day.
 */
export function getWeekDays(weeks: [string], firstDay: number): [string] {
    let _weeks = [];
    // Use default week
    if (weeks === DEFAULT_WEEK_EN || weeks === DEFAULT_WEEK_ZH) {
        const temWeeks = weeks === DEFAULT_WEEK_EN ? DEFAULT_WEEK_EN : DEFAULT_WEEK_ZH;
        // Nothing changed
        if (firstDay === 0) {
            return temWeeks;
        }

        const _pre = [];
        const _later = [];
        temWeeks.forEach((day, index) => {
            if (index < firstDay) {
                _later.push(day);
            } else {
                _pre.push(day);
            }
        });
        _weeks = _pre.concat(_later);
    } else {
        _weeks = weeks;
    }
    return _weeks;
}

/**
 * Construct dates according to given two dates
 * @param startDate A string date like '2019-05-20'
 * @param endDate A string date like '2020-06-02'
 * @param firstDay
 * @returns {[]} Return a date array consists of year, month and day such as [{year: 2019, month: 1, days: [1, 2, 3, ...]}, {year: 2019, month: 2, days: [1, 2, 3, ...]}, {year: 2020, month: 6, days: [1, 2, 3, ...]}]
 */
export function getCalendarDates(startDate: string, endDate: string, firstDay: number) {
    const startArr = startDate.replace(/\//g, '-').split('-');
    const endArr = endDate.replace(/\//g, '-').split('-');
    const startYear = +startArr[0];
    const endYear = +endArr[0];
    const startMonth = +startArr[1];
    const endMonth = +endArr[1];
    let dates = [];
    for (let year = startYear; year <= endYear; year++) {
        if (startYear === endYear) {
            dates = dates.concat(constructCalendarDates(year, startMonth, endMonth, firstDay));
        } else if (year === startYear) {
            dates = dates.concat(constructCalendarDates(year, startMonth, 12, firstDay));
        } else if (year === endYear) {
            dates = dates.concat(constructCalendarDates(year, 1, endMonth, firstDay));
        } else {
            dates = dates.concat(constructCalendarDates(year, 1, 12, firstDay));
        }
    }
    return dates;
}

/**
 * Returns a date array containing all dates via year, month and day
 * @param year A numeric value equal to the year
 * @param startMonth A numeric value equal to the month from 1 to 12
 * @param endMonth A numeric value equal to the month from 1 to 12
 * @param firstDay
 * @returns {[]}
 */
function constructCalendarDates(year: number, startMonth: number, endMonth: number, firstDay: number) {
    const dates = [];
    for (let month = startMonth; month <= endMonth; month++) {
        const obj = {year};
        obj.month = month;

        const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
        let weekDay = -1;
        let maxDayInMonth = -1;

        weekDay = getWeekDay(`${year}-${month <= 9 ? '0' : ''}${month}-01`) - firstDay;
        if (weekDay < 0) {
            weekDay = weekDay + 7;
        }
        maxDayInMonth = getDaysInMonth(year, month);

        for (let wd = 0; wd < weekDay; wd++) {
            days.unshift(-(wd + 1));
        }

        for (let day = 28; day <= maxDayInMonth; day++) {
            days.push(day);
        }

        obj.days = days;
        dates.push(obj);
    }
    return dates;
}

/** Only for Date Picker */
export const DATE_PICKER_ROWS = 5;
export const DATE_PICKER_ROW_HEIGHT = 35;

/** Only for Date Picker */
export const BORDER_LINE_POSITION = {
    TOP: 'top',
    MIDDLE: 'middle',
    BOTTOM: 'bottom',
};

/** Only for Date Picker */
export const DATE_TYPE = {
    YYYY_MM_DD: 'YYYY-MM-DD',
    MM_DD_YYYY: 'MM-DD-YYYY',
    DD_MM_YYYY: 'DD-MM-YYYY',
    YYYY_MM: 'YYYY-MM',
    MM_YYYY: 'MM-YYYY',
    MM_DD: 'MM-DD',
    DD_MM: 'DD-MM',
    YYYY: 'YYYY',
    MM: 'MM',
    DD: 'DD',
};

/** Only for Date Picker */
export const DATE_KEY_TYPE = {
    YEAR: 'year',
    MONTH: 'month',
    DAY: 'day',
};

/** Only for Date Picker */
export const MONTH_DISPLAY_MODE = {
    DIGIT: 'digit',
    EN_SHORT: 'en-short',
    EN_LONG: 'en-long',
};

/** Only for Date Picker */
export function selectDatePickerData(index, data) {
    return index >= 0 && data.length > index ? data[index].data : [];
}

/** Only for Date Picker */
export function datePickerListWidth(type: string, width: number | string) {
    if (!type || typeof type !== 'string' || +width > SCREEN_WIDTH) {
        return SCREEN_WIDTH / type.split('-').length;
    }
    return +width / type.split('-').length;
}

/** Only for Date Picker */
export function getDatePickerData(type, years, months, days) {
    const _year = {key: DATE_KEY_TYPE.YEAR, data: years};
    const _month = {key: DATE_KEY_TYPE.MONTH, data: months};
    const _day = {key: DATE_KEY_TYPE.DAY, data: days};
    switch (type) {
        case DATE_TYPE.YYYY_MM_DD:
            return [_year, _month, _day];
        case DATE_TYPE.MM_DD_YYYY:
            return [_month, _day, _year];
        case DATE_TYPE.DD_MM_YYYY:
            return [_day, _month, _year];
        case DATE_TYPE.YYYY_MM:
            return [_year, _month];
        case DATE_TYPE.MM_YYYY:
            return [_month, _year];
        case DATE_TYPE.MM_DD:
            return [_month, _day];
        case DATE_TYPE.DD_MM:
            return [_day, _month];
        case DATE_TYPE.YYYY:
            return [_year];
        case DATE_TYPE.MM:
            return [_month];
        case DATE_TYPE.DD:
            return [_day];
        default:
            return [_year, _month, _day];
    }
}

/** Only for Date Picker */
export function getDatePickerInitialData(initialProps) {

    const {
        type,
        defaultDate,
        minDate,
        maxDate,
        monthDisplayMode,
    } = initialProps;

    const _verifyDate = date => {
        let aDate = date;
        if (!date) aDate = getToday();
        if (date instanceof Date) aDate = date.toISOString().slice(0, 10);
        aDate = aDate.replace(/\//g, '-'); // Replace "/" with "-".
        const _y = '2000', _m = '1', _d = '1';
        const _printError = () => console.warn(`The date type you selected is: ${type}, but has incorrect date format: ${aDate}`);
        switch (type) {
            case DATE_TYPE.YYYY:
                __DEV__ && aDate.length !== 4 && _printError();
                return `${aDate}-${_m}-${_d}`;
            case DATE_TYPE.MM:
                __DEV__ && (aDate.length > 2 || +aDate < 1 || +aDate > 12) && _printError();
                return `${_y}-${aDate}-${_d}`;
            case DATE_TYPE.DD:
                __DEV__ && (aDate.length > 2 || +aDate < 1 || +aDate > 31) && _printError();
                return `${_y}-${_m}-${aDate}`;
            case DATE_TYPE.YYYY_MM:
            case DATE_TYPE.MM_YYYY:
                __DEV__ && (aDate.length > 7 || aDate.length < 6) && _printError();
                return `${aDate}-${_d}`;
            case DATE_TYPE.MM_DD:
            case DATE_TYPE.DD_MM:
                __DEV__ && (aDate.length < 3 || aDate.length > 5) && _printError();
                return `${_y}-${aDate}`;
            default:
                return aDate;
        }
    };

    const _maxDate = _verifyDate(maxDate);

    // If defaultDate doest not exist, default is maxDate
    const _defaultDate = _verifyDate(defaultDate || maxDate);

    const _minDate = _verifyDate(minDate);

    // maxDate must be greater or equal to defaultDate, then defaultDate must be greater or equal to minDate
    assertDate(_maxDate, _minDate, _defaultDate);

    // The default selected date for the first time
    const _defaultDates = _defaultDate.split('-');
    const initialSelectedDate = getDatePickerInitSelectDate(type, _defaultDates);

    // Validate whether the index is legal
    const legalIndex = (index, data) => index < 0 ? (data.length - 1) : index;

    // Years
    const dates = constructDatePickerDates(monthDisplayMode, _minDate, _maxDate);
    const yearIndex = dates.findIndex(item => item.date === +_defaultDates[0]);
    const defaultYearIndex = legalIndex(yearIndex, dates);

    // Months
    const months = selectDatePickerData(defaultYearIndex, dates);
    const monthIndex = months.findIndex(item => item.date === getDatePickerMonth(monthDisplayMode, +_defaultDates[1]));
    const defaultMonthIndex = legalIndex(monthIndex, months);

    // Days
    const days = selectDatePickerData(defaultMonthIndex, months);
    const dayIndex = days.findIndex(item => item.date === +_defaultDates[2]);
    const defaultDayIndex = legalIndex(dayIndex, days);

    return {
        years: dates,
        months,
        days,
        defaultYearIndex,
        defaultMonthIndex,
        defaultDayIndex,
        ...initialSelectedDate,
    };
}

/** Only for Date Picker */
function getDatePickerInitSelectDate(type: string, initialDefaultDates: Array) {

    const _year = initialDefaultDates[0];
    const _month = initialDefaultDates[1];
    const _day = initialDefaultDates[2];

    switch (type) {
        case DATE_TYPE.YYYY_MM_DD:
        case DATE_TYPE.MM_DD_YYYY:
        case DATE_TYPE.DD_MM_YYYY:
            return {selectedYear: _year, selectedMonth: _month, selectedDay: _day};
        case DATE_TYPE.YYYY_MM:
        case DATE_TYPE.MM_YYYY:
            return {selectedYear: _year, selectedMonth: _month, selectedDay: ''};
        case DATE_TYPE.MM_DD:
        case DATE_TYPE.DD_MM:
            return {selectedYear: '', selectedMonth: _month, selectedDay: _day};
        case DATE_TYPE.YYYY:
            return {selectedYear: _year, selectedMonth: '', selectedDay: ''};
        case DATE_TYPE.MM:
            return {selectedYear: '', selectedMonth: _month, selectedDay: ''};
        case DATE_TYPE.DD:
            return {selectedYear: '', selectedMonth: '', selectedDay: _day};
        default:
            return {selectedYear: _year, selectedMonth: _month, selectedDay: _day};
    }
}

/**
 * Only for Date Picker
 *
 * Construct dates according to given two dates
 * @param monthDisplayMode
 * @param startDate A string date like '2019-05-20'
 * @param endDate A string date like '2020-06-02'
 * @returns {[]} Return a date array consists of year, month and day such as [{date: 2019, data: [{date: 6, data: [{date: 1}, {date: 2}]}].
 */
function constructDatePickerDates(monthDisplayMode: string, startDate: string, endDate: string) {

    const startArr = startDate.split('-');
    const endArr = endDate.split('-');
    const startYear = +startArr[0];
    const endYear = +endArr[0];
    const startMonth = +startArr[1];
    const endMonth = +endArr[1];
    const startDay = +startArr[2];
    const endDay = +endArr[2];
    const dates = [];

    for (let year = startYear; year <= endYear; year++) {
        const yearObj = {date: year};

        let _startMonth = startMonth;
        let _endMonth = endMonth;

        if (startYear === endYear) { // Only one year
            // Do nothing. Use the default value above
        } else if (year === startYear) { // At least two years
            _endMonth = 12;
        } else if (year === endYear) { // At least two years
            _startMonth = 1;
        } else { // At least three years
            _startMonth = 1;
            _endMonth = 12;
        }

        const months = [];
        for (let month = _startMonth; month <= _endMonth; month++) {
            const monthObj = {date: getDatePickerMonth(monthDisplayMode, month)};

            // Get the days in a month
            const maxDay = getDaysInMonth(year, month);

            let _startDay = startDay;
            let _endDay = endDay;

            if (year > startYear && year < endYear) {
                _startDay = 1;
                _endDay = maxDay;
            } else {
                if (_startMonth === _endMonth) {
                    _startDay = startYear === endYear || year === startYear ? startDay : 1;
                    _endDay = startYear === endYear || year === endYear ? endDay : maxDay;
                } else if (month === _startMonth) {
                    _startDay = startYear === endYear || year === startYear ? startDay : 1;
                    _endDay = maxDay;
                } else if (month === _endMonth) {
                    _startDay = 1;
                    _endDay = startYear === endYear || year === endYear ? endDay : maxDay;
                } else {
                    _startDay = 1;
                    _endDay = maxDay;
                }
            }

            const days = [];
            for (let day = _startDay; day <= _endDay; day++) {
                const dayObj = {date: day};
                days.push(dayObj);
            }

            monthObj.data = days;
            months.push(monthObj);
        }

        yearObj.data = months;
        dates.push(yearObj);
    }

    return dates;
}

/**
 * Only for Date Picker
 *
 * Returns the month's displaying text based on both the month given from 1 to 12 and month display mode.
 * @param monthDisplayMode A string type representing the display mode of month
 * @param month A numeric value representing a specific month
 * @returns number or string type
 */
function getDatePickerMonth(monthDisplayMode: string, month: number) {
    if (Object.values(MONTH_DISPLAY_MODE).indexOf(monthDisplayMode) < 0) return month;
    switch (monthDisplayMode) {
        case MONTH_DISPLAY_MODE.DIGIT:
            return month;
        case MONTH_DISPLAY_MODE.EN_SHORT:
            return DEFAULT_MONTH_SHORT[month - 1];
        case MONTH_DISPLAY_MODE.EN_LONG:
            return DEFAULT_MONTH_LONG[month - 1];
        default:
            return month;
    }
}

/**
 * Only for Date Picker
 *
 * Assert date parameters through comparing them.
 * @param maxDate A string
 * @param minDate A string
 * @param defaultDate A string
 */
function assertDate(maxDate: string, minDate: string, defaultDate: string) {

    let errorMsg = '';
    if (!greaterThanOrEqualTo(defaultDate, minDate)) {
        errorMsg = `Error! defaultDate must be greater than or equal to minDate! But defaultDate: ${defaultDate} is less than minDate: ${minDate}`;
    }

    if (!greaterThanOrEqualTo(maxDate, defaultDate)) {
        errorMsg = `Error! maxDate must be greater than or equal to defaultDate! But maxDate: ${maxDate} is less than defaultDate: ${defaultDate}`;
    }

    if (!greaterThanOrEqualTo(maxDate, minDate)) {
        errorMsg = `Error! maxDate must be greater than or equal to minDate! But maxDate: ${maxDate} is less than minDate: ${minDate}`;
    }

    __DEV__ && errorMsg && errorMsg.length && console.error(errorMsg);
}

/**
 * NOTE: Bad performance for Date.parse(startDate.replace(/-/g, '/')) < Date.parse(_d.replace(/-/g, '/')). So using the following
 * comparison method can greatly improve performance. If interested, you can have a try.
 *
 * Compare two date. If date > another, returns true, else false.
 * @param date  A string type representing a date like "2020-1-10"
 * @param another A string type representing a date like "2019-06-15"
 * @returns {boolean}
 */
export function greaterThan(date: string, another: string) {
    if (!date || typeof date !== 'string' || !another || typeof another !== 'string') return false;
    const dateArr = date.replace(/\//g, '-').split('-');
    const anotherArr = another.replace(/\//g, '-').split('-');
    if (parseInt(dateArr[0]) > parseInt(anotherArr[0])) return true;
    if (parseInt(dateArr[0]) === parseInt(anotherArr[0])) {
        if (parseInt(dateArr[1]) > parseInt(anotherArr[1])) return true;
        if (parseInt(dateArr[1]) === parseInt(anotherArr[1])) return parseInt(dateArr[2]) > parseInt(anotherArr[2]);  // return day1 > day2
    }
    return false;
}

/**
 * Compare two date. If date >= another, returns true, else false.
 * @param date  A string type representing a date
 * @param another A string type representing a date
 * @returns {boolean}
 */
export function greaterThanOrEqualTo(date: string, another: string) {
    if (!date || typeof date !== 'string' || !another || typeof another !== 'string') return false;
    if (date === another) return true;
    const dateArr = date.replace(/\//g, '-').split('-');
    const anotherArr = another.replace(/\//g, '-').split('-');
    if (parseInt(dateArr[0]) > parseInt(anotherArr[0])) return true;
    if (parseInt(dateArr[0]) === parseInt(anotherArr[0])) {
        if (parseInt(dateArr[1]) > parseInt(anotherArr[1])) return true;
        if (parseInt(dateArr[1]) === parseInt(anotherArr[1])) return parseInt(dateArr[2]) >= parseInt(anotherArr[2]);
    }
    return false;
}

/**
 * Convert a date string into a standard date string. For example, your can convert "2020-1-6" into "2020-01-06".
 * Note: "2020-June-1" will be converted into "2020-06-01", "-June-1" into "06-01", "-June-" into "06" that represents
 * type={"MM"}. In the same way, if type={"DD"}, "--5" will be converted into "05".
 * @param monthDisplayMode
 * @param date a date string to be converted.
 */
export function toStandardStringWith(date: string, monthDisplayMode: string = ''): string {
    if (!date || typeof date !== 'string') return date;
    const dates = date.replace(/\//g, '-').split('-');

    if (dates.length !== 3) {
        __DEV__ && console.warn('Sorry! date string format is incorrect!');
        return date;
    }

    let year = dates[0];
    let day = dates[2];
    let month = dates[1];
    if (monthDisplayMode === MONTH_DISPLAY_MODE.EN_SHORT) {
        month = DEFAULT_MONTH_SHORT.indexOf(month) >= 0 ? (DEFAULT_MONTH_SHORT.indexOf(month) + 1).toString() : month;
    }

    if (monthDisplayMode === MONTH_DISPLAY_MODE.EN_LONG) {
        month = DEFAULT_MONTH_LONG.indexOf(month) >= 0 ? (DEFAULT_MONTH_LONG.indexOf(month) + 1).toString() : month;
    }

    year = year.length ? (year + (month.length ? '-' : '')) : '';
    const monthDash = day.length ? '-' : '';
    month = month.length ? (month.length === 1 ? `0${month}${monthDash}` : `${month}${monthDash}`) : '';
    day = day.length ? (day.length === 1 ? `0${day}` : `${day}`) : '';

    return year + month + day;
}
