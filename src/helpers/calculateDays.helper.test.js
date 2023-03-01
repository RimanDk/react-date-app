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
});
