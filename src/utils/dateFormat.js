/**
 * Get today like "2020-06-02".
 * @returns {string} Returns a string value that stands for today.
 */
export function getToday(): string {
    return new Date().toISOString().slice(0, 10);
}

/**
 * Gets the week day for a date.
 * Why not use this way? Because this method of parsing is very inefficient with bad performance that takes lots of time to return the result.
 * """
 *   const _date = new Date(Date.parse(date.replace(/-/g, '/')));
 *   return _date.getDay(); // 0 to 6
 * """
 * @param date A date string such as '2020-05-20' or '2020/05/20'. Note that date string like '2020/5/20' is not permitted.
 * @returns {number} Returns the day of a date representing the week day from 0 to 6, 0 is Sunday, 1 is Monday, 2 is Tuesday, etc.
 */
export function getWeekDay(date: string): number {
    if (date.length !== 10) {
        __DEV__ && console.error('getWeekDay function\'s parameter date format error!!!, please check your parameter');
        return 0;
    }
    return new Date(date).getDay();
}

/**
 * Gets how many days in a month.
 * Note that the reason why we don't use "new Date(year, month, 0).getDate()" is that its performance looks like
 * very bad. So we take a seemingly stupid but efficient approach as follows
 * @param year A numeric value equal to the year
 * @param month A numeric value equal to the month. The value for January is 1, and other month values follow consecutively.
 * @returns {number} Returns the days in a month like 28, 31 and the like.
 */
export function getDaysInMonth(year: number, month: number): number {
    if (month <= 0 || month > 12) {
        __DEV__ && console.error(`getDaysInMonth error: month should be between 1 and 12, month: ${month}`);
        return 30;
    }
    const isLeapYear = year % 4 === 0; // If year % 4 === 0, this year is leap year, otherwise common year.
    const daysInFebruary = isLeapYear ? 29 : 28;
    const daysInEachMonth = [31, daysInFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const monthIndex = month >= 1 ? (month - 1) : 0;
    return daysInEachMonth[monthIndex];
}
