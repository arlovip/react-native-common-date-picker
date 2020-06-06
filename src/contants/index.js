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

export const DEFAULT_WEEK_ZH = [
    '日',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
];

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

export const DEFAULT_DATE_MARK_TYPE = {
    ELLIPSE: 'ellipse',
    SEMIELLIPSE: 'semiellipse',
    RECTANGLE: 'rectangle',
    SQUARE: 'square',
    CIRCLE: 'circle',
    DOT: 'dot',
};

/**
 * Returns a week array according to the first day.
 * @param weeks
 * @param firstDay
 * @returns {[]}
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
export function getDates(startDate: string, endDate: string, firstDay: number) {
    const startArr = startDate.replace(/\//g, '-').split('-');
    const endArr = endDate.replace(/\//g, '-').split('-');
    const startYear = +startArr[0];
    const endYear = +endArr[0];
    const startMonth = +startArr[1];
    const endMonth = +endArr[1];
    let dates = [];
    for (let year = startYear; year <= endYear; year++) {
        if (startYear === endYear) {
            dates = dates.concat(constructDates(year, startMonth, endMonth, firstDay));
        } else if (year === startYear) {
            dates = dates.concat(constructDates(year, startMonth, 12, firstDay));
        } else if (year === endYear) {
            dates = dates.concat(constructDates(year, 1, endMonth, firstDay));
        } else {
            dates = dates.concat(constructDates(year, 1, 12, firstDay));
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
function constructDates(year: number, startMonth: number, endMonth: number, firstDay: number) {
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

/**
 low performance: Date.parse(startDate.replace(/-/g, '/')) < Date.parse(_d.replace(/-/g, '/')).
 So use the following function to compare two dates
 if date > another return true, else false
 */
export function compareDatesWith(date: string, another: string) {

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
        if (parseInt(dateArr[1]) === parseInt(anotherArr[1])) {
            // day1 > day2
            return parseInt(dateArr[2]) > parseInt(anotherArr[2]);
        }
    }

    // year1 < year2
    return false;
}

/**
 * Convert a date string into a standard date string. For example, your can convert "2020-1-6" into "2020-01-06".
 * @param date a date string to convert.
 */
export function toStandardDateString(date: string): string {
    if (!date || typeof date !== 'string') return date;
    const dates = date.replace(/\//g, '-').split('-');
    if (dates.length !== 3) return date;
    return `${dates[0]}-${dates[1].length === 1 ? '0' : ''}${dates[1]}-${dates[2].length === 1 ? '0' : ''}${dates[2]}`;
}