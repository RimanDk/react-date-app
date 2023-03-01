// internals
import {
    calculateDaysAcrossMonthsLoop,
    calculateDaysAcrossMonthsRecursively
} from "./calculateDaysAcrossMonths.helper";
import { isLeapYear } from "./isLeapYear.helper";

/**
 * Simple, maintenance friendly loop algorithm to calculate
 * days between two dates spanning years between them.
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
export const calculateDaysAcrossYearsLoop = ({ from, to }) => {
    let days = 0;

    for (let i = from.year; i <= to.year; i++) {
        if (i === to.year) {
            days += calculateDaysAcrossMonthsLoop({
                from: { year: from.year, month: 1, day: 1 },
                to,
                month: from.month,
            });
        } else if (i === from.year) {
            days += calculateDaysAcrossMonthsLoop({
                from,
                to: { year: to.year, month: 12 },
                month: from.month,
            });
        } else {
            days += isLeapYear(i) ? 366 : 365;
        }
    }

    return days;
};

/**
 * Recursive solution to calculate days between two dates
 * spanning years between them.
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
 * @param {number} params.year
 * @param {number} [days=0]
 * @returns {number}
 */
export const calculateDaysAcrossYearsRecursively = ({from, to, year, days = 0}) => {
    if (year === to.year) {
        return days + calculateDaysAcrossMonthsRecursively({
            from: {year: from.year, month: 1, day: 1},
            to,
            month: from.month
        });
    } else if (year === from.year) {
        return calculateDaysAcrossYearsRecursively({
            from,
            to,
            year: year + 1,
            days: days + calculateDaysAcrossMonthsRecursively({
                from,
                to: { year: to.year, month: 12 },
                month: from.month
            })
        });
    }
    return calculateDaysAcrossYearsRecursively({
        from,
        to,
        year: year + 1,
        days: days += isLeapYear(year) ? 366 : 365,
    });
};
