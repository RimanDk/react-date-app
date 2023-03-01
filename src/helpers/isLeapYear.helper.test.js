import { isLeapYear } from "./isLeapYear.helper";

describe('isLeapYear', () => {
    describe('julian', () => {
        it('should return false if the year is not divisible by 4', () => {
            expect(isLeapYear(-45)).toBe(false);
            expect(isLeapYear(3)).toBe(false);
            expect(isLeapYear(1581)).toBe(false);
        });

        it('should return true if the year is evenly divisible by 4', () => {
            expect(isLeapYear(-44)).toBe(true);
            expect(isLeapYear(0)).toBe(true);
            expect(isLeapYear(1580)).toBe(true);
        });
    });

    describe('gregorian', () => {
        it('should return false if the year is not divisible by 4', () => {
            expect(isLeapYear(1585)).toBe(false);
            expect(isLeapYear(1989)).toBe(false);
        });

        it('should return true if the year is divisible by 4 and not evenly divisible by 100', () => {
            expect(isLeapYear(2012)).toBe(true);
        });

        it('should return false if the year is evenly divisible by 4 and 100 but not 400', () => {
            expect(isLeapYear(1900)).toBe(false);
        });

        it('should return true if the year is evenly divisible by 4, 100 and 400', () => {
            expect(isLeapYear(2400)).toBe(true);
        });
    });
});
