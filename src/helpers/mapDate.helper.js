const splitString = (str, separator) => separator === '-'
    ? str.split(new RegExp(`(?<!^)-`))
    : str.split(separator);

/**
 * Returns a mapped and parsed version of the given string.
 * Can take different separators, but will default to -
 *
 * @param {Object} params
 * @param {string} params.date
 * @param {boolean} [params.parse=true] - whether the date should be parsed into a number
 * @param {string} [params.separator='-']
 * @returns {number[]}
 */
export const mapDateToArray = ({ date, parse = true, separator = '-' }) =>
    splitString(date, separator)
        .map((part) => parse ? parseInt(part, 10) : part);

/**
 * Returns an object representation of the given string.
 * Can tage different separators, but defaults to -
 *
 * @param {Object} params
 * @param {string} params.date
 * @param {boolean} [params.parse=true] - whether the date should be parsed into a number
 * @param {string} [params.separator='-']
 * @returns {Object}
 */
export const mapDateToObject = ({ date, parse = true, separator = '-' }) =>
    splitString(date, separator)
        .reduce((outcome, part, i) => {
            const key = i === 0
                ? 'year'
                : i === 1
                ? 'month'
                : 'day'
            outcome[key] = parse ? parseInt(part, 10) : part;
            return outcome;
        }, { year: 0, month: 0, day: 0 });
