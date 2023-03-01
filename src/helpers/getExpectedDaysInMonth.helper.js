// internals
import { daysInMonths, gregorianCalendarIntroductionDate } from "../constants";
import { isLeapYear } from "./isLeapYear.helper";

/**
 * Returns the amount of days expected in the given month.
 * If the month is February, it calculates whether the year
 * is a leap year or not and responds accordingly.
 *
 * @param {number} month
 * @param {number} year
 * @returns {number}
 */
export const getExpectedDaysInMonth = (month, year) => {
    if (
        year === gregorianCalendarIntroductionDate[0] &&
        month === gregorianCalendarIntroductionDate[1]
    ) {
        return daysInMonths[9] - 10;
    }
    if (month === 2) {
        return daysInMonths[1][isLeapYear(year) ? 1 : 0];
    }
    return daysInMonths[month - 1];
};
