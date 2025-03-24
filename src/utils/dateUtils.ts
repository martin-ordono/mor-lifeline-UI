/**
 * Convert a date to a number
 * Example: January 1, 2021 -> 20210101
 * if date is null, return today's date
 */
export const formatDateIntoNum = (date: Date | null): number => {
    if (date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
        const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
        return parseInt(`${year}${month}${day}`, 10);
    } else {
        return formatDateIntoNum(new Date());
    }
}

/**
 * Convert a number to a date
 * Example: 20210101 -> January 1, 2021
 * if dateNumber is null, return today's date
*/
export const parseNumberToDate = (dateNumber: Number | null): Date => {
    if (!dateNumber) return new Date();
    const dateStr = dateNumber.toString(); // Convert to string
    const year = parseInt(dateStr.slice(0, 4), 10);
    const month = parseInt(dateStr.slice(4, 6), 10) - 1; // Months are 0-based in JS
    const day = parseInt(dateStr.slice(6, 8), 10);

    return new Date(year, month, day);
}