import { mapDateToArray, mapDateToObject } from "./mapDate.helper";

describe('mapDateToArray', () => {
    it('should return a mapped and parsed version of given string using default separator', () => {
        expect(
            mapDateToArray({ date: '2023-02-25' })
        ).toEqual([2023, 2, 25]);
    });

    it('should support custom separators', () => {
        expect(
            mapDateToArray({ date: '2023/02/25', separator: '/' })
        ).toEqual([2023, 2, 25]);
    });

    it('should support not parsing the date', () => {
        expect(
            mapDateToArray({ date: '2023-02-25', parse: false })
        ).toEqual(['2023', '02', '25']);
    });

    it('should support negative years', () => {
        expect(
            mapDateToArray({ date: '-45-01-01', parse: false })
        ).toEqual(['-45', '01', '01']);
    });

    it('should parse negative years correctly', () => {
        expect(
            mapDateToArray({ date: '-45-01-01' })
        ).toEqual([-45, 1, 1]);
    });
});

describe('mapDateToObject', () => {
    it('should return a mapped version of given string using default separator', () => {
        expect(
            mapDateToObject({ date: '2023-02-25' })
        ).toEqual({ year: 2023, month: 2, day: 25 });
    });

    it('should support custom separators', () => {
        expect(
            mapDateToObject({ date: '2023/02/25', separator: '/' })
        ).toEqual({ year: 2023, month: 2, day: 25 });
    });

    it('should support not parsing the date', () => {
        expect(
            mapDateToObject({ date: '2023-02-25', parse: false })
        ).toEqual({ year: '2023', month: '02', day: '25' });
    });

    it('should support negative years', () => {
        expect(
            mapDateToObject({ date: '-45-01-01', parse: false })
        ).toEqual({ year: '-45', month: '01', day: '01' });
    });

    it('should parse negative years correctly', () => {
        expect(
            mapDateToObject({ date: '-45-01-01' })
        ).toEqual({ year: -45, month: 1, day: 1});
    });
});