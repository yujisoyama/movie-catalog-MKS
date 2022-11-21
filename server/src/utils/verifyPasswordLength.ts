export const verifyPasswordLength = (password: string, length: number) => {
    if (password.length < length) {
        return true;
    }
    return false;
}