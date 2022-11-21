export const verifyInvalidEmail = (email: string) => {
    if (email.indexOf("@") === -1) {
        return true;
    }
    return false;
}