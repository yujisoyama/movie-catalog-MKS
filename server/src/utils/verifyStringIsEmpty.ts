export const verifyStringIsEmpty = (string: string) => {
    if (string === undefined || string === "" || string === null) {
        return true;
    }
    return false;
}