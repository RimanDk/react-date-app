// internals
import { daysInMonths } from "../constants";
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
    if (month === 2) {
        return daysInMonths[1][isLeapYear(year) ? 1 : 0];
    }
    return daysInMonths[month - 1];
};
