// internals
import {
    daysInMonths,
    firstGregorianCalendarDay,
    gregorianCalendarIntroductionDate
} from "../constants";
import { getExpectedDaysInMonth } from "./getExpectedDaysInMonth.helper";

/**
 * Dual-purpose function.
 * If endDay is defined, the function will return the amount of days
 * from the start of the month to the specified end day _without_
 * the end day itself.
 * If endDay is undefined, the function will return the expected
 * amount of days left in the month (used for calculating December).
 *
 * @param {number} [endDay]
 * @param {number} expectedDaysInMonth
 * @param {number} year
 * @returns {number}
 */
const calculateDaysFromFirstToGiven = (endDay, expectedDaysInMonth, year) => {
    if (year === gregorianCalendarIntroductionDate[0] && expectedDaysInMonth === (daysInMonths[9] - 10)) {
        return endDay <= gregorianCalendarIntroductionDate[2]
            ? endDay - 1
            : endDay - 10 - 1;
    }
    return endDay ? endDay - 1 : expectedDaysInMonth;
};

/**
 * Returns the amount of days from the starting day to the end of the
 * month, _including_ the starting day itself.
 *
 * @param {number} startDay
 * @param {number} expectedDaysInMonth
 * @param {number} year
 * @returns {number}
 */
const calculateDaysFromGivenToLastOfMonth = (startDay, expectedDaysInMonth, year) => {
    if (year === gregorianCalendarIntroductionDate[0] && expectedDaysInMonth === (daysInMonths[9] - 10)) {
        return startDay >= firstGregorianCalendarDay[2]
            ? expectedDaysInMonth - startDay + 1
            : expectedDaysInMonth - 10 - startDay + 1;
    }
    return expectedDaysInMonth - startDay + 1;
};

/**
 * Simple, maintenance-friendly loop algorithm for calculating days
 * between two dates spanning months between them.
 *
 * @param {Object} params
 * @param {Object} params.from
 * @param {number} params.from.year
 * @param {number} params.from.month
 * @param {number} params.from.day
 * @param {Object} params.to
 * @param {number} params.to.year
 * @param {number} params.to.month
 * @param {number} params.to.day
 * @returns {number}
 */
export const calculateDaysAcrossMonthsLoop = ({ from, to }) => {
    let days = 0;

    for (let i = from.month; i <= to.month; i++) {
        const expectedDaysInMonth = getExpectedDaysInMonth(i, from.year);

        if (i === to.month) {
            days += calculateDaysFromFirstToGiven(to.day, expectedDaysInMonth, to.year);
        } else if (i === from.month) {
            days += calculateDaysFromGivenToLastOfMonth(from.day, expectedDaysInMonth, from.year);
        } else {
            days += expectedDaysInMonth;
        }
    }

    return days;
};

/**
 * Recursive solution to calculate days between two dates
 * spanning months between them.
 *
 * @param {Object} params
 * @param {Object} params.from
 * @param {number} params.from.year
 * @param {number} params.from.month
 * @param {number} params.from.day
 * @param {Object} params.to
 * @param {number} params.to.year
 * @param {number} params.to.month
 * @param {number} params.to.day
 * @param {number} params.month
 * @param {number} [days=0]
 * @returns {number}
 */
export const calculateDaysAcrossMonthsRecursively = ({ from, to, month, days = 0 }) => {
    const expectedDaysInMonth = getExpectedDaysInMonth(month, from.year);

    if (month === to.month) {
        return days += calculateDaysFromFirstToGiven(to.day, expectedDaysInMonth, to.year);
    } else if (month === from.month) {
        return calculateDaysAcrossMonthsRecursively({
            from,
            to,
            month: month + 1,
            days: days + calculateDaysFromGivenToLastOfMonth(from.day, expectedDaysInMonth, from.year),
        });
    }
    return calculateDaysAcrossMonthsRecursively({
        from,
        to,
        month: month + 1,
        days: days + expectedDaysInMonth,
    });
};
