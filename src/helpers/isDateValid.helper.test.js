// internals
import { isValid, isInvalid, gregorianCalendarIntroductionDate } from '../constants'
import { getExpectedDaysInMonth } from "./getExpectedDaysInMonth.helper";
import { isDateValid } from "./isDateValid.helper";

const getRange = (max) =>
    new Array(max)
        .fill('')
        .map((_, i) => i + 1);

describe('isDateValid', () => {
    describe('data type', () => {
        test.each(['', 0, false, null, undefined])(
            'should return false, if the given date is falsey', (val) => {
                expect(isDateValid(val)).toEqual({
                    valid: isInvalid,
                    msg: 'Date is undefined'
                });
        });

        test.each([
            'a-b-c',
            '20.23-01-01',
            '20,23-01-01',
            '#2023-01-01',
            '-20.34-01-01',
            '-20,34-01-01',
        ])('should return false, if the given date includes letters or special characters', (date) => {
            expect(isDateValid(date)).toEqual({
                valid: isInvalid,
                msg: 'Year must be a valid number with no commas or periods or letters',
            });
        });
    });

    describe('format', () => {
        it('should return false, if the given date does not follow the YYYY-MM-DD format', () => {
            expect(isDateValid('2023-25-02')).toEqual({
                valid: isInvalid,
                msg: 'Month must be greater than 0 and less than 13'
            });
            expect(isDateValid('02-2023-25')).toEqual({
                valid: isInvalid,
                msg: 'Month must be greater than 0 and less than 13',
            });
            expect(isDateValid('25-2023-02')).toEqual({
                valid: isInvalid,
                msg: 'Month must be greater than 0 and less than 13',
            });
            expect(isDateValid('02-25-2023')).toEqual({
                valid: isInvalid,
                msg: 'Month must be greater than 0 and less than 13',
            });
            expect(isDateValid('25-02-2023')).toEqual({
                valid: isInvalid,
                msg: 'Day must be greater than 0 and less than 29',
            });
        });

        it('should return true, if the given date follows the YYYY-MM-DD format', () => {
            expect(isDateValid('2023-02-25')).toEqual({ valid: isValid });
        });
    });

    describe('component-specific-validation', () => {
        describe('year', () => {
            test.each([-46, Number.MAX_SAFE_INTEGER + 1])(
                'should not accept years before -45 nor after MAX_SAFE_INTEGER', (year) => {
                    expect(isDateValid(`${year}-01-01`)).toEqual({
                        valid: isInvalid,
                        msg: `Year must be greater than -46 and less than ${Number.MAX_SAFE_INTEGER}`
                    });
                }
            );
        });

        describe('month', () => {
            test.each(['00', '13'])(
                'should not accept months outside of the 12 months in the year',
                (month) => {
                    expect(isDateValid(`2023-${month}-01`)).toEqual({
                        valid: isInvalid,
                        msg: 'Month must be greater than 0 and less than 13'
                    });
            });

            test.each(getRange(12))(
                'should accept months within the 1-12 range',
                (month) => {
                    expect(isDateValid(`2023-${month}-01`)).toEqual({ valid: isValid });
            });
        });

        describe('day', () => {
            test.each(getRange(12))(
                'should not accept days outside the correct range for a given month in a regular year',
                (month) => {
                    const max = getExpectedDaysInMonth(month, 2023) + 1;
                    ['00', max].forEach((day) => {
                        expect(isDateValid(`2023-${month}-${day}`)).toEqual({
                            valid: isInvalid,
                            msg: `Day must be greater than 0 and less than ${max}`,
                        });
                    });
            });

            test.each(getRange(12))(
                'should accept days within the correct range for a given month in a regular year',
                (month) => {
                    getRange(getExpectedDaysInMonth(month, 2023)).forEach((day) => {
                        expect(isDateValid(`2023-${month}-${day}`)).toEqual({ valid: isValid });
                    });
            });
        });
    });

    describe('special cases', () => {
        describe('introduction of Gregorian calendar', () => {
            test.each(getRange(10).map((entry) =>
                `${gregorianCalendarIntroductionDate[0]}-${gregorianCalendarIntroductionDate[1]}-${entry + 4}`
            ))('should not accept dates falling between the 4th and the 15th of feb 1587', (date) => {
                expect(isDateValid(date)).toEqual({
                    valid: false,
                    msg: 'Dates between the 4th and 15th of October 1582 '+
                        'were dropped when the Gregorian calendar was introduced and cannot be used'
                });
            });
        });
    });
});
