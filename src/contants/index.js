import {Dimensions} from 'react-native';
import {getWeekDay, getDaysInMonth, getToday} from '../utils/dateFormat';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
export const DEFAULT_MIN_DATE = '2015-1-1'; // "2015/1/1"、"2015/01/01"、"2015-01-01"
export const DEFAULT_MAX_DATE = getToday();

/** Tool bar **/
export const DEFAULT_CANCEL_TEXT = 'Cancel';
export const DEFAULT_CONFIRM_TEXT = 'Confirm';
export const DEFAULT_TOOL_BAR_POSITION = {
    TOP: 'top',
    BOTTOM: 'bottom',
};

/** Only for Calendar */
export const DEFAULT_WEEK_ZH = [
    '日',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
];

/** Only for Calendar */
export const DEFAULT_WEEK_EN = [
    'Su',
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa',
];

export const DEFAULT_MONTH_SHORT = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

export const DEFAULT_MONTH_LONG = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

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
        if (firstDay === 0) return temWeeks;
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

export function getDatePickerInitSelectDate(type: string, initialDefaultDates: Array) {
    const _year = initialDefaultDates[0];
    const _month = initialDefaultDates[1];
    const _day = initialDefaultDates[2];
    if (type === DATE_TYPE.YYYY_MM_DD
        || type === DATE_TYPE.MM_DD_YYYY
        || type === DATE_TYPE.DD_MM_YYYY
    ) {
        return [_year, _month, _day];
    }

    if (type === DATE_TYPE.YYYY_MM
        || type === DATE_TYPE.MM_YYYY
    ) {
        return [_year, _month, ''];
    }

    if (type === DATE_TYPE.MM_DD
        || type === DATE_TYPE.DD_MM
    ) {
        return ['', _month, _day];
    }

    if (type === DATE_TYPE.YYYY) return [_year, '', ''];

    if (type === DATE_TYPE.MM) return ['', _month, ''];

    if (type === DATE_TYPE.DD) return ['', '', _day];

    return [_year, _month, _day];
}

export function getDatePickerDataSource(type, years, months, days) {
    const _year = {
        key: DATE_KEY_TYPE.YEAR,
        data: years,
    };
    const _month = {
        key: DATE_KEY_TYPE.MONTH,
        data: months,
    };
    const _day = {
        key: DATE_KEY_TYPE.DAY,
        data: days,
    };
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

/**
 * Validate date parameter
 * @param date A string type or Date type
 * @returns {string|void | string} Returns a string like "2020-6-15"
 */
export function validateDate(date: any): string {
    if (!date) {
        const errorMsg = 'minDate or maxDate are used but no value set';
        __DEV__ && console.error(errorMsg);
        __DEV__ && console.warn(errorMsg);
        return getToday();
    }
    if (date instanceof Date) return date.toISOString().slice(0, 10);
    return date.replace(/\//g, '-');
}

/**
 * Construct dates according to given two dates
 * @param type A string date order
 * @param monthDisplayMode
 * @param startDate A string type or Date type date like '2019-05-20', new Date()
 * @param endDate A string type or Date type date like '2020-06-02'
 * @returns {[]} Return a date array consists of year, month and day such as [{date: 2019, data: [{date: 6, data: [{date: 1}, {date: 2}]}].
 */
export function getDatePickerDates(type: string, monthDisplayMode: string, startDate: any, endDate: any) {

    const _startDate = validateDate(startDate);
    const _endDate = validateDate(endDate);

    if (!greaterThanOrEqualTo(_endDate, _startDate)) {
        __DEV__ && console.error('maxDate must be greater or equal to minDate!');
        __DEV__ && console.warn('maxDate must be greater or equal to minDate!');
    }

    const startArr = _startDate.split('-');
    const endArr = _endDate.split('-');
    const startYear = +startArr[0];
    const endYear = +endArr[0];
    const startMonth = +startArr[1];
    const endMonth = +endArr[1];
    const startDay = +startArr[2];
    const endDay = +endArr[2];
    const dates = [];

    checkDatePickerDateType(type, startYear, startMonth, endYear, endMonth);

    for (let year = startYear; year <= endYear; year++) {
        const yearObj = {date: year};

        let _startMonth = startMonth;
        let _endMonth = endMonth;

        if (startYear === endYear) { // Only one year
            // Do nothing
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

            const maxDay = getDaysInMonth(year, month);

            let _startDay = startDay;
            let _endDay = endDay;

            if (startYear === endYear || year === endYear || year === startYear) {
                if (_startMonth === _endMonth) {
                    // Do nothing
                } else if (month === _startMonth) {
                    _startDay = (startYear === endYear) ? startDay : (year === endYear ? 1 : startDay);
                    _endDay = maxDay;
                } else if (month === _endMonth) {
                    _startDay = 1;
                    _endDay = year === startYear ? ((startYear === endYear) ? endDay : maxDay) : endDay;
                } else {
                    _startDay = 1;
                    _endDay = maxDay;
                }
            } else {
                _startDay = 1;
                _endDay = maxDay;
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

function checkDatePickerDateType(type, startYear, startMonth, endYear, endMonth) {
    if (type === DATE_TYPE.MM_DD || type === DATE_TYPE.DD_MM || type === DATE_TYPE.MM) {
        if (startYear !== endYear) {
            __DEV__ && console.error('For type = \'MM-DD\'、\'DD-MM\'、\'MM\', the same year for minDate and maxDate is required');
            __DEV__ && console.warn('For type = \'MM-DD\'、\'DD-MM\'、\'MM\', the same year for minDate and maxDate is required');
        }
    }
    if (type === DATE_TYPE.DD) {
        if (startYear !== endYear || startMonth !== endMonth) {
            __DEV__ && console.error('For type = \'DD\', the year and the month for minDate and maxDate must be the same');
            __DEV__ && console.warn('For type = \'DD\', the year and the month for minDate and maxDate must be the same');
        }
    }
}

export function getDatePickerMonth(monthDisplayMode: string, month: number) {
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
 * Assert date parameters.
 * @param maxDate A string or Date type
 * @param minDate A string or Date type
 * @param defaultDate A string or Date type
 */
export function assertDate(maxDate, minDate, defaultDate) {

    const _maxDate = validateDate(maxDate);
    const _minDate = validateDate(minDate);
    const _defaultDate = validateDate(defaultDate);

    if (!greaterThanOrEqualTo(_defaultDate, _minDate)) {
        const errorMsg = `Error! defaultDate must be greater than or equal to minDate! But defaultDate: ${_defaultDate} is less than minDate: ${_minDate}`;
        __DEV__ && console.error(errorMsg);
        __DEV__ && console.warn(errorMsg);
    }

    if (!greaterThanOrEqualTo(_maxDate, _defaultDate)) {
        const errorMsg = `Error! maxDate must be greater than or equal to defaultDate! But maxDate: ${_maxDate} is less than defaultDate: ${_defaultDate}`;
        __DEV__ && console.error(errorMsg);
        __DEV__ && console.warn(errorMsg);
    }

    if (!greaterThanOrEqualTo(_maxDate, _minDate)) {
        const errorMsg = `Error! maxDate must be greater than or equal to minDate! But maxDate: ${_maxDate} is less than minDate: ${_minDate}`;
        __DEV__ && console.error(errorMsg);
        __DEV__ && console.warn(errorMsg);
    }

}

/**
 * NOTE: Bad performance for Date.parse(startDate.replace(/-/g, '/')) < Date.parse(_d.replace(/-/g, '/')). So use the following
 * comparison method can greatly improve performance. If interested, you can have a try.
 * Compare two date. If date >= another, returns true, else false.
 * @param date  A string type representing a date
 * @param another A string type representing a date
 * @returns {boolean}
 */
export function greaterThan(date: string, another: string) {
    if (!date || typeof date !== 'string' || !another || typeof another !== 'string') return false;
    const dateArr = date.replace(/\//g, '-').split('-');
    const anotherArr = another.replace(/\//g, '-').split('-');
    // year1 > year2
    if (parseInt(dateArr[0]) > parseInt(anotherArr[0])) return true;
    // year1 = year2
    if (parseInt(dateArr[0]) === parseInt(anotherArr[0])) {
        // month1 > month2
        if (parseInt(dateArr[1]) > parseInt(anotherArr[1])) return true;
        // month1 = month2
        if (parseInt(dateArr[1]) === parseInt(anotherArr[1])) return parseInt(dateArr[2]) > parseInt(anotherArr[2]);  // return day1 > day2
    }
    // year1 < year2
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
        month = DEFAULT_MONTH_SHORT.indexOf(month) >= 0 ? (DEFAULT_MONTH_SHORT.indexOf(month) + 1).toString() : '';
    }

    if (monthDisplayMode === MONTH_DISPLAY_MODE.EN_LONG) {
        month = DEFAULT_MONTH_LONG.indexOf(month) >= 0 ? (DEFAULT_MONTH_LONG.indexOf(month) + 1).toString() : '';
    }

    year = year.length ? (year + (month.length ? '-' : '')) : '';
    const monthDash = day.length ? '-' : '';
    month = month.length ? (month.length === 1 ? `0${month}${monthDash}` : `${month}${monthDash}`) : '';
    day = day.length ? (day.length === 1 ? `0${day}` : `${day}`) : '';

    return year + month + day;
}