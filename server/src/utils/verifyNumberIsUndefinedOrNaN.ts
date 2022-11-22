export const verifyNumberIsUndefinedOrNaN = (number: number) => {
    if (number === undefined || Number.isNaN(number)) {
        return true;
    }
    return false;
}