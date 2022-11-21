export const verifyStringIsEmpty = (string: string) => {
    if (string === undefined || string === "") {
        return true;
    }
    return false;
}