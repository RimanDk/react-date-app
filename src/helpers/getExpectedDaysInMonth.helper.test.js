import { gregorianCalendarIntroductionDate } from "../constants";
import { getExpectedDaysInMonth } from "./getExpectedDaysInMonth.helper";

describe('getExpectedDaysInMonth', () => {
    test.each([1, 3, 5, 7, 8, 10, 12])('should return 31 for the expected months', (month) => {
        expect(getExpectedDaysInMonth(month)).toBe(31);
    });

    test.each([4, 6, 9, 11])('should return 30 for the expected months', (month) => {
        expect(getExpectedDaysInMonth(month)).toBe(30);
    });

    it('should return 28 for a regular February', () => {
        expect(getExpectedDaysInMonth(2, 2023)).toBe(28);
    });

    it('should return 29 for a leap year February', () => {
        expect(getExpectedDaysInMonth(2, 2020)).toBe(29);
    });

    it('should return 21 for October 1582', () => {
        expect(getExpectedDaysInMonth(
            gregorianCalendarIntroductionDate[1],
            gregorianCalendarIntroductionDate[0]
        )).toBe(21);
    });
});
