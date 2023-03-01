import { gregorianCalendarIntroductionDate } from "../constants";

export const isLeapYear = (year) => year < gregorianCalendarIntroductionDate[0]
    ? isLeapYearJulian(year)
    : isLeapYearGregorian(year)

/**
 * Returns whether a year is a leap year or not by
 * the standards of the Julian calendar.
 *
 * @param {number} year
 * @returns {boolean}
 */
const isLeapYearJulian = (year) => isEvenlyDivisible(year, 4);

/**
 * Returns whether a year is a leap year or not by
 * the standards of the Gregorian calendar.
 *
 * @param {number} year
 * @returns {boolean}
 */
const isLeapYearGregorian = (year) => {
    /**
     * For a year to be eligible to be a leap year,
     * it _must_ be evenly divisible by 4. If it is
     * not, it is automatically discarded.
     */
    if (!isEvenlyDivisible(year, 4)) {
        return false;
    }

    /**
     * If the year _is_ evenly divisible by 4,
     * it also needs to _not_ be evenly divisible by 100.
     */
    if (!isEvenlyDivisible(year, 100)) {
        return true;
    }

    /**
     * If it is divisible by 100 as well, it furthermore
     * needs to be divisible by 400 as well to qualify!
     */
    if (isEvenlyDivisible(year, 400)) {
        return true;
    }
    return false;
};

const isEvenlyDivisible = (number, dividend) => number % dividend === 0;
