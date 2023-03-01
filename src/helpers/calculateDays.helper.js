// internals
import { firstGregorianCalendarDay, gregorianCalendarIntroductionDate, useSimpleComputation } from "../constants";
import {
    calculateDaysAcrossMonthsLoop,
    calculateDaysAcrossMonthsRecursively
} from "./calculateDaysAcrossMonths.helper";
import {
    calculateDaysAcrossYearsLoop,
    calculateDaysAcrossYearsRecursively
} from "./calculateDaysAcrossYears.helper";
import { mapDateToObject } from "./mapDate.helper";

/**
 * Calculates how many days there are between the two given dates.
 *
 * @param {string} fromStr
 * @param {string} toStr
 * @returns {number} the amount of days between the two dates
 */
export const calculateDays = (fromStr, toStr, simple = useSimpleComputation) => {
    const from = mapDateToObject({ date: fromStr });
    const to = mapDateToObject({ date: toStr });

    if (from.year === to.year) {
        if (from.month === to.month) {
            const [min, max] = from.day > to.day ? [to.day, from.day] : [from.day, to.day];
            if (
                from.year === gregorianCalendarIntroductionDate[0] &&
                from.month === gregorianCalendarIntroductionDate[1]
            ) {
                return max <= gregorianCalendarIntroductionDate[2] || min >= firstGregorianCalendarDay[2]
                    ? max - min
                    : max - 10 - min;
            }
            return max - min;
        }

        return simple
            ? calculateDaysAcrossMonthsLoop({
                from: to.month > from.month ? from : to,
                to: to.month > from.month ? to : from,
            })
            : calculateDaysAcrossMonthsRecursively({
                from: to.month > from.month ? from : to,
                to: to.month > from.month ? to : from,
                month: to.month > from.month ? from.month : to.month,
            });
    }

    return simple
        ? calculateDaysAcrossYearsLoop({
            from: to.year > from.year ? from : to,
            to: to.year > from.year ? to : from,
        })
        : calculateDaysAcrossYearsRecursively({
            from: to.year > from.year ? from : to,
            to: to.year > from.year ? to : from,
            year: to.year > from.year ? from.year : to.year,
        });
};
