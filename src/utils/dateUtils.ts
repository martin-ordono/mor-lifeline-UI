
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
export const parseNumberToDate = (dateNumber: Number | null): Date | undefined => {
    if (!dateNumber) return undefined
    const dateStr = dateNumber.toString(); // Convert to string
    const year = parseInt(dateStr.slice(0, 4), 10);
    const month = parseInt(dateStr.slice(4, 6), 10) - 1; // Months are 0-based in JS
    const day = parseInt(dateStr.slice(6, 8), 10);

    return new Date(year, month, day);
}