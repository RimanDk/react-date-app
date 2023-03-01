import { firstGregorianCalendarDay, gregorianCalendarIntroductionDate } from "../constants";
import { calculateDays } from "./calculateDays.helper";

describe('calculateDays', () => {
    describe('given that the from and to years are the same', () => {
        describe('and the the from and to months are the same', () => {
            test.each([true, false])('should return the difference in days', (simple) => {
                expect(calculateDays('2023-02-10', '2023-02-25', simple)).toBe(15);
            });
        });

        describe('and the from and the to months are different', () => {
            test.each([true, false])('should calculate how many days there are between the two dates', (simple) => {
                expect(calculateDays('2023-01-10', '2023-02-25', simple)).toBe((22 + 24));
                expect(calculateDays('2023-01-01', '2023-05-31', simple)).toBe((31 + 28 + 31 + 30 + 30));
                expect(calculateDays('2023-01-01', '2023-12-31', simple)).toBe(364);
            });
        });
    });

    describe('given that the from and the to years are different', () => {
        test.each([true, false])('should calculate how many days are between the two dates', (simple) => {
            expect(calculateDays('2021-01-01', '2022-01-01', simple)).toBe(365);
            expect(calculateDays('2020-01-01', '2023-02-25', simple)).toBe(1151);
        });
    });

    describe('given the user has typed the dates in the wrong order', () => {
        test.each([true, false])('should just flip the dates around and still work', (simple) => {
            expect(calculateDays('2023-02-25', '2020-01-01', simple)).toBe(1151);
        });
    });

    describe('given B.C. dates to work with', () => {
        test.each([true, false])('should still work as long as the dates are within the Julian calendar', (simple) => {
            expect(calculateDays('-45-01-01', '30-01-01', simple)).toBe(27394);
        });
    });

    describe('given the passage from Julian to Gregorian calendars is covered in the date range', () => {
        test.each([true, false])('should account for the 10 missing days', (simple) => {
        // it('should account for the 10 missing days', (simple) => {
            // Check calculation for same month
            expect(calculateDays(
                `${gregorianCalendarIntroductionDate[0]}-${gregorianCalendarIntroductionDate[1]}-01`,
                `${firstGregorianCalendarDay[0]}-${firstGregorianCalendarDay[1]}-31`,
                simple
            )).toBe(20); // 30 days (31 excluding last) minus 10 removed days

            // Check calculatin starting at previous month and ending in crucial month
            expect(calculateDays(
                `${gregorianCalendarIntroductionDate[0]}-${gregorianCalendarIntroductionDate[1] - 1}-01`,
                `${firstGregorianCalendarDay[0]}-${firstGregorianCalendarDay[1]}-31`,
                simple
            )).toBe(50); // 30 days (sep) plus 30 days (31 excluding last minus 10 removed days)

            // Check calculation starting at crucial month and ending in the month after
            expect(calculateDays(
                `${gregorianCalendarIntroductionDate[0]}-${gregorianCalendarIntroductionDate[1]}-01`,
                `${firstGregorianCalendarDay[0]}-${firstGregorianCalendarDay[1] + 1}-30`,
                simple
            )).toBe(40); // 21 days (31 minus 10 removed days) plus 29 (nov) (30 excluding last)

            // Check calculation starting the month before crucial month and ending the month after crucial
            expect(calculateDays(
                `${gregorianCalendarIntroductionDate[0]}-${gregorianCalendarIntroductionDate[1] - 1}-01`,
                `${firstGregorianCalendarDay[0]}-${firstGregorianCalendarDay[1] + 1}-30`,
                simple
            )).toBe(80); // 30 days (sep) plus 21 days (31 minus 10 removed days) plus 29 days (nov) (30 excluding last)

            // Check calculation starting the year prior to crucial and ending in crucial
            expect(calculateDays(
                `${gregorianCalendarIntroductionDate[0] - 1}-01-01`,
                `${gregorianCalendarIntroductionDate[0]}-12-31`,
                simple
            )).toBe((365+354));

            // Check calculation starting in crucial year and ending in the year after crucial
            expect(calculateDays(
                `${gregorianCalendarIntroductionDate[0]}-01-01`,
                `${gregorianCalendarIntroductionDate[0] + 1}-12-31`,
                simple
            )).toBe((355+364));

            // Check calculation spanning across crucial year
            expect(calculateDays(
                `${gregorianCalendarIntroductionDate[0] - 1}-01-01`,
                `${gregorianCalendarIntroductionDate[0] + 1}-12-31`,
                simple
            )).toBe((365+355+364));
        });
    });
});
