// The date the Julian calendar was introduced (negative means B.C.)
export const julianCalendarIntroductionDate = [-45, 1, 1];

// The date the Gregorian calendar was introduced
export const gregorianCalendarIntroductionDate = [1582, 10, 4];

// The date the day after the Gregorian calendar was introduced, on the 4th of October
export const firstGregorianCalendarDay = [1582, 10, 15];

// The amount of numbers in the various months - February allows for leap years
export const daysInMonths = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Switches between using loop-based or recursive solution for calculating days
// There is no computational benefit to either approach. I included both to show
// alternative approaches exist.
export const useSimpleComputation = false;

// Validation states
export const isValid = 1;
export const isUnknown = 0;
export const isInvalid = -1;
