// internals
import { mapDateToObject } from './mapDate.helper';
import { getExpectedDaysInMonth } from './getExpectedDaysInMonth.helper';
import { firstGregorianCalendarDay, gregorianCalendarIntroductionDate, isInvalid, isValid } from '../constants';

const validRanges = {
    year: {
        min: () => -46,
        max: () => Number.MAX_SAFE_INTEGER,
    },
    month: {
        min: () => 0,
        max: () => 13,
    },
    day: {
        min: () => 0,
        max: ([month, year]) =>
            getExpectedDaysInMonth(parseInt(month, 10), parseInt(year, 10)) + 1,
    }
};

/**
 * Determines whether a given date string is usable or not.
 * This includes it meeting a number of criteria from observing
 * the correct pattern to falling inside the allowed range to be
 * considered a valid combination of year, month and day.
 *
 * @param {string} date
 * @returns {boolean}
 */
export const isDateValid = (date) => {
    if (!date) {
        return {
            valid: isInvalid,
            msg: 'Date is undefined',
        };
    }

    const {year, month, day} = mapDateToObject({ date, parse: false });

    const isYearValid = validateValue(year, 'Year');
    if (!~isYearValid.valid) {
        return isYearValid;
    }

    const isMonthValid = validateValue(month, 'Month');
    if (!~isMonthValid.valid) {
        return isMonthValid;
    }

    const isDayValid = validateValue(day, 'Day', [month, year]);
    if (!~isDayValid.valid) {
        return isDayValid;
    }

    // Check for special cases, like the introduction of the Gregorian calendar
    if (
        parseInt(year, 10) === gregorianCalendarIntroductionDate[0] &&
        parseInt(month, 10) === gregorianCalendarIntroductionDate[1] &&
        parseInt(day, 10) > gregorianCalendarIntroductionDate[2] &&
        parseInt(day, 10) < firstGregorianCalendarDay[2]
    ) {
        return {
            valid: false,
            msg: `Dates between the ${gregorianCalendarIntroductionDate[2]}th and ${firstGregorianCalendarDay[2]}th of October ${firstGregorianCalendarDay[0]} ` +
                    'were dropped when the Gregorian calendar was introduced and cannot be used'
        }
    }

    return { valid: isValid };
}

/**
 * Returns whether a value is falsey or not.
 *
 * @param {any} value
 * @param {string} type - either year, month or year
 * @returns {Object} containing validation information
 */
const isValueDefined = (value, type) =>
    !!value
        ? { valid: isValid }
        : {
            valid: isInvalid,
            msg: `${type} is undefined`,
        };

/**
 * Returns whether a value is an integer or not.
 *
 * @param {string} value
 * @param {string} type - either year, month or year
 * @returns {Object} containing validation information
 */
const isValueInteger = (value, type) =>
    // (/^(?![\d.,]*[.,])\d+$/.test(value))
    (/^[-]?(\d+)$/.test(value))
        ? { valid: isValid }
        : {
            valid: isInvalid,
            msg: `${type} must be a valid number with no commas or periods or letters`
        };

/**
 * Returns whether a value is within a given range or not.
 *
 * @param {string} value
 * @param {string} type - either year, month or year
 * @param {number} min
 * @param {number} max
 * @returns {Object} containing validation information
 */
const isValueWithinRange = (value, type, min, max) =>
    parseInt(value, 10) > min && parseInt(value, 10) < max
        ? { valid: isValid }
        : {
            valid: isInvalid,
            msg: `${type} must be greater than ${min} and less than ${max}`,
        };

/**
 * Returns whether a value is valid or not.
 * Validity is determined by a combination of type
 * checking and where the given value falls within
 * a given range.
 *
 * @param {string} value
 * @param {string} type - either year, month or year
 * @returns {Object} containing validation information
 */
const validateValue = (value, type, args) => {
    const isDefined = isValueDefined(value, type);
    if (!~isDefined.valid) {
        return isDefined;
    }

    const isInteger = isValueInteger(value, type);
    if (!~isInteger.valid) {
        return isInteger;
    }

    const min = validRanges[type.toLowerCase()].min();
    const max =  validRanges[type.toLowerCase()].max(args);
    const isInRange = isValueWithinRange(value, type, min, max);

    if (!~isInRange.valid) {
        return isInRange;
    }

    return { valid: isValid };
};
